using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace Aula_Multisensorial.Access
{
    class StudentAccess
    {
        private readonly IMongoCollection<BsonDocument> studentsCollection;

        public StudentAccess()
        {
            studentsCollection = DatabaseConnection.GetInstance().Database.GetCollection<BsonDocument>("students");
        }

        /// <summary>
        /// Este metodo recibe un diccionario de datos proveniente de la invocacion del metodo en el cliente
        /// </summary>
        /// <param name="student">Es el diccionario con los datos del estudiante a ser insertado</param>
        public void InsertStudent(Dictionary<string,object> student)
        {
            BsonDocument document = new BsonDocument(student);
            Console.WriteLine(document.ToJson());
            studentsCollection.InsertOne(document);
        }

        /// <summary>
        /// Este metodo consulta todos los estudiantes de la coleecion
        /// </summary>
        /// <returns>string de JSON con todos los estudiantes</returns>
        public string GetStudents()
        {
            List<BsonDocument> studentsList = studentsCollection.AsQueryable().ToList();
            return studentsList.ToJson();
        }

    }
}
