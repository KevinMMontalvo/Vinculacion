using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Aula_Multisensorial.Model
{
    class Student
    {
        [BsonId]
        private ObjectId id;

        [BsonElement("names")]
        private string names;

        [BsonElement("lastnames")]
        private string lastnames;

        [BsonElement("diagnostic")]
        private string diagnostic;

        [BsonElement("gender")]
        private string gender;

        [BsonElement("birthday")]
        private DateTime birthday;

        [BsonElement("condition")]
        private string condition;

        [BsonElement("technical_helps")]
        private string[] technicalHelps;

        [BsonElement("level_id")]
        private ObjectId levelId;

        public Student()
        {
        }

        public Student(ObjectId id, string names, string lastNames, string diagnostic, string gender, DateTime birthday, string condition, string[] technicalHelps, ObjectId levelId)
        {
            this.id = id;
            this.names = names;
            this.lastnames = lastNames;
            this.diagnostic = diagnostic;
            this.gender = gender;
            this.birthday = birthday;
            this.condition = condition;
            this.technicalHelps = technicalHelps;
            this.levelId = levelId;
        }

        public ObjectId Id { get => id; set => id = value; }
        public string Names { get => names; set => names = value; }
        public string LastNames { get => lastnames; set => lastnames = value; }
        public string Diagnostic { get => diagnostic; set => diagnostic = value; }
        public string Gender { get => gender; set => gender = value; }
        public DateTime Birthday { get => birthday; set => birthday = value; }
        public string Condition { get => condition; set => condition = value; }
        public string[] TechnicalHelps { get => technicalHelps; set => technicalHelps = value; }
        public ObjectId LevelId { get => levelId; set => levelId = value; }
    }
}
