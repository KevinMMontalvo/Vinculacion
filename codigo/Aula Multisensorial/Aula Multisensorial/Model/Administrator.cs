using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Aula_Multisensorial.Model
{
    class Administrator
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonProperty(PropertyName = "_id")]
        public string Id { get; set; }

        [BsonElement("name")]
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [BsonElement("password")]
        [JsonProperty(PropertyName = "password")]
        public string Password { get; set; }

        public Administrator(string id, string name, string password)
        {
            Id = id;
            Name = name;
            Password = password;
        }
    }
}
