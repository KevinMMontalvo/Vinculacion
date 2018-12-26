using System.IO.Ports;

namespace Aula_Multisensorial.Utils
{
    class ArduinoConnection
    {
        private static ArduinoConnection instance = null;
        private static readonly int BAUD_RATE = 9600;
        private static readonly string USB_PORT = "COM5";

        public SerialPort SerialPort { get; set; }

        private ArduinoConnection()
        {
            SerialPort = new SerialPort(USB_PORT,BAUD_RATE);
            //SerialPort.Open();
        }

        public static ArduinoConnection GetInstance()
        {
            if (instance == null || !instance.SerialPort.IsOpen)
            {
                instance = new ArduinoConnection();
            }
            return instance;
        }
    }
}
