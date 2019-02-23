using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
using System;

namespace Aula_Multisensorial.Model
{
    class MatrixActivityRegister
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonProperty(PropertyName = "_id")]
        public string Id { get; set; }

        [BsonElement("student_id")]
        [JsonProperty(PropertyName = "student_id")]
        public string StudentId { get; set; }

        [BsonElement("datetime")]
        [JsonProperty(PropertyName = "datetime")]
        public DateTime Datetime { get; set; }

        [BsonElement("level")]
        [JsonProperty(PropertyName = "level")]
        public string Level { get; set; }

        [BsonElement("period")]
        [JsonProperty(PropertyName = "period")]
        public string Period { get; set; }

        [BsonElement("shape_configuration")]
        [JsonProperty(PropertyName = "shape_configuration")]
        public string ShapeConfiguration { get; set; }

        [BsonElement("color_configuration")]
        [JsonProperty(PropertyName = "color_configuration")]
        public int ColorConfiguration { get; set; }

        [BsonElement("sequence_configuration")]
        [JsonProperty(PropertyName = "sequence_configuration")]
        public int SequenceConfiguration { get; set; }

        [BsonElement("level_configuration")]
        [JsonProperty(PropertyName = "level_configuration")]
        public int LevelConfiguration { get; set; }

        [BsonElement("appearances_configuration")]
        [JsonProperty(PropertyName = "appearances_configuration")]
        public int AppearancesConfiguration { get; set; }

        [BsonElement("value")]
        [JsonProperty(PropertyName = "value")]
        public string Value { get; set; }
    }
}
