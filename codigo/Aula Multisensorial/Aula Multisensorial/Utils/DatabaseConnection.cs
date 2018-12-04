using MongoDB.Driver;

namespace Aula_Multisensorial.Utils
{
    class DatabaseConnection
    {
        private static DatabaseConnection instance = null;
        private static readonly string URL = "ds041167.mlab.com:41167/aula-multisensorial";
        private static readonly string USER = "kevin";
        private static readonly string PASSWORD = "admin123";
        private IMongoDatabase database;

        public IMongoDatabase Database { get => database; set => database = value; }

        private DatabaseConnection()
        {
            MongoClient client = new MongoClient("mongodb://"+USER+":"+PASSWORD+"@"+URL);
            database = client.GetDatabase("aula-multisensorial");
        }

        public static DatabaseConnection GetInstance()
        {
            if (instance == null)
            {
                instance = new DatabaseConnection();
            }
            return instance;
        }
    }
}
