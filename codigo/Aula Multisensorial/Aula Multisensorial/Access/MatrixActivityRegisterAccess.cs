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
        private readonly IMongoCollection<MatrixActivityRegister> activitiesCollection;
        private CancellationTokenSource cancellationTokenSource;

        public MatrixActivityRegisterAccess()
        {
            activitiesCollection = DatabaseConnection.GetInstance().Database.GetCollection<MatrixActivityRegister>("led_matrix_activity_registers");
        }

        /// <summary>
        /// Obtiene los datos para la grafica de aciertos vs errores de un estudiante
        /// en forna de barras
        /// </summary>
        /// <param name="startDate">Fecha de inicio de los registros</param>
        /// <param name="endDate">Fecha de fin de los registros</param>
        /// <param name="studentId">String con el ID del estudiante</param>
        /// <param name="colorConfigurations">Arreglo con los niveles de configuracion de colores del dispositivo</param>
        /// <param name="sequenceConfigurations">Arreglo con los niveles de configuracion de secuencia del dispositivo</param>
        /// <param name="levelsConfigurations">Arreglo con los niveles de configuracion de nivel del dispositivo</param>
        /// <param name="appearancesConfigurations">Arreglo con los niveles de configuracion de apariciones del dispositivo</param>
        /// <returns>String del JSON con la informacion para el grafico</returns>
        public string GetBarChartDataIndividual(DateTime startDate, DateTime endDate, string studentId, object[] colorConfigurations, object[] sequenceConfigurations, object[] levelsConfigurations, object[] appearancesConfigurations)
        {
            /*Match*/
            BsonDocument match = new BsonDocument();
            BsonArray matchAndConditions = new BsonArray();

            BsonDocument dateFilter = new BsonDocument();
            dateFilter.Add("$gte", startDate);
            dateFilter.Add("$lte", endDate);

            //filtro de configuracion de colores
            BsonArray colorsFilter = new BsonArray();
            foreach (int color in colorConfigurations)
            {
                colorsFilter.Add(new BsonDocument("color_configuration", color));
            }

            //filtro de configuracion de secuencias
            BsonArray sequencesFilter = new BsonArray();
            foreach (int sequence in sequenceConfigurations)
            {
                sequencesFilter.Add(new BsonDocument("sequence_configuration", sequence));
            }

            //filtro de configuracion de niveles
            BsonArray levelsConfigurationFilter = new BsonArray();
            foreach (int level in levelsConfigurations)
            {
                levelsConfigurationFilter.Add(new BsonDocument("level_configuration", level));
            }

            //filtro de configuracion de apariciones
            BsonArray appearancesFilter = new BsonArray();
            foreach (int appearances in appearancesConfigurations)
            {
                appearancesFilter.Add(new BsonDocument("appearances_configuration", appearances));
            }

            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("student_id", studentId));
            matchAndConditions.Add(new BsonDocument("$or", colorsFilter));
            matchAndConditions.Add(new BsonDocument("$or", sequencesFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsConfigurationFilter));
            matchAndConditions.Add(new BsonDocument("$or", appearancesFilter));

            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "$datetime");
            group.Add("values", new BsonDocument("$push", "$value"));

            /*Sort*/
            BsonDocument sort = new BsonDocument("_id", 1);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).Sort(sort).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructureBarJSON(registers);
        }

        /// <summary>
        /// Obtiene los datos para la grafica de aciertos vs errores global de un estudiante
        /// en forna de pastel
        /// </summary>
        /// <param name="startDate">Fecha de inicio de los registros</param>
        /// <param name="endDate">Fecha de fin de los registros</param>
        /// <param name="studentId">String con el ID del estudiante</param>
        /// <param name="colorConfigurations">Arreglo con los niveles de configuracion de colores del dispositivo</param>
        /// <param name="sequenceConfigurations">Arreglo con los niveles de configuracion de secuencia del dispositivo</param>
        /// <param name="levelsConfigurations">Arreglo con los niveles de configuracion de nivel del dispositivo</param>
        /// <param name="appearancesConfigurations">Arreglo con los niveles de configuracion de apariciones del dispositivo</param>
        /// <returns>String del JSON con la informacion para el grafico</returns>
        public string GetPieChartDataIndividual(DateTime startDate, DateTime endDate, string studentId, object[] colorConfigurations, object[] sequenceConfigurations, object[] levelsConfigurations, object[] appearancesConfigurations)
        {
            /* Match */
            BsonDocument match = new BsonDocument();
            BsonArray matchAndConditions = new BsonArray();

            // rango de fecha de las actividades
            BsonDocument dateFilter = new BsonDocument();
            dateFilter.Add("$gte", startDate);
            dateFilter.Add("$lte", endDate);

            //filtro de configuracion de colores
            BsonArray colorsFilter = new BsonArray();
            foreach (int color in colorConfigurations)
            {
                colorsFilter.Add(new BsonDocument("color_configuration", color));
            }

            //filtro de configuracion de secuencias
            BsonArray sequencesFilter = new BsonArray();
            foreach (int sequence in sequenceConfigurations)
            {
                sequencesFilter.Add(new BsonDocument("sequence_configuration", sequence));
            }

            //filtro de configuracion de niveles
            BsonArray levelsConfigurationFilter = new BsonArray();
            foreach (int level in levelsConfigurations)
            {
                levelsConfigurationFilter.Add(new BsonDocument("level_configuration", level));
            }

            //filtro de configuracion de apariciones
            BsonArray appearancesFilter = new BsonArray();
            foreach (int appearances in appearancesConfigurations)
            {
                appearancesFilter.Add(new BsonDocument("appearances_configuration", appearances));
            }

            //agrega los filtros al JSON
            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("student_id", studentId));
            matchAndConditions.Add(new BsonDocument("$or", colorsFilter));
            matchAndConditions.Add(new BsonDocument("$or", sequencesFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsConfigurationFilter));
            matchAndConditions.Add(new BsonDocument("$or", appearancesFilter));
            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "null");
            group.Add("values", new BsonDocument("$push", "$value"));

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructurePieJSON(registers[0]);
        }

        /// <summary>
        /// Obtiene los datos para la grafica de aciertos vs errores porcentual de un estudiante
        /// en forna de linea
        /// </summary>
        /// <param name="startDate">Fecha de inicio de los registros</param>
        /// <param name="endDate">Fecha de fin de los registros</param>
        /// <param name="studentId">String con el ID del estudiante</param>
        /// <param name="colorConfigurations">Arreglo con los niveles de configuracion de colores del dispositivo</param>
        /// <param name="sequenceConfigurations">Arreglo con los niveles de configuracion de secuencia del dispositivo</param>
        /// <param name="levelsConfigurations">Arreglo con los niveles de configuracion de nivel del dispositivo</param>
        /// <param name="appearancesConfigurations">Arreglo con los niveles de configuracion de apariciones del dispositivo</param>
        /// <returns>String del JSON con la informacion para el grafico</returns>
        public string GetLineChartDataIndividual(DateTime startDate, DateTime endDate, string studentId, object[] colorConfigurations, object[] sequenceConfigurations, object[] levelsConfigurations, object[] appearancesConfigurations)
        {
            /*Match*/
            BsonDocument match = new BsonDocument();
            BsonArray matchAndConditions = new BsonArray();

            BsonDocument dateFilter = new BsonDocument();
            dateFilter.Add("$gte", startDate);
            dateFilter.Add("$lte", endDate);

            //filtro de configuracion de colores
            BsonArray colorsFilter = new BsonArray();
            foreach (int color in colorConfigurations)
            {
                colorsFilter.Add(new BsonDocument("color_configuration", color));
            }

            //filtro de configuracion de secuencias
            BsonArray sequencesFilter = new BsonArray();
            foreach (int sequence in sequenceConfigurations)
            {
                sequencesFilter.Add(new BsonDocument("sequence_configuration", sequence));
            }

            //filtro de configuracion de niveles
            BsonArray levelsConfigurationFilter = new BsonArray();
            foreach (int level in levelsConfigurations)
            {
                levelsConfigurationFilter.Add(new BsonDocument("level_configuration", level));
            }

            //filtro de configuracion de apariciones
            BsonArray appearancesFilter = new BsonArray();
            foreach (int appearances in appearancesConfigurations)
            {
                appearancesFilter.Add(new BsonDocument("appearances_configuration", appearances));
            }

            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("student_id", studentId));
            matchAndConditions.Add(new BsonDocument("$or", colorsFilter));
            matchAndConditions.Add(new BsonDocument("$or", sequencesFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsConfigurationFilter));
            matchAndConditions.Add(new BsonDocument("$or", appearancesFilter));

            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "$datetime");
            group.Add("values", new BsonDocument("$push", "$value"));

            /*Sort*/
            BsonDocument sort = new BsonDocument("_id", 1);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).Sort(sort).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructureLineJSON(registers);
        }

        /// <summary>
        /// Obtiene los datos para la grafica de aciertos vs errores de varios estudiantes
        /// en forma de barra
        /// </summary>
        /// <param name="startDate">Fecha de inicio de los registros</param>
        /// <param name="endDate">Fecha de fin de los registros</param>
        /// <param name="minAge">Edad minima de los estudiantes</param>
        /// <param name="maxAge">Edad maxima de los estudiantes</param>
        /// <param name="genders">Generos de los estudiantes</param>
        /// <param name="levels">Niveles de los registros</param>
        /// <param name="periods">Periodos de los registros</param>
        /// <param name="colorConfigurations">Arreglo con los niveles de configuracion de colores del dispositivo</param>
        /// <param name="sequenceConfigurations">Arreglo con los niveles de configuracion de secuencia del dispositivo</param>
        /// <param name="levelsConfigurations">Arreglo con los niveles de configuracion de nivel del dispositivo</param>
        /// <param name="appearancesConfigurations">Arreglo con los niveles de configuracion de apariciones del dispositivo</param>
        /// <returns>String del JSON con la informacion para el grafico</returns>
        public string GetBarChartDataCollective(DateTime startDate, DateTime endDate, int minAge, int maxAge, object[] genders, object[] levels, object[] periods, object[] colorConfigurations, object[] sequenceConfigurations, object[] levelsConfigurations, object[] appearancesConfigurations)
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

            //filtro de configuracion de colores
            BsonArray colorsFilter = new BsonArray();
            foreach (int color in colorConfigurations)
            {
                colorsFilter.Add(new BsonDocument("color_configuration", color));
            }

            //filtro de configuracion de secuencias
            BsonArray sequencesFilter = new BsonArray();
            foreach (int sequence in sequenceConfigurations)
            {
                sequencesFilter.Add(new BsonDocument("sequence_configuration", sequence));
            }

            //filtro de configuracion de niveles
            BsonArray levelsConfigurationFilter = new BsonArray();
            foreach (int level in levelsConfigurations)
            {
                levelsConfigurationFilter.Add(new BsonDocument("level_configuration", level));
            }

            //filtro de configuracion de apariciones
            BsonArray appearancesFilter = new BsonArray();
            foreach (int appearances in appearancesConfigurations)
            {
                appearancesFilter.Add(new BsonDocument("appearances_configuration", appearances));
            }

            //agrega los filtros al JSON
            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("$or", studentsFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsFilter));
            matchAndConditions.Add(new BsonDocument("$or", periodsFilter));
            matchAndConditions.Add(new BsonDocument("$or", colorsFilter));
            matchAndConditions.Add(new BsonDocument("$or", sequencesFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsConfigurationFilter));
            matchAndConditions.Add(new BsonDocument("$or", appearancesFilter));
            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "$datetime");
            group.Add("values", new BsonDocument("$push", "$value"));

            /*Sort*/
            BsonDocument sort = new BsonDocument("_id", 1);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).Sort(sort).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructureBarJSON(registers);
        }

        /// <summary>
        /// Obtiene los datos para la grafica de aciertos vs errores global de varios estudiantes
        /// en forma de pastel
        /// </summary>
        /// <param name="startDate">Fecha de inicio de los registros</param>
        /// <param name="endDate">Fecha de fin de los registros</param>
        /// <param name="minAge">Edad minima de los estudiantes</param>
        /// <param name="maxAge">Edad maxima de los estudiantes</param>
        /// <param name="genders">Generos de los estudiantes</param>
        /// <param name="levels">Niveles de los registros</param>
        /// <param name="periods">Periodos de los registros</param>
        /// <param name="colorConfigurations">Arreglo con los niveles de configuracion de colores del dispositivo</param>
        /// <param name="sequenceConfigurations">Arreglo con los niveles de configuracion de secuencia del dispositivo</param>
        /// <param name="levelsConfigurations">Arreglo con los niveles de configuracion de nivel del dispositivo</param>
        /// <param name="appearancesConfigurations">Arreglo con los niveles de configuracion de apariciones del dispositivo</param>
        /// <returns>String del JSON con la informacion para el grafico</returns>
        public string GetPieChartDataCollective(DateTime startDate, DateTime endDate, int minAge, int maxAge, object[] genders, object[] levels, object[] periods, object[] colorConfigurations, object[] sequenceConfigurations, object[] levelsConfigurations, object[] appearancesConfigurations)
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

            //filtro de configuracion de colores
            BsonArray colorsFilter = new BsonArray();
            foreach (int color in colorConfigurations)
            {
                colorsFilter.Add(new BsonDocument("color_configuration", color));
            }

            //filtro de configuracion de secuencias
            BsonArray sequencesFilter = new BsonArray();
            foreach (int sequence in sequenceConfigurations)
            {
                sequencesFilter.Add(new BsonDocument("sequence_configuration", sequence));
            }

            //filtro de configuracion de niveles
            BsonArray levelsConfigurationFilter = new BsonArray();
            foreach (int level in levelsConfigurations)
            {
                levelsConfigurationFilter.Add(new BsonDocument("level_configuration", level));
            }

            //filtro de configuracion de apariciones
            BsonArray appearancesFilter = new BsonArray();
            foreach (int appearances in appearancesConfigurations)
            {
                appearancesFilter.Add(new BsonDocument("appearances_configuration", appearances));
            }

            //agrega los filtros al JSON
            matchAndConditions.Add(new BsonDocument("datetime", dateFilter));
            matchAndConditions.Add(new BsonDocument("$or", studentsFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsFilter));
            matchAndConditions.Add(new BsonDocument("$or", periodsFilter));
            matchAndConditions.Add(new BsonDocument("$or", colorsFilter));
            matchAndConditions.Add(new BsonDocument("$or", sequencesFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsConfigurationFilter));
            matchAndConditions.Add(new BsonDocument("$or", appearancesFilter));
            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "null");
            group.Add("values", new BsonDocument("$push", "$value"));

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructurePieJSON(registers[0]);
        }

        /// <summary>
        /// Obtiene los datos para la grafica de aciertos vs errores porcentual de varios estudiantes
        /// en forma de linea
        /// </summary>
        /// <param name="startDate">Fecha de inicio de los registros</param>
        /// <param name="endDate">Fecha de fin de los registros</param>
        /// <param name="minAge">Edad minima de los estudiantes</param>
        /// <param name="maxAge">Edad maxima de los estudiantes</param>
        /// <param name="genders">Generos de los estudiantes</param>
        /// <param name="levels">Niveles de los registros</param>
        /// <param name="periods">Periodos de los registros</param>
        /// <param name="colorConfigurations">Arreglo con los niveles de configuracion de colores del dispositivo</param>
        /// <param name="sequenceConfigurations">Arreglo con los niveles de configuracion de secuencia del dispositivo</param>
        /// <param name="levelsConfigurations">Arreglo con los niveles de configuracion de nivel del dispositivo</param>
        /// <param name="appearancesConfigurations">Arreglo con los niveles de configuracion de apariciones del dispositivo</param>
        /// <returns>String del JSON con la informacion para el grafico</returns>
        public string GetLineChartDataCollective(DateTime startDate, DateTime endDate, int minAge, int maxAge, object[] genders, object[] levels, object[] periods, object[] colorConfigurations, object[] sequenceConfigurations, object[] levelsConfigurations, object[] appearancesConfigurations)
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

            //filtro de configuracion de colores
            BsonArray colorsFilter = new BsonArray();
            foreach (int color in colorConfigurations)
            {
                colorsFilter.Add(new BsonDocument("color_configuration", color));
            }

            //filtro de configuracion de secuencias
            BsonArray sequencesFilter = new BsonArray();
            foreach (int sequence in sequenceConfigurations)
            {
                sequencesFilter.Add(new BsonDocument("sequence_configuration", sequence));
            }

            //filtro de configuracion de niveles
            BsonArray levelsConfigurationFilter = new BsonArray();
            foreach (int level in levelsConfigurations)
            {
                levelsConfigurationFilter.Add(new BsonDocument("level_configuration", level));
            }

            //filtro de configuracion de apariciones
            BsonArray appearancesFilter = new BsonArray();
            foreach (int appearances in appearancesConfigurations)
            {
                appearancesFilter.Add(new BsonDocument("appearances_configuration", appearances));
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
            matchAndConditions.Add(new BsonDocument("$or", colorsFilter));
            matchAndConditions.Add(new BsonDocument("$or", sequencesFilter));
            matchAndConditions.Add(new BsonDocument("$or", levelsConfigurationFilter));
            matchAndConditions.Add(new BsonDocument("$or", appearancesFilter));
            match.AddRange(new BsonDocument("$and", matchAndConditions));

            /*Group*/
            BsonDocument group = new BsonDocument();
            group.Add("_id", "$datetime");
            group.Add("values", new BsonDocument("$push", "$value"));

            /*Sort*/
            BsonDocument sort = new BsonDocument("_id", 1);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            List<BsonDocument> registers = activitiesCollection.Aggregate().Match(match).Group(group).Sort(sort).ToList(cancellationTokenSource.Token);

            if (registers.Count == 0) //valida de que haya por lo menos 1 registro
            {
                return new JObject().ToString();
            }
            return StructureLineJSON(registers);
        }

        /// <summary>
        /// Obtiene las fechas maximas y minimas de los registros de actvidades de un estudiante
        /// </summary>
        /// <param name="studentId">String con el ID del estudiante</param>
        /// <returns>String con el JSON de las fechas maxima y minima</returns>
        public string GetStudentMaxMinActivityDates(string studentId)
        {
            List<MatrixActivityRegister> minDateResponse;

            JObject response = new JObject();

            FilterDefinition<MatrixActivityRegister> filter = Builders<MatrixActivityRegister>.Filter.Eq("student_id", studentId);

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            minDateResponse = activitiesCollection.Find(filter).Sort(new BsonDocument("datetime", 1)).Limit(1).ToList(cancellationTokenSource.Token);

            if (minDateResponse.Count > 0) //valida que por lo menos haya 1 registro
            {
                MatrixActivityRegister minDateRegister = minDateResponse[0];
                MatrixActivityRegister maxDateRegister = activitiesCollection.Find(filter).Sort(new BsonDocument("datetime", -1)).Limit(1).ToList()[0];
                response.Add("minDate", minDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
                response.Add("maxDate", maxDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
            }

            return response.ToString();
        }

        /// <summary>
        /// Obtiene las fechas maximas y minimas de los registros de actvidades de todos los estudiantes
        /// </summary>
        /// <returns>String con el JSON de las fechas maxima y minima</returns>
        public string GetGlobalMaxMinActivityDates()
        {
            List<MatrixActivityRegister> minDateResponse;

            JObject response = new JObject();

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

            minDateResponse = activitiesCollection.Find(new BsonDocument()).Sort(new BsonDocument("datetime", 1)).Limit(1).ToList(cancellationTokenSource.Token);

            if (minDateResponse.Count > 0) //valida que por lo menos haya 1 registro
            {
                MatrixActivityRegister minDateRegister = minDateResponse[0];
                MatrixActivityRegister maxDateRegister = activitiesCollection.Find(new BsonDocument()).Sort(new BsonDocument("datetime", -1)).Limit(1).ToList()[0];
                response.Add("minDate", minDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
                response.Add("maxDate", maxDateRegister.Datetime.ToLocalTime().ToString("yyyy-MM-dd"));
            }

            return response.ToString();
        }

        /// <summary>
        /// Inserta un registro de actividad
        /// </summary>
        /// <param name="activity">Actividad con los datos a ser insertados</param>
        /// <returns>Retorna verdadero si la insercion fue exitosa</returns>
        public bool InsertActivity(MatrixActivityRegister activity)
        {

            cancellationTokenSource = new CancellationTokenSource();
            cancellationTokenSource.CancelAfter(DatabaseConnection.TIMEOUT); // configuracion del tiempo maximo de respuesta

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

        /// <summary>
        /// Genera el String con el JSON para las graficas de barras
        /// </summary>
        /// <param name="activitiesList">Lista de las actividades consultadas</param>
        /// <returns>String con el JSON de la informacion del grafico</returns>
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

        /// <summary>
        /// Genera el String con el JSON para las graficas de pastel
        /// </summary>
        /// <param name="activitiesList">JSON con la informacion consultada</param>
        /// <returns>String con el JSON de la informacion del grafico</returns>
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

        /// <summary>
        /// Genera el String con el JSON para las graficas de linea
        /// </summary>
        /// <param name="activitiesList">Lista de las actividades consultadas</param>
        /// <returns>String con el JSON de la informacion del grafico</returns>
        private string StructureLineJSON(List<BsonDocument> activitiesList)
        {
            JArray dataArray;

            int successCount;
            int errorsCount;
            JArray array = new JArray();

            JArray headersArray = new JArray();
            headersArray.Add(new JValue("Fechas"));
            headersArray.Add(new JValue("Porcentaje de Aciertos"));
            headersArray.Add(new JValue("Porcentaje de Errores"));
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
                dataArray.Add(new JValue(100 - percentaje));
                array.Add(dataArray);
            }
            return array.ToString();
        }
    }
}
