using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System.Collections.Generic;

namespace Aula_Multisensorial.Access
{
    class TeacherAccess
    {
        private readonly IMongoCollection<Teacher> teachersCollection;

        public TeacherAccess()
        {
            teachersCollection = DatabaseConnection.GetInstance().Database.GetCollection<Teacher>("teachers");
        }

        public string GetTeachers()
        {
            List<Teacher> teachersList = teachersCollection.Find(_ => true).ToList();
            //Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(studentsList));
            return Newtonsoft.Json.JsonConvert.SerializeObject(teachersList);
        }

        public void ModifyTeacher(Dictionary<string, object> teacher)
        {
            BsonDocument document = new BsonDocument(teacher);

            string id = document.GetValue("_id").AsString;
            FilterDefinition<Teacher> filter = Builders<Teacher>.Filter.Eq("Id", id);
            Teacher objectTeacher = BsonSerializer.Deserialize<Teacher>(document);
            teachersCollection.ReplaceOne(filter, objectTeacher);
        }

        public void InsertTeacher(Dictionary<string, object> teacher)
        {
            BsonDocument document = new BsonDocument(teacher);
            //Console.WriteLine(document.ToJson());
            teachersCollection.InsertOne(BsonSerializer.Deserialize<Teacher>(document));
        }

        public void DeleteTeacher(string id)
        {
            FilterDefinition<Teacher> filter = Builders<Teacher>.Filter.Eq("Id", id);
            teachersCollection.DeleteOne(filter);
        }
    }
}
