using System;
using System.Drawing;
using System.Windows.Forms;

namespace Aula_Multisensorial.MatrixLED
{
    public partial class Configuration : Form
    {
        private static readonly Color GREEN_ENABLED = Color.FromArgb(43, 192, 162);
        private delegate void ControlEvent(object sender, EventArgs e);
        private Form parentForm;
        private int[,] shapeBuffer = new int[4, 4];
        private string shapeConfiguration;
        private int colorConfiguration;
        private int sequenceConfiguration;
        private int levelConfiguration;
        private int brightnessConfiguration;
        private int appearancesConfiguration;
        private int contadorIntervalo = 1;

        public Configuration(Form parentForm, string shapeConfiguration, int colorConfiguration, int sequenceConfiguration, int levelConfiguration, int brightnessConfiguration, int appearancesConfiguration)
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

        private void SendShapeConfiguration(object sender, EventArgs e)
        {
            Console.WriteLine(GetBytes());
            panelTools.Controls.Clear();
            ChangeButtonsEnableState(false);
            LoadShapeBuffer();
            timer.Start();
        }

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

        private string GetBytes()
        {
            string byteFilasSuperiores = GetRowBinaries(2) + GetRowBinaries(1);
            string byteFilasInferiores = GetRowBinaries(4) + GetRowBinaries(3);

            shapeConfiguration = byteFilasSuperiores + byteFilasInferiores; //guarda la configuracion en el form

            return "" + (char)Convert.ToInt32(byteFilasSuperiores, 2) + (char)Convert.ToInt32(byteFilasInferiores, 2);
        }

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

        private void ShapeCancelButtonEvent(object sender, EventArgs e)
        {
            panelTools.Controls.Clear();
            ChangeButtonsEnableState(false);
            LoadShapeBuffer();
            timer.Start();
        }

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

        private void GenericCancelEvent(object sender, EventArgs e)
        {
            panelTools.Controls.Clear();
            timer.Start();
        }

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

        private void NumberColorChangedUpDownEvent(object sender, EventArgs e)
        {
            NumericUpDown numericUpDown = (NumericUpDown)sender;
            int level = (int)numericUpDown.Value;
            PaintColorControls(level);
        }

        private void SendColorConfiguration(object sender, EventArgs e)
        {
            NumericUpDown numericUpDown = (NumericUpDown)panelTools.Controls["numericUpDownColor"];
            colorConfiguration = (int)numericUpDown.Value;
            Console.WriteLine(numericUpDown.Value);
            panelTools.Controls.Clear();
        }

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

        private void SetSequenceComboBox(int sequence)
        {
            ComboBox comboBox = (ComboBox)panelTools.Controls["comboBox"];
            comboBox.SelectedIndex = sequence;
        }

        private void SendSequenceConfiguration(object sender, EventArgs e)
        {
            ComboBox comboBox = (ComboBox)panelTools.Controls["comboBox"];
            sequenceConfiguration = comboBox.SelectedIndex;
            Console.WriteLine(comboBox.SelectedIndex);
            LoadShapeBuffer();
            panelTools.Controls.Clear();
        }

        private void AddLevelControls()
        {
            panelTools.Controls.Clear();

            NumericUpDown numericUpDown = new NumericUpDown();
            numericUpDown.Name = "numericUpDown";
            numericUpDown.Value = levelConfiguration;
            numericUpDown.Minimum = 1;
            numericUpDown.Maximum = 16;
            numericUpDown.Location = new Point(300, 60);
            numericUpDown.Size = new Size(40, 26);
            numericUpDown.ForeColor = Color.White;
            numericUpDown.BackColor = Color.FromArgb(30, 29, 33);
            numericUpDown.BorderStyle = BorderStyle.None;
            numericUpDown.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            numericUpDown.TextAlign = HorizontalAlignment.Center;
            //numericUpDown.ValueChanged += new EventHandler(new ControlEvent());
            panelTools.Controls.Add(numericUpDown);

        }

