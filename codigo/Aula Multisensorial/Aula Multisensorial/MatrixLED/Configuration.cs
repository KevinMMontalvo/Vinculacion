﻿using System;
using System.Drawing;
using System.Reflection;
using System.Windows.Forms;
using Aula_Multisensorial.Utils;

namespace Aula_Multisensorial.MatrixLED
{
    public partial class Configuration : Form
    {
        private static readonly Color GREEN_ENABLED = Color.FromArgb(43, 192, 162);
        private delegate void ControlEvent(object sender, EventArgs e);
        private Main parentForm;
        private int[,] shapeBuffer = new int[4, 4];
        private string shapeConfiguration;
        private int colorConfiguration;
        private int sequenceConfiguration;
        private int levelConfiguration;
        private int brightnessConfiguration;
        private int appearancesConfiguration;
        private int contadorIntervalo = 1;

        public Configuration(Main parentForm, string shapeConfiguration, int colorConfiguration, int sequenceConfiguration, int levelConfiguration, int brightnessConfiguration, int appearancesConfiguration)
        {
            InitializeComponent();
            this.parentForm = parentForm;
            this.shapeConfiguration = shapeConfiguration;
            this.colorConfiguration = colorConfiguration;
            this.sequenceConfiguration = sequenceConfiguration;
            this.levelConfiguration = levelConfiguration;
            this.brightnessConfiguration = brightnessConfiguration;
            this.appearancesConfiguration = appearancesConfiguration;

        }

        private void Configuration_Load(object sender, EventArgs e)
        {
            ControlBox = false;
            ChangeButtonsEnableState(false);
            timer.Interval = 4200 - (200 * levelConfiguration);
            LoadShapeBuffer();
            timer.Start();
            Visible = true;
        }

        private void buttonShape_Click(object sender, EventArgs e)
        {
            timer.Stop();
            ChangeButtonsEnableState(true);
            panelTools.Controls.Clear();
            LoadShapeBuffer();
            RenderMatrix(GREEN_ENABLED);
            AddAcceptAndCancepButtons(new ControlEvent(SendShapeConfiguration), new ControlEvent(ShapeCancelButtonEvent));
        }

        private void buttonColors_Click(object sender, EventArgs e)
        {
            timer.Start();
            AddColorControls();
            PaintColorControls(colorConfiguration);
            AddAcceptAndCancepButtons(new ControlEvent(SendColorConfiguration), new ControlEvent(GenericCancelEvent));
        }

        private void buttonSequence_Click(object sender, EventArgs e)
        {
            timer.Start();
            AddSequenceControls();
            SetSequenceComboBox(sequenceConfiguration);
            AddAcceptAndCancepButtons(new ControlEvent(SendSequenceConfiguration), new ControlEvent(GenericCancelEvent));
        }

        private void buttonLevel_Click(object sender, EventArgs e)
        {
            timer.Start();
            AddLevelControls();
            AddAcceptAndCancepButtons(new ControlEvent(SendLevelConfiguration), new ControlEvent(GenericCancelEvent));
        }

        private void buttonBrightness_Click(object sender, EventArgs e)
        {
            timer.Stop();
            SetMatrixBrightness(1);
            panelTools.Controls.Clear();
            AddBrightnessControls();
            AddAcceptAndCancepButtons(new ControlEvent(SendBrightnessConfiguration), new ControlEvent(GenericCancelEvent));
        }

        private void buttonAppearances_Click(object sender, EventArgs e)
        {
            timer.Start();
            panelTools.Controls.Clear();
            AddAppearancesControls();
            AddAcceptAndCancepButtons(new ControlEvent(SendAppearancesConfiguration), new ControlEvent(GenericCancelEvent));
        }

        private void buttonClose_Click(object sender, EventArgs e)
        {
            OpenParentForm();
        }

        /// <summary>
        /// Cambia el estado de los botones que representan la matriz para que se puedan hacer click o no
        /// </summary>
        /// <param name="enable">boleano con el estado al que se va a cambiar el estado</param>
        private void ChangeButtonsEnableState(bool enable)
        {
            button11.Enabled = enable;
            button12.Enabled = enable;
            button13.Enabled = enable;
            button14.Enabled = enable;

            button21.Enabled = enable;
            button22.Enabled = enable;
            button23.Enabled = enable;
            button24.Enabled = enable;

            button31.Enabled = enable;
            button32.Enabled = enable;
            button33.Enabled = enable;
            button34.Enabled = enable;

            button41.Enabled = enable;
            button42.Enabled = enable;
            button43.Enabled = enable;
            button44.Enabled = enable;
        }

