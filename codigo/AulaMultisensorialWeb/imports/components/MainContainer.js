import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import SideMenu from '../components/SideMenu';
import StudentMenu from '../components/StudentMenu';
import StudentForm from '../components/StudentForm';
import StudentRecords from '../components/StudentRecords';

export default class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loginForm: true,
          studentOption: false,
          addStudentForm: false,
          showStudentRecords: false,
        }
    }


    StudentOption(){
      this.setState({
        loginForm: false,
        studentOption: true,
        addStudentForm: false,
        showStudentRecords: false,
      });
      document.getElementById('main-title').innerHTML = "Estudiantes";
      document.getElementsByClassName('main-icon')[0].id = "student-icon";
    }
    AddStudent(){
      this.setState({
        loginForm: false,
        studentOption: true,
        addStudentForm: true,
        showStudentRecords: false,
      });
    }
    ShowStudentRecords(){
      this.setState({
        loginForm: false,
        studentOption: true,
        addStudentForm: false,
        showStudentRecords: true,
      });
    }



    render() {
        return(
            <div>
            <SideMenu StudentOption={this.StudentOption.bind(this)}/>
              <div className="main-container">
                <div id="main-info" className="main-info">
                  <div id="login-icon" className="main-icon"></div>
                  <div id="main-title" className="main-title">Inicio sesión</div>
                </div>
                {
                  this.state.studentOption ?
                  <div>
                    <StudentMenu ShowStudentRecords={this.ShowStudentRecords.bind(this)} AddStudent={this.AddStudent.bind(this)}/>
                    {
                      this.state.addStudentForm ?
                      <StudentForm/>
                      :
                      undefined
                    }
                    {
                      this.state.showStudentRecords ?
                      <StudentRecords/>
                      :
                      undefined
                    }
                  </div>

                  :
                  undefined
                }
                {
                  this.state.loginForm ?
                    <LoginForm/>
                  :
                  undefined
                }
              </div>
            </div>
        );
    }
}
