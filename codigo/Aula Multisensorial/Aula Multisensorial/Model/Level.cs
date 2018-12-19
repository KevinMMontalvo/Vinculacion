using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Aula_Multisensorial.Model
{
    class Level
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonProperty(PropertyName = "_id")]
        public string Id { get; set; }

        [BsonElement("name")]
        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [BsonElement("min_age")]
        [JsonProperty(PropertyName = "min_age")]
        public int MinAge { get; set; }

        [BsonElement("max_age")]
        [JsonProperty(PropertyName = "max_age")]
        public int MaxAge { get; set; }

        public Level()
        {
        }

        public Level(string id, string name, int minAge, int maxAge)
        {
            Id = id;
            Name = name;
            MinAge = minAge;
            MaxAge = maxAge;
        }
    }
}
