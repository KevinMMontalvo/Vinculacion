using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Aula_Multisensorial.MatrixLED
{
    public partial class Main : Form
    {
        public Main()
        {
            InitializeComponent();
            
            Visible = true;
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
            Dispose();
        }
    }
}
