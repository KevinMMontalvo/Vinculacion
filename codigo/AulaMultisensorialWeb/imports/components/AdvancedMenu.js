import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

export default class AdvancedMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          openOptionsMenu: false,
          excelOption: false,
        }
    }

    onOpenOptionsModal = () => {
      this.setState({ openOptionsMenu: true });
    };

    onCloseOptionsModal = () => {
      this.setState({ openOptionsMenu: false });
    };

    onOpenExcelModal = () => {
      this.setState({
        excelOption: true, openOptionsMenu: false });
    };

    onCloseExcelModal = () => {
      this.setState({ excelOption: false });
    };

    OpenFilePicker() {
      document.getElementById('excel-input').click();
    }

    LoadFilePath() {
      let filePath = document.getElementById('excel-input').value;
      console.log(filePath);
      filePath = filePath.replace(/^.*\\/, "");
      console.log(filePath);
    }

    render() {
        return(
          <div>
            <div onClick={() => this.onOpenOptionsModal()} className="advanced-menu-container"></div>
            <Modal open={this.state.openOptionsMenu} onClose={this.onCloseOptionsModal} center>
              <div className="advanced-menu-options-container">
                <div className="advanced-menu-title">Opciones avanzadas</div>
                <div id="change-password" className="advanced-menu-option-container-b">Cambiar contraseña</div>
                <div onClick={() => this.onOpenExcelModal()} id="import-excel" className="advanced-menu-option-container-g">Importar excel (.xlsx)</div>
              </div>
            </Modal>
            <Modal open={this.state.excelOption} onClose={this.onCloseExcelModal} center>
              <div className="advanced-menu-options-container">
                <div className="advanced-menu-title">Importar excel</div>
                <div onClick={() => this.OpenFilePicker()} className="excel-picker">
                  <div className="excel-picker-icon"></div>
                  <p className="excel-picker-text">Selecionar el archivo de excel que desee importar</p>
                </div>
                <input onChange={() => this.LoadFilePath()} accept=".xlsx" id="excel-input" type="file"/>
              </div>
            </Modal>
          </div>
        );
    }
}
