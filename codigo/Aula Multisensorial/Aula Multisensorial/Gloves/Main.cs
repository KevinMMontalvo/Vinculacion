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
            /*bool connectionSuccessful = ArduinoController.GetInstance().StartConnection(ArduinoController.RIGHT_HAND_ARDUINO);
            if (!connectionSuccessful)
            {
                MessageBox.Show("No se pudo conectar con el guante derecho");
                Close();
            }

            connectionSuccessful = ArduinoController.GetInstance().StartConnection(ArduinoController.LEFT_HAND_ARDUINO);
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
    }
}
