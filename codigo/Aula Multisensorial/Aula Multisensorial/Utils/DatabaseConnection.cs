using MongoDB.Driver;

namespace Aula_Multisensorial.Utils
{
    class DatabaseConnection
    {
        public static readonly int TIMEOUT = 5000;
        private static DatabaseConnection instance = null;
        private static readonly string URL = "ds041167.mlab.com:41167/aula-multisensorial";
        private static readonly string USER = "kevin";
        private static readonly string PASSWORD = "admin123";

        public IMongoDatabase Database { get; set; }

        private DatabaseConnection()
        {
            MongoClient client = new MongoClient("mongodb://"+USER+":"+PASSWORD+"@"+URL);
            Database = client.GetDatabase("aula-multisensorial");
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
