
//obtiene las actividades filtrando por fecha estudiante y dedos
//retorna fecha y valores ordenados por fecha ascendentemente
db.glove_activity_registers.aggregate([
    {
        $match: {
            $and: [
                { "datetime": { $gte: ISODate("2017-01-01T00:00:00.000Z"), $lt: ISODate("2020-01-31T23:59:59.000Z") } },
                { "student_id": "5c43ff326beb3040fcd14d3c" },
                { $or: [{ "finger": "D1" }, { "finger": "D2" }, { "finger": "I5" }] }
            ]
        }
    },
    {
        $group: {
            _id: "$datetime",
            values: { $push: "$value" }
        }
    },
    { $sort: { "_id": 1 } }
]);


//obtener solo los valores de las actividades
db.glove_activity_registers.aggregate([
    {
        $match: {
            $and: [
                { "datetime": { $gte: ISODate("2017-01-01T00:00:00.000Z"), $lt: ISODate("2020-01-31T23:59:59.000Z") } },
                { "student_id": "5c43ff326beb3040fcd14d3c" },
                { $or: [{ "finger": "D1" }, { "finger": "D2" }, { "finger": "I5" }] }
            ]
        }
    },
    {
        $group: {
            _id: null,
            values: { $push: "$value" }
        }
    }
]);

db.students.find({
    $and: [
        { "birthdate": { $gte: new Date("2000-02-07T00:00:00-00:00"), $lt: new Date("2016-02-08T00:00:00-00:00") } },
        { $or: [{ "gender": "Masculino" }, { "gender": "Femenino" }] }
    ]
});

db.glove_activity_registers.aggregate([
    {
        $match: {
            $and: [
                { "datetime": { $gte: ISODate("2017-01-01T00:00:00.000Z"), $lt: ISODate("2020-01-31T23:59:59.000Z") } },
                { $or: [{ "student_id": "5c43ff326beb3040fcd14d3c" }, { "student_id": "asdasd" }] },
                { $or: [{ "level": "Primero De Básica" }, { "level": "Segundo De Básica" }] },
                { $or: [{ "period": "Periodo 2019 - 2020" }] },
                { $or: [{ "finger": "D1" }, { "finger": "D2" }, { "finger": "I5" }] }
            ]
        }
    },
    {
        $group: {
            _id: "$datetime",
            values: { $push: "$value" }
        }
    },
    { $sort: { "_id": 1 } }
]);


db.cardiac_activity_registers.aggregate([
    {
        $match: 
        {
            $and: [
                { "datetime": { $gte: ISODate("2017-01-01T00:00:00.000Z"), $lt: ISODate("2020-01-31T23:59:59.000Z") } },
                { "student_id": "5c43ff326beb3040fcd14d3c" }
            ]
        }
    },
    {
        $group: 
        {
            _id: "$datetime",
            values: { $push:{ initial_value:"$initial_value",final_value:"$final_value"} }
        }
    },
    { $sort: { "_id": 1 } }
]);

db.cardiac_activity_registers.aggregate([
    {
        $match: 
        {
            $and: [
                { "datetime": { $gte: ISODate("2017-01-01T00:00:00.000Z"), $lt: ISODate("2020-01-31T23:59:59.000Z") } },
                { "student_id": "5c43ff326beb3040fcd14d3c" }
            ]
        }
    },
    {
        $group: 
        {
            _id: "$datetime",
            initial_value: {$avg:"$initial_value"},
            final_value: {$avg:"$final_value"},
        }
    },
    { $sort: { "_id": 1 } }
]);


db.cardiac_activity_registers.aggregate([
    {
        $match: 
        {
            $and: [
                { "datetime": { $gte: ISODate("2017-01-01T00:00:00.000Z"), $lt: ISODate("2020-01-31T23:59:59.000Z") } },
                { "student_id": "5c43ff326beb3040fcd14d3c" }
            ]
        }
    },
    {
        $group: 
        {
            _id: "null",
            values: {$push: {initial_value:"$initial_value",final_value:"$final_value"}}
        }
    }
]);