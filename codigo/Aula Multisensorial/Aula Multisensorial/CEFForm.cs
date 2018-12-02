using System;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using MongoDB.Driver;
using Aula_Multisensorial.Model;
using System.Collections.Generic;

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
            
            /*MongoClient client = new MongoClient("mongodb://kevin:admin123@ds041167.mlab.com:41167/aula-multisensorial");
            IMongoDatabase database = client.GetDatabase("aula-multisensorial");
            IMongoCollection<Teacher> teachersCollection=database.GetCollection<Teacher>("teachers");
            List<Teacher> teachersList= teachersCollection.AsQueryable().ToList();

            foreach (Teacher teacher in teachersList)
            {
                Console.WriteLine(teacher.Speciality);
            }*/
        }
    }
}
