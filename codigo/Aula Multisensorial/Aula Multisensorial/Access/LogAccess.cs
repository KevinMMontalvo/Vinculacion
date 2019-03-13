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
        private CancellationTokenSource cancellationTokenSource;
        private readonly IMongoCollection<Log> logsCollection;


        public LogAccess()
        {
            logsCollection = DatabaseConnection.GetInstance().Database.GetCollection<Log>("logs");
        }

        /// <summary>
        /// Obtiene todos los logs de la coleccion
        /// </summary>
        /// <returns>string de JSON con todos los logs, en caso de fallo retorna null</returns>
        public string GetLogs()
        {
            try
            {
                cancellationTokenSource = new CancellationTokenSource();
                cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta
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
        public bool InsertLog(Dictionary<string, object> log)
        {
            BsonDocument document = new BsonDocument(log);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta
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
