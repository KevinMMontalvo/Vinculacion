import React, { Component } from 'react';

export default class StudentByLevel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    SelectStudent(){
      var selectedStudent = document.getElementById(this.props.studentsByCurrentLevel._id);
      if(selectedStudent.className == "student-by-level-container-unselected"){
        selectedStudent.className = "student-by-level-container-selected";
        selectedStudent.childNodes[1].style.backgroundSize = "0.8vw";
        selectedStudent.childNodes[1].style.backgroundColor = "#D0D3D4";
        this.props.SelectStudent(this.props.studentsByCurrentLevel._id);
        this.props.CheckSelected();
        return;
      }
      if(selectedStudent.className == "student-by-level-container-selected"){
        selectedStudent.className = "student-by-level-container-unselected";
        selectedStudent.childNodes[1].style.backgroundSize = "0";
        selectedStudent.childNodes[1].style.backgroundColor = "#FFF";
        this.props.UnselectStudent(this.props.studentsByCurrentLevel._id);
        this.props.CheckSelected();
        return;
      }
    }

    render() {
        return(
            <div>
              {!this.props.studentsByCurrentLevel.changed ?
                <div onClick={() => this.SelectStudent()} id={this.props.studentsByCurrentLevel._id} className="student-by-level-container-unselected">
                  <div className="student-name-container">{this.props.studentsByCurrentLevel.names + " " + this.props.studentsByCurrentLevel.surnames}</div>
                  <div className="student-selector-button"></div>
                </div>
              :
                undefined
              }
            </div>
        );
    }
}
