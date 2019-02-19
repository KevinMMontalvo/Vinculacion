using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using MongoDB.Bson;
using MongoDB.Driver;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Threading;

namespace Aula_Multisensorial.Access
{
    class MatrixActivityRegisterAccess
    {
        private static readonly int TIMEOUT = 2000; //Tiempo de respuesta maximo
        private readonly IMongoCollection<MatrixActivityRegister> activitiesCollection;

        public MatrixActivityRegisterAccess()
        {
            activitiesCollection = DatabaseConnection.GetInstance().Database.GetCollection<MatrixActivityRegister>("led_matrix_activity_registers");
        }

        public bool InsertActivity(MatrixActivityRegister activity)
        {

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            try
            {
                activitiesCollection.InsertOne(activity, null, cancellationTokenSource.Token);
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
