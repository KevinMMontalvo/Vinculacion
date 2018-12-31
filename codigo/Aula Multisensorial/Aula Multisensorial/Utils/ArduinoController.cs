using System;
using System.IO.Ports;

namespace Aula_Multisensorial.Utils
{
    class ArduinoController
    {
        private static ArduinoController instance = null;
        private static readonly int BAUD_RATE = 9600;
        public static readonly int MATRIX_ARDUINO = 0;
        public static readonly int RIGHT_HAND_ARDUINO = 1;
        public static readonly int LEFT_HAND_ARDUINO = 2;

        private SerialPort[] serialPort;

        private ArduinoController()
        {
            serialPort = new SerialPort[3];
        }

        public static ArduinoController GetInstance()
        {
            if (instance == null)
            {
                instance = new ArduinoController();
            }
            return instance;
        }

        public bool StartConnection(int arduinoIndex)
        {
            string[] ports = SerialPort.GetPortNames();

            foreach (string port in ports)
            {
                SerialPort temporarySerialPort = new SerialPort(port, BAUD_RATE);
                temporarySerialPort.Open();
                temporarySerialPort.Write("ID");
                string id = temporarySerialPort.ReadLine();

                if (int.Parse(id) == arduinoIndex)
                {
                    serialPort[arduinoIndex] = temporarySerialPort;
                    return true;
                }
                temporarySerialPort.Close();
            }
            return false;
        }

        public bool SendMessage(int arduinoIndex, string message)
        {
            if (serialPort[arduinoIndex].IsOpen)
            {
                serialPort[arduinoIndex].WriteLine(message);
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool CloseConnection(int arduinoIndex)
        {
            if (serialPort[arduinoIndex] != null)
            {
                serialPort[arduinoIndex].Close();
                serialPort[arduinoIndex].Dispose();
                serialPort[arduinoIndex] = null;
                return true;
            }
            return false;
        }
    }
}
