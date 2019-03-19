using CefSharp;
using CefSharp.WinForms;
using System.Windows.Forms;

namespace Aula_Multisensorial.Board
{
    public partial class BoardActivity : Form
    {
        private ChromiumWebBrowser chromiumWebBrowser;

        public BoardActivity()
        {
            InitializeComponent();
        }

        private void BoardActivity_Load(object sender, System.EventArgs e)
        {
            Visible = true;
        }

        private void InitializeChromium()
        {
            CefSettings cefSettings = new CefSettings();
            CefSharpSettings.LegacyJavascriptBindingEnabled = true;
            Cef.Initialize(cefSettings);
            chromiumWebBrowser = new ChromiumWebBrowser("http:\\localhost:3000/senswitcher");
            Controls.Add(chromiumWebBrowser);
            chromiumWebBrowser.Dock = DockStyle.Fill;
            MinimumSize = Size;
        }

        private void BoardActivity_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }

        private void BoardActivity_FormClosed(object sender, FormClosedEventArgs e)
        {
            Dispose();
        }
    }
}
