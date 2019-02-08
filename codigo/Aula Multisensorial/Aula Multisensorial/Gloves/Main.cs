﻿using Aula_Multisensorial.Access;
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

        public Main()
        {
            InitializeComponent();
            Visible = true;
        }

        private void Main_Load(object sender, EventArgs e)
        {
            bool connectionSuccessful = ConnectGlobe(ArduinoController.RIGHT_HAND_ARDUINO);
            if (!connectionSuccessful)
            {
                Shown += new EventHandler(new ControlEvent(ShownFormEvent)); // Cierra el formulario automaticamente
                return;
            }
            else
            {
                AddClickEvents();
            }

            /*connectionSuccessful = ArduinoController.GetInstance().StartConnection(ArduinoController.LEFT_HAND_ARDUINO);
            if (!connectionSuccessful)
            {
                MessageBox.Show("No se pudo conectar con el guante izquierdo");
                Close();
            }*/

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
            if (buttonStart.Text.Equals("Iniciar"))
            {
                if (!ArduinoController.GetInstance().IsPortOpen(ArduinoController.RIGHT_HAND_ARDUINO) && !ConnectGlobe(ArduinoController.RIGHT_HAND_ARDUINO))
                {
                    correctOperation = false;
                }
                /*if (!ArduinoController.GetInstance().IsPortOpen(ArduinoController.LEFT_HAND_ARDUINO) && !ConnectGlobe(ArduinoController.LEFT_HAND_ARDUINO))
                {
                    correctOperation = false;
                }*/

                if (correctOperation)
                {
                    buttonStart.Text = "Terminar";
                    buttonExit.Enabled = false;
                }
            }
            else if (buttonStart.Text.Equals("Terminar"))
            {
                buttonStart.Text = "Iniciar";
                buttonExit.Enabled = true;
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

        /// <summary>
        /// Este metodo es el evento de cierre del formulario cuando no pasa la validacion de inicio
        /// </summary>
        private void ShownFormEvent(object sender, EventArgs e)
        {
            Close();
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

        private void DoFingerActivity(int arduinoIndex, string message)
        {
            ArduinoController.GetInstance().SendMessage(arduinoIndex, message);
            string recivedMessage = ArduinoController.GetInstance().GetMessage(ArduinoController.RIGHT_HAND_ARDUINO);
            if (recivedMessage == null)
            {
                MessageBox.Show("Ha ocurrido un problema de conexion con el guante, revise que los guantes esten bien conectados");
                buttonStart.Text = "Iniciar";
                buttonExit.Enabled = true;
            }
            else if (recivedMessage.ToString().Equals("BIEN\r"))
            {
                MessageBox.Show("BIEN");
            }
            else if (recivedMessage.ToString().Equals("MAL\r"))
            {
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
            comboBoxStudents.DisplayMember = "Name";


        }
    }
}
