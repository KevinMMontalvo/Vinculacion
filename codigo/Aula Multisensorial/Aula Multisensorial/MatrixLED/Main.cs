using Aula_Multisensorial.Access;
using Aula_Multisensorial.Model;
using Aula_Multisensorial.Utils;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO.Ports;
using System.Windows.Forms;

namespace Aula_Multisensorial.MatrixLED
{
    public partial class Main : Form
    {
        private static readonly string SHAPE_CONFIG_CODE = "CF-";
        private static readonly string COLOR_CONFIG_CODE = "CC-";
        private static readonly string SEQUENCE_CONFIG_CODE = "CS-";
        private static readonly string LEVEL_CONFIG_CODE = "CN-";
        private static readonly string BRIGHTNESS_CONFIG_CODE = "CB-";
        private static readonly string APPEARANCES_CONFIG_CODE = "CA-";
        private readonly string teacherId;
        private string shapeConfiguration;
        private int colorConfiguration;
        private int sequenceConfiguration;
        private int levelConfiguration;
        private int brightnessConfiguration;
        private int appearancesConfiguration;
        private delegate void ControlEvent(object sender, EventArgs e);

        public Main(string teacherId)
        {
            InitializeComponent();
            this.teacherId = teacherId;
            ControlBox = false;
            Visible = true;
        }

        private void Main_Load(object sender, EventArgs e)
        {
            bool connectionSuccessful = ArduinoController.GetInstance().StartConnection(ArduinoController.MATRIX_ARDUINO);

            if (!connectionSuccessful)
            {
                MessageBox.Show("No se pudo conectar con el dispositivo (Matriz de LED)");
                Shown += new EventHandler(new ControlEvent(ShownFormEvent)); // Cierra el formulario automaticamente
                return;
            }

            try
            {
                LoadShapeConfiguration();
                LoadColorConfiguration();
                LoadSequenceConfiguration();
                LoadLevelConfiguration();
                LoadBrightnessConfiguration();
                LoadAppearancesConfiguration();
                ShowConfigurationInformation();
                LoadStudentsList();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
                Shown += new EventHandler(new ControlEvent(ShownFormEvent)); // Cierra el formulario automaticamente
            }
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            if (comboBoxStudents.SelectedIndex == -1)
            {
                return;
            }

            if (buttonStart.Text.Equals("Iniciar"))
            {
                buttonStart.Text = "Terminar";
                buttonSetup.Enabled = false;
                buttonExit.Enabled = false;
                buttonStart.BackColor = Color.DarkRed;
            }
            else if (buttonStart.Text.Equals("Terminar"))
            {
                buttonStart.Text = "Iniciar";
                buttonSetup.Enabled = true;
                buttonExit.Enabled = true;
                buttonStart.BackColor = Color.Green;
            }
        }

        private void buttonSetup_Click(object sender, EventArgs e)
        {
            Configuration configuration = new Configuration(this, shapeConfiguration, colorConfiguration, sequenceConfiguration, levelConfiguration, brightnessConfiguration, appearancesConfiguration);
            //Configuration configuration = new Configuration(this, "1111111100000000", 5, 3, 3, 4, 5);
            configuration.Show();
            Hide();
        }

        private void buttonExit_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void Main_FormClosing(object sender, FormClosingEventArgs e)
        {
            ArduinoController.GetInstance().CloseConnection(ArduinoController.MATRIX_ARDUINO);
            Dispose();
        }

        private void LoadShapeConfiguration()
        {
            bool commandSendedProperly;
            List<byte> configuration;

            commandSendedProperly = ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, SHAPE_CONFIG_CODE);
            if (!commandSendedProperly)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            configuration = ArduinoController.GetInstance().GetMessageInBytes(ArduinoController.MATRIX_ARDUINO);
            if (configuration==null)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            if (configuration[0] != 'F' || configuration.Count != 6)
            {
                throw new Exception("Error CRITICO en la sincronizacion de la configuracion con la Matriz LED");
            }

            char upperRowsConfiguration = (char)configuration[2];
            char lowerRowsConfiguration = (char)configuration[3];

            shapeConfiguration = Convert.ToString(upperRowsConfiguration, 2).PadLeft(8, '0') + Convert.ToString(lowerRowsConfiguration, 2).PadLeft(8, '0');
        }

        private void LoadColorConfiguration()
        {
            bool commandSendedProperly;
            string configuration;

            commandSendedProperly = ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, COLOR_CONFIG_CODE);
            if (!commandSendedProperly)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            configuration = ArduinoController.GetInstance().GetMessage(ArduinoController.MATRIX_ARDUINO);
            if (configuration == null)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            string[] configurationStrings = configuration.Split('-');

            if (!configurationStrings[0].Equals("C") || configurationStrings.Length != 2 || configurationStrings[1].Length != 3 || !configurationStrings[1].Substring(0, 1).Equals("0"))
            {
                throw new Exception();
            }

