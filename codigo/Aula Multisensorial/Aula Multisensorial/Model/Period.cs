using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;

namespace Aula_Multisensorial.Model
{
    class Period
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonProperty(PropertyName = "_id")]
        public string Id { get; set; }

        [BsonElement("name")]
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [BsonElement("start_date")]
        [JsonProperty(PropertyName = "start_date")]
        public DateTime StartDate { get; set; }

        [BsonElement("is_visible")]
        [JsonProperty(PropertyName = "is_visible")]
        public bool IsVisible { get; set; }

        public Period()
        {
        }

        public Period(string id, string name, DateTime startDate, bool isVisible)
        {
            Id = id;
            Name = name;
            StartDate = startDate;
            IsVisible = isVisible;
        }
    }
}
