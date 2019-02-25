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
        private readonly string teacherId;
        private delegate string GetSelectedComboBoxText();
        private delegate void ChangeActivityState();

        public Main(string teacherId)
        {
            InitializeComponent();
            this.teacherId = teacherId;
            Visible = true;
        }

        private void Main_Load(object sender, EventArgs e)
        {
            labelPPM.Text = "";
            LoadStudentsList();
        }

        private void Main_FormClosing(object sender, FormClosingEventArgs e)
        {
            ArduinoController.GetInstance().CloseConnection(ArduinoController.HEART_ARDUINO);
            Dispose();
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            if (comboBoxStudents.SelectedIndex == -1)
            {
                return;
            }

            if (buttonStart.Text.Equals("Iniciar"))
            {
                if (ConnectCardiacSensor())
                {
                    StartReading();
                }
            }
            else if (buttonStart.Text.Equals("Terminar"))
            {
                StopReading();
            }
        }

        private void buttonExit_Click(object sender, EventArgs e)
        {
            Close();
        }

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

        private void SetStartActivity()
        {
            buttonStart.Text = "Terminar";
            buttonExit.Enabled = false;
            comboBoxStudents.Enabled = false;
            buttonStart.BackColor = Color.DarkRed;
        }

        private void SetEndActivity()
        {
            buttonStart.Text = "Iniciar";
            buttonExit.Enabled = true;
            comboBoxStudents.Enabled = true;
            buttonStart.BackColor = Color.Green;
        }

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

        private async void StartReading()
        {
            bool messageSended = ArduinoController.GetInstance().SendMessage(ArduinoController.HEART_ARDUINO, "START");
            if (messageSended)
            {
                Task readVaules = new Task(ReceiveMessages);
                readVaules.Start();
                SetStartActivity();
            }
        }

        private void StopReading()
        {
            SetEndActivity();
            ArduinoController.GetInstance().SendMessage(ArduinoController.HEART_ARDUINO, "END");
            ArduinoController.GetInstance().CloseConnection(ArduinoController.HEART_ARDUINO);
        }

        private void ReceiveMessages()
        {
            int[] values = new int[50];
            int counter = 0;
            string message;
            /*CardiacSensorActivityRegister cardiacActivity;
            cardiacActivity = new CardiacSensorActivityRegister();
            cardiacActivity.StudentId = (string)Invoke(new GetSelectedComboBoxText(GetComboBoxStudentsText)); // para acceder a elementos de la GUI desde el hilo
            cardiacActivity.Datetime = DateTime.Now.Date; //solo fecha para poder agrupar
            cardiacActivity.Level = new LevelAccess().GetLevelById(new TeacherAccess().GetTeacherById(teacherId).LevelId).Name;
            cardiacActivity.Period = new PeriodAccess().GetActivePeriod().Name;*/

            do
            {
                message = ArduinoController.GetInstance().GetMessage(ArduinoController.HEART_ARDUINO);
                if (message == null && !ArduinoController.GetInstance().IsPortOpen(ArduinoController.HEART_ARDUINO)) // errror de conexion
                {
                    MessageBox.Show("Ha ocurrido un problema de conexion con el sensor cardiaco, revise que el sensor esté bien conectado");
                    Invoke(new ChangeActivityState(SetEndActivity));
                    break;
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
                        value = Convert.ToInt32(message);
                        values[counter] = value;
                        counter++;
                        if (counter == 50)
                        {
                            if (ValuesStandarized(values))
                            {
                                labelPPM.Text = "Pulsaciones por minuto: " + values[0];
                            }
                            else
                            {
                                labelPPM.Text = "Pulsaciones por minuto: -";
                            }
                            counter = 0;
                        }
                    }
                    catch (Exception)
                    {
                        MessageBox.Show("Ha ocurrido un problema de comunicacion con el sensor cardiaco");
                    }
                    //matrixActivity.Value = "Bien";
                }
                //new MatrixActivityRegisterAccess().InsertActivity(matrixActivity);
            } while (buttonStart.Text.Equals("Terminar"));
        }

        private string GetComboBoxStudentsText()
        {
            Student selectedStudent = (Student)comboBoxStudents.SelectedItem;
            return selectedStudent.Id;
        }

        private bool ValuesStandarized(int[] values)
        {
            bool isStandarized = true;

            for (int i = 1; i < 50; i++)
            {
                if (values[i] > values[0] + 1 || values[i] < values[0] - 1 || values[i] < 60 || values[i] > 160)
                {
                    isStandarized = false;
                    break;
                }
            }
            return isStandarized;
        }
    }
}
