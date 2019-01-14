using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Aula_Multisensorial.Access
{
    class AdministratorAccess
    {
        private static readonly int TIMEOUT = 2000; //Tiempo de respuesta maximo
        private readonly IMongoCollection<Administrator> administratorsCollection;

        public AdministratorAccess()
        {
            administratorsCollection = DatabaseConnection.GetInstance().Database.GetCollection<Administrator>("administrators");
        }

        /// <summary>
        /// Obtiene todos los administradores de la coleccion
        /// </summary>
        /// <returns>string de JSON con todos los administradores, en caso de fallo retorna null</returns>
        public string GetAdministrators()
        {
            try
            {
                List<Administrator> administratorsList = administratorsCollection.Find(_ => true).ToList();
                return Newtonsoft.Json.JsonConvert.SerializeObject(administratorsList);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return null;
            }
        }

        /// <summary>
        /// Inserta un administrador a la coleccion
        /// </summary>
        /// <param name="administrator">Diccionario con los datos del administrador a ser insertado</param>
        /// <returns>Reterona verdadero si la insercion fue exitosa</returns>
        public bool InsertAdministrator(Dictionary<string, object> administrator)
        {
            BsonDocument document = new BsonDocument(administrator);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta
            try
            {
                administratorsCollection.InsertOne(BsonSerializer.Deserialize<Administrator>(document), null, cancellationTokenSource.Token);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine(e.StackTrace);
                return false;
            }
        }

        /// <summary>
        /// Modifica un administrador de la coleccion
        /// </summary>
        /// <param name="administrator">Diccionario con los datos del administrador incluyendo su id</param>
        /// <returns>Retorna true si la modificacion ha sido exitosa</returns>
        public bool ModifyAdministrator(Dictionary<string, object> administrator)
        {
            BsonDocument document = new BsonDocument(administrator);

            //crea el filtro para identificar el administrador a modificar
            string id = document.GetValue("_id").AsString;
            FilterDefinition<Administrator> filter = Builders<Administrator>.Filter.Eq("Id", id);

            Administrator objectAdministrator = BsonSerializer.Deserialize<Administrator>(document); //JSON → Objeto Administrador

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            ReplaceOneResult result = administratorsCollection.ReplaceOne(filter, objectAdministrator, null, cancellationTokenSource.Token);

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
        /// Elimina un administrador de la coleccion
        /// </summary>
        /// <param name="id">String con el id del administrador a ser eliminado</param>
        /// <returns>Retorna true si la eliminacion ha sido exitosa</returns>
        public bool DeleteAdministrator(string id)
        {
            FilterDefinition<Administrator> filter = Builders<Administrator>.Filter.Eq("Id", id);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            DeleteResult deleteResult = administratorsCollection.DeleteOne(filter, cancellationTokenSource.Token);

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
        /// Valida los datos de ingreso de un administrador
        /// </summary>
        /// <param name="name">String con el nombre del administrador</param>
        /// <param name="password">String con la contraseña del administrador</param>
        /// <returns>Retorna true si los datos de ingreso son correctos</returns>
        public bool ValidateAdministratorLogin(string name, string password)
        {
            FilterDefinition<Administrator> filter = Builders<Administrator>.Filter.Eq("Name", name);

            //consulta de los administradores con ese nombre
            List<Administrator> administratorList = administratorsCollection.Find(filter).ToList();

            // solo debe haber un administrador con ese nombre
            if (administratorList.Count != 1)
            {
                return false;
            }

            //valida que la contraseña sea correcta
            if (administratorList[0].Password.Equals(password))
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
