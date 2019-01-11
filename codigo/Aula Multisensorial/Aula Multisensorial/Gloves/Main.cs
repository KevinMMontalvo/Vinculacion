using Aula_Multisensorial.Utils;
using System;
using System.Drawing;
using System.Windows.Forms;

namespace Aula_Multisensorial.Gloves
{
    public partial class Main : Form
    {
        private delegate void ControlEvent(object sender, EventArgs e);

        public Main()
        {
            InitializeComponent();
            Visible = true;
        }

        private void Main_Load(object sender, EventArgs e)
        {
            bool connectionSuccessful = ArduinoController.GetInstance().StartConnection(ArduinoController.RIGHT_HAND_ARDUINO);
            if (!connectionSuccessful)
            {
                MessageBox.Show("No se pudo conectar con el guante derecho");
                Close();
            }

            /*connectionSuccessful = ArduinoController.GetInstance().StartConnection(ArduinoController.LEFT_HAND_ARDUINO);
            if (!connectionSuccessful)
            {
                MessageBox.Show("No se pudo conectar con el guante izquierdo");
                Close();
            }*/
            AddClickEvents();
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
                ArduinoController.GetInstance().SendMessage(ArduinoController.LEFT_HAND_ARDUINO, "I1");
                Console.WriteLine(ArduinoController.GetInstance().GetMessage(ArduinoController.LEFT_HAND_ARDUINO));
                if (ArduinoController.GetInstance().GetMessage(ArduinoController.LEFT_HAND_ARDUINO).Equals("BIEN"))
                {
                    //todo accion cuando se haya movido el dedo correcto
                }
            }
            else if (label.Name.Equals("label2"))
            {
                ArduinoController.GetInstance().SendMessage(ArduinoController.LEFT_HAND_ARDUINO, "I2");
                if (ArduinoController.GetInstance().GetMessage(ArduinoController.LEFT_HAND_ARDUINO).Equals("BIEN"))
                {
                    //todo accion cuando se haya movido el dedo correcto
                }
            }
            else if (label.Name.Equals("label3"))
            {
                ArduinoController.GetInstance().SendMessage(ArduinoController.LEFT_HAND_ARDUINO, "I3");
                if (ArduinoController.GetInstance().GetMessage(ArduinoController.LEFT_HAND_ARDUINO).Equals("BIEN"))
                {
                    //todo accion cuando se haya movido el dedo correcto
                }
            }
            else if (label.Name.Equals("label4"))
            {
                ArduinoController.GetInstance().SendMessage(ArduinoController.LEFT_HAND_ARDUINO, "I4");
                if (ArduinoController.GetInstance().GetMessage(ArduinoController.LEFT_HAND_ARDUINO).Equals("BIEN"))
                {
                    //todo accion cuando se haya movido el dedo correcto
                }
            }
            else if (label.Name.Equals("label5"))
            {
                ArduinoController.GetInstance().SendMessage(ArduinoController.LEFT_HAND_ARDUINO, "I5");
                if (ArduinoController.GetInstance().GetMessage(ArduinoController.LEFT_HAND_ARDUINO).Equals("BIEN"))
                {
                    //todo accion cuando se haya movido el dedo correcto
                }
            }
            else if (label.Name.Equals("label6"))
            {
                ArduinoController.GetInstance().SendMessage(ArduinoController.RIGHT_HAND_ARDUINO, "D5");
                string recivedMessage = ArduinoController.GetInstance().GetMessage(ArduinoController.RIGHT_HAND_ARDUINO);
                if (recivedMessage.ToString().Equals("BIEN\r"))
                {
                    Console.WriteLine("BIEN");
                }
                else
                {
                    Console.WriteLine("MAL");
                }
            }
            else if (label.Name.Equals("label7"))
            {
                ArduinoController.GetInstance().SendMessage(ArduinoController.RIGHT_HAND_ARDUINO, "D4");
                string recivedMessage = ArduinoController.GetInstance().GetMessage(ArduinoController.RIGHT_HAND_ARDUINO);
                if (recivedMessage.ToString().Equals("BIEN\r"))
                {
                    Console.WriteLine("BIEN");
                }
                else
                {
                    Console.WriteLine("MAL");
                }
            }
            else if (label.Name.Equals("label8"))
            {
                ArduinoController.GetInstance().SendMessage(ArduinoController.RIGHT_HAND_ARDUINO, "D3");
                string recivedMessage = ArduinoController.GetInstance().GetMessage(ArduinoController.RIGHT_HAND_ARDUINO);
                if (recivedMessage.ToString().Equals("BIEN\r"))
                {
                    Console.WriteLine("BIEN");
                }
                else
                {
                    Console.WriteLine("MAL");
                }
            }
            else if (label.Name.Equals("label9"))
            {
                ArduinoController.GetInstance().SendMessage(ArduinoController.RIGHT_HAND_ARDUINO, "D2");
                string recivedMessage = ArduinoController.GetInstance().GetMessage(ArduinoController.RIGHT_HAND_ARDUINO);
                if (recivedMessage.ToString().Equals("BIEN\r"))
                {
                    Console.WriteLine("BIEN");
                }
                else
                {
                    Console.WriteLine("MAL");
                }
            }
            else if (label.Name.Equals("label10"))
            {
                ArduinoController.GetInstance().SendMessage(ArduinoController.RIGHT_HAND_ARDUINO, "D1");
                string recivedMessage = ArduinoController.GetInstance().GetMessage(ArduinoController.RIGHT_HAND_ARDUINO);
                if (recivedMessage.ToString().Equals("BIEN\r"))
                {
                    Console.WriteLine("BIEN");
                }
                else
                {
                    Console.WriteLine("MAL");
                }
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
            if (buttonStart.Text.Equals("Iniciar"))
            {
                buttonStart.Text = "Terminar";
                buttonExit.Enabled = false;
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
    }
}
