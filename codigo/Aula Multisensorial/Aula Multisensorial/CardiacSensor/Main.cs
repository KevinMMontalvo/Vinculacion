using Aula_Multisensorial.Access;
using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Aula_Multisensorial.CardiacSensor
{
    public partial class Main : Form
    {
        private static Main instance = null;
        private readonly string teacherId;
        private delegate string GetSelectedComboBoxText();
        private delegate void ChangeActivityState();
        private delegate void SetText(string text);
        private CardiacSensorActivityRegister activity;
        private bool firstValueTaked = false;
        private bool secondValueTaked = false;

        private Main(string teacherId)
        {
            InitializeComponent();
            this.teacherId = teacherId;
            Visible = true;
        }

        private void Main_Load(object sender, EventArgs e)
        {
            ClearLabels();
            LoadStudentsList();
        }

        private void Main_FormClosed(object sender, FormClosedEventArgs e)
        {
            Dispose();
        }

        private void Main_FormClosing(object sender, FormClosingEventArgs e)
        {
            ArduinoController.GetInstance().CloseConnection(ArduinoController.HEART_ARDUINO);
            instance = null;
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            if (comboBoxStudents.SelectedIndex == -1)
            {
                return;
            }

            if (buttonStart.Text.Equals("Iniciar") && activity == null)
            {
                ClearLabels();
                activity = new CardiacSensorActivityRegister();
            }

            if (buttonStart.Text.Equals("Iniciar"))
            {
                if (ConnectCardiacSensor())
                {
                    StartReading();
                }
            }
            else if (buttonStart.Text.Equals("Tomar Medida") && firstValueTaked)
            {
                SetStartActivity();
            }
            else if (buttonStart.Text.Equals("Terminar") && secondValueTaked)
            {
                SetEndActivity();
                comboBoxStudents.Enabled = true;
            }
        }

        private void buttonExit_Click(object sender, EventArgs e)
        {
            Close();
        }

        /// <summary>
        /// Metodo para obtener la instancia de patron singleton de la clase
        /// </summary>
        /// <param name="teacherId">String con el ID del docente para ejecutar el contructor</param>
        /// <returns>Retorna la instancia del mimo tipo de la clase</returns>
        public static Main GetInstance(string teacherId)
        {
            if (instance == null)
            {
                instance = new Main(teacherId);
            }
            return instance;
        }

        /// <summary>
        /// Llena el combobox con los nombres de los alumnos asignados al curso del docente
        /// </summary>
        private void LoadStudentsList()
        {
            List<Student> students = new StudentAccess().GetStudentsByTeacherLevel(teacherId);

            foreach (Student student in students)
            {
                comboBoxStudents.Items.Add(student);
            }

            comboBoxStudents.ValueMember = "Id";
            comboBoxStudents.DisplayMember = "Fullname";
        }

        /// <summary>
        /// Cambia los atributos de los elementos del Form, se usa para cuando la actividad haya iniciado
        /// </summary>
        private void SetStartActivity()
        {
            buttonStart.Text = "Terminar";
            buttonExit.Enabled = false;
            comboBoxStudents.Enabled = false;
            buttonStart.BackColor = Color.DarkRed;
        }

        /// <summary>
        /// Cambia los atributos de los elementos del Form, se usa para cuando la actividad se haya
        /// iniciado y se vaya a tomar la segunda medida de la actvidad
        /// </summary>
        private void SetTakeSecondMeasure()
        {
            buttonStart.Text = "Tomar Medida";
            buttonExit.Enabled = false;
            comboBoxStudents.Enabled = false;
            buttonStart.BackColor = Color.DarkRed;
        }

        /// <summary>
        /// Cambia los atributos de los elementos del Form, se usa para cuando la actividad se haya
        /// terminado y se vuelve los elementos del Form a su estado inicial
        /// </summary>
        private void SetEndActivity()
        {
            buttonStart.Text = "Iniciar";
            buttonExit.Enabled = true;
            buttonStart.BackColor = Color.Green;
        }

        /// <summary>
        /// Comprueba y realiza la conexion el dispositivo
        /// </summary>
        /// <returns>Retorna verdadero si la insercion fue exitosa</returns>
        private bool ConnectCardiacSensor()
        {
            if (ArduinoController.GetInstance().IsPortOpen(ArduinoController.HEART_ARDUINO))
            {
                return true;
            }
            bool connectionSuccessful = ArduinoController.GetInstance().StartConnection(ArduinoController.HEART_ARDUINO);
            if (!connectionSuccessful)
            {
                MessageBox.Show("No se pudo conectar con el dispositivo (Sensor Cardiaco)");
            }
            return connectionSuccessful;
        }
        
        /// <summary>
        /// Metodo que inicia el hilo de recepcion de mensajes
        /// </summary>
        private async void StartReading()
        {
            bool messageSended = ArduinoController.GetInstance().SendMessage(ArduinoController.HEART_ARDUINO, "ON");
            if (messageSended)
            {
                Task readVaules = new Task(ReceiveMessages); //tarea asincrona
                readVaules.Start();
                SetTakeSecondMeasure();
            }
            else
            {
                MessageBox.Show("Error de conexion con el dispositivo");
            }
        }

        /// <summary>
        /// Metodo que envia el comando de fin de actividad y cierra la conexion
        /// </summary>
        private void StopReading()
        {
            ArduinoController.GetInstance().SendMessage(ArduinoController.HEART_ARDUINO, "OFF");
            ArduinoController.GetInstance().CloseConnection(ArduinoController.HEART_ARDUINO);
        }

        /// <summary>
        /// Metodo que se va a ejecutar asincronicamente para recibir los valores arrojados 
        /// por el dispositivo
        /// </summary>
        private void ReceiveMessages()
        {
            int[] values = new int[50]; //buffer de comparacion
            int counter = 0;
            string message;
            
            activity.StudentId = (string)Invoke(new GetSelectedComboBoxText(GetComboBoxStudentsText)); // para acceder a elementos de la GUI desde el hilo
            activity.Datetime = DateTime.Now.Date; //solo fecha para poder agrupar
            activity.Level = new LevelAccess().GetLevelById(new TeacherAccess().GetTeacherById(teacherId).LevelId).Name;
            activity.Period = new PeriodAccess().GetActivePeriod().Name;

            /*
             Lectura del primer valor
             */
            if (activity.InitialValue == 0)
            {
                do
                {
                    message = ArduinoController.GetInstance().GetMessage(ArduinoController.HEART_ARDUINO);
                    if (message == null && !ArduinoController.GetInstance().IsPortOpen(ArduinoController.HEART_ARDUINO)) // errror de conexion
                    {
                        MessageBox.Show("Ha ocurrido un problema de conexion con el sensor cardiaco, revise que el sensor esté bien conectado");
                        Invoke(new ChangeActivityState(SetEndActivity));
                        Invoke(new SetText(SetInitialLabelText), "Pulsaciones por minuto iniciales: -");
                        return;
                    }
                    else if (message == null) // terminado por el usuario
                    {
                        break;
                    }
                    else
                    {
                        int value;
                        try
                        {
                            message = message.Split('\r')[0];
                            value = Convert.ToInt32(message);
                            values[counter] = value;
                            counter++;
                            if (counter == 50)
                            {
                                if (ValuesStandarized(values)) //todos los valores del buffer son iguales
                                {
                                    Invoke(new SetText(SetInitialLabelText), "Pulsaciones por minuto iniciales: " + values[0]);
                                    firstValueTaked = true;
                                }
                                else
                                {
                                    Invoke(new SetText(SetInitialLabelText), "Pulsaciones por minuto iniciales: -");
                                    firstValueTaked = false;
                                }
                                counter = 0;
                            }
                        }
                        catch (Exception)
                        {

                        }
                    }
                } while (buttonStart.Text.Equals("Tomar Medida"));
                activity.InitialValue = values[0];
            }
            else
            {
                Invoke(new ChangeActivityState(SetStartActivity));
            }

            /*
             Lectura del sugundo valor
             */
            do
            {
                message = ArduinoController.GetInstance().GetMessage(ArduinoController.HEART_ARDUINO);
                if (message == null && !ArduinoController.GetInstance().IsPortOpen(ArduinoController.HEART_ARDUINO)) // errror de conexion
                {
                    MessageBox.Show("Ha ocurrido un problema de conexion con el sensor cardiaco, revise que el sensor esté bien conectado");
                    Invoke(new ChangeActivityState(SetEndActivity));
                    Invoke(new SetText(SetFinalLabelText), "Pulsaciones por minuto finales: -");
                    return;
                }
                else if (message == null) // terminado por el usuario
                {
                    break;
                }
                else
                {
                    int value;
                    try
                    {
                        message = message.Split('\r')[0];
                        value = Convert.ToInt32(message);
                        values[counter] = value;
                        counter++;
                        if (counter == 50)
                        {
                            if (ValuesStandarized(values))
                            {
                                Invoke(new SetText(SetFinalLabelText), "Pulsaciones por minuto finales: " + values[0]);
                                secondValueTaked = true;
                            }
                            else
                            {
                                Invoke(new SetText(SetFinalLabelText), "Pulsaciones por minuto finales: -");
                                secondValueTaked = false;
                            }
                            counter = 0;
                        }
                    }
                    catch (Exception)
                    {

                    }
                }
            } while (buttonStart.Text.Equals("Terminar"));
            activity.FinalValue = values[0];
            StopReading();

            //Aqui se inserta la actividad en la base de datos
            if (activity.InitialValue != 0 && activity.FinalValue != 0 && buttonStart.Text.Equals("Iniciar"))
            {
                bool insertedProperly = new CardiacSensorActivityRegisterAccess().InsertActivity(activity);
                activity = null;
            }

        }

        /// <summary>
        /// Retorna el nombre del estudiante seleccionado en el combobox
        /// </summary>
        /// <returns></returns>
        private string GetComboBoxStudentsText()
        {
            Student selectedStudent = (Student)comboBoxStudents.SelectedItem;
            return selectedStudent.Id;
        }

        /// <summary>
        /// Comprueba que todos los valores sean iguales y validos
        /// </summary>
        /// <param name="values">Arreglo de enteros con los valores a ser comprobados</param>
        /// <returns>Retorna verdadero si la todos los valores son iguales</returns>
        private bool ValuesStandarized(int[] values)
        {
            bool isStandarized = true;

            for (int i = 1; i < 50; i++)
            {
                // aqui se valida los limites maximos y minimos de los valores de las pulsaciones
                if (values[i] > values[0] + 1 || values[i] < values[0] - 1 || values[i] < 60 || values[i] > 160)
                {
                    isStandarized = false;
                    break;
                }
            }
            return isStandarized;
        }

        /// <summary>
        /// Cambia el texto del label en donde se muestra la primera medicion
        /// </summary>
        /// <param name="text"></param>
        private void SetInitialLabelText(string text)
        {
            labelInitialBPM.Text = text;
        }

        /// <summary>
        /// Cambia el texto del label en donde se muestra la segunda medicion
        /// </summary>
        /// <param name="text"></param>
        private void SetFinalLabelText(string text)
        {
            labelFinalBPM.Text = text;
        }

        /// <summary>
        /// Limpia el texto de los labels en donde se muestran las mediciones
        /// </summary>
        private void ClearLabels()
        {
            labelFinalBPM.Text = "";
            labelInitialBPM.Text = "";
        }
    }
}