        /// <summary>
        /// Evento que envia la configuracion de la forma y limpia los 
        /// controles de configuracion de la misma
        /// </summary>
        private void SendShapeConfiguration(object sender, EventArgs e)
        {
            if (!ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, "F-" + GetBytes()))
            {
                MessageBox.Show("No se pudo conectar con el dispositivo (Matriz de LED)");
                CloseMatrixActivity();
                return;
            }

            panelTools.Controls.Clear();
            ChangeButtonsEnableState(false);
            LoadShapeBuffer();
            timer.Start();
        }

        /// <summary>
        /// Evento de clic de los botones que representan la matriz
        /// </summary>
        private void MatrixButtonsClickEvent(object sender, EventArgs e)
        {
            Button button = (Button)sender;
            Color backgroundColor = button.BackColor;

            if (button.BackColor == Color.Gray) //no marcado
            {
                button.BackColor = GREEN_ENABLED;
            }
            else
            {
                button.BackColor = Color.Gray;
            }
        }

        /// <summary>
        /// Obtiene los bytes correspondientes a cada fila de la matriz
        /// </summary>
        /// <returns></returns>
        private string GetBytes()
        {
            string byteFila1 = GetRowBinaries(1);
            string byteFila2 = GetRowBinaries(2);
            string byteFila3 = GetRowBinaries(3);
            string byteFila4 = GetRowBinaries(4);

            shapeConfiguration = byteFila2 + byteFila1 + byteFila4 + byteFila3; //guarda la configuracion en el form

            return "" + (char)Convert.ToInt32(byteFila1, 2) + (char)Convert.ToInt32(byteFila2, 2) + (char)Convert.ToInt32(byteFila3, 2) + (char)Convert.ToInt32(byteFila4, 2);
        }

        /// <summary>
        /// Retorna en una cadena el estado de los botones de una fila
        /// </summary>
        /// <param name="row">Numero de fila que se desea obtener</param>
        /// <returns>String con el estado de los botones de una fila</returns>
        private string GetRowBinaries(int row)
        {
            string binaryNumber = "";

            for (int i = 1; i <= 4; i++)
            {
                if (Controls.Find("button" + row + i, false)[0].BackColor == GREEN_ENABLED)
                {
                    binaryNumber += "1";
                }
                else
                {
                    binaryNumber += "0";
                }
            }
            return binaryNumber;
        }

        /// <summary>
        /// Configura la forma y color con el que se muestra la matriz
        /// </summary>
        /// <param name="row">Numero de fila</param>
        /// <param name="binaryCode">Estado de la fila</param>
        /// <param name="color">Color con el que se va a rellenar el boton de la fila</param>
        private void SetRowBinaries(int row, string binaryCode, Color color)
        {
            for (int i = 1; i <= 4; i++)
            {
                if (binaryCode[i - 1] == '1')
                {
                    Controls.Find("button" + row + i, false)[0].BackColor = color;
                }
                else
                {
                    Controls.Find("button" + row + i, false)[0].BackColor = Color.Gray;
                }
            }
        }

        /// <summary>
        /// Evento del boton de cancelar cuando se selecciona la opcion de Forma
        /// </summary>
        private void ShapeCancelButtonEvent(object sender, EventArgs e)
        {
            panelTools.Controls.Clear();
            ChangeButtonsEnableState(false);
            LoadShapeBuffer();
            timer.Start();
        }

