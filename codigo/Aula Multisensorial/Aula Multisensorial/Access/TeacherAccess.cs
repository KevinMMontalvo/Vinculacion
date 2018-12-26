using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading;

namespace Aula_Multisensorial.Access
{
    class TeacherAccess
    {
        private static readonly int TIMEOUT = 2000; //Tiempo de respuesta maximo
        private readonly IMongoCollection<Teacher> teachersCollection;

        public TeacherAccess()
        {
            teachersCollection = DatabaseConnection.GetInstance().Database.GetCollection<Teacher>("teachers");
        }

        /// <summary>
        /// Obtiene todos los docentes de la coleccion
        /// </summary>
        /// <returns>string de JSON con todos los docentes, en caso de fallo retorna null</returns>
        public string GetTeachers()
        {
            try
            {
                List<Teacher> teachersList = teachersCollection.Find(_ => true).ToList();
                return Newtonsoft.Json.JsonConvert.SerializeObject(teachersList);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return null;
            }
        }

        /// <summary>
        /// Inserta un docente a la coleccion
        /// </summary>
        /// <param name="teacher">Diccionario con los datos del docente a ser insertado</param>
        /// <returns>Reterona verdadero si la insercio fue exitosa</returns>
        public bool InsertTeacher(Dictionary<string, object> teacher)
        {
            BsonDocument document = new BsonDocument(teacher);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta
            try
            {
                teachersCollection.InsertOne(BsonSerializer.Deserialize<Teacher>(document), null, cancellationTokenSource.Token);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }
        }

        /// <summary>
        /// Modifica un docente de la coleccion
        /// </summary>
        /// <param name="teacher">Diccionario con los datos del docente incluyendo su id</param>
        /// <returns>Retorna true si la modificacion ha sido exitosa</returns>
        public bool ModifyTeacher(Dictionary<string, object> teacher)
        {
            BsonDocument document = new BsonDocument(teacher);

            //crea el filtro para identificar el docente a modificar
            string id = document.GetValue("_id").AsString;
            FilterDefinition<Teacher> filter = Builders<Teacher>.Filter.Eq("Id", id);

            Teacher objectTeacher = BsonSerializer.Deserialize<Teacher>(document); //JSON → Objeto Teacher

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            ReplaceOneResult result = teachersCollection.ReplaceOne(filter, objectTeacher,null,cancellationTokenSource.Token);

            //validacion de la ejecucion correcta de la modificacion
            if (result.IsAcknowledged && result.ModifiedCount == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Elimina un doente de la coleccion
        /// </summary>
        /// <param name="id">String con el id del docente a ser eliminado</param>
        /// <returns>Retorna true si la eliminacion ha sido exitosa</returns>
        public bool DeleteTeacher(string id)
        {
            FilterDefinition<Teacher> filter = Builders<Teacher>.Filter.Eq("Id", id);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            DeleteResult deleteResult = teachersCollection.DeleteOne(filter,cancellationTokenSource.Token);

            //validacion de la ejecucion correcta de la eliminacion
            if (deleteResult.IsAcknowledged && deleteResult.DeletedCount == 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Valida los datos de ingreso de un docente
        /// </summary>
        /// <param name="name">Nombre del docente</param>
        /// <param name="password">Contraseña del docente</param>
        /// <returns>Retorna true si los datos de ingreso son correctos</returns>
        public bool ValidateTeacherLogin(string name, string password)
        {
            FilterDefinition<Teacher> filter = Builders<Teacher>.Filter.Eq("Name", name);

            //consulta de los profesores con ese nombre
            List<Teacher> teachersList = teachersCollection.Find(filter).ToList();

            // solo debe haber un docente con ese nombre
            if (teachersList.Count!=1)
            {
                return false;
            }

            //valida que la contraseña sea correcta
            if (teachersList[0].Password.Equals(password))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
