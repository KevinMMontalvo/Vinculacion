import React, { Component } from 'react';

export default class TeacherMenu extends React.Component {
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
        texts[0].id = 'min-vizualize-text';
        texts[1].id = 'min-add-text';
        texts[2].id = 'min-modify-text';
        texts[3].id = 'min-delete-text';
        container[0].className = 'min-management-menu';
        menu[0].className = 'min-management-options';
        for (var i = 0; i < 4; i++) {
          options[0].className = 'min-management-option';
          icons[0].className = 'min-management-icon';
          texts[0].className = 'min-management-text';
        }
      }
    }

    AddTeacher(){
      this.MinimizeMenu();
      this.props.AddTeacher();
    }

    ShowTeachersRecords(){
      this.MinimizeMenu();
      this.props.ShowTeachersRecords();
    }

    ModifyTeacher(){
      this.MinimizeMenu();
      this.props.ShowModifyButton();
    }

    DeleteTeacher(){
      this.MinimizeMenu();
      this.props.ShowDeleteButton();
    }

    render() {
        return(
            <div>
              {
                this.props.userType == "admin" ?
                  <div className="management-menu">
                    <div className="management-options">
                      <div onClick={() => this.ShowTeachersRecords()} id="visualize" className="management-option">
                        <div id="visualize-icon" className="management-icon"></div>
                        <div className="management-text">Docentes registrados</div>
                      </div>
                      <div onClick={() => this.AddTeacher()} id="add" className="management-option">
                        <div id="add-icon" className="management-icon"></div>
                        <div className="management-text">Registrar docentes</div>
                      </div>
                      <div onClick={() => this.ModifyTeacher()} id="modify" className="management-option">
                        <div id="modify-icon" className="management-icon"></div>
                        <div className="management-text">Modificar información</div>
                      </div>
                      <div onClick={() => this.DeleteTeacher()} id="delete" className="management-option">
                        <div id="delete-icon" className="management-icon"></div>
                        <div className="management-text">Eliminar registros</div>
                      </div>
                    </div>
                  </div>
                :
                  undefined
              }
              {
                this.props.userType == "teacher" ?
                  <div className="management-menu">
                    <div id="teacher1-management-options" className="management-options">
                      <div onClick={() => this.ShowTeachersRecords()} id="visualize" className="management-option">
                        <div id="visualize-icon" className="management-icon"></div>
                        <div className="management-text">Docentes registrados</div>
                      </div>
                      <div onClick={() => this.AddTeacher()} id="add" className="management-option">
                        <div id="add-icon" className="management-icon"></div>
                        <div className="management-text">Registrar docentes</div>
                      </div>
                      <div onClick={() => this.ModifyTeacher()} id="modify" className="management-option">
                        <div id="modify-icon" className="management-icon"></div>
                        <div className="management-text">Modificar información</div>
                      </div>
                      <div onClick={() => this.DeleteTeacher()} id="delete" className="management-option" style={{display: "none"}}>
                        <div id="delete-icon" className="management-icon"></div>
                        <div className="management-text">Eliminar registros</div>
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
