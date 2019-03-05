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
            group.Add("values", new BsonDocument("$push", "$value"));

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
            /* Match */
            BsonDocument match = new BsonDocument();
            BsonArray matchAndConditions = new BsonArray();

            // rango de fecha de las actividades
            BsonDocument dateFilter = new BsonDocument();
            dateFilter.Add("$gte", startDate);
            dateFilter.Add("$lte", endDate);

            //agrega los filtros al JSON
            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("student_id", studentId));
            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "null");
            group.Add("values", new BsonDocument("$push", "$value"));

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
            group.Add("values", new BsonDocument("$push", "$value"));

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
            group.Add("values", new BsonDocument("$push", "$value"));

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
            BsonDocument group = new BsonDocument();
            group.Add("_id", "null");
            group.Add("values", new BsonDocument("$push", "$value"));

            CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).ToList(cancellationTokenSource.Token);

            if (registers.Count > 0) //valida de que haya por lo menos 1 registro
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
            group.Add("values", new BsonDocument("$push", "$value"));

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
            List<MatrixActivityRegister> minDateResponse;

            JObject response = new JObject();

            FilterDefinition<MatrixActivityRegister> filter = Builders<MatrixActivityRegister>.Filter.Eq("student_id", studentId);

            minDateResponse = activitiesCollection.Find(filter).Sort(new BsonDocument("datetime", 1)).Limit(1).ToList();

            if (minDateResponse.Count == 0) //valida que por lo menos haya 1 registro
            {
                MatrixActivityRegister minDateRegister = minDateResponse[0];
                MatrixActivityRegister maxDateRegister = activitiesCollection.Find(filter).Sort(new BsonDocument("datetime", -1)).Limit(1).ToList()[0];
                response.Add("minDate", minDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
                response.Add("maxDate", maxDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
            }

            return response.ToString();
        }

        public string GetGlobalMaxMinActivityDates()
        {
            List<MatrixActivityRegister> minDateResponse;

            JObject response = new JObject();

            minDateResponse = activitiesCollection.Find(new BsonDocument()).Sort(new BsonDocument("datetime", 1)).Limit(1).ToList();

            if (minDateResponse.Count > 0) //valida que por lo menos haya 1 registro
            {
                MatrixActivityRegister minDateRegister = minDateResponse[0];
                MatrixActivityRegister maxDateRegister = activitiesCollection.Find(new BsonDocument()).Sort(new BsonDocument("datetime", -1)).Limit(1).ToList()[0];
                response.Add("minDate", minDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
                response.Add("maxDate", maxDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
            }

            return response.ToString();
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

        private string StructureBarJSON(List<BsonDocument> activitiesList)
        {

            JArray dataArray;

            int successCount;
            int errorsCount;
            JArray array = new JArray();

            JArray headersArray = new JArray();
            headersArray.Add(new JValue("Fechas"));
            headersArray.Add(new JValue("Aciertos"));
            headersArray.Add(new JValue("Errores"));
            array.Add(headersArray);

            foreach (BsonDocument activity in activitiesList)
            {
                dataArray = new JArray();
                successCount = 0;
                errorsCount = 0;
                BsonArray values = activity.GetElement("values").Value.AsBsonArray;
                foreach (string value in values)
                {
                    if (value.Equals("Bien"))
                    {
                        successCount++;
                    }
                    else
                    {
                        errorsCount++;
                    }
                }
                dataArray.Add(new JValue(activity.GetElement("_id").Value.ToLocalTime().ToString("dd/MM/yyyy")));
                dataArray.Add(new JValue(successCount));
                dataArray.Add(new JValue(errorsCount));
                array.Add(dataArray);
            }
            return array.ToString();
        }

        private string StructurePieJSON(BsonDocument activitiesList)
        {
            int assertCount = 0;
            int errorsCount = 0;
            JArray array = new JArray();

            JArray headersArray = new JArray();
            headersArray.Add(new JValue("Aciertos"));
            headersArray.Add(new JValue("Errores"));
            array.Add(headersArray);

            BsonArray valuesArray = activitiesList.GetElement("values").Value.AsBsonArray;

            foreach (string value in valuesArray)
            {
                if (value.Equals("Bien"))
                {
                    assertCount++;
                }
                else
                {
                    errorsCount++;
                }
            }

            JArray assertArray = new JArray();
            assertArray.Add(new JValue("Aciertos"));
            assertArray.Add(new JValue(assertCount));

            JArray errorsArray = new JArray();
            errorsArray.Add(new JValue("Errores"));
            errorsArray.Add(new JValue(errorsCount));

            array.Add(assertArray);
            array.Add(errorsArray);

            return array.ToString();
        }

        private string StructureLineJSON(List<BsonDocument> activitiesList)
        {
            JArray dataArray;

            int successCount;
            int errorsCount;
            JArray array = new JArray();

            JArray headersArray = new JArray();
            headersArray.Add(new JValue("Fechas"));
            headersArray.Add(new JValue("Porcentaje de Aciertos"));
            array.Add(headersArray);

            foreach (BsonDocument activity in activitiesList)
            {
                dataArray = new JArray();
                successCount = 0;
                errorsCount = 0;
                BsonArray values = activity.GetElement("values").Value.AsBsonArray;
                foreach (string value in values)
                {
                    if (value.Equals("Bien"))
                    {
                        successCount++;
                    }
                    else
                    {
                        errorsCount++;
                    }
                }
                float percentaje = (successCount * 100) / (successCount + errorsCount);
                dataArray.Add(new JValue(activity.GetElement("_id").Value.ToLocalTime().ToString("dd/MM/yyyy")));
                dataArray.Add(new JValue(percentaje));
                array.Add(dataArray);
            }
            return array.ToString();
        }
    }
}
