using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Aula_Multisensorial.Model
{
    class Activity
    {
        [BsonId]
        private ObjectId id;

        [BsonElement("name")]
        private string auxiliaries;

        [BsonElement("score")]
        private float score;

        [BsonElement("student_id")]
        private ObjectId studentId;

        [BsonElement("activity_type_id")]
        private ObjectId activityTypeId;

        public Activity()
        {
        }

        public Activity(ObjectId id, string auxiliaries, float score, ObjectId studentId, ObjectId activityTypeId)
        {
            this.Id = id;
            this.Auxiliaries = auxiliaries;
            this.Score = score;
            this.StudentId = studentId;
            this.ActivityTypeId = activityTypeId;
        }

        public ObjectId Id { get => id; set => id = value; }
        public string Auxiliaries { get => auxiliaries; set => auxiliaries = value; }
        public float Score { get => score; set => score = value; }
        public ObjectId StudentId { get => studentId; set => studentId = value; }
        public ObjectId ActivityTypeId { get => activityTypeId; set => activityTypeId = value; }
    }
}
