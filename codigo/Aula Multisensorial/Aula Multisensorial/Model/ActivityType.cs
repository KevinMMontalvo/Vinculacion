using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Aula_Multisensorial.Model
{
    class ActivityType
    {
        [BsonId]
        private ObjectId id;

        [BsonElement("thematic")]
        private string thematic;

        public ActivityType()
        {
        }

        public ActivityType(ObjectId id, string thematic)
        {
            this.id = id;
            this.thematic = thematic;
        }

        public ObjectId Id { get => id; set => id = value; }
        public string Thematic { get => thematic; set => thematic = value; }
    }
}
