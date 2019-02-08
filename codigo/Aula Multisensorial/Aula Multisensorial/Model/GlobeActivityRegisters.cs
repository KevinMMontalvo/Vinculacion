using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;

namespace Aula_Multisensorial.Model
{
    class GlobeActivityRegister
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonProperty(PropertyName = "_id")]
        public string Id { get; set; }

        [BsonElement("student_id")]
        [JsonProperty(PropertyName = "student_id")]
        public string StudentId { get; set; }

        [BsonElement("finger")]
        [JsonProperty(PropertyName = "finger")]
        public string Finger { get; set; }

        [BsonElement("datetime")]
        [JsonProperty(PropertyName = "datetime")]
        public DateTime Datetime { get; set; }

        [BsonElement("value")]
        [JsonProperty(PropertyName = "value")]
        public string Value { get; set; }

        public GlobeActivityRegister()
        {
        }

        public GlobeActivityRegister(string id, string studentId, string finger, DateTime datetime, string value)
        {
            Id = id;
            StudentId = studentId;
            Finger = finger;
            Datetime = datetime;
            Value = value;
        }
    }
}
