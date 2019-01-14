using Aula_Multisensorial.Model;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using Aula_Multisensorial.Utils;
using MongoDB.Bson;
using System.Threading;
using MongoDB.Bson.Serialization;

namespace Aula_Multisensorial.Access
{
    class LogAccess
    {
        private static readonly int TIMEOUT = 2000; //Tiempo de respuesta maximo
        private readonly IMongoCollection<Log> logsCollection;


        public LogAccess()
        {
            logsCollection = DatabaseConnection.GetInstance().Database.GetCollection<Log>("logs");
        }

        /// <summary>
        /// Obtiene todos los logs de la coleccion
        /// </summary>
        /// <returns>string de JSON con todos los logs, en caso de fallo retorna null</returns>
        public string GetAdministrators()
        {
            try
            {
                List<Log> administratorsList = logsCollection.Find(_ => true).ToList();
                return Newtonsoft.Json.JsonConvert.SerializeObject(administratorsList);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return null;
            }
        }

        /// <summary>
        /// Inserta un log a la coleccion
        /// </summary>
        /// <param name="log">Diccionario con los datos del logs a ser insertado</param>
        /// <returns>Reterona verdadero si la insercion fue exitosa</returns>
        public bool InsertAdministrator(Dictionary<string, object> log)
        {
            BsonDocument document = new BsonDocument(log);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta
            try
            {
                logsCollection.InsertOne(BsonSerializer.Deserialize<Log>(document), null, cancellationTokenSource.Token);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }
        }
    }
}
