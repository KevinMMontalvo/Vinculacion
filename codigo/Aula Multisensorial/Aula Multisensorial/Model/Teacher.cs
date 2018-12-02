using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Aula_Multisensorial.Model
{
    class Teacher
    {
        [BsonId]
        private ObjectId id;

        [BsonElement("name")]
        private string name;

        [BsonElement("speciality")]
        private string speciality;

        [BsonElement("level_id")]
        private ObjectId levelId;

        public Teacher()
        {
        }

        public Teacher(ObjectId id, string name, string speciality, ObjectId levelId)
        {
            this.id = id;
            this.name = name;
            this.speciality = speciality;
            this.levelId = levelId;
        }

        public ObjectId Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public string Speciality { get => speciality; set => speciality = value; }
        public ObjectId LevelId { get => levelId; set => levelId = value; }
    }
}