        /// <summary>
        /// Agrega los controles necesarios para la configuracion del nivel de color
        /// </summary>
        private void AddColorControls()
        {
            panelTools.Controls.Clear();

            for (int i = 1; i <= 9; i++)
            {
                Button button = new Button();
                button.BackColor = Color.Black;
                button.Location = new Point(30 + (i - 1) * 70, 20);
                button.Size = new Size(50, 25);
                button.Enabled = false;
                button.Name = "button" + i;
                panelTools.Controls.Add(button);
            }

            NumericUpDown numericUpDown = new NumericUpDown();
            numericUpDown.Name = "numericUpDownColor";
            numericUpDown.Value = colorConfiguration;
            numericUpDown.Minimum = 1;
            numericUpDown.Maximum = 9;
            numericUpDown.Location = new Point(300, 60);
            numericUpDown.Size = new Size(40, 26);
            numericUpDown.ForeColor = Color.White;
            numericUpDown.BackColor = Color.FromArgb(30, 29, 33);
            numericUpDown.BorderStyle = BorderStyle.None;
            numericUpDown.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            numericUpDown.TextAlign = HorizontalAlignment.Center;
            numericUpDown.ValueChanged += new EventHandler(new ControlEvent(NumberColorChangedUpDownEvent));
            panelTools.Controls.Add(numericUpDown);

        }

        /// <summary>
        /// Agrega botones de Aceptar y Cancelar, es general para la maytoria de configuraciones
        /// </summary>
        private void AddAcceptAndCancepButtons(ControlEvent acceptEvent, ControlEvent cancelEvent)
        {
            Button buttonAccept = new Button();
            Button buttonCancel = new Button();

            buttonAccept.Text = "Aceptar";
            buttonCancel.Text = "Cancelar";

            buttonAccept.ForeColor = Color.White;
            buttonCancel.ForeColor = Color.White;

            buttonAccept.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            buttonCancel.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);

            buttonAccept.BackColor = Color.FromArgb(46, 134, 193);
            buttonCancel.BackColor = Color.FromArgb(46, 134, 193);

            buttonAccept.Location = new Point(60, 100);
            buttonCancel.Location = new Point(370, 100);

            buttonAccept.Size = new Size(230, 45);
            buttonCancel.Size = new Size(230, 45);

            buttonAccept.FlatStyle = FlatStyle.Flat;
            buttonCancel.FlatStyle = FlatStyle.Flat;

            buttonAccept.FlatAppearance.BorderSize = 0;
            buttonCancel.FlatAppearance.BorderSize = 0;

            buttonAccept.Click += new EventHandler(acceptEvent);
            buttonCancel.Click += new EventHandler(cancelEvent);

