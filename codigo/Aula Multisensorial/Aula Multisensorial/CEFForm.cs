using System;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using MongoDB.Driver;
using Aula_Multisensorial.Model;
using System.Collections.Generic;
using Aula_Multisensorial.Access;
using MongoDB.Bson;
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
            chromiumWebBrowser.RegisterJsObject("arduinoController", new ArduinoController());
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

            /*//permite el acceso a archivos locales
            BrowserSettings browserSettings = new BrowserSettings();
            //browserSettings.FileAccessFromFileUrls = CefState.Enabled;
            //browserSettings.UniversalAccessFromFileUrls = CefState.Enabled;
            //browserSettings.Javascript = CefState.Enabled;
            chromiumWebBrowser.BrowserSettings = browserSettings;*/

        }

        private void CEFForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }
    }
}
