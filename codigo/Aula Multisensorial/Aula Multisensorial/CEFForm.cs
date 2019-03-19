using System;
using System.Windows.Forms;
using CefSharp;
using CefSharp.WinForms;
using Aula_Multisensorial.Access;
using Aula_Multisensorial.Utils;
using System.Diagnostics;
using System.Drawing;

namespace Aula_Multisensorial
{
    public partial class CEFForm : Form
    {
        private ChromiumWebBrowser chromiumWebBrowser;
        private Process mongoProcess;
        private Process meteorProcess;
        private delegate void Method();
        public CEFForm()
        {
            InitializeComponent();
        }

        private void CEFForm_Load(object sender, EventArgs e)
        {
            InitializeChromium();
            /*ShowLoadingScreen();
            CheckMongo();*/
        }

        private void InitializeChromium()
        {
            CefSettings cefSettings = new CefSettings();
            CefSharpSettings.LegacyJavascriptBindingEnabled = true;
            Cef.Initialize(cefSettings);
            chromiumWebBrowser = new ChromiumWebBrowser("http:\\localhost:3000");
            //chromiumWebBrowser = new ChromiumWebBrowser("http:\\www.google.com");
            Controls.Add(chromiumWebBrowser);
            chromiumWebBrowser.Dock = DockStyle.Fill;
            MinimumSize = Size;
            //permite el acceso a archivos locales
            /*BrowserSettings browserSettings = new BrowserSettings();
            browserSettings.FileAccessFromFileUrls = CefState.Enabled;
            browserSettings.UniversalAccessFromFileUrls = CefState.Enabled;
            //browserSettings.Javascript = CefState.Enabled;
            chromiumWebBrowser.BrowserSettings = browserSettings;*/
            chromiumWebBrowser.RegisterJsObject("studentsController", new StudentAccess());
            chromiumWebBrowser.RegisterJsObject("levelsController", new LevelAccess());
            chromiumWebBrowser.RegisterJsObject("teachersController", new TeacherAccess());
            chromiumWebBrowser.RegisterJsObject("periodsController", new PeriodAccess());
            chromiumWebBrowser.RegisterJsObject("adminsController", new AdministratorAccess());
            chromiumWebBrowser.RegisterJsObject("logController", new LogAccess());
            chromiumWebBrowser.RegisterJsObject("activitiesController", new ActivitiesController(this));
            chromiumWebBrowser.RegisterJsObject("globeActivitiesController", new GlobeActivityRegisterAccess());
            chromiumWebBrowser.RegisterJsObject("matrixActivitiesController", new MatrixActivityRegisterAccess());
            chromiumWebBrowser.RegisterJsObject("cardiacActivitiesController", new CardiacSensorActivityRegisterAccess());
            chromiumWebBrowser.RegisterJsObject("recordsController", new StudentRecordAccess());

        }

        private void CEFForm_FormClosing(object sender, FormClosingEventArgs e)
        {
            Cef.Shutdown();
            mongoProcess.Kill();
            mongoProcess.Dispose();
            Dispose();
        }

        private void ShowLoadingScreen()
        {
            PictureBox pictureBox = new PictureBox();
            pictureBox.Name = "PictureBox";
            pictureBox.BackColor = Color.FromArgb(30, 29, 33);
            pictureBox.Size = new Size(300, 300);
            pictureBox.Left = (Width - 300) / 2;
            pictureBox.Top = (Height - 300) / 2;
            Controls.Add(pictureBox);
            pictureBox.Image = Image.FromFile(@"../../../Resources/Loading.gif");
        }

        private void MongoDataReceivedEvent(object sender, DataReceivedEventArgs e)
        {
            if (e.Data.Equals("MongoDB server version: 4.0.6"))
            {
                StartMeteor();
            }
        }

        private void MongoErrorEvent(object sender, DataReceivedEventArgs e)
        {
            Console.WriteLine(e.Data);
            if (e.Data.Equals("exception: connect failed"))
            {
                mongoProcess.StandardInput.WriteLine("mongod.exe");
                StartMeteor();
            }
        }

        private void MeteorDataReceivedEvent(object sender, DataReceivedEventArgs e)
        {
            Console.WriteLine(e.Data);
            if (e.Data.Equals("=> App running at: http://localhost:3000/") || e.Data.Equals("Can't listen on port 3000. Perhaps another Meteor is running?"))
            {
                Invoke(new Method(CleanControls));
                Invoke(new Method(InitializeChromium));
            }
        }

        private void MeteorErrorEvent(object sender, DataReceivedEventArgs e)
        {
            MessageBox.Show("Ha currido un error al iniciar la aplicacion");
        }

        private void CheckMongo()
        {
            mongoProcess = new Process();
            mongoProcess.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
            mongoProcess.StartInfo.FileName = "powershell.exe";
            mongoProcess.StartInfo.RedirectStandardOutput = true;
            mongoProcess.StartInfo.RedirectStandardInput = true;
            mongoProcess.StartInfo.RedirectStandardError = true;
            mongoProcess.StartInfo.UseShellExecute = false;
            mongoProcess.StartInfo.CreateNoWindow = true;
            mongoProcess.ErrorDataReceived += MongoErrorEvent;
            mongoProcess.OutputDataReceived += MongoDataReceivedEvent;
            mongoProcess.EnableRaisingEvents = true;
            mongoProcess.Start();
            mongoProcess.BeginOutputReadLine();
            mongoProcess.BeginErrorReadLine();
            mongoProcess.StandardInput.WriteLine("mongo.exe");
        }

        private void StartMeteor()
        {
            meteorProcess = new Process();
            meteorProcess.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
            meteorProcess.StartInfo.FileName = "powershell.exe";
            meteorProcess.StartInfo.RedirectStandardOutput = true;
            meteorProcess.StartInfo.RedirectStandardInput = true;
            meteorProcess.StartInfo.RedirectStandardError = true;
            meteorProcess.StartInfo.UseShellExecute = false;
            meteorProcess.StartInfo.CreateNoWindow = true;
            meteorProcess.ErrorDataReceived += MeteorErrorEvent;
            meteorProcess.OutputDataReceived += MeteorDataReceivedEvent;
            meteorProcess.EnableRaisingEvents = true;
            meteorProcess.Start();
            meteorProcess.BeginOutputReadLine();
            meteorProcess.BeginErrorReadLine();
            meteorProcess.StandardInput.WriteLine("cd..");
            meteorProcess.StandardInput.WriteLine("cd..");
            meteorProcess.StandardInput.WriteLine("cd..");
            meteorProcess.StandardInput.WriteLine("cd..");
            meteorProcess.StandardInput.WriteLine("cd..");
            meteorProcess.StandardInput.WriteLine("cd AulaMultisensorialWeb/");
            meteorProcess.StandardInput.WriteLine("meteor.bat");
        }

        private void CleanControls()
        {
            Controls.Clear();
        }
    }
}
