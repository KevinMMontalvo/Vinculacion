﻿using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Ports;
using System.Threading;

namespace Aula_Multisensorial.Utils
{
    class ArduinoController
    {
        private static ArduinoController instance = null;
        private static readonly int BAUD_RATE = 9600;
        public static readonly int MATRIX_ARDUINO = 0;
        public static readonly int RIGHT_HAND_ARDUINO = 1;
        public static readonly int LEFT_HAND_ARDUINO = 2;
        public static readonly int HEART_ARDUINO = 3;

        private SerialPort[] serialPorts;

        private ArduinoController()
        {
            serialPorts = new SerialPort[3];
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
                string id = "-1";
                SerialPort temporarySerialPort = new SerialPort(port, BAUD_RATE);
                try
                {
                    temporarySerialPort.Open();
                }
                catch (UnauthorizedAccessException)
                {
                    continue;
                }

                //Establece el tiempo de respuesta de lectura a 3 s para la conexion
                temporarySerialPort.ReadTimeout = 3000;

                //3 intentos de conexion
                for (int i = 0; i < 3; i++)
                {
                    try
                    {
                        temporarySerialPort.Write("ID");
                        id = temporarySerialPort.ReadLine();
                        break;
                    }
                    catch (Exception)
                    {
                        temporarySerialPort.DiscardInBuffer();
                        temporarySerialPort.DiscardOutBuffer();
                    }
                }

                //vuelve a establecer un tiempo de respuesta indefinido
                temporarySerialPort.ReadTimeout = SerialPort.InfiniteTimeout;

                try
                {
                    if (int.Parse(id) == arduinoIndex)
                    {
                        temporarySerialPort.DiscardInBuffer();
                        serialPorts[arduinoIndex] = temporarySerialPort;
                        return true;
                    }
                    temporarySerialPort.Close();
                }
                catch (Exception)
                {
                }
            }
            return false;
        }

        public bool SendMessage(int arduinoIndex, string message)
        {
            if (serialPorts[arduinoIndex].IsOpen)
            {
                serialPorts[arduinoIndex].Write(message);
                return true;
            }
            else
            {
                return false;
            }
        }

        public string GetMessage(int arduinoIndex)
        {
            if (serialPorts[arduinoIndex].IsOpen)
            {
                try
                {
                    return serialPorts[arduinoIndex].ReadLine();
                }
                catch (IOException)
                {
                    return null;
                }
            }
            return null;
        }

        public List<byte> GetMessageInBytes(int arduinoIndex)
        {
            List<byte> message = new List<byte>();
            while (true)
            {
                message.Add((byte)serialPorts[arduinoIndex].ReadByte());
                if (message[message.Count - 1] == 10)
                {
                    break;
                }
            }
            return message;
        }

        public bool CloseConnection(int arduinoIndex)
        {
            if (serialPorts[arduinoIndex] != null)
            {
                serialPorts[arduinoIndex].Close();
                serialPorts[arduinoIndex].Dispose();
                serialPorts[arduinoIndex] = null;
                return true;
            }
            return false;
        }

        public bool IsPortOpen(int arduinoIndex)
        {
            if (serialPorts[arduinoIndex] != null && serialPorts[arduinoIndex].IsOpen)
            {
                return true;
            }
            return false;
        }
    }
}
