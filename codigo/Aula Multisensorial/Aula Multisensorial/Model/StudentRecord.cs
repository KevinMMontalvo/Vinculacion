using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace Aula_Multisensorial.Model
{
    class StudentRecord
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonProperty(PropertyName = "_id")]
        public string Id { get; set; }

        [BsonElement("student_id")]
        [JsonProperty(PropertyName = "student_id")]
        public string StudentId { get; set; }

        [BsonElement("questions")]
        [JsonProperty(PropertyName = "questions")]
        public object[][] Questions { get; set; }

        public StudentRecord()
        {
        }

        public StudentRecord(string id, string studentId, string[][] questions)
        {
            Id = id;
            StudentId = studentId;
            Questions = questions;
        }
    }
}