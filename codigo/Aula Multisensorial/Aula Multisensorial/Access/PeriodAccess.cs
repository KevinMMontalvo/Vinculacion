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
    class PeriodAccess
    {
        private CancellationTokenSource cancellationTokenSource;
        private readonly IMongoCollection<Period> periodsCollection;

        public PeriodAccess()
        {
            periodsCollection = DatabaseConnection.GetInstance().Database.GetCollection<Period>("periods");
        }

        /// <summary>
        /// Consulta todos los periodos de la coleccion
        /// </summary>
        /// <returns>String con el JSON de todos los niveles, en caso de fallo retorna null</returns>
        public string GetPeriods()
        {
            try
            {
                cancellationTokenSource = new CancellationTokenSource();
                cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

                List<Period> periodsList = periodsCollection.Find(_ => true).ToList(cancellationTokenSource.Token);
                return Newtonsoft.Json.JsonConvert.SerializeObject(periodsList);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return null;
            }
        }

        /// <summary>
        /// Inserta un nuevo periodo en la coleccion
        /// </summary>
        /// <param name="period">Es le diccionario con los datos del nivel a ser insertado</param>
        /// <returns>Retorna verdadero si la insercion fue exitosa</returns>
        public bool InsertPeriod(Dictionary<string, object> period)
        {
            BsonDocument document = new BsonDocument(period);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            try
            {
                periodsCollection.InsertOne(BsonSerializer.Deserialize<Period>(document), null, cancellationTokenSource.Token);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }
        }

        /// <summary>
        /// Modifica un periodo de la coleccion
        /// </summary>
        /// <param name="period">Diccionario con los datos del nivel incluyendo su id</param>
        /// <returns>Retorna true si la modificacion ha sido exitosa</returns>
        public bool ModifyPeriod(Dictionary<string, object> period)
        {
            BsonDocument document = new BsonDocument(period);

            //crea el filtro para identificar el nivel a modificar
            string id = document.GetValue("_id").AsString;
            FilterDefinition<Period> filter = Builders<Period>.Filter.Eq("Id", id);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            Period objectPerdiod = BsonSerializer.Deserialize<Period>(document);
            ReplaceOneResult result = periodsCollection.ReplaceOne(filter, objectPerdiod, null, cancellationTokenSource.Token);

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
        /// Elimina a un periodo de la coleccion
        /// </summary>
        /// <param name="id">String con el id del periodo a ser eliminado</param>
        /// <returns>Retorna true si la eliminacion ha sido exitosa</returns>
        public bool DeletePeriod(string id)
        {
            FilterDefinition<Period> filter = Builders<Period>.Filter.Eq("Id", id);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            DeleteResult deleteResult = periodsCollection.DeleteOne(filter);

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
        /// Hace que solo 1 periodo este visible (activo)
        /// </summary>
        /// <param name="id">String con el id del periodo que debe ser modificado a visible</param>
        /// <returns>Retorna true si la operacion ha sido exitosa</returns>
        public bool ChangeVisiblePeriod(string id)
        {
            FilterDefinition<Period> filterNewVisible = Builders<Period>.Filter.Eq("Id", id);
            FilterDefinition<Period> filterVisiblePeriod = Builders<Period>.Filter.Eq("IsVisible", true);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); //configuracion del tiempo maximo de respuesta

            UpdateDefinition<Period> updateDefinitionMakeInvisible = Builders<Period>.Update.Set("IsVisible", false);
            UpdateDefinition<Period> updateDefinitionMakeVisible = Builders<Period>.Update.Set("IsVisible", true);

            // modifica para que los demans esten invisibles
            UpdateResult updateResult = periodsCollection.UpdateMany(filterVisiblePeriod, updateDefinitionMakeInvisible, null, cancellationTokenSource.Token);

            if (! updateResult.IsAcknowledged)
            {
                return false;
            }
            
            // hace que 1 periodo sea visible
            updateResult = periodsCollection.UpdateOne(filterNewVisible, updateDefinitionMakeVisible, null, cancellationTokenSource.Token);
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
        /// Retorna el periodo activo
        /// </summary>
        /// <returns>Objeto Periodo que tiene atributo is Visible como verdadero</returns>
        public Period GetActivePeriod()
        {
            FilterDefinition<Period> filter = Builders<Period>.Filter.Eq("IsVisible", true);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); //configuracion del tiempo maximo de respuesta

            return periodsCollection.Find(filter).ToList(cancellationTokenSource.Token)[0];
        }
    }
}
