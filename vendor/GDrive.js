const fs = require("fs");
const readline = require("readline");
const request = require("request");
const EventEmitter = require("events").EventEmitter;
const util = require("util");
const { google } = require("googleapis");

const SCOPES = ["https://www.googleapis.com/auth/drive"];
const TOKEN_PATH = "credentials/token.json";
const CREDENTIALS_PATH = "credentials/drive.json";

const assertAccess = (callback) => {

	fs.readFile(CREDENTIALS_PATH, (err, content) => {

		if (err)
			return console.log("Error loading client secret file:", err);

		authorize(JSON.parse(content), callback);
	});
}

const authorize = (credentials, callback) => {

	const {
		client_secret,
		client_id,
		redirect_uris
	} = credentials.installed;

	const oAuth2Client = new google.auth.OAuth2(
		client_id,
		client_secret,
		redirect_uris[0]
	);

	// Check if we have previously stored a token.
	fs.readFile(TOKEN_PATH, (err, token) => {

		if (err) return getAccessToken(oAuth2Client, callback);

		let parsedToken = JSON.parse(token);

		// Check if token is expired
		if (parsedToken.expiry_date < Math.round(Date.now() / 1000)) {

			return refreshToken(credentials.installed, parsedToken, (refreshedToken) => {

				oAuth2Client.setCredentials(refreshedToken);

				callback(oAuth2Client);
			});
		}

		oAuth2Client.setCredentials(parsedToken);

		callback(oAuth2Client);
	});
}

const refreshToken = (credentials, parsedToken, callback) => {

	let options = {
		url: 'https://oauth2.googleapis.com/token',
		body: JSON.stringify({
			client_id: credentials.client_id,
			client_secret: credentials.client_secret,
			grant_type: 'refresh_token',
			refresh_token: parsedToken.refresh_token
		})
	}

	// Get new access_token
	request.post(options, (err, res) => {

		if (err)
			return callback('Could not refresh token');
		
		let body = JSON.parse(res.body)

		parsedToken.access_token = body.access_token;

		let today = new Date();
		parsedToken.expiry_date = Math.round(today.setHours(today.getHours() + 1) / 1000); // token expires in one hour

		// Update token on file
		fs.writeFile(TOKEN_PATH, JSON.stringify(parsedToken), err => {

			if (err) return console.error(err);

			console.log("Token stored to", TOKEN_PATH);
		});

		callback(parsedToken);
	});
}

const getAccessToken = (oAuth2Client, callback) => {

	const authUrl = oAuth2Client.generateAuthUrl({
		access_type: "offline",
		scope: SCOPES
	});

	console.log("Authorize this app by visiting this url:", authUrl);

	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	rl.question("Enter the code from that page here: ", code => {

		rl.close();

		oAuth2Client.getToken(code, (err, token) => {

			if (err)
				return console.error("Error retrieving access token", err);

			oAuth2Client.setCredentials(token);

			// Store the token to disk for later program executions
			fs.writeFile(TOKEN_PATH, JSON.stringify(token), err => {

				if (err) return console.error(err);

				console.log("Token stored to", TOKEN_PATH);
			});

			callback(oAuth2Client);
		});
	});
}

const assertData = (parameter) => {

	if (!parameter) return null;

	if (!parameter.data) return null;

	return parameter.data;
}

const assertError = (parameter) => {

	if (!parameter) return null;

	// As error response is one level down, we bring it up to object root
	if (parameter.response)
		parameter = parameter.response;

	if (!parameter.data) return null;

	return parameter.data.error;
}

const parseResponse = (err, res, callback) => {

	callback(
		assertError(err),
		assertData(res)
	);
}

const getById = (auth, id, callback) => {

	const drive = google.drive({ version: "v3", auth });

	drive.files.get(
		{
			fileId: id,
			fields: "id, name, mimeType, parents, webContentLink"
		},
		(err, res) => parseResponse(err, res, callback));
}

const createFolder = (auth, name, callback) => {

	let metadata = {
		name,
		mimeType: 'application/vnd.google-apps.folder'
	};

	const drive = google.drive({ version: "v3", auth });

	drive.files.create({
		resource: metadata,
		fields: 'id'
	}, 
	(err, res) => parseResponse(err, res, callback));
}

