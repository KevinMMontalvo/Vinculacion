using System;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using Aula_Multisensorial.Access;
using Aula_Multisensorial.Utils;

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
            InitializeChromium();
            chromiumWebBrowser.RegisterJsObject("studentsController", new StudentAccess());
            chromiumWebBrowser.RegisterJsObject("levelsController", new LevelAccess());
            chromiumWebBrowser.RegisterJsObject("teachersController", new TeacherAccess());
            chromiumWebBrowser.RegisterJsObject("periodsController", new PeriodAccess());
            chromiumWebBrowser.RegisterJsObject("adminsController", new AdministratorAccess());
            chromiumWebBrowser.RegisterJsObject("logController", new LogAccess());
            chromiumWebBrowser.RegisterJsObject("activitiesController", new ActivitiesController(this));
            chromiumWebBrowser.RegisterJsObject("globeActivitiesController", new GlobeActivityRegisterAccess());
        }

        private void InitializeChromium()
        {
            CefSettings cefSettings = new CefSettings();
            CefSharpSettings.LegacyJavascriptBindingEnabled = true;
            Cef.Initialize(cefSettings);
            chromiumWebBrowser = new ChromiumWebBrowser("http:\\localhost:3000");
            //chromiumWebBrowser = new ChromiumWebBrowser("http:\\www.google.com");
            this.Controls.Add(chromiumWebBrowser);
            chromiumWebBrowser.Dock = DockStyle.Fill;
            MinimumSize = Size;
            //permite el acceso a archivos locales
            /*BrowserSettings browserSettings = new BrowserSettings();
            browserSettings.FileAccessFromFileUrls = CefState.Enabled;
            browserSettings.UniversalAccessFromFileUrls = CefState.Enabled;
            //browserSettings.Javascript = CefState.Enabled;
            chromiumWebBrowser.BrowserSettings = browserSettings;*/

        }

        private void CEFForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
            Dispose();
        }
    }
}
