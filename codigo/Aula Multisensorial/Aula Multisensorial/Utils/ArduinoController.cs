using System;
using System.IO.Ports;

namespace Aula_Multisensorial.Utils
{
    class ArduinoController
    {
        private readonly SerialPort serialPort;

        public ArduinoController()
        {
        }

        public void SendMessage(string message)
        {
            serialPort.Write(message);
        }
    }
}
