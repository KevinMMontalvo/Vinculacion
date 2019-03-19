namespace Aula_Multisensorial.Board
{
    partial class BoardActivity
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
            this.SuspendLayout();
            // 
            // BoardActivity
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(864, 627);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedToolWindow;
            this.Name = "BoardActivity";
            this.Text = "BoardActivity";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.BoardActivity_FormClosing);
            this.FormClosed += new System.Windows.Forms.FormClosedEventHandler(this.BoardActivity_FormClosed);
            this.Load += new System.EventHandler(this.BoardActivity_Load);
            this.ResumeLayout(false);

        }

        #endregion
    }
}