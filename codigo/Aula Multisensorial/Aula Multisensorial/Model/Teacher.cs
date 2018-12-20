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
        private string Name { get; set; }

        [BsonElement("speciality")]
        [JsonProperty(PropertyName = "speciality")]
        private string Speciality { get; set; }

        [BsonElement("level_id")]
        [JsonProperty(PropertyName = "level_id")]
        private string LevelId { get; set; }

        public Teacher()
        {
        }

        public Teacher(string id, string name, string speciality, string levelId)
        {
            Id = id;
            Name = name;
            Speciality = speciality;
            LevelId = levelId;
        }
    }
}
