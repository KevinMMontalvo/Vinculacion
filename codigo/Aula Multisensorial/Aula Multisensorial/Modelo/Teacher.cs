using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Aula_Multisensorial.Modelo
{
    class Teacher
    {
        private ObjectId id { get; set; }
        private string name { get; set; }
        private string speciality { get; set; }
        private ObjectId levelId { get; set; }
    }
}
