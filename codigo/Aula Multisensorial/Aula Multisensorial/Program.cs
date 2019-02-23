using Aula_Multisensorial.Gloves;
using System;
using System.Windows.Forms;

namespace Aula_Multisensorial
{
    static class Program
    {
        /// <summary>
        /// Punto de entrada principal para la aplicación.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            Application.Run(new CEFForm());
            //Application.Run(new Aula_Multisensorial.MatrixLED.Main("5c1bbb3f75c6cf37a489efcb"));
        }
    }
}
