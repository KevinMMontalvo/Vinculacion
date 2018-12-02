﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace Aula_Multisensorial.Modelo
{
    class Level
    {
        private ObjectId id { get; set; }
        private string name { get; set; }
        private int minAge { get; set; }
        private int maxAge { get; set; }
    }
}
