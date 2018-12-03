import React, { Component } from 'react';

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isLogged: true,
        }
    }
    StudentOption(){
      this.props.StudentOption();
    }
    render() {
        return(
            <div>
              <div className="side-menu">
                {this.state.isLogged ?
                  <div className="menu-options">
                    <div onClick={() => this.StudentOption()} id="option1" className="menu-option">Estudiantes</div>
                    <div id="option2" className="menu-option">Docentes</div>
                    <div id="option3" className="menu-option">Niveles</div>
                    <div id="option4" className="menu-option">Registro de actividades</div>
                  </div>
                  :
                  <div className="menu-icon"></div>
                }
                <div className="menu-title">FUVIME</div>
                <div className="user-info-container"></div>
              </div>
            </div>
        );
    }
}
