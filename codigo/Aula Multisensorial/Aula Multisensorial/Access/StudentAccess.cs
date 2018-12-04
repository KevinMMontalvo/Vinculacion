using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using MongoDB.Driver;
using System;

namespace Aula_Multisensorial.Access
{
    class StudentAccess
    {
        private readonly IMongoCollection<Student> studentsCollection;

        public StudentAccess()
        {
            studentsCollection = DatabaseConnection.GetInstance().Database.GetCollection<Student>("students");
        }

        public void StudentInsert()
        {
            Console.WriteLine("Hola Mundo");
            //studentsCollection.InsertOne(student);
        }
    }
}
