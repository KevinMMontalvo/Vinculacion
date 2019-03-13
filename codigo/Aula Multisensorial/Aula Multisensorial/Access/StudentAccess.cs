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
    class StudentAccess
    {
        private CancellationTokenSource cancellationTokenSource;
        private readonly IMongoCollection<Student> studentsCollection;

        public StudentAccess()
        {
            studentsCollection = DatabaseConnection.GetInstance().Database.GetCollection<Student>("students");
        }

        /// <summary>
        ///Consulta todos los estudiantes de la coleccion
        /// </summary>
        /// <returns>String con el JSON de todos los estudiantes, en caso de fallo retorna null</returns>
        public string GetStudents()
        {
            try
            {
                cancellationTokenSource = new CancellationTokenSource();
                cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

                List<Student> studentsList = studentsCollection.Find(_ => true).ToList();
                return Newtonsoft.Json.JsonConvert.SerializeObject(studentsList);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return null;
            }
        }

        /// <summary>
        /// Inserta un nuevo estudiante en la coleccion
        /// </summary>
        /// <param name="student">Es el diccionario con los datos del estudiante a ser insertado</param>
        /// <returns>Retorna verdadero si la insercion fue exitosa</returns>
        public bool InsertStudent(Dictionary<string, object> student)
        {
            BsonDocument document = new BsonDocument(student);

            //cuando no se ingresa ayudas tecnicas se retorna null, la siguiente linea cambia a un array vacio
            if (document.GetValue("technical_helps").IsBsonNull)
            {
                document.Set("technical_helps", new BsonArray());
            }

            try
            {
                cancellationTokenSource = new CancellationTokenSource();
                cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

                studentsCollection.InsertOne(BsonSerializer.Deserialize<Student>(document), null, cancellationTokenSource.Token);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }
        }

        /// <summary>
        /// Modifica un estudiante de la coleccion
        /// </summary>
        /// <param name="student">Diccionario con los datos del estudiante incluyendo su id</param>
        /// <returns>Retorna true si la modificacion ha sido exitosa</returns>
        public bool ModifyStudent(Dictionary<string, object> student)
        {
            BsonDocument document = new BsonDocument(student);
            Console.WriteLine(document.ToJson());
            //cuando no se ingresa ayudas tecnicas se retorna null, la siguiente linea cambia a un array vacio
            if (document.GetValue("technical_helps").IsBsonNull)
            {
                document.Set("technical_helps", new BsonArray());
            }

            //crea el filtro para identificar el estudiante a modificar
            string id = document.GetValue("_id").AsString;
            FilterDefinition<Student> filter = Builders<Student>.Filter.Eq("Id", id);

            Student objectStudent = BsonSerializer.Deserialize<Student>(document); //JSON → Objeto Student


            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

            ReplaceOneResult result = studentsCollection.ReplaceOne(filter, objectStudent, null, cancellationTokenSource.Token);

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
        /// Elimina a un estudiante de la coleccion
        /// </summary>
        /// <param name="id">String con el id del estudiante a ser eliminado</param>
        /// <returns>Retorna true si la eliminacion ha sido exitosa</returns>
        public bool DeleteStudent(string id)
        {
            FilterDefinition<Student> filter = Builders<Student>.Filter.Eq("Id", id);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

            DeleteResult deleteResult = studentsCollection.DeleteOne(filter, cancellationTokenSource.Token);

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
        /// Cambia el level_id de un estudiante
        /// </summary>
        /// <param name="studentId">String con el ID del estudiante</param>
        /// <param name="levelId">String con el ID del nuevo nivel</param>
        /// <returns>Retona true si la modificacion ha sido exitosa</returns>
        public bool UpdateStudentLevel(string studentId, string levelId)
        {
            FilterDefinition<Student> filter = Builders<Student>.Filter.Eq("Id", studentId);

            UpdateDefinition<Student> updateDefinition = Builders<Student>.Update.Set("LevelId", levelId);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

            UpdateResult updateResult = studentsCollection.UpdateOne(filter, updateDefinition, null, cancellationTokenSource.Token);

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
        /// Consulta la lista de estudiantes asignada a un docente
        /// </summary>
        /// <param name="teacherId">String con el ID del docente</param>
        /// <returns>Lista con los estudiantes</returns>
        public List<Student> GetStudentsByTeacherLevel(string teacherId)
        {
            string levelId = new TeacherAccess().GetTeacherById(teacherId).LevelId;

            FilterDefinition<Student> filter = Builders<Student>.Filter.Eq("LevelId", levelId);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

            return studentsCollection.Find(filter).ToList(cancellationTokenSource.Token);
        }

        /// <summary>
        /// Obtiene los estudiantes que cumplen los criterios de busqueda
        /// </summary>
        /// <param name="query">JSON con la especificacion de la busqueda</param>
        /// <returns>Lista con los estudiantes</returns>
        public List<Student> GetStudentsByFilter(BsonDocument query)
        {
            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

            return studentsCollection.Find(query).ToList(cancellationTokenSource.Token);
        }

        /// <summary>
        /// Obtiene el objeto estudiante consultandolo por el ID
        /// </summary>
        /// <param name="studentId">String con el Id del estudiante a consultar</param>
        /// <returns>Retorna el objeto estudiante consultado</returns>
        public Student GetStudentById(string studentId)
        {
            FilterDefinition<Student> filter = Builders<Student>.Filter.Eq("Id", studentId);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

            return studentsCollection.Find(filter).ToList(cancellationTokenSource.Token)[0];
        }
    }
}
