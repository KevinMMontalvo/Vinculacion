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
        private CancellationTokenSource cancellationTokenSource;
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
                cancellationTokenSource = new CancellationTokenSource();
                cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

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
            try
            {
                cancellationTokenSource = new CancellationTokenSource();
                cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

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

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            ReplaceOneResult result = teachersCollection.ReplaceOne(filter, objectTeacher, null, cancellationTokenSource.Token);

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
        /// Elimina un docente de la coleccion
        /// </summary>
        /// <param name="id">String con el id del docente a ser eliminado</param>
        /// <returns>Retorna true si la eliminacion ha sido exitosa</returns>
        public bool DeleteTeacher(string id)
        {
            FilterDefinition<Teacher> filter = Builders<Teacher>.Filter.Eq("Id", id);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            DeleteResult deleteResult = teachersCollection.DeleteOne(filter, cancellationTokenSource.Token);

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
        /// <param name="name">String con el nombre del docente</param>
        /// <param name="password">String con la contraseña del docente</param>
        /// <returns>Retorna true si los datos de ingreso son correctos</returns>
        public bool ValidateTeacherLogin(string name, string password)
        {
            FilterDefinition<Teacher> filter = Builders<Teacher>.Filter.Eq("Name", name);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            //consulta de los profesores con ese nombre
            List<Teacher> teachersList = teachersCollection.Find(filter).ToList(cancellationTokenSource.Token);

            // solo debe haber un docente con ese nombre
            if (teachersList.Count != 1)
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

        /// <summary>
        /// Cambia el password de un docente
        /// </summary>
        /// <param name="id">string con el id del docente a ser modificado</param>
        /// <param name="newPassword">String con la nueva contraseña</param>
        /// <returns></returns>
        public bool ChangeTeacherPassword(string id, string newPassword)
        {
            FilterDefinition<Teacher> filter = Builders<Teacher>.Filter.Eq("Id", id);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            UpdateDefinition<Teacher> updateDefinition = Builders<Teacher>.Update.Set("Password", newPassword);

            UpdateResult updateResult = teachersCollection.UpdateOne(filter, updateDefinition, null, cancellationTokenSource.Token);

            if (updateResult.IsAcknowledged && updateResult.ModifiedCount == 1)
            {
                return true;
            }
            else
            {
                return false;
            }

        }

        /// <summary>
        /// Obtiene el objeto docente consultandolo por el ID
        /// </summary>
        /// <param name="teacherId">String con el Id del docente a consultar</param>
        /// <returns>Retorna el objeto docente consultado</returns>
        public Teacher GetTeacherById(string teacherId)
        {
            FilterDefinition<Teacher> filter = Builders<Teacher>.Filter.Eq("Id", teacherId);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

            return teachersCollection.Find(filter).ToList(cancellationTokenSource.Token)[0];
        }
    }
}
