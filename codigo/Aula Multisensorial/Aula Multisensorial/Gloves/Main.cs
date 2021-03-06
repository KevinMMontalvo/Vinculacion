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
        private static Main instance = null;
        private readonly string teacherId;
        private delegate void ControlEvent(object sender, EventArgs e);
        private bool isFunctionalLevel;

        private Main(string teacherId)
        {
            InitializeComponent();
            this.teacherId = teacherId;
            Visible = true;
        }

        private void Main_Load(object sender, EventArgs e)
        {
            ChecklLevelType();
            if (!isFunctionalLevel)
            {
                LoadStudentsList();
            }
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

            if (comboBoxStudents.SelectedIndex == -1 && !isFunctionalLevel)
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
                    SetStartActivity();
                }
                else
                {
                    return;
                }

                if (isFunctionalLevel)
                {
                    correctOperation = ArduinoController.GetInstance().SendMessage(ArduinoController.LEFT_HAND_ARDUINO,"ON");
                    correctOperation &= ArduinoController.GetInstance().SendMessage(ArduinoController.RIGHT_HAND_ARDUINO, "ON");
                }
                else
                {
                    AddLabelsEvents();
                }

                if (isFunctionalLevel && !correctOperation)
                {
                    MessageBox.Show("Hubo un problema de comunicacion con algun guante");
                    ArduinoController.GetInstance().CloseConnection(ArduinoController.RIGHT_HAND_ARDUINO);
                    ArduinoController.GetInstance().CloseConnection(ArduinoController.LEFT_HAND_ARDUINO);
                    SetEndActivity();
                }
            }
            else if (buttonStart.Text.Equals("Terminar"))
            {
                SetEndActivity();
                RemoveClickEvents();
                ArduinoController.GetInstance().CloseConnection(ArduinoController.RIGHT_HAND_ARDUINO);
                ArduinoController.GetInstance().CloseConnection(ArduinoController.LEFT_HAND_ARDUINO);
            }
        }

        private void buttonExit_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void Main_FormClosing(object sender, FormClosingEventArgs e)
        {
            ArduinoController.GetInstance().CloseConnection(ArduinoController.LEFT_HAND_ARDUINO);
            ArduinoController.GetInstance().CloseConnection(ArduinoController.RIGHT_HAND_ARDUINO);
            instance = null;
        }

        private void Main_FormClosed(object sender, FormClosedEventArgs e)
        {
            Dispose();
        }

        /// <summary>
        /// Metodo para obtener la instancia de patron singleton de la clase
        /// </summary>
        /// <param name="teacherId">String con el Id del docente para ejecutar el constructor</param>
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
        /// Agrega los eventos a los labels de los dedos
        /// </summary>
        private void AddLabelsEvents()
        {
            for (int i = 1; i <= 10; i++)
            {
                Controls["label" + i].Click += new EventHandler(new ControlEvent(OnClickLabelEvent));
                Controls["label" + i].MouseHover += new EventHandler(new ControlEvent(HoverLabelEvent));
                Controls["label" + i].MouseLeave += new EventHandler(new ControlEvent(MouseLeaveEvent));
            }
        }

        /// <summary>
        /// Elimina los eventos a los labels de los dedos
        /// </summary>
        private void RemoveClickEvents()
        {
            for (int i = 1; i <= 10; i++)
            {
                Controls["label" + i].Click -= new EventHandler(new ControlEvent(OnClickLabelEvent));
                Controls["label" + i].MouseHover -= new EventHandler(new ControlEvent(HoverLabelEvent));
                Controls["label" + i].MouseLeave -= new EventHandler(new ControlEvent(MouseLeaveEvent));
            }
        }

        /// <summary>
        /// Ejecuta la accion al dar clic en algun dedo, envia el mensaje al arduino y esta en espera de la respuesta
        /// luego inserta la actividad en la base de datos
        /// </summary>
        /// <param name="arduinoIndex">Int constante de arduino al que se corresponde el dedo seleccionado</param>
        /// <param name="fingerMessage">Mensaje aue se va a enviar al dispositivo</param>
        private void DoFingerActivity(int arduinoIndex, string fingerMessage)
        {

            GlobeActivityRegister globeActivity = new GlobeActivityRegister();
            globeActivity.StudentId = ((Student)comboBoxStudents.SelectedItem).Id;
            globeActivity.Finger = fingerMessage;
            globeActivity.Datetime = DateTime.Now.Date; //solo fecha para poder agrupar
            globeActivity.Level = new LevelAccess().GetLevelById(new TeacherAccess().GetTeacherById(teacherId).LevelId).Name;
            globeActivity.Period = new PeriodAccess().GetActivePeriod().Name;

            ArduinoController.GetInstance().SendMessage(arduinoIndex, fingerMessage);
            string recivedMessage = ArduinoController.GetInstance().GetMessage(arduinoIndex);
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

        /// <summary>
        /// Comprueba y realiza la conexion con el dispositivo
        /// </summary>
        /// <param name="arduinoIndex">Int constante de arduino</param>
        /// <returns>Retorna verdadero si la insercion fue exitosa</returns>
        private bool ConnectGlobe(int arduinoIndex)
        {
            bool connectionSuccessful = ArduinoController.GetInstance().StartConnection(arduinoIndex);
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
        /// Comprueba si el nivel es funcional segun el nombre asignado el curso
        /// </summary>
        private void ChecklLevelType()
        {
            Level level = new LevelAccess().GetLevelById(new TeacherAccess().GetTeacherById(teacherId).LevelId);
            isFunctionalLevel = level.Name.ToUpper().Contains("FUNCIONAL");
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
        /// terminado y se vuelve los elementos del Form a su estado inicial
        /// </summary>
        private void SetEndActivity()
        {
            buttonStart.Text = "Iniciar";
            buttonExit.Enabled = true;
            comboBoxStudents.Enabled = true;
            buttonStart.BackColor = Color.Green;
        }
    }
}
