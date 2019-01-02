using Aula_Multisensorial.Utils;
using System;
using System.IO.Ports;
using System.Windows.Forms;

namespace Aula_Multisensorial.MatrixLED
{
    public partial class Main : Form
    {
        public Main()
        {
            InitializeComponent();
            ControlBox = false;
            Visible = true;
        }

        private void Main_Load(object sender, EventArgs e)
        {
            bool arduinoIsConnected = ArduinoController.GetInstance().StartConnection(ArduinoController.MATRIX_ARDUINO);

            if (!arduinoIsConnected)
            {
                MessageBox.Show("No se pudo conectar con el dispositivo (Matriz de LED)");
                Dispose();
            }
        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            
        }

        private void buttonSetup_Click(object sender, EventArgs e)
        {
            new Configuration("0000000100000000", 6, 6, 16, 1, 50);
        }

        private void buttonExit_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void Main_FormClosing(object sender, FormClosingEventArgs e)
        {
            ArduinoController.GetInstance().CloseConnection(ArduinoController.MATRIX_ARDUINO);
        }
    }
}
