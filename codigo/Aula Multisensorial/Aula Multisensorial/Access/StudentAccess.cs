using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;

namespace Aula_Multisensorial.Access
{
    class StudentAccess
    {
        private readonly IMongoCollection<Student> studentsCollection;

        public StudentAccess()
        {
            studentsCollection = DatabaseConnection.GetInstance().Database.GetCollection<Student>("students");
        }

        /// <summary>
        /// Este metodo recibe un diccionario de datos proveniente de la invocacion del metodo en el cliente
        /// </summary>
        /// <param name="student">Es el diccionario con los datos del estudiante a ser insertado</param>
        public void InsertStudent(Dictionary<string, object> student)
        {
            BsonDocument document = new BsonDocument(student);

            if(document.GetValue("technical_helps").IsBsonNull)
            {
                document.Set("technical_helps", new BsonArray());
            }
            //Console.WriteLine(document.ToJson());
            studentsCollection.InsertOne(BsonSerializer.Deserialize<Student>(document));
        }

        /// <summary>
        /// Este metodo consulta todos los estudiantes de la coleccion
        /// </summary>
        /// <returns>string de JSON con todos los estudiantes</returns>
        public string GetStudents()
        {
            List<Student> studentsList = studentsCollection.Find(_ => true).ToList();
            //Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(studentsList));
            return Newtonsoft.Json.JsonConvert.SerializeObject(studentsList);
        }
    }
}