            panelTools.Controls.Add(buttonAccept);
            panelTools.Controls.Add(buttonCancel);
        }

        /// <summary>
        /// Evento del boton de cancelar, funciona para la mayoria de configuraciones
        /// </summary>
        private void GenericCancelEvent(object sender, EventArgs e)
        {
            panelTools.Controls.Clear();
            timer.Start();
        }

        /// <summary>
        /// Pinta los botones de la configuracion de colores
        /// </summary>
        /// <param name="level">Int que representa el nivel de configuracion</param>
        private void PaintColorControls(int level)
        {
            //limpia todos los colores
            for (int i = 1; i <= 9; i++)
            {
                panelTools.Controls.Find("button" + i, false)[0].BackColor = Color.Black;
            }

            panelTools.Controls.Find("button1", false)[0].BackColor = Color.White;

            if (level >= 2)
            {
                panelTools.Controls.Find("button2", false)[0].BackColor = Color.Yellow;
            }
            if (level >= 3)
            {
                panelTools.Controls.Find("button3", false)[0].BackColor = Color.Blue;
            }
            if (level >= 4)
            {
                panelTools.Controls.Find("button4", false)[0].BackColor = Color.Red;
            }
            if (level >= 5)
            {
                panelTools.Controls.Find("button5", false)[0].BackColor = Color.Orange;
            }
            if (level >= 6)
            {
                panelTools.Controls.Find("button6", false)[0].BackColor = Color.ForestGreen;
            }
            if (level >= 7)
            {
                panelTools.Controls.Find("button7", false)[0].BackColor = Color.Purple;
            }
            if (level >= 8)
            {
                panelTools.Controls.Find("button8", false)[0].BackColor = Color.DeepSkyBlue;
            }
            if (level == 9)
            {
                panelTools.Controls.Find("button9", false)[0].BackColor = Color.LightPink;
            }
        }

        /// <summary>
        /// Evento del control de cambio de nivel de color
        /// </summary>
        private void NumberColorChangedUpDownEvent(object sender, EventArgs e)
        {
            NumericUpDown numericUpDown = (NumericUpDown)sender;
            int level = (int)numericUpDown.Value;
            PaintColorControls(level);
        }

        /// <summary>
        /// Evento que envia la configuracion de color y limpia los 
        /// controles de configuracion de la misma
        /// </summary>
        private void SendColorConfiguration(object sender, EventArgs e)
        {
            NumericUpDown numericUpDown = (NumericUpDown)panelTools.Controls["numericUpDownColor"];
            colorConfiguration = (int)numericUpDown.Value;

            if (!ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, "C-000" + colorConfiguration))
            {
                MessageBox.Show("No se pudo conectar con el dispositivo (Matriz de LED)");
                CloseMatrixActivity();
                return;
            }
            panelTools.Controls.Clear();
        }

        /// <summary>
        /// Agrega los controles necesarios para la configuracion de secuencia
        /// </summary>
        private void AddSequenceControls()
        {
            panelTools.Controls.Clear();

            ComboBox comboBox = new ComboBox();
            comboBox.BackColor = Color.FromArgb(30, 29, 33);
            comboBox.FlatStyle = FlatStyle.Flat;
            comboBox.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Regular, GraphicsUnit.Point, 0);
            comboBox.ForeColor = Color.White;
            comboBox.Items.AddRange(new object[] {
            "Hozontal Derecha",
            "Horizontal Izquierda",
            "Vertical Abajo",
            "Vertical Arriba",
            "Rotacion Horaria",
            "Rotacion Antihoraria",
            "Rotacion Cuadrada Horaria",
            "Rotacion Cuadrada Antihoraria"});
            comboBox.Location = new Point(175, 20);
            comboBox.Name = "comboBox";
            comboBox.Size = new Size(300, 28);
            comboBox.DropDownStyle = ComboBoxStyle.DropDownList;

            panelTools.Controls.Add(comboBox);
        }

        /// <summary>
        /// Selecciona el nivel de secuencia seleccionado
        /// </summary>
        /// <param name="sequence">Int que representa el nivel de sequencia</param>
        private void SetSequenceComboBox(int sequence)
        {
            ComboBox comboBox = (ComboBox)panelTools.Controls["comboBox"];
            comboBox.SelectedIndex = sequence;
        }

        /// <summary>
        /// Evento que envia la configuracion de secuencia y limpia los 
        /// controles de configuracion de la misma
        /// </summary>
        private void SendSequenceConfiguration(object sender, EventArgs e)
        {
            ComboBox comboBox = (ComboBox)panelTools.Controls["comboBox"];
            sequenceConfiguration = comboBox.SelectedIndex;
            if (!ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, "S-000" + sequenceConfiguration))
            {
                MessageBox.Show("No se pudo conectar con el dispositivo (Matriz de LED)");
                CloseMatrixActivity();
                return;
            }
            LoadShapeBuffer();
            panelTools.Controls.Clear();
        }

        /// <summary>
        /// Agrega los controles necesarios para la configuracion de nivel
        /// </summary>
        private void AddLevelControls()
        {
            panelTools.Controls.Clear();

            TrackBar trackBar = new TrackBar();
            trackBar.Name = "trackBar";
            trackBar.Value = levelConfiguration;
            trackBar.Minimum = 1;
            trackBar.Maximum = 16;
            trackBar.BackColor = Color.FromArgb(30, 29, 33);
            trackBar.Location = new Point(200, 50);
            trackBar.Size = new Size(255, 45);
            trackBar.ValueChanged += new EventHandler(new ControlEvent(LevelNumberChangedEvent));
            panelTools.Controls.Add(trackBar);

            Label label = new Label();
            label.Name = "label";
            label.Text = levelConfiguration.ToString();
            label.Location = new Point(460, 50);
            label.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label.ForeColor = Color.White;
            panelTools.Controls.Add(label);
        }

        /// <summary>
        /// Evento del control de cambio de nivel
        /// </summary>
        private void LevelNumberChangedEvent(object sender, EventArgs e)
        {
            TrackBar trackBar = (TrackBar)sender;
            Label label = (Label)panelTools.Controls["label"];
            int level = trackBar.Value;
            timer.Interval = 4200 - (200 * level);
            label.Text = level.ToString();
        }

        /// <summary>
        /// Evento que envia la configuracion de secuencia y limpia los 
        /// controles de configuracion de la misma
        /// </summary>
        private void SendLevelConfiguration(object sender, EventArgs e)
        {
            bool sendedProperly;
            TrackBar trackbar = (TrackBar)panelTools.Controls["trackBar"];
            levelConfiguration = trackbar.Value;
            timer.Interval = 4200 - (200 * levelConfiguration);

            if (levelConfiguration < 11)
            {
                sendedProperly = ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, "N-000" + (levelConfiguration - 1));
            }
            else
            {
                sendedProperly = ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, "N-00" + (levelConfiguration - 1));
            }

            if (!sendedProperly)
            {
                MessageBox.Show("No se pudo conectar con el dispositivo (Matriz de LED)");
                CloseMatrixActivity();
                return;
            }
            panelTools.Controls.Clear();
        }

        /// <summary>
        /// Agrega los controles necesarios para la configuracion del brillo
        /// </summary>
        private void AddBrightnessControls()
        {
            TrackBar trackBar = new TrackBar();
            trackBar.Name = "trackBar";
            trackBar.Value = brightnessConfiguration;
            trackBar.Minimum = 1;
            trackBar.Maximum = 8;
            trackBar.BackColor = Color.FromArgb(30, 29, 33);
            trackBar.Location = new Point(200, 50);
            trackBar.Size = new Size(255, 45);
            trackBar.ValueChanged += new EventHandler(new ControlEvent(BrightnessLevelChangedEvent));
            panelTools.Controls.Add(trackBar);

            Label label = new Label();
            label.Name = "label";
            label.Text = levelConfiguration.ToString();
            label.Location = new Point(460, 50);
            label.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label.ForeColor = Color.White;
            panelTools.Controls.Add(label);
        }

        /// <summary>
        /// Evento del control de cambio de brillo
        /// </summary>
        private void BrightnessLevelChangedEvent(object sender, EventArgs e)
        {
            TrackBar trackbar = (TrackBar)sender;
            Label label = (Label)panelTools.Controls["label"];
            int level = trackbar.Value;
            label.Text = level.ToString();
            SetMatrixBrightness(level);
        }

        /// <summary>
        /// Evento que envia la configuracion de brillo y limpia los 
        /// controles de configuracion de la misma
        /// </summary>
        private void SendBrightnessConfiguration(object sender, EventArgs e)
        {
            TrackBar trackbar = (TrackBar)panelTools.Controls["numericUpDown"];
            brightnessConfiguration = trackbar.Value;
            if (!ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, "L-000" + brightnessConfiguration))
            {
                MessageBox.Show("No se pudo conectar con el dispositivo (Matriz de LED)");
                CloseMatrixActivity();
                return;
            }
            panelTools.Controls.Clear();
            timer.Start();
        }

        /// <summary>
        /// Evento del boton Cancelar de la configuracion del brillo
        /// </summary>
        private void BrightnessCancelButtonEvent(object sender, EventArgs e)
        {
            panelTools.Controls.Clear();
            timer.Start();
        }

        /// <summary>
        /// Cambia y muestra la configuracion del brillo de la matriz
        /// </summary>
        /// <param name="brightnessLevel">Int que representa el nivel de brillo</param>
        private void SetMatrixBrightness(int brightnessLevel)
        {
            int colorNumber = 55 + 25 * brightnessLevel;
            SetRowBinaries(1, "1111", Color.FromArgb(colorNumber, colorNumber, colorNumber));
            SetRowBinaries(2, "1111", Color.FromArgb(colorNumber, colorNumber, colorNumber));
            SetRowBinaries(3, "1111", Color.FromArgb(colorNumber, colorNumber, colorNumber));
            SetRowBinaries(4, "1111", Color.FromArgb(colorNumber, colorNumber, colorNumber));
        }

        /// <summary>
        /// Agrega los controles necesarios para la configuracion de apariciones
        /// </summary>
        private void AddAppearancesControls()
        {
            TrackBar trackBar = new TrackBar();
            trackBar.Name = "trackBar";
            trackBar.Value = appearancesConfiguration;
            trackBar.Minimum = 1;
            trackBar.Maximum = 10;
            trackBar.SmallChange = 1;
            trackBar.LargeChange = 1;
            trackBar.TickFrequency = 1;
            trackBar.BackColor = Color.FromArgb(30, 29, 33);
            trackBar.Location = new Point(200, 50);
            trackBar.Size = new Size(255, 45);
            trackBar.ValueChanged += new EventHandler(new ControlEvent(AppearancesLevelChangedEvent));
            panelTools.Controls.Add(trackBar);

            Label label = new Label();
            label.Name = "label";
            label.Text = appearancesConfiguration*10 + "%";
            label.Location = new Point(460, 50);
            label.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label.ForeColor = Color.White;
            panelTools.Controls.Add(label);
        }

        /// <summary>
        /// Evento del control de cambio de nivel apariciones
        /// </summary>
        private void AppearancesLevelChangedEvent(object sender, EventArgs e)
        {
            TrackBar trackbar = (TrackBar)sender;
            Label label = (Label)panelTools.Controls["label"];
            int level = trackbar.Value *10;
            label.Text = level+"%";
        }

        /// <summary>
        /// Evento que envia la configuracion del nivel de apariciones y limpia los 
        /// controles de configuracion de la misma
        /// </summary>
        private void SendAppearancesConfiguration(object sender, EventArgs e)
        {
            TrackBar trackbar = (TrackBar)panelTools.Controls["trackBar"];
            appearancesConfiguration = trackbar.Value;
            if (!ArduinoController.GetInstance().SendMessage(ArduinoController.MATRIX_ARDUINO, "A-000" + (appearancesConfiguration / 10 - 1)))
            {
                MessageBox.Show("No se pudo conectar con el dispositivo (Matriz de LED)");
                CloseMatrixActivity();
                return;
            }
            panelTools.Controls.Clear();
        }

        /// <summary>
        /// Evento del timer para realizar la animacion
        /// </summary>
        private void timer_Tick(object sender, EventArgs e)
        {
            if (sequenceConfiguration == 0) //desplazamiento derecho
            {
                int[] tempColumn = new int[4];

                //guarda ultima columna
                for (int i = 0; i < 4; i++)
                {
                    tempColumn[i] = shapeBuffer[i, 3];
                }

                //desplaza las columnas a la derecha
                for (int i = 3; i > 0; i--)
                {
                    for (int j = 0; j < 4; j++)
                    {
                        shapeBuffer[j, i] = shapeBuffer[j, i - 1];
                    }
                }

                //inserta la columna guardada
                for (int i = 0; i < 4; i++)
                {
                    shapeBuffer[i, 0] = tempColumn[i];
                }
            }
            else if (sequenceConfiguration == 1) //desplazamiento izquierdo
            {
                int[] tempColumn = new int[4];

                //guarda primera columna
                for (int i = 0; i < 4; i++)
                {
                    tempColumn[i] = shapeBuffer[i, 0];
                }

                //desplaza las columnas a la izquierda
                for (int i = 0; i < 3; i++)
                {
                    for (int j = 0; j < 4; j++)
                    {
                        shapeBuffer[j, i] = shapeBuffer[j, i + 1];
                    }
                }

                //inserta la columna guardada al final
                for (int i = 0; i < 4; i++)
                {
                    shapeBuffer[i, 3] = tempColumn[i];
                }
            }
            else if (sequenceConfiguration == 2) //desplazamiento abajo
            {
                int[] tempRow = new int[4];

                //guarda ultima fila
                for (int i = 0; i < 4; i++)
                {
                    tempRow[i] = shapeBuffer[3, i];
                }

                //desplaza las filas hacia abajo
                for (int i = 3; i > 0; i--)
                {
                    for (int j = 0; j < 4; j++)
                    {
                        shapeBuffer[i, j] = shapeBuffer[i - 1, j];
                    }
                }

                //inserta la fila guardada al inicio
                for (int i = 0; i < 4; i++)
                {
                    shapeBuffer[0, i] = tempRow[i];
                }
            }
            else if (sequenceConfiguration == 3) //desplazamiento arriba
            {
                int[] tempRow = new int[4];

                //guarda primera fila
                for (int i = 0; i < 4; i++)
                {
                    tempRow[i] = shapeBuffer[0, i];
                }

                //desplaza las filas hacia arriba
                for (int i = 0; i < 3; i++)
                {
                    for (int j = 0; j < 4; j++)
                    {
                        shapeBuffer[i, j] = shapeBuffer[i + 1, j];
                    }
                }

                //inserta la fila guardada ad final
                for (int i = 0; i < 4; i++)
                {
                    shapeBuffer[3, i] = tempRow[i];
                }
            }
            else if (sequenceConfiguration == 4) //rotacion horaria
            {
                int[,] tempBuffer = new int[4, 4];

                //copia los valores en la matrix temporal
                for (int i = 0; i < 4; i++)
                {
                    for (int j = 0; j < 4; j++)
                    {
                        tempBuffer[i, j] = shapeBuffer[i, j];
                    }
                }

                //hace la rotacion horaria
                for (int i = 0; i < 4; i++)
                {
                    for (int j = 0; j < 4; j++)
                    {
                        shapeBuffer[j, 3 - i] = tempBuffer[i, j];
                    }
                }
            }
            else if (sequenceConfiguration == 5) //rotacion antihoraria
            {
                int[,] tempBuffer = new int[4, 4];

                //copia los valores en la matrix temporal
                for (int i = 0; i < 4; i++)
                {
                    for (int j = 0; j < 4; j++)
                    {
                        tempBuffer[i, j] = shapeBuffer[i, j];
                    }
                }

                //hace la rotacion horaria
                for (int i = 0; i < 4; i++)
                {
                    for (int j = 0; j < 4; j++)
                    {
                        shapeBuffer[3 - j, i] = tempBuffer[i, j];
                    }
                }
            }
            else if (sequenceConfiguration == 6) //rotacion cuadrada horaria
            {
                int[,] tempBuffer = new int[2, 2];

                //copia el primer cuadrado
                tempBuffer[0, 0] = shapeBuffer[0, 0];
                tempBuffer[0, 1] = shapeBuffer[0, 1];
                tempBuffer[1, 0] = shapeBuffer[1, 0];
                tempBuffer[1, 1] = shapeBuffer[1, 1];

                //hace la rotacion
                shapeBuffer[0, 0] = shapeBuffer[2, 0];
                shapeBuffer[0, 1] = shapeBuffer[2, 1];
                shapeBuffer[1, 0] = shapeBuffer[3, 0];
                shapeBuffer[1, 1] = shapeBuffer[3, 1];

                shapeBuffer[2, 0] = shapeBuffer[2, 2];
                shapeBuffer[2, 1] = shapeBuffer[2, 3];
                shapeBuffer[3, 0] = shapeBuffer[3, 2];
                shapeBuffer[3, 1] = shapeBuffer[3, 3];

                shapeBuffer[2, 2] = shapeBuffer[0, 2];
                shapeBuffer[2, 3] = shapeBuffer[0, 3];
                shapeBuffer[3, 2] = shapeBuffer[1, 2];
                shapeBuffer[3, 3] = shapeBuffer[1, 3];

                shapeBuffer[0, 2] = tempBuffer[0, 0];
                shapeBuffer[0, 3] = tempBuffer[0, 1];
                shapeBuffer[1, 2] = tempBuffer[1, 0];
                shapeBuffer[1, 3] = tempBuffer[1, 1];
            }
            else if (sequenceConfiguration == 7) //rotacion cuadrada antihoraria
            {
                int[,] tempBuffer = new int[2, 2];

                //copia el primer cuadrado
                tempBuffer[0, 0] = shapeBuffer[0, 0];
                tempBuffer[0, 1] = shapeBuffer[0, 1];
                tempBuffer[1, 0] = shapeBuffer[1, 0];
                tempBuffer[1, 1] = shapeBuffer[1, 1];

                //hace la rotacion
                shapeBuffer[0, 0] = shapeBuffer[0, 2];
                shapeBuffer[0, 1] = shapeBuffer[0, 3];
                shapeBuffer[1, 0] = shapeBuffer[1, 2];
                shapeBuffer[1, 1] = shapeBuffer[1, 3];

                shapeBuffer[0, 2] = shapeBuffer[2, 2];
                shapeBuffer[0, 3] = shapeBuffer[2, 3];
                shapeBuffer[1, 2] = shapeBuffer[3, 2];
                shapeBuffer[1, 3] = shapeBuffer[3, 3];

                shapeBuffer[2, 2] = shapeBuffer[2, 0];
                shapeBuffer[2, 3] = shapeBuffer[2, 1];
                shapeBuffer[3, 2] = shapeBuffer[3, 0];
                shapeBuffer[3, 3] = shapeBuffer[3, 1];

                shapeBuffer[2, 0] = tempBuffer[0, 0];
                shapeBuffer[2, 1] = tempBuffer[0, 1];
                shapeBuffer[3, 0] = tempBuffer[1, 0];
                shapeBuffer[3, 1] = tempBuffer[1, 1];
            }

            //envia a pintar la matriz segun el color que toca
            if (contadorIntervalo == 1)
            {
                RenderMatrix(Color.White);
            }
            else if (contadorIntervalo == 2)
            {
                RenderMatrix(Color.Yellow);
            }
            else if (contadorIntervalo == 3)
            {
                RenderMatrix(Color.Blue);
            }
            else if (contadorIntervalo == 4)
            {
                RenderMatrix(Color.Red);
            }
            else if (contadorIntervalo == 5)
            {
                RenderMatrix(Color.Orange);
            }
            else if (contadorIntervalo == 6)
            {
                RenderMatrix(Color.ForestGreen);
            }
            else if (contadorIntervalo == 7)
            {
                RenderMatrix(Color.Purple);
            }
            else if (contadorIntervalo == 8)
            {
                RenderMatrix(Color.DeepSkyBlue);
            }
            else if (contadorIntervalo == 9)
            {
                RenderMatrix(Color.LightPink);
            }

            //controla el cambio de color
            if (contadorIntervalo >= colorConfiguration)
            {
                contadorIntervalo = 1;
            }
            else
            {
                contadorIntervalo++;
            }
        }

        /// <summary>
        /// Guarda el buffer a partir de la configuracion 
        /// </summary>
        private void LoadShapeBuffer()
        {
            int contador = 0;

            for (int j = 0; j < 4; j++)
            {
                shapeBuffer[1, j] = int.Parse(shapeConfiguration.Substring(contador, 1));
                contador++;
            }
            for (int j = 0; j < 4; j++)
            {
                shapeBuffer[0, j] = int.Parse(shapeConfiguration.Substring(contador, 1));
                contador++;
            }
            for (int j = 0; j < 4; j++)
            {
                shapeBuffer[3, j] = int.Parse(shapeConfiguration.Substring(contador, 1));
                contador++;
            }
            for (int j = 0; j < 4; j++)
            {
                shapeBuffer[2, j] = int.Parse(shapeConfiguration.Substring(contador, 1));
                contador++;
            }
        }

        /// <summary>
        /// Dibuja la matriz con la configuracion del buffer
        /// </summary>
        /// <param name="color">Color del cual se van a pintar los colores de los botones que reprentan a la matriz</param>
        private void RenderMatrix(Color color)
        {
            string binary = "";
            for (int j = 0; j < 4; j++)
            {
                if (shapeBuffer[1, j] == 0)
                {
                    binary += "0";
                }
                else
                {
                    binary += "1";
                }
            }
            SetRowBinaries(2, binary, color);

            binary = "";
            for (int j = 0; j < 4; j++)
            {
                if (shapeBuffer[0, j] == 0)
                {
                    binary += "0";
                }
                else
                {
                    binary += "1";
                }
            }
            SetRowBinaries(1, binary, color);

            binary = "";
            for (int j = 0; j < 4; j++)
            {
                if (shapeBuffer[3, j] == 0)
                {
                    binary += "0";
                }
                else
                {
                    binary += "1";
                }
            }
            SetRowBinaries(4, binary, color);

            binary = "";
            for (int j = 0; j < 4; j++)
            {
                if (shapeBuffer[2, j] == 0)
                {
                    binary += "0";
                }
                else
                {
                    binary += "1";
                }
            }
            SetRowBinaries(3, binary, color);
        }
        
        /// <summary>
        /// Abre la ventana principal de la actividad
        /// </summary>
        private void OpenParentForm()
        {
            parentForm.LoadConfigurations();
            parentForm.Show();
            Close();
        }

        /// <summary>
        /// Cierra la actividad, se usa en caso de error critico
        /// </summary>
        private void CloseMatrixActivity()
        {
            parentForm.Close();
            Close();
        }
    }
}
