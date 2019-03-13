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

        /// <summary>
        /// Inicia los dialogos de las actividades
        /// </summary>
        /// <param name="activity">String con el nombre de la actividad a iniciar</param>
        /// <param name="teacherId">String con el ID del docente que esta usando la aplicacion</param>
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

        /// <summary>
        /// Inicia la actividad de matriz de led
        /// </summary>
        /// <param name="teacherId">String con el ID del docente</param>
        private void StartMatrixActivity(string teacherId)
        {
            MatrixLED.Main.GetInstance(teacherId);
        }

        /// <summary>
        /// Inicia la actividad de guantes
        /// </summary>
        /// <param name="teacherId">String con el ID del docente</param>
        private void StartGlovesActivity(string teacherId)
        {
            Gloves.Main.GetInstance(teacherId);
        }

        /// <summary>
        /// Inicia la actividad de sensor cardiaco
        /// </summary>
        /// <param name="teacherId">String con el ID del docente</param>
        private void StartCardiacSensorActivity(string teacherId)
        {
            CardiacSensor.Main.GetInstance(teacherId);
        }
    }
}
