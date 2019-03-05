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
    class CardiacSensorActivityRegisterAccess
    {
        private static readonly int TIMEOUT = 2000; //Tiempo de respuesta maximo
        private readonly IMongoCollection<CardiacSensorActivityRegister> activitiesCollection;

        public CardiacSensorActivityRegisterAccess()
        {
            activitiesCollection = DatabaseConnection.GetInstance().Database.GetCollection<CardiacSensorActivityRegister>("cardiac_activity_registers");
        }

        public string GetBarChartDataIndividual(DateTime startDate, DateTime endDate, string studentId)
        {
            /*Match*/
            BsonDocument match = new BsonDocument();
            BsonArray matchAndConditions = new BsonArray();

            BsonDocument dateFilter = new BsonDocument();
            dateFilter.Add("$gte", startDate);
            dateFilter.Add("$lte", endDate);

            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("student_id", studentId));

            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "$datetime");
            group.Add("initial_value", new BsonDocument("$avg", "$initial_value"));
            group.Add("final_value", new BsonDocument("$avg", "$final_value"));

            /*Sort*/
            BsonDocument sort = new BsonDocument("_id", 1);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).Sort(sort).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructureBarJSON(registers);
        }

        public string GetPieChartDataIndividual(DateTime startDate, DateTime endDate, string studentId)
        {
            /*Match*/
            BsonDocument match = new BsonDocument();
            BsonArray matchAndConditions = new BsonArray();

            BsonDocument dateFilter = new BsonDocument();
            dateFilter.Add("$gte", startDate);
            dateFilter.Add("$lte", endDate);

            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("student_id", studentId));

            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument push = new BsonDocument();
            push.Add("initial_value", "$initial_value");
            push.Add("final_value", "$final_value");

            BsonDocument group = new BsonDocument();
            group.Add("_id", "null");
            group.Add("values", new BsonDocument("$push", push));

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructurePieJSON(registers[0]);
        }

        public string GetLineChartDataIndividual(DateTime startDate, DateTime endDate, string studentId)
        {
            /*Match*/
            BsonDocument match = new BsonDocument();
            BsonArray matchAndConditions = new BsonArray();

            BsonDocument dateFilter = new BsonDocument();
            dateFilter.Add("$gte", startDate);
            dateFilter.Add("$lte", endDate);

            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("student_id", studentId));

            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "$datetime");
            group.Add("initial_value", new BsonDocument("$avg", "$initial_value"));
            group.Add("final_value", new BsonDocument("$avg", "$final_value"));

            /*Sort*/
            BsonDocument sort = new BsonDocument("_id", 1);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).Sort(sort).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructureLineJSON(registers);
        }

        public string GetBarChartDataCollective(DateTime startDate, DateTime endDate, int minAge, int maxAge, object[] genders, object[] levels, object[] periods)
        {
            // crea el filtro de busqueda de los estudiantes
            BsonDocument query = new BsonDocument();

            BsonArray andConditions = new BsonArray();

            //filtro de rango de fechas de nacimiento a partir de las edades
            BsonDocument birthdateFilter = new BsonDocument();
            if (maxAge > 0)
            {
                DateTime maxBirthdate = new DateTime(DateTime.Today.Year - maxAge, DateTime.Today.Month, DateTime.Today.Day);
                birthdateFilter.Add("$gte", maxBirthdate);
            }
            if (minAge > 0)
            {
                DateTime minBirthdate = new DateTime(DateTime.Today.Year - minAge, DateTime.Today.Month, DateTime.Today.Day);
                birthdateFilter.Add("$lte", minBirthdate);
            }

            // filtro de genero
            BsonArray gendersFilter = new BsonArray();
            foreach (string gender in genders)
            {
                gendersFilter.Add(new BsonDocument("gender", gender));
            }

            //agrega los filtros al JSON
            andConditions.Add(new BsonDocument("birthdate", birthdateFilter));
            andConditions.Add(new BsonDocument("$or", gendersFilter));
            query.AddRange(new BsonDocument("$and", andConditions));

            List<Student> filteredStudents = new StudentAccess().GetStudentsByFilter(query); //obtiene los estudiantes

            /*Match*/
            BsonDocument match = new BsonDocument();
            BsonArray matchAndConditions = new BsonArray();

            // rango de fecha de las actividades
            BsonDocument dateFilter = new BsonDocument();
            dateFilter.Add("$gte", startDate);
            dateFilter.Add("$lte", endDate);

            BsonArray studentsFilter = new BsonArray();
            foreach (Student student in filteredStudents)
            {
                studentsFilter.Add(new BsonDocument("student_id", student.Id));
            }

            //filtro de niveles
            BsonArray levelsFilter = new BsonArray();
            foreach (string level in levels)
            {
                levelsFilter.Add(new BsonDocument("level", level));
            }

            //filtro de periodos
            BsonArray periodsFilter = new BsonArray();
            foreach (string period in periods)
            {
                periodsFilter.Add(new BsonDocument("period", period));
            }

            //agrega los filtros al JSON
            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("$or", studentsFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsFilter));
            matchAndConditions.Add(new BsonDocument("$or", periodsFilter));
            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "$datetime");
            group.Add("initial_value", new BsonDocument("$avg", "$initial_value"));
            group.Add("final_value", new BsonDocument("$avg", "$final_value"));

            /*Sort*/
            BsonDocument sort = new BsonDocument("_id", 1);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).Sort(sort).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructureBarJSON(registers);
        }

        public string GetPieChartDataCollective(DateTime startDate, DateTime endDate, int minAge, int maxAge, object[] genders, object[] levels, object[] periods)
        {
            // crea el filtro de busqueda de los estudiantes
            BsonDocument query = new BsonDocument();
            BsonArray andConditions = new BsonArray();

            //filtro de rango de fechas de nacimiento a partir de las edades
            BsonDocument birthdateFilter = new BsonDocument();
            if (maxAge > 0)
            {
                DateTime maxBirthdate = new DateTime(DateTime.Today.Year - maxAge, DateTime.Today.Month, DateTime.Today.Day);
                birthdateFilter.Add("$gte", maxBirthdate);
            }
            if (minAge > 0)
            {
                DateTime minBirthdate = new DateTime(DateTime.Today.Year - minAge, DateTime.Today.Month, DateTime.Today.Day);
                birthdateFilter.Add("$lte", minBirthdate);
            }

            // filtro de genero
            BsonArray gendersFilter = new BsonArray();
            foreach (string gender in genders)
            {
                gendersFilter.Add(new BsonDocument("gender", gender));
            }

            //agrega los filtros al JSON
            andConditions.Add(new BsonDocument("birthdate", birthdateFilter));
            andConditions.Add(new BsonDocument("$or", gendersFilter));
            query.AddRange(new BsonDocument("$and", andConditions));

            List<Student> filteredStudents = new StudentAccess().GetStudentsByFilter(query); //obtiene los estudiantes

            /*Match*/
            BsonDocument match = new BsonDocument();
            BsonArray matchAndConditions = new BsonArray();

            // rango de fecha de las actividades
            BsonDocument dateFilter = new BsonDocument();
            dateFilter.Add("$gte", startDate);
            dateFilter.Add("$lte", endDate);

            BsonArray studentsFilter = new BsonArray();
            foreach (Student student in filteredStudents)
            {
                studentsFilter.Add(new BsonDocument("student_id", student.Id));
            }

            //filtro de niveles
            BsonArray levelsFilter = new BsonArray();
            foreach (string level in levels)
            {
                levelsFilter.Add(new BsonDocument("level", level));
            }

            //filtro de periodos
            BsonArray periodsFilter = new BsonArray();
            foreach (string period in periods)
            {
                periodsFilter.Add(new BsonDocument("period", period));
            }

            //agrega los filtros al JSON
            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("$or", studentsFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsFilter));
            matchAndConditions.Add(new BsonDocument("$or", periodsFilter));
            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument push = new BsonDocument();
            push.Add("initial_value", "$initial_value");
            push.Add("final_value", "$final_value");

            BsonDocument group = new BsonDocument();
            group.Add("_id", "null");
            group.Add("values", new BsonDocument("$push", push));

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructurePieJSON(registers[0]);
        }

        public string GetLineChartDataCollective(DateTime startDate, DateTime endDate, int minAge, int maxAge, object[] genders, object[] levels, object[] periods)
        {
            // crea el filtro de busqueda de los estudiantes
            BsonDocument query = new BsonDocument();

            BsonArray andConditions = new BsonArray();

            //filtro de rango de fechas de nacimiento a partir de las edades
            BsonDocument birthdateFilter = new BsonDocument();
            if (maxAge > 0)
            {
                DateTime maxBirthdate = new DateTime(DateTime.Today.Year - maxAge, DateTime.Today.Month, DateTime.Today.Day);
                birthdateFilter.Add("$gte", maxBirthdate);
            }
            if (minAge > 0)
            {
                DateTime minBirthdate = new DateTime(DateTime.Today.Year - minAge, DateTime.Today.Month, DateTime.Today.Day);
                birthdateFilter.Add("$lte", minBirthdate);
            }

            // filtro de genero
            BsonArray gendersFilter = new BsonArray();
            foreach (string gender in genders)
            {
                gendersFilter.Add(new BsonDocument("gender", gender));
            }

            //agrega los filtros al JSON
            andConditions.Add(new BsonDocument("birthdate", birthdateFilter));
            andConditions.Add(new BsonDocument("$or", gendersFilter));
            query.AddRange(new BsonDocument("$and", andConditions));

            List<Student> filteredStudents = new StudentAccess().GetStudentsByFilter(query); //obtiene los estudiantes

            /*Match*/
            BsonDocument match = new BsonDocument();
            BsonArray matchAndConditions = new BsonArray();

            // rango de fecha de las actividades
            BsonDocument dateFilter = new BsonDocument();
            dateFilter.Add("$gte", startDate);
            dateFilter.Add("$lte", endDate);

            BsonArray studentsFilter = new BsonArray();
            foreach (Student student in filteredStudents)
            {
                studentsFilter.Add(new BsonDocument("student_id", student.Id));
            }

            //filtro de niveles
            BsonArray levelsFilter = new BsonArray();
            foreach (string level in levels)
            {
                levelsFilter.Add(new BsonDocument("level", level));
            }

            //filtro de periodos
            BsonArray periodsFilter = new BsonArray();
            foreach (string period in periods)
            {
                periodsFilter.Add(new BsonDocument("period", period));
            }

            //agrega los filtros al JSON
            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("$or", studentsFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsFilter));
            matchAndConditions.Add(new BsonDocument("$or", periodsFilter));
            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "$datetime");
            group.Add("initial_value", new BsonDocument("$avg", "$initial_value"));
            group.Add("final_value", new BsonDocument("$avg", "$final_value"));

            /*Sort*/
            BsonDocument sort = new BsonDocument("_id", 1);

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).Sort(sort).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructureLineJSON(registers);
        }

        public string GetStudentMaxMinActivityDates(string studentId)
        {
            List<CardiacSensorActivityRegister> minDateResponse;

            JObject response = new JObject();

            FilterDefinition<CardiacSensorActivityRegister> filter = Builders<CardiacSensorActivityRegister>.Filter.Eq("student_id", studentId);

            minDateResponse = activitiesCollection.Find(filter).Sort(new BsonDocument("datetime", 1)).Limit(1).ToList();

            if (minDateResponse.Count == 0) //valida que por lo menos haya 1 registro
            {
                CardiacSensorActivityRegister minDateRegister = minDateResponse[0];
                CardiacSensorActivityRegister maxDateRegister = activitiesCollection.Find(filter).Sort(new BsonDocument("datetime", -1)).Limit(1).ToList()[0];
                response.Add("minDate", minDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
                response.Add("maxDate", maxDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
            }

            return response.ToString();
        }

        public string GetGlobalMaxMinActivityDates()
        {
            List<CardiacSensorActivityRegister> minDateResponse;

            JObject response = new JObject();

            minDateResponse = activitiesCollection.Find(new BsonDocument()).Sort(new BsonDocument("datetime", 1)).Limit(1).ToList();

            if (minDateResponse.Count > 0) //valida que por lo menos haya 1 registro
            {
                CardiacSensorActivityRegister minDateRegister = minDateResponse[0];
                CardiacSensorActivityRegister maxDateRegister = activitiesCollection.Find(new BsonDocument()).Sort(new BsonDocument("datetime", -1)).Limit(1).ToList()[0];
                response.Add("minDate", minDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
                response.Add("maxDate", maxDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
            }

            return response.ToString();
        }

        public bool InsertActivity(CardiacSensorActivityRegister activity)
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

        private string StructureBarJSON(List<BsonDocument> activitiesList)
        {
            JArray dataArray;
            JArray array = new JArray();

            JArray headersArray = new JArray();
            headersArray.Add(new JValue("Fechas"));
            headersArray.Add(new JValue("Inicial"));
            headersArray.Add(new JValue("Final"));
            array.Add(headersArray);

            foreach (BsonDocument activity in activitiesList)
            {
                dataArray = new JArray();
                dataArray.Add(new JValue(activity.GetElement("_id").Value.ToLocalTime().ToString("dd/MM/yyyy")));
                dataArray.Add(new JValue(activity.GetElement("initial_value").Value.ToInt32()));
                dataArray.Add(new JValue(activity.GetElement("final_value").Value.ToInt32()));
                array.Add(dataArray);
            }
            return array.ToString();
        }

        private string StructurePieJSON(BsonDocument activitiesList)
        {
            int relaxationTimes = 0;
            int nonRelaxationTimes = 0;
            JArray array = new JArray();

            JArray headersArray = new JArray();
            headersArray.Add(new JValue("Hubo Relajación"));
            headersArray.Add(new JValue("No Hubo Relajación"));
            array.Add(headersArray);

            BsonArray valuesArray = activitiesList.GetElement("values").Value.AsBsonArray;

            foreach (BsonDocument value in valuesArray)
            {
                if (value.GetElement("initial_value").Value.ToInt32() > value.GetElement("final_value").Value.ToInt32())
                {
                    relaxationTimes++;
                }
                else
                {
                    nonRelaxationTimes++;
                }
            }

            JArray relaxationArray = new JArray();
            relaxationArray.Add(new JValue("Hubo Relajación"));
            relaxationArray.Add(new JValue(relaxationTimes));

            JArray nonRelaxationArray = new JArray();
            nonRelaxationArray.Add(new JValue("No Hubo Relajación"));
            nonRelaxationArray.Add(new JValue(nonRelaxationTimes));

            array.Add(relaxationArray);
            array.Add(nonRelaxationArray);

            return array.ToString();
        }

        private string StructureLineJSON(List<BsonDocument> activitiesList)
        {
            JArray dataArray;
            JArray array = new JArray();
            int initialValue;
            int finalValue;

            JArray headersArray = new JArray();
            headersArray.Add(new JValue("Fechas"));
            headersArray.Add(new JValue("Porcentaje de Relajación"));
            array.Add(headersArray);

            foreach (BsonDocument activity in activitiesList)
            {
                dataArray = new JArray();
                dataArray.Add(new JValue(activity.GetElement("_id").Value.ToLocalTime().ToString("dd/MM/yyyy")));
                initialValue = activity.GetElement("initial_value").Value.ToInt32();
                finalValue = activity.GetElement("final_value").Value.ToInt32();
                if (initialValue > finalValue)
                {
                    int percentaje = (finalValue * 100) / initialValue;
                    dataArray.Add(new JValue(percentaje));
                }
                else
                {
                    dataArray.Add(new JValue(0));
                }
                array.Add(dataArray);
            }
            return array.ToString();
        }
    }
}
