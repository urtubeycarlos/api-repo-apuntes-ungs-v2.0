class Career {

    constructor(firebaseSnapshot){
        this.Id = firebaseSnapshot[0];
        this.Name = firebaseSnapshot[1].Name;
        this.Md5Name = firebaseSnapshot[1].Md5Name;
        this.AssignaturesIDs = firebaseSnapshot[1].AssignaturesIDs;
    }

}

module.exports = Career;