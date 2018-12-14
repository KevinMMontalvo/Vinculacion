import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import SideMenu from '../components/SideMenu';
import StudentMenu from '../components/StudentMenu';
import StudentForm from '../components/StudentForm';
import StudentRecords from '../components/StudentRecords';
import TeacherMenu from '../components/TeacherMenu';
import TeacherForm from '../components/TeacherForm';
import LevelMenu from '../components/LevelMenu';
import LevelForm from '../components/LevelForm';

export default class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loginForm: true,
          studentOption: false,
          addStudentForm: false,
          showStudentRecords: false,
          teacherOption: false,
          addTeacherForm: false,
          showTeacherRecords: false,
          levelOption: false,
          addLevelForm: false,
          showLevelRecords: false,
        }
    }


    StudentOption(){
      this.setState({
        loginForm: false,
        studentOption: true,
        addStudentForm: false,
        showStudentRecords: false,
        teacherOption: false,
        addTeacherForm: false,
        showTeacherRecords: false,
        levelOption: false,
        addLevelForm: false,
        showLevelRecords: false,
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
        teacherOption: false,
        addTeacherForm: false,
        showTeacherRecords: false,
        levelOption: false,
        addLevelForm: false,
        showLevelRecords: false,
      });
    }
    ShowStudentRecords(){
      this.setState({
        loginForm: false,
        studentOption: true,
        addStudentForm: false,
        showStudentRecords: true,
        teacherOption: false,
        addTeacherForm: false,
        showTeacherRecords: false,
        levelOption: false,
        addLevelForm: false,
        showLevelRecords: false,
      });
    }


    TeacherOption(){
      this.setState({
        loginForm: false,
        studentOption: false,
        addStudentForm: false,
        showStudentRecords: false,
        teacherOption: true,
        addTeacherForm: false,
        showTeacherRecords: false,
        levelOption: false,
        addLevelForm: false,
        showLevelRecords: false,
      });
      document.getElementById('main-title').innerHTML = "Docentes";
      document.getElementsByClassName('main-icon')[0].id = "teacher-icon";
    }
    AddTeacher(){
      this.setState({
        loginForm: false,
        studentOption: false,
        addStudentForm: false,
        showStudentRecords: false,
        teacherOption: true,
        addTeacherForm: true,
        showTeacherRecords: false,
        levelOption: false,
        addLevelForm: false,
        showLevelRecords: false,
      });
    }
    ShowTeachersRecords(){
      this.setState({
        loginForm: false,
        studentOption: false,
        addStudentForm: false,
        showStudentRecords: false,
        teacherOption: true,
        addTeacherForm: false,
        showTeacherRecords: true,
        levelOption: false,
        addLevelForm: false,
        showLevelRecords: false,
      });
    }


    LevelOption(){
      this.setState({
        loginForm: false,
        studentOption: false,
        addStudentForm: false,
        showStudentRecords: false,
        teacherOption: false,
        addTeacherForm: false,
        showTeacherRecords: false,
        levelOption: true,
        addLevelForm: false,
        showLevelRecords: false,
      });
      document.getElementById('main-title').innerHTML = "Niveles";
      document.getElementsByClassName('main-icon')[0].id = "teacher-icon";
    }
    AddLevel(){
      this.setState({
        loginForm: false,
        studentOption: false,
        addStudentForm: false,
        showStudentRecords: false,
        teacherOption: false,
        addTeacherForm: false,
        showTeacherRecords: false,
        levelOption: true,
        addLevelForm: true,
        showLevelRecords: false,
      });
    }
    ShowLevelsRecords(){
      this.setState({
        loginForm: false,
        studentOption: false,
        addStudentForm: false,
        showStudentRecords: false,
        teacherOption: false,
        addTeacherForm: false,
        showTeacherRecords: true,
        levelOption: true,
        addLevelForm: false,
        showLevelRecords: true,
      });
    }


    render() {
        return(
            <div>
            <SideMenu LevelOption={this.LevelOption.bind(this)} TeacherOption={this.TeacherOption.bind(this)} StudentOption={this.StudentOption.bind(this)}/>
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
                  this.state.teacherOption ?
                  <div>
                    <TeacherMenu ShowTeachersRecords={this.ShowTeachersRecords.bind(this)} AddTeacher={this.AddTeacher.bind(this)}/>
                    {
                      this.state.addTeacherForm ?
                      <TeacherForm/>
                      :
                      undefined
                    }
                    {
                      this.state.showTeacherRecords ?
                      <StudentRecords/>
                      :
                      undefined
                    }
                  </div>

                  :
                  undefined
                }
                {
                  this.state.levelOption ?
                  <div>
                    <LevelMenu ShowLevelsRecords={this.ShowLevelsRecords.bind(this)} AddLevel={this.AddLevel.bind(this)}/>
                    {
                      this.state.addLevelForm ?
                      <LevelForm/>
                      :
                      undefined
                    }
                    {
                      this.state.showLevelRecords ?
                      <LevelRecords/>
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
