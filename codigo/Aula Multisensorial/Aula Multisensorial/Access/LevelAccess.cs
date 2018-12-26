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
    class LevelAccess
    {
        private static readonly int TIMEOUT = 2000; //Tiempo de respuesta maximo
        private readonly IMongoCollection<Level> levelsCollection;

        public LevelAccess()
        {
            levelsCollection = DatabaseConnection.GetInstance().Database.GetCollection<Level>("levels");
        }

        /// <summary>
        /// Consulta todos los niveles de la coleccion
        /// </summary>
        /// <returns>String con el JSON de todos los niveles, en caso de fallo retorna null</returns>
        public string GetLevels()
        {
            try
            {
                List<Level> levelsList = levelsCollection.Find(_ => true).ToList();
                return Newtonsoft.Json.JsonConvert.SerializeObject(levelsList);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return null;
            }

        }

        /// <summary>
        /// Inserta un nuevo nivel en la coleccion
        /// </summary>
        /// <param name="level">Es le diccionario con los datos del nivel a ser insertado</param>
        /// <returns>Retorna verdadero si la insercion fue exitosa</returns>
        public bool InsertLevel(Dictionary<string, object> level)
        {
            BsonDocument document = new BsonDocument(level);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            try
            {
                levelsCollection.InsertOne(BsonSerializer.Deserialize<Level>(document),null,cancellationTokenSource.Token);
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
        /// <param name="level">Diccionario con los datos del nivel incluyendo su id</param>
        /// <returns>Retorna true si la modificacion ha sido exitosa</returns>
        public bool ModifyLevel(Dictionary<string, object> level)
        {
            BsonDocument document = new BsonDocument(level);

            //crea el filtro para identificar el nivel a modificar
            string id = document.GetValue("_id").AsString;
            FilterDefinition<Level> filter = Builders<Level>.Filter.Eq("Id", id);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            Level objectLevel = BsonSerializer.Deserialize<Level>(document);
            ReplaceOneResult result = levelsCollection.ReplaceOne(filter, objectLevel,null, cancellationTokenSource.Token);

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
        /// Elimina a un nivel de la coleccion
        /// </summary>
        /// <param name="id">String con el id del nivel a ser eliminado</param>
        /// <returns>Retorna true si la eliminacion ha sido exitosa</returns>
        public bool DeleteLevel(string id)
        {
            FilterDefinition<Level> filter = Builders<Level>.Filter.Eq("Id", id);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            DeleteResult deleteResult = levelsCollection.DeleteOne(filter);

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

    }
}
