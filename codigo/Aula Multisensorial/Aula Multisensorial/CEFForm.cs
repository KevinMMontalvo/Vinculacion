using System;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using MongoDB.Driver;
using Aula_Multisensorial.Model;
using System.Collections.Generic;
using Aula_Multisensorial.Access;
using MongoDB.Bson;

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

            /*MongoClient client = new MongoClient("mongodb://kevin:admin123@ds041167.mlab.com:41167/aula-multisensorial");
            IMongoDatabase database = client.GetDatabase("aula-multisensorial");
            IMongoCollection<BsonDocument> teachersCollection=database.GetCollection<BsonDocument>("students");
            List<BsonDocument> teachersList= teachersCollection.AsQueryable().ToList();

            foreach (BsonDocument teacher in teachersList)
            {
                Console.WriteLine(teacher.ToString());
            }*/
        }

        private void CEFForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
        }
    }
}
