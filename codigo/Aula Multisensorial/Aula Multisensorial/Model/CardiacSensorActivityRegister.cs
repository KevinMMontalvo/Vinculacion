using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Aula_Multisensorial.Model
{
    class CardiacSensorActivityRegister
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonProperty(PropertyName = "_id")]
        public string Id { get; set; }

        [BsonElement("student_id")]
        [JsonProperty(PropertyName = "student_id")]
        public string StudentId { get; set; }

        [BsonElement("datetime")]
        [JsonProperty(PropertyName = "datetime")]
        public DateTime Datetime { get; set; }

        [BsonElement("level")]
        [JsonProperty(PropertyName = "level")]
        public string Level { get; set; }

        [BsonElement("period")]
        [JsonProperty(PropertyName = "period")]
        public string Period { get; set; }

        [BsonElement("initial_value")]
        [JsonProperty(PropertyName = "initial_value")]
        public string InitialValue { get; set; }

        [BsonElement("final_value")]
        [JsonProperty(PropertyName = "final_value")]
        public string FinalValue { get; set; }

        public CardiacSensorActivityRegister()
        {
        }

        public CardiacSensorActivityRegister(string id, string studentId, DateTime datetime, string level, string period, string initialValue, string finalValue)
        {
            Id = id;
            StudentId = studentId;
            Datetime = datetime;
            Level = level;
            Period = period;
            InitialValue = initialValue;
            FinalValue = finalValue;
        }
    }
}
