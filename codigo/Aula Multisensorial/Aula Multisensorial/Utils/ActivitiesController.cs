using Aula_Multisensorial.MatrixLED;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Aula_Multisensorial.Utils
{
    class ActivitiesController
    {
        private readonly Form mainForm;
        private delegate void StartActivty();

        public ActivitiesController(Form mainForm)
        {
            this.mainForm = mainForm;
        }

        public void StartMatrizActivity(string activity)
        {
            if (activity.Equals("Matrix"))
            {
                mainForm.Invoke(new StartActivty(StartMatrixActivity));
            }
            else if (activity.Equals("Globe"))
            {

            }
        }

        private void StartMatrixActivity()
        {
            new Main();
        }
    }
}
