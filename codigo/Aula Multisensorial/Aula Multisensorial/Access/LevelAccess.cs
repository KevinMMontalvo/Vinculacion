using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace Aula_Multisensorial.Access
{
    class LevelAccess
    {
        private readonly IMongoCollection<Level> levelsCollection;

        public LevelAccess()
        {
            levelsCollection = DatabaseConnection.GetInstance().Database.GetCollection<Level>("levels");
        }

        public void InsertLevel(Dictionary<string, object> level)
        {
            BsonDocument document = new BsonDocument(level);
            //Console.WriteLine(document.ToJson());
            levelsCollection.InsertOne(BsonSerializer.Deserialize<Level>(document));
        }

        public string GetLevels()
        {
            List <Level> levelsList = levelsCollection.Find(_ => true).ToList();
            //Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(levelsList));
            return Newtonsoft.Json.JsonConvert.SerializeObject(levelsList);
        }

        public void ModifyLevel(Dictionary<string, object> level)
        {
            BsonDocument document = new BsonDocument(level);
            string id = document.GetValue("_id").AsString;
            FilterDefinition<Level> filter = Builders<Level>.Filter.Eq("Id", id);
            Level objectLevel = BsonSerializer.Deserialize<Level>(document);
            levelsCollection.ReplaceOne(filter, objectLevel);
        }

        public void DeleteLevel(string id)
        {
            FilterDefinition<Level> filter = Builders<Level>.Filter.Eq("Id", id);
            levelsCollection.DeleteOne(filter);
        }

    }
}
