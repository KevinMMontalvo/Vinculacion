using Aula_Multisensorial.Access;
using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Windows.Forms;

namespace Aula_Multisensorial.Gloves
{
    public partial class Main : Form
    {
        private readonly string teacherId;
        private delegate void ControlEvent(object sender, EventArgs e);

        public Main(string teacherId)
        {
            InitializeComponent();
            this.teacherId = teacherId;
            Visible = true;
        }

        private void Main_Load(object sender, EventArgs e)
        {
            LoadStudentsList();
        }

        private void OnClickLabelEvent(object sender, EventArgs e)
        {
            Label label = (Label)sender;

            //valida que tiene que iniciar la actividad primero
            if (buttonStart.Text.Equals("Iniciar"))
            {
                return;
            }

            if (label.Name.Equals("label1"))
            {
                DoFingerActivity(ArduinoController.LEFT_HAND_ARDUINO, "I1");
            }
            else if (label.Name.Equals("label2"))
            {
                DoFingerActivity(ArduinoController.LEFT_HAND_ARDUINO, "I2");
            }
            else if (label.Name.Equals("label3"))
            {
                DoFingerActivity(ArduinoController.LEFT_HAND_ARDUINO, "I3");
            }
            else if (label.Name.Equals("label4"))
            {
                DoFingerActivity(ArduinoController.LEFT_HAND_ARDUINO, "I4");
            }
            else if (label.Name.Equals("label5"))
            {
                DoFingerActivity(ArduinoController.LEFT_HAND_ARDUINO, "I5");
            }
            else if (label.Name.Equals("label6"))
            {
                DoFingerActivity(ArduinoController.RIGHT_HAND_ARDUINO, "D5");
            }
            else if (label.Name.Equals("label7"))
            {
                DoFingerActivity(ArduinoController.RIGHT_HAND_ARDUINO, "D4");
            }
            else if (label.Name.Equals("label8"))
            {
                DoFingerActivity(ArduinoController.RIGHT_HAND_ARDUINO, "D3");
            }
            else if (label.Name.Equals("label9"))
            {
                DoFingerActivity(ArduinoController.RIGHT_HAND_ARDUINO, "D2");
            }
            else if (label.Name.Equals("label10"))
            {
                DoFingerActivity(ArduinoController.RIGHT_HAND_ARDUINO, "D1");
            }
        }

        private void HoverLabelEvent(object sender, EventArgs e)
        {
            Label label = (Label)sender;
            label.BackColor = Color.FromArgb(46, 134, 193);

        }

        private void MouseLeaveEvent(object sender, EventArgs e)
        {
            Label label = (Label)sender;
            label.BackColor = Color.White;
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            bool correctOperation = true;

            if (comboBoxStudents.SelectedIndex == -1)
            {
                return;
            }

            if (buttonStart.Text.Equals("Iniciar"))
            {
                if (!ArduinoController.GetInstance().IsPortOpen(ArduinoController.RIGHT_HAND_ARDUINO) && !ConnectGlobe(ArduinoController.RIGHT_HAND_ARDUINO))
                {
                    correctOperation = false;
                }
                if (!ArduinoController.GetInstance().IsPortOpen(ArduinoController.LEFT_HAND_ARDUINO) && !ConnectGlobe(ArduinoController.LEFT_HAND_ARDUINO))
                {
                    correctOperation = false;
                }

                if (correctOperation)
                {
                    buttonStart.Text = "Terminar";
                    buttonExit.Enabled = false;
                    comboBoxStudents.Enabled = false;
                    buttonStart.BackColor = Color.DarkRed;
                    AddClickEvents();
                }
            }
            else if (buttonStart.Text.Equals("Terminar"))
            {
                buttonStart.Text = "Iniciar";
                buttonExit.Enabled = true;
                comboBoxStudents.Enabled = true;
                buttonStart.BackColor = Color.Green;
                RemoveClickEvents();
                ArduinoController.GetInstance().CloseConnection(ArduinoController.RIGHT_HAND_ARDUINO);
                ArduinoController.GetInstance().CloseConnection(ArduinoController.LEFT_HAND_ARDUINO);
            }
        }

        private void buttonExit_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void Main_FormClosed(object sender, FormClosedEventArgs e)
        {
            Dispose();
        }

        private void AddClickEvents()
        {
            for (int i = 1; i <= 10; i++)
            {
                Controls["label" + i].Click += new EventHandler(new ControlEvent(OnClickLabelEvent));
                Controls["label" + i].MouseHover += new EventHandler(new ControlEvent(HoverLabelEvent));
                Controls["label" + i].MouseLeave += new EventHandler(new ControlEvent(MouseLeaveEvent));
            }
        }

        private void RemoveClickEvents()
        {
            for (int i = 1; i <= 10; i++)
            {
                Controls["label" + i].Click -= new EventHandler(new ControlEvent(OnClickLabelEvent));
                Controls["label" + i].MouseHover -= new EventHandler(new ControlEvent(HoverLabelEvent));
                Controls["label" + i].MouseLeave -= new EventHandler(new ControlEvent(MouseLeaveEvent));
            }
        }

        private void DoFingerActivity(int arduinoIndex, string fingerMessage)
        {

            GlobeActivityRegister globeActivity = new GlobeActivityRegister();
            globeActivity.StudentId = comboBoxStudents.SelectedValue.ToString();
            globeActivity.Finger = fingerMessage;
            globeActivity.Datetime = DateTime.Now;
            globeActivity.Level = new TeacherAccess().GetTeacherById(teacherId).LevelId;
            globeActivity.Period = new PeriodAccess().GetActivePeriod().Name;

            ArduinoController.GetInstance().SendMessage(arduinoIndex, fingerMessage);
            string recivedMessage = ArduinoController.GetInstance().GetMessage(ArduinoController.RIGHT_HAND_ARDUINO);
            if (recivedMessage == null)
            {
                MessageBox.Show("Ha ocurrido un problema de conexion con el guante, revise que los guantes esten bien conectados");
                buttonStart.Text = "Iniciar";
                buttonExit.Enabled = true;
            }
            else if (recivedMessage.ToString().Equals("BIEN\r"))
            {
                globeActivity.Value = "Bien";
                new GlobeActivityRegisterAccess().InsertActivity(globeActivity);
                MessageBox.Show("BIEN");
            }
            else if (recivedMessage.ToString().Equals("MAL\r"))
            {
                globeActivity.Value = "Mal";
                new GlobeActivityRegisterAccess().InsertActivity(globeActivity);
                MessageBox.Show("MAL");
            }
            else
            {
                MessageBox.Show("Ha ocurrido un problema de comunicacion con el guante, vuelva a reintentar la actividad");
            }
        }

        private bool ConnectGlobe(int arduinoIndex)
        {
            bool connectionSuccessful = ArduinoController.GetInstance().StartConnection(ArduinoController.RIGHT_HAND_ARDUINO);
            if (!connectionSuccessful && arduinoIndex == ArduinoController.RIGHT_HAND_ARDUINO)
            {
                MessageBox.Show("No se pudo conectar con el guante derecho");
            }
            else if (!connectionSuccessful && arduinoIndex == ArduinoController.LEFT_HAND_ARDUINO)
            {
                MessageBox.Show("No se pudo conectar con el guante izquierdo");
            }
            return connectionSuccessful;
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
    }
}
