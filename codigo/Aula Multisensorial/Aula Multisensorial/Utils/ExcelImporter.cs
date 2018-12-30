using ExcelDataReader;
using System;
using System.Data;
using System.IO;
using System.Text;
using System.Windows.Forms;

namespace Aula_Multisensorial.Utils
{
    
    class ExcelImporter
    {
        private readonly Form mainForm;
        private delegate string OpenDialog(); //metodo delegeado para ejecutarlo en el hilo principal del Form

        public ExcelImporter(Form mainForm)
        {
            this.mainForm = mainForm;
        }

        public void SelectExcelFile()
        {
            byte[] bs= Encoding.ASCII.GetBytes("\\");
            foreach (byte item in bs)
            {
                Console.WriteLine("byte: " + Convert.ToString(item, 2).PadLeft(8, '0'));
            }
            /*string filePath=(string) mainForm.Invoke(new OpenDialog(OpenFileChooser));
            OpenExcelFile(filePath);*/
        }

        public string OpenFileChooser()
        {
            OpenFileDialog openFileDialog = new OpenFileDialog();
            openFileDialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
            openFileDialog.Filter = "Hoja de calculo (*.xlsx)|*.xlsx";
            openFileDialog.FilterIndex = 1;
            openFileDialog.RestoreDirectory = true;

            if (openFileDialog.ShowDialog() == DialogResult.OK)
            {
                //Obtiene el path de la hoja de calculo
                return openFileDialog.FileName;
            }
            return null;
        }

        private void OpenExcelFile(string filePath)
        {
            FileStream fileStream = File.Open(filePath, FileMode.Open, FileAccess.Read);
            IExcelDataReader excelReader = ExcelReaderFactory.CreateOpenXmlReader(fileStream);
            DataSet content = excelReader.AsDataSet();
            while (excelReader.Read())
            {
                Console.WriteLine(excelReader.GetValue(0));
            }
            excelReader.Close();
        }
    }
}
