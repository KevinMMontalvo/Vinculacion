using System.Windows.Forms;

namespace Aula_Multisensorial.Utils
{
    class ActivitiesController
    {
        private readonly Form mainForm;
        private delegate void StartActivty(string teacherId);

        public ActivitiesController(Form mainForm)
        {
            this.mainForm = mainForm;
        }

        public void StartActivity(string activity, string teacherId)
        {
            if (activity.Equals("Matrix"))
            {
                mainForm.Invoke(new StartActivty(StartMatrixActivity), teacherId);
            }
            else if (activity.Equals("Globe"))
            {
                mainForm.Invoke(new StartActivty(StartGlovesActivity), teacherId);
            }
            else if (activity.Equals("CardiacSensor"))
            {
                mainForm.Invoke(new StartActivty(StartCardiacSensorActivity), teacherId);
            }
        }

        private void StartMatrixActivity(string teacherId)
        {
            new MatrixLED.Main(teacherId);
        }

        private void StartGlovesActivity(string teacherId)
        {
            new Gloves.Main(teacherId);
        }

        private void StartCardiacSensorActivity(string teacherId)
        {
            CardiacSensor.Main.GetInstance(teacherId);
        }
    }
}