        private void SendLevelConfiguration(object sender, EventArgs e)
        {
            NumericUpDown numericUpDown = (NumericUpDown)panelTools.Controls["numericUpDown"];
            levelConfiguration = (int)numericUpDown.Value;
            timer.Interval = 4200 - (200 * levelConfiguration);
            Console.WriteLine(numericUpDown.Value);
            panelTools.Controls.Clear();
        }

        private void AddBrightnessControls()
        {
            NumericUpDown numericUpDown = new NumericUpDown();
            numericUpDown.Name = "numericUpDown";
            numericUpDown.Value = brightnessConfiguration;
            numericUpDown.Minimum = 1;
            numericUpDown.Maximum = 8;
            numericUpDown.Location = new Point(300, 60);
            numericUpDown.Size = new Size(40, 26);
            numericUpDown.ForeColor = Color.White;
            numericUpDown.BackColor = Color.FromArgb(30, 29, 33);
            numericUpDown.BorderStyle = BorderStyle.None;
            numericUpDown.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            numericUpDown.TextAlign = HorizontalAlignment.Center;
            numericUpDown.ValueChanged += new EventHandler(new ControlEvent(NumberBrightnessChangedUpDownEvent));
            panelTools.Controls.Add(numericUpDown);
        }

        private void NumberBrightnessChangedUpDownEvent(object sender, EventArgs e)
        {
            NumericUpDown numericUpDown = (NumericUpDown)sender;
            int level = (int)numericUpDown.Value;
            SetMatrixBrightness(level);

        }

        private void SendBrightnessConfiguration(object sender, EventArgs e)
        {
            NumericUpDown numericUpDown = (NumericUpDown)panelTools.Controls["numericUpDown"];
            brightnessConfiguration = (int)numericUpDown.Value;
            Console.WriteLine(numericUpDown.Value);
            panelTools.Controls.Clear();
            timer.Start();
        }

        private void BrightnessCancelButtonEvent(object sender, EventArgs e)
        {
            panelTools.Controls.Clear();
            timer.Start();
        }

        private void SetMatrixBrightness(int brightnessLevel)
        {
            int colorNumber = 55 + 25 * brightnessLevel;
            SetRowBinaries(1, "1111", Color.FromArgb(colorNumber, colorNumber, colorNumber));
            SetRowBinaries(2, "1111", Color.FromArgb(colorNumber, colorNumber, colorNumber));
            SetRowBinaries(3, "1111", Color.FromArgb(colorNumber, colorNumber, colorNumber));
            SetRowBinaries(4, "1111", Color.FromArgb(colorNumber, colorNumber, colorNumber));
        }

        private void AddAppearancesControls()
        {
            NumericUpDown numericUpDown = new NumericUpDown();
            numericUpDown.Name = "numericUpDown";
            numericUpDown.Value = appearancesConfiguration;
            numericUpDown.Minimum = 10;
            numericUpDown.Increment = 10;
            numericUpDown.Maximum = 100;
            numericUpDown.Location = new Point(300, 60);
            numericUpDown.Size = new Size(50, 26);
            numericUpDown.ForeColor = Color.White;
            numericUpDown.BackColor = Color.FromArgb(30, 29, 33);
            numericUpDown.BorderStyle = BorderStyle.None;
            numericUpDown.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            numericUpDown.TextAlign = HorizontalAlignment.Center;
            panelTools.Controls.Add(numericUpDown);

            Label label = new Label();
            label.AutoSize = true;
            label.Font = new Font("Microsoft Sans Serif", 12F, FontStyle.Bold, GraphicsUnit.Point, 0);
            label.ForeColor = Color.White;
            label.Location = new Point(355, 60);
            label.Name = "label1";
            label.Size = new Size(24, 20);
            label.Text = "%";
            panelTools.Controls.Add(label);
        }

        private void SendAppearancesConfiguration(object sender, EventArgs e)
        {
            NumericUpDown numericUpDown = (NumericUpDown)panelTools.Controls["numericUpDown"];
            appearancesConfiguration = (int) numericUpDown.Value;
            Console.WriteLine(numericUpDown.Value);
            panelTools.Controls.Clear();
        }

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

        private void OpenParentForm()
        {
            parentForm.Show();
            Close();
        }
        
    }
}