            colorConfiguration = int.Parse(configurationStrings[1]);
        }

        private void LoadSequenceConfiguration()
        {
            bool commandSendedProperly;
            string configuration;

            commandSendedProperly = ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, SEQUENCE_CONFIG_CODE);
            if (!commandSendedProperly)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            configuration = ArduinoController.GetInstance().GetMessage(ArduinoController.MATRIX_ARDUINO);
            if (configuration == null)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            string[] configurationStrings = configuration.Split('-');

            if (!configurationStrings[0].Equals("S") || configurationStrings.Length != 2 || configurationStrings[1].Length != 3 || !configurationStrings[1].Substring(0, 1).Equals("0"))
            {
                throw new Exception();
            }

            sequenceConfiguration = int.Parse(configurationStrings[1]);
        }

        private void LoadLevelConfiguration()
        {
            bool commandSendedProperly;
            string configuration;

            commandSendedProperly = ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, LEVEL_CONFIG_CODE);
            if (!commandSendedProperly)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            configuration = ArduinoController.GetInstance().GetMessage(ArduinoController.MATRIX_ARDUINO);
            if (configuration == null)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            string[] configurationStrings = configuration.Split('-');

            if (!configurationStrings[0].Equals("N") || configurationStrings.Length != 2 || configurationStrings[1].Length != 3)
            {
                throw new Exception("Error CRITICO en la sincronizacion de la configuracion con la Matriz LED");
            }

            levelConfiguration = int.Parse(configurationStrings[1]);
        }

        private void LoadBrightnessConfiguration()
        {
            bool commandSendedProperly;
            string configuration;

            commandSendedProperly = ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, BRIGHTNESS_CONFIG_CODE);
            if (!commandSendedProperly)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            configuration = ArduinoController.GetInstance().GetMessage(ArduinoController.MATRIX_ARDUINO);
            if (configuration == null)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            string[] configurationStrings = configuration.Split('-');

            if (!configurationStrings[0].Equals("L") || configurationStrings.Length != 2 || configurationStrings[1].Length != 3 || !configurationStrings[1].Substring(0, 1).Equals("0"))
            {
                throw new Exception("Error CRITICO en la sincronizacion de la configuracion con la Matriz LED");
            }

            brightnessConfiguration = int.Parse(configurationStrings[1]);
        }

        private void LoadAppearancesConfiguration()
        {
            bool commandSendedProperly;
            string configuration;

            commandSendedProperly = ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, APPEARANCES_CONFIG_CODE);
            if (!commandSendedProperly)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            configuration = ArduinoController.GetInstance().GetMessage(ArduinoController.MATRIX_ARDUINO);
            if (configuration == null)
            {
                throw new Exception("Error en la conexion con la Matriz LED");
            }

            string[] configurationStrings = configuration.Split('-');

            if (!configurationStrings[0].Equals("A") || configurationStrings.Length != 2 || configurationStrings[1].Length != 3)
            {
                throw new Exception("Error CRITICO en la sincronizacion de la configuracion con la Matriz LED");
            }

            appearancesConfiguration = int.Parse(configurationStrings[1]);
        }

        private void ShowConfigurationInformation()
        {
            Label label = new Label();
            label.AutoSize = true;
            label.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label.ForeColor = Color.White;
            label.Location = new Point(200, 400);
            label.Name = "label";
            label.Size = new Size(24, 20);
            label.Text = "Número de colores: " + colorConfiguration + "\nSecuencia de movimiento: ";

            switch (sequenceConfiguration)
            {
                case 0:
                    label.Text += "Horizontal Derecha";
                    break;
                case 1:
                    label.Text += "Horizontal Izquierda";
                    break;
                case 2:
                    label.Text += "Vertical Abajo";
                    break;
                case 3:
                    label.Text += "Vertical Arriba";
                    break;
                case 4:
                    label.Text += "Rotación Horaria";
                    break;
                case 5:
                    label.Text += "Rotación Antihoraria";
                    break;
                case 6:
                    label.Text += "Rotación Cuadrada Horaria";
                    break;
                case 7:
                    label.Text += "Rotación Cuadrada Antihoraria";
                    break;
            }
            label.Text += "\nNivel de rapidez: " + (4200 - (200 * levelConfiguration)) / 1000F + " segundos - Nivel " + levelConfiguration;
            label.Text += "\nNivel de Brillo: " + brightnessConfiguration;
            label.Text += "\nProbabilidad de aparición: " + (appearancesConfiguration + 1) * 10 + "%";
            Controls.Add(label);
        }

        /// <summary>
        /// Este metodo es el evento de cierre del formulario cuando no pasa la validacion de inicio
        /// </summary>
        private void ShownFormEvent(object sender, EventArgs e)
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
    }
}
