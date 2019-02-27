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
        private delegate void SetText(string text);
        bool firstValueTaked = false;
        bool secondValueTaked = false;

        public Main(string teacherId)
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
                ClearLabels();
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

        private void SetTakeSecondMeasure()
        {
            buttonStart.Text = "Tomar Medida";
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
            bool messageSended = ArduinoController.GetInstance().SendMessage(ArduinoController.HEART_ARDUINO, "ON");
            if (messageSended)
            {
                Task readVaules = new Task(ReceiveMessages);
                readVaules.Start();
                SetTakeSecondMeasure();
            }
        }

        private void StopReading()
        {
            ArduinoController.GetInstance().SendMessage(ArduinoController.HEART_ARDUINO, "OFF");
            ArduinoController.GetInstance().CloseConnection(ArduinoController.HEART_ARDUINO);
        }

        private void ReceiveMessages()
        {
            int[] values = new int[50];
            int counter = 0;
            string message;
            CardiacSensorActivityRegister cardiacActivity;
            cardiacActivity = new CardiacSensorActivityRegister();
            cardiacActivity.StudentId = (string)Invoke(new GetSelectedComboBoxText(GetComboBoxStudentsText)); // para acceder a elementos de la GUI desde el hilo
            cardiacActivity.Datetime = DateTime.Now.Date; //solo fecha para poder agrupar
            cardiacActivity.Level = new LevelAccess().GetLevelById(new TeacherAccess().GetTeacherById(teacherId).LevelId).Name;
            cardiacActivity.Period = new PeriodAccess().GetActivePeriod().Name;

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
                        message = message.Split('\r')[0];
                        value = Convert.ToInt32(message);
                        values[counter] = value;
                        counter++;
                        if (counter == 50)
                        {
                            if (ValuesStandarized(values))
                            {
                                Invoke(new SetText(SetInitialLabelText), "Pulsaciones por minuto iniciales: " + values[0]);
                                firstValueTaked = true;
                                cardiacActivity.InitialValue = values[0];
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
                        message = message.Split('\r')[0];
                        value = Convert.ToInt32(message);
                        values[counter] = value;
                        counter++;
                        if (counter == 50)
                        {
                            if (ValuesStandarized(values))
                            {
                                Invoke(new SetText(SetFinalLabelText), "Pulsaciones por minuto finales: " + values[0]);
                                cardiacActivity.FinalValue = values[0];
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
            StopReading();
            new CardiacSensorActivityRegisterAccess().InsertActivity(cardiacActivity);
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

        private void SetInitialLabelText(string text)
        {
            labelInitialBPM.Text = text;
        }

        private void SetFinalLabelText(string text)
        {
            labelFinalBPM.Text = text;
        }

        private void ClearLabels()
        {
            labelFinalBPM.Text = "";
            labelInitialBPM.Text = "";
        }
    }
}
