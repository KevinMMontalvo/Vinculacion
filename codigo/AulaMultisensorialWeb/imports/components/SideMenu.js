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
    TeacherOption(){
      this.props.TeacherOption();
    }
    LevelOption(){
      this.props.LevelOption();
    }
    render() {
        return(
            <div>
              <div className="side-menu">
                {this.state.isLogged ?
                  <div className="menu-options">
                    <div onClick={() => this.StudentOption()} id="option1" className="menu-option">Estudiantes</div>
                    <div onClick={() => this.TeacherOption()} id="option2" className="menu-option">Docentes</div>
                    <div onClick={() => this.LevelOption()} id="option3" className="menu-option">Niveles</div>
                    <div id="option4" className="menu-option">Actividades</div>
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
