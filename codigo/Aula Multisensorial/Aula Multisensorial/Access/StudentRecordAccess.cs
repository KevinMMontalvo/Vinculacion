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
    class StudentRecordAccess
    {
        private readonly IMongoCollection<StudentRecord> studentsRecordsCollection;
        private CancellationTokenSource cancellationTokenSource;

        public StudentRecordAccess()
        {
            studentsRecordsCollection = DatabaseConnection.GetInstance().Database.GetCollection<StudentRecord>("student_records");
        }

        /// <summary>
        /// Obtiene la ficha de un estudiante
        /// </summary>
        /// <param name="studentId">String con el ID del estudiante</param>
        /// <returns>Retorna un JSON con la informacion de la ficha, si el estudiante no tiene ficha retorna null</returns>
        public string GetStudentRecord(string studentId)
        {
            try
            {
                FilterDefinition<StudentRecord> filter = Builders<StudentRecord>.Filter.Eq("StudentId", studentId);

                cancellationTokenSource = new CancellationTokenSource();
                cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

                List<StudentRecord> recordsList = studentsRecordsCollection.Find(filter).ToList(cancellationTokenSource.Token);

                if (recordsList.Count == 0)
                {
                    return null;
                }
                return Newtonsoft.Json.JsonConvert.SerializeObject(recordsList);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return null;
            }
        }

        /// <summary>
        /// Inserta una nueva ficha en la coleccion
        /// </summary>
        /// <param name="record">Es el diccionario con los datos de la ficha a ser insertada</param>
        /// <returns>Retorna verdadero si la insercion fue exitosa</returns>
        public bool InsertStudentRecord(Dictionary<string, object> record)
        {
            BsonDocument document = new BsonDocument(record);

            try
            {
                cancellationTokenSource = new CancellationTokenSource();
                cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

                studentsRecordsCollection.InsertOne(BsonSerializer.Deserialize<StudentRecord>(document), null, cancellationTokenSource.Token);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }
        }

        /// <summary>
        /// Modifica una ficha de la coleccion
        /// </summary>
        /// <param name="record">Diccionario con los datos de la ficha incluyendo su ID</param>
        /// <returns>Retorna true si la modificacion ha sido exitosa</returns>
        public bool ModifyStudent(Dictionary<string, object> record)
        {
            BsonDocument document = new BsonDocument(record);
            
            //crea el filtro para identificar el estudiante a modificar
            string id = document.GetValue("_id").AsString;
            FilterDefinition<StudentRecord> filter = Builders<StudentRecord>.Filter.Eq("Id", id);

            StudentRecord objectStudent = BsonSerializer.Deserialize<StudentRecord>(document); //JSON → Objeto Student


            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT);

            ReplaceOneResult result = studentsRecordsCollection.ReplaceOne(filter, objectStudent, null, cancellationTokenSource.Token);

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
    }
}
