using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Aula_Multisensorial.Modelo
{
    class Activity
    {
        private ObjectId id { get; set; }
        private string auxiliaries { get; set; }
        private float score { get; set; }
        private ObjectId studentId { get; set; }
        private ObjectId activityTypeId { get; set; }
    }
}
