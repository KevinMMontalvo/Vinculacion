using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;

namespace Aula_Multisensorial
{
    public partial class CEFForm : Form
    {
        public ChromiumWebBrowser chromiumWebBrowser;
        public CEFForm()
        {
            InitializeComponent();
        }

        private void CEFForm_Load(object sender, EventArgs e)
        {
            initializeChromium();
        }
        private void initializeChromium()
        {
            CefSettings cefSettings = new CefSettings();
            Cef.Initialize(cefSettings);
            chromiumWebBrowser = new ChromiumWebBrowser("http:\\localhost:3000");
            this.Controls.Add(chromiumWebBrowser);
            chromiumWebBrowser.Dock = DockStyle.Fill;
        }
    }
}
