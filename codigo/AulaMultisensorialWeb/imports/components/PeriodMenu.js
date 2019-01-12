import React, { Component } from 'react';

export default class PeriodMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    MinimizeMenu(){
      this.props.MinimizeMenu(true);
      if(!this.props.isMenuMinimized){
        var container = document.getElementsByClassName('management-menu');
        var menu = document.getElementsByClassName('management-options');
        var options = document.getElementsByClassName('management-option');
        var icons = document.getElementsByClassName('management-icon');
        var texts = document.getElementsByClassName('management-text');
        icons[0].id = 'min-vizualize-icon';
        icons[1].id = 'min-add-icon';
        icons[2].id = 'min-modify-icon';
        icons[3].id = 'min-delete-icon';
        icons[4].id = 'min-active-icon';
        texts[0].id = 'min-vizualize-text';
        texts[1].id = 'min-add-text';
        texts[2].id = 'min-modify-text';
        texts[3].id = 'min-delete-text';
        texts[4].id = 'min-active-text';
        container[0].className = 'min-management-menu';
        menu[0].className = 'min-management-options';
        for (var i = 0; i < 5; i++) {
          options[0].className = 'min-management-option';
          icons[0].className = 'min-management-icon';
          texts[0].className = 'min-management-text';
        }
      }
    }

    AddPeriod(){
      this.MinimizeMenu();
      this.props.AddPeriod();
    }

    ShowPeriodsRecords(){
      this.MinimizeMenu();
      this.props.ShowPeriodsRecords();
    }

    ModifyPeriod(){
      this.MinimizeMenu();
      this.props.ShowModifyButton();
    }

    DeletePeriod(){
      this.MinimizeMenu();
      this.props.ShowDeleteButton();
    }

    ActivePeriod() {
      this.MinimizeMenu();
      this.props.ShowPeriodActiveButton();
    }

    render() {
        return(
            <div>
              {
                this.props.userType == "admin" ?
                <div className="management-menu">
                  <div id="period-management-options" className="management-options">
                    <div onClick={() => this.ShowPeriodsRecords()} id="visualize" className="management-option">
                      <div id="visualize-icon" className="management-icon"></div>
                      <div className="management-text">Periodos registrados</div>
                    </div>
                    <div onClick={() => this.AddPeriod()} id="add" className="management-option">
                      <div id="add-icon" className="management-icon"></div>
                      <div className="management-text">Registrar periodo</div>
                    </div>
                    <div onClick={() => this.ModifyPeriod()} id="modify" className="management-option">
                      <div id="modify-icon" className="management-icon"></div>
                      <div className="management-text">Modificar información</div>
                    </div>
                    <div onClick={() => this.DeletePeriod()} id="delete" className="management-option">
                      <div id="delete-icon" className="management-icon"></div>
                      <div className="management-text">Eliminar registros</div>
                    </div>
                    <div onClick={() => this.ActivePeriod()} id="active" className="management-option">
                      <div id="active-icon" className="management-icon"></div>
                      <div className="management-text">Selecionar periodo activo</div>
                    </div>
                  </div>
                </div>
                :
                undefined
              }
              {
                this.props.userType == "teacher" ?
                <div className="management-menu">
                  <div id="teacher3-management-options" className="management-options">
                    <div onClick={() => this.ShowPeriodsRecords()} id="visualize" className="management-option">
                      <div id="visualize-icon" className="management-icon"></div>
                      <div className="management-text">Periodos registrados</div>
                    </div>
                    <div onClick={() => this.AddPeriod()} id="add" className="management-option" style={{display: "none"}}>
                      <div id="add-icon" className="management-icon"></div>
                      <div className="management-text">Registrar periodo</div>
                    </div>
                    <div onClick={() => this.ModifyPeriod()} id="modify" className="management-option" style={{display: "none"}}>
                      <div id="modify-icon" className="management-icon"></div>
                      <div className="management-text">Modificar información</div>
                    </div>
                    <div onClick={() => this.DeletePeriod()} id="delete" className="management-option" style={{display: "none"}}>
                      <div id="delete-icon" className="management-icon"></div>
                      <div className="management-text">Eliminar registros</div>
                    </div>
                    <div onClick={() => this.ActivePeriod()} id="active" className="management-option" style={{display: "none"}}>
                      <div id="active-icon" className="management-icon"></div>
                      <div className="management-text">Selecionar periodo activo</div>
                    </div>
                  </div>
                </div>
                :
                undefined
              }

            </div>
        );
    }
}
