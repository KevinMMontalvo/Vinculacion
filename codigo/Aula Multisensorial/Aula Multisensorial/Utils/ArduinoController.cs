using System;
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
        public static readonly int RED_HEART_ARDUINO = 3;
        public static readonly int BLUE_HEART_ARDUINO = 4;

        private SerialPort[] serialPorts;

        private ArduinoController()
        {
            serialPorts = new SerialPort[5];
        }

        /// <summary>
        /// Obtiene la instancia del patron singleton de la clase
        /// </summary>
        /// <returns>Instancia del mismo tiepo de esta clase</returns>
        public static ArduinoController GetInstance()
        {
            if (instance == null)
            {
                instance = new ArduinoController();
            }
            return instance;
        }

        /// <summary>
        /// Inicia la conexion con un dispositivo
        /// </summary>
        /// <param name="arduinoIndex">Int constante que representa el dispositivo</param>
        /// <returns>Retorna true si la accion se realizo correctamente</returns>
        public bool StartConnection(int arduinoIndex)
        {
            string[] ports = SerialPort.GetPortNames();

            foreach (string port in ports)
            {
                string id = "-1";
                SerialPort temporarySerialPort = new SerialPort(port, BAUD_RATE);
                try
                {
                    temporarySerialPort.Close();
                    temporarySerialPort.Open();
                    temporarySerialPort.DiscardInBuffer();
                    temporarySerialPort.DiscardOutBuffer();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.StackTrace);
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
                        if (id.Equals(""))
                        {
                            continue;
                        }
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
                catch (Exception e)
                {
                    Console.WriteLine(e.StackTrace);
                }
            }
            return false;
        }

        /// <summary>
        /// Envia un mensaje al dispositivo
        /// </summary>
        /// <param name="arduinoIndex">Int constante que representa el dispositivo</param>
        /// <param name="message">String con el mensaje</param>
        /// <returns>Retorna true si la accion se realizo correctamente</returns>
        public bool SendMessage(int arduinoIndex, string message)
        {
            if (serialPorts[arduinoIndex] != null && serialPorts[arduinoIndex].IsOpen)
            {
                serialPorts[arduinoIndex].Write(message);
                return true;
            }
            else
            {
                return false;
            }
        }

        /// <summary>
        /// Lee un mensaje entrante de un dispositivo
        /// </summary>
        /// <param name="arduinoIndex">Int constante que representa el dispositivo</param>
        /// <returns>Retorna true si la accion se realizo correctamente</returns>
        public string GetMessage(int arduinoIndex)
        {
            if (serialPorts[arduinoIndex] != null && serialPorts[arduinoIndex].IsOpen)
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

        /// <summary>
        /// Lee un mensaje obteniendo los bytes, se usa en la configuracion de la matriz
        /// </summary>
        /// <param name="arduinoIndex">Int constante que representa el dispositivo</param>
        /// <returns>Retorna true si la accion se realizo correctamente</returns>
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

        /// <summary>
        /// Cierra la conexion de forma segura con un dispositivo
        /// </summary>
        /// <param name="arduinoIndex">Int constante que representa el dispositivo</param>
        /// <returns>Retorna true si la accion se realizo correctamente</returns>
        public bool CloseConnection(int arduinoIndex)
        {
            if (serialPorts[arduinoIndex] != null && serialPorts[arduinoIndex].IsOpen)
            {
                serialPorts[arduinoIndex].DiscardInBuffer();
                serialPorts[arduinoIndex].DiscardOutBuffer();
                serialPorts[arduinoIndex].Close();
                serialPorts[arduinoIndex].Dispose();
                serialPorts[arduinoIndex] = null;
                return true;
            }
            return false;
        }

        /// <summary>
        /// Comprueba si el puerto de un dispositivo ya esta abierto
        /// </summary>
        /// <param name="arduinoIndex">Int constante que representa el dispositivo</param>
        /// <returns>Retorna true si el puerto ya esta abierto</returns>
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
