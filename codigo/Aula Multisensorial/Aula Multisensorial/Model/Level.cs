using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Aula_Multisensorial.Model
{
    class Level
    {
        [BsonId]
        private ObjectId id;

        [BsonElement("name")]
        private string name;

        [BsonElement("min_age")]
        private int minAge;

        [BsonElement("max_age")]
        private int maxAge;

        public Level()
        {
        }

        public Level(ObjectId id, string name, int minAge, int maxAge)
        {
            this.Id = id;
            this.Name = name;
            this.MinAge = minAge;
            this.MaxAge = maxAge;
        }

        public ObjectId Id { get => id; set => id = value; }
        public string Name { get => name; set => name = value; }
        public int MinAge { get => minAge; set => minAge = value; }
        public int MaxAge { get => maxAge; set => maxAge = value; }
    }
}
