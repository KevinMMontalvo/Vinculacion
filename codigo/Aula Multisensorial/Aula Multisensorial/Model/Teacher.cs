using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Aula_Multisensorial.Model
{
    class Teacher
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

        [BsonElement("speciality")]
        [JsonProperty(PropertyName = "speciality")]
        public string Speciality { get; set; }

        [BsonElement("level_id")]
        [JsonProperty(PropertyName = "level_id")]
        public string LevelId { get; set; }

        public Teacher()
        {
        }

        public Teacher(string id, string name, string password, string speciality, string levelId)
        {
            Id = id;
            Name = name;
            Password = password;
            Speciality = speciality;
            LevelId = levelId;
        }
    }
}
