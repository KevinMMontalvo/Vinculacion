using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Aula_Multisensorial.Model
{
    class Log
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonProperty(PropertyName = "_id")]
        public string Id { get; set; }

        [BsonElement("action")]
        [JsonProperty(PropertyName = "action")]
        public string Action { get; set; }

        [BsonElement("user_id")]
        [JsonProperty(PropertyName = "user_id")]
        public string UserId { get; set; }

        [BsonElement("date")]
        [JsonProperty(PropertyName = "date")]
        public DateTime Date { get; set; }

        public Log()
        {
        }

        public Log(string id, string action, string userId, DateTime date)
        {
            Id = id;
            Action = action;
            UserId = userId;
            Date = date;
        }
    }
}