const simpleUpload = (auth, parentId, file, callback) => {

	let resource = {
		name: file.name
	};

	if (parentId) {
		resource['parents'] = [parentId];
	}

	let media = {
		mimeType: file.type,
		body: fs.createReadStream(file.path)
	};

	const drive = google.drive({ version: "v3", auth });

	drive.files.create({
		resource,
		media,
		fields: 'id'
	}, 
	(err, res) => parseResponse(err, res, callback));
}

const resumableUpload = (auth, parentId, file, callback) => {

	let resumable = new resumableUploadHandler();

	resumable.tokens = auth.credentials;
	resumable.filepath = file.path;
	resumable.fileSize = file.size;
	resumable.mimeType = file.type;
	resumable.retry = 0;
	resumable.metadata = {
		name: file.name,
	};

	if (parentId) {
		resumable.metadata['parents'] = [parentId];
	}

	resumable.on('progress', function (progress) {
		console.log(progress);
	});
	resumable.on('success', function (success) {
		callback(null, success)
	});
	resumable.on('error', function (error) {
		console.log(error);
		callback(error)
	});

	resumable.upload();
}

var resumableUploadHandler = function () {

	this.byteCount = 0;
	this.tokens = {};
	this.filepath = "";
	this.mimeType = "";
	this.fileSize = 0;
	this.metadata = {};
	this.query = "";
	this.retry = -1;
	this.host = "www.googleapis.com";
	this.api = "/upload/drive/v3/files";
}

resumableUploadHandler.prototype.upload = function() {

	let self = this;

	let options = {
		url: `https://${self.host}${self.api}?uploadType=resumable${self.query}`,
		headers: {
			'Host': self.host,
			'Authorization': `Bearer ${self.tokens.access_token}`,
			'Content-Length': Buffer.from(JSON.stringify(self.metadata)).length,
			'Content-Type': 'application/json; charset=UTF-8',
			'X-Upload-Content-Length': fs.statSync(self.filepath).size,
			'X-Upload-Content-Type': self.mimeType
		},
		body: JSON.stringify(self.metadata)
	};

	//Send request and start upload if success
	request.post(options, (err, res) => {

		if (err || !res.headers.location) {

			self.emit("error", new Error(err));

			self.emit("progress", "Retrying ...");

			if (self.retry > 0 || self.retry <= -1) {

				self.retry --;

				// Retry
				self.upload();
			} else {

				return;
			}
		}

		self.location = res.headers.location;

		console.log('Resumable upload session started');

		self.send();
	});
}

resumableUploadHandler.prototype.send = function() {

	let self = this;

	let options = {
		url: self.location, //self.location becomes the Google-provided URL to PUT to
		headers: {
			'Authorization': `Bearer ${self.tokens.access_token}`,
			'Content-Length': fs.statSync(self.filepath).size - self.byteCount,
			'Content-Type': self.mimeType
		}
	};
	let uploadPipe = null;

	try {
		//creates file stream, pipes it to self.location
		uploadPipe = fs.createReadStream(self.filepath, {
			start: self.byteCount,
			end: fs.statSync(self.filepath).size
		});
	} catch (e) {

		self.emit("error", new Error(e));

		return;
	}

	let health = setInterval(() => {

		self.getProgress((err, res, body) => {

			if (!err && typeof res.headers.range !== "undefined") {

				self.emit("progress", `${res.headers.range.substring(8)} range being processed`);
			}
		});
	}, 5000);

	uploadPipe.pipe(

		request.put(options, (error, response, body) => {

			clearInterval(health);

			if (!error) {
				self.emit("success", JSON.parse(body));
				return;
			}

			self.emit("error", new Error(error));

			if (self.retry > 0 || self.retry <= -1) {

				self.retry--;

				self.getProgress((err, res, b) => {

					if (typeof res.headers.range !== "undefined") {

						self.byteCount = res.headers.range.substring(8); //parse response
					} else {

						self.byteCount = 0;
					}

					self.send();
				});
			}
		})
	);
}

resumableUploadHandler.prototype.getProgress = function (handler) {

	let self = this;

	let options = {
		url: self.location,
		headers: {
			Authorization: `Bearer ${self.tokens.access_token}`,
			"Content-Length": 0,
			"Content-Range": `bytes */${fs.statSync(self.filepath).size}`
		}
	};

	request.put(options, handler);
}

util.inherits(resumableUploadHandler, EventEmitter);

module.exports = {
	assertAccess: assertAccess,
	authorize: authorize,
	refreshToken: refreshToken,
	getAccessToken: getAccessToken,
	createFolder: createFolder,
	getById: getById,
	simpleUpload: simpleUpload,
	resumableUpload: resumableUpload
}