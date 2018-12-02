using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Aula_Multisensorial.Modelo
{
    class Student
    {
        private ObjectId id { get; set; }
        private string names { get; set; }
        private string lastNames { get; set; }
        private string diagnostic { get; set; }
        private string gender { get; set; }
        private DateTime birthday { get; set; }
        private string condition { get; set; }
        private string[] technicalHelps { get; set; }
        private ObjectId levelId { get; set; }
    }
}
