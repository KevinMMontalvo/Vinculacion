namespace Aula_Multisensorial.MatrixLED
{
    partial class Main
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.labelTittle = new System.Windows.Forms.Label();
            this.buttonStart = new System.Windows.Forms.Button();
            this.buttonSetup = new System.Windows.Forms.Button();
            this.buttonExit = new System.Windows.Forms.Button();
            this.labelConfigurationInformation = new System.Windows.Forms.Label();
            this.labelName = new System.Windows.Forms.Label();
            this.comboBoxStudents = new System.Windows.Forms.ComboBox();
            this.SuspendLayout();
            // 
            // labelTittle
            // 
            this.labelTittle.AutoSize = true;
            this.labelTittle.Font = new System.Drawing.Font("Microsoft Sans Serif", 18F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelTittle.ForeColor = System.Drawing.Color.White;
            this.labelTittle.Location = new System.Drawing.Point(298, 22);
            this.labelTittle.Name = "labelTittle";
            this.labelTittle.Size = new System.Drawing.Size(266, 29);
            this.labelTittle.TabIndex = 0;
            this.labelTittle.Text = "Actividad de Matriz LED";
            // 
            // buttonStart
            // 
            this.buttonStart.BackColor = System.Drawing.Color.Green;
            this.buttonStart.FlatAppearance.BorderSize = 0;
            this.buttonStart.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buttonStart.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.buttonStart.ForeColor = System.Drawing.Color.White;
            this.buttonStart.Location = new System.Drawing.Point(193, 153);
            this.buttonStart.Margin = new System.Windows.Forms.Padding(0);
            this.buttonStart.Name = "buttonStart";
            this.buttonStart.Size = new System.Drawing.Size(476, 56);
            this.buttonStart.TabIndex = 1;
            this.buttonStart.Text = "Iniciar";
            this.buttonStart.UseVisualStyleBackColor = false;
            this.buttonStart.Click += new System.EventHandler(this.buttonStart_Click);
            // 
            // buttonSetup
            // 
            this.buttonSetup.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(46)))), ((int)(((byte)(134)))), ((int)(((byte)(193)))));
            this.buttonSetup.FlatAppearance.BorderSize = 0;
            this.buttonSetup.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buttonSetup.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.buttonSetup.ForeColor = System.Drawing.Color.White;
            this.buttonSetup.Location = new System.Drawing.Point(193, 244);
            this.buttonSetup.Margin = new System.Windows.Forms.Padding(0);
            this.buttonSetup.Name = "buttonSetup";
            this.buttonSetup.Size = new System.Drawing.Size(476, 56);
            this.buttonSetup.TabIndex = 2;
            this.buttonSetup.Text = "Configuración";
            this.buttonSetup.UseVisualStyleBackColor = false;
            this.buttonSetup.Click += new System.EventHandler(this.buttonSetup_Click);
            // 
            // buttonExit
            // 
            this.buttonExit.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(46)))), ((int)(((byte)(134)))), ((int)(((byte)(193)))));
            this.buttonExit.FlatAppearance.BorderSize = 0;
            this.buttonExit.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buttonExit.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.buttonExit.ForeColor = System.Drawing.Color.White;
            this.buttonExit.Location = new System.Drawing.Point(193, 337);
            this.buttonExit.Margin = new System.Windows.Forms.Padding(0);
            this.buttonExit.Name = "buttonExit";
            this.buttonExit.Size = new System.Drawing.Size(476, 56);
            this.buttonExit.TabIndex = 3;
            this.buttonExit.Text = "Salir";
            this.buttonExit.UseVisualStyleBackColor = false;
            this.buttonExit.Click += new System.EventHandler(this.buttonExit_Click);
            // 
            // labelConfigurationInformation
            // 
            this.labelConfigurationInformation.AutoSize = true;
            this.labelConfigurationInformation.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelConfigurationInformation.ForeColor = System.Drawing.Color.White;
            this.labelConfigurationInformation.Location = new System.Drawing.Point(47, 494);
            this.labelConfigurationInformation.Name = "labelConfigurationInformation";
            this.labelConfigurationInformation.Size = new System.Drawing.Size(0, 17);
            this.labelConfigurationInformation.TabIndex = 4;
            // 
            // labelName
            // 
            this.labelName.AutoSize = true;
            this.labelName.Font = new System.Drawing.Font("Microsoft Sans Serif", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelName.ForeColor = System.Drawing.Color.White;
            this.labelName.Location = new System.Drawing.Point(64, 86);
            this.labelName.Name = "labelName";
            this.labelName.Size = new System.Drawing.Size(173, 20);
            this.labelName.TabIndex = 21;
            this.labelName.Text = "Nombre del estudiante:";
            // 
            // comboBoxStudents
            // 
            this.comboBoxStudents.Font = new System.Drawing.Font("Microsoft Sans Serif", 10F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.comboBoxStudents.FormattingEnabled = true;
            this.comboBoxStudents.Location = new System.Drawing.Point(243, 86);
            this.comboBoxStudents.Name = "comboBoxStudents";
            this.comboBoxStudents.Size = new System.Drawing.Size(392, 24);
            this.comboBoxStudents.TabIndex = 22;
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(30)))), ((int)(((byte)(29)))), ((int)(((byte)(33)))));
            this.ClientSize = new System.Drawing.Size(884, 561);
            this.ControlBox = false;
            this.Controls.Add(this.comboBoxStudents);
            this.Controls.Add(this.labelName);
            this.Controls.Add(this.labelConfigurationInformation);
            this.Controls.Add(this.buttonExit);
            this.Controls.Add(this.buttonSetup);
            this.Controls.Add(this.buttonStart);
            this.Controls.Add(this.labelTittle);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Name = "Main";
            this.Text = "Main";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.Main_FormClosing);
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.Main_FormClosed);
            this.Load += new System.EventHandler(this.Main_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Label labelTittle;
        private System.Windows.Forms.Button buttonStart;
        private System.Windows.Forms.Button buttonSetup;
        private System.Windows.Forms.Button buttonExit;
        private System.Windows.Forms.Label labelConfigurationInformation;
        private System.Windows.Forms.Label labelName;
        private System.Windows.Forms.ComboBox comboBoxStudents;
    }
}