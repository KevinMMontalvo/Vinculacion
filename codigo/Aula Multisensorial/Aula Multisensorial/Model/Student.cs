using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Aula_Multisensorial.Model
{
    class Student
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonProperty(PropertyName = "_id")]
        public string Id { get; set; }

        [BsonElement("names")]
        [JsonProperty(PropertyName = "names")]
        public string Names { get; set; }

        [BsonElement("surnames")]
        [JsonProperty(PropertyName = "surnames")]
        public string Surnames { get; set; }

        [BsonElement("level_id")]
        [JsonProperty(PropertyName = "level_id")]
        public string LevelId { get; set; }

        [BsonElement("diagnostic")]
        [JsonProperty(PropertyName = "diagnostic")]
        public string Diagnostic { get; set; }

        [BsonElement("birthdate")]
        [JsonProperty(PropertyName = "birthdate")]
        public DateTime Birthdate { get; set; }

        [BsonElement("gender")]
        [JsonProperty(PropertyName = "gender")]
        public string Gender { get; set; }

        [BsonElement("condition")]
        [JsonProperty(PropertyName = "condition")]
        public string Condition { get; set; }

        [BsonElement("technical_helps")]
        [JsonProperty(PropertyName = "technical_helps")]
        public Technical_Helps[] TechnicalHelps { get; set; }

        [BsonElement("percentage_of_disability")]
        [JsonProperty(PropertyName = "percentage_of_disability")]
        public int DisabilityPercentage { get; set; }

        public string FullName => $"{Names} {Surnames}";

        public Student()
        {
        }

        public Student(string id, string names, string surnames, string levelId, string diagnostic, DateTime birthdate, string gender, string condition, Technical_Helps[] technicalHelps, int disabilityPercentage)
        {
            Id = id;
            Names = names;
            Surnames = surnames;
            LevelId = levelId;
            Diagnostic = diagnostic;
            Birthdate = birthdate;
            Gender = gender;
            Condition = condition;
            TechnicalHelps = technicalHelps;
            DisabilityPercentage = disabilityPercentage;
        }
    }

    class Technical_Helps
    {
        [BsonElement("_id")]
        [JsonProperty(PropertyName = "_id")]
        public int Id { get; set; }

        [BsonElement("name")]
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }
    }

}
