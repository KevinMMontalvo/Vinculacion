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
import LevelRecords from '../components/LevelRecords';

var canvas;
var c;
var galaxy = [];
for (var i = 0; i < 100; i++) {
  galaxy.push(new Star(Math.random() * innerWidth, Math.random() * innerHeight, Math.random() * 0.08, Math.random() * 0.09, Math.random() * 3));
}

function animate(){
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);
  for (var i = 0; i < galaxy.length; i++) {
    galaxy[i].update();
  }
}

function Star(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.draw = function() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.strokeStyle = '#FFFFFF';
    c.fillStyle = '#FFFFFF';
    c.stroke();
    c.fill();
  }
  this.update = function() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
      this.x += this.dx;
      this.y += this.dy;
      this.draw();
  }
}

function initializeSpaceCanvas(){
  canvas = document.getElementById('space-canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  c = canvas.getContext('2d');
  animate();
}


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
          isMenuMinimized: false,
          showModifyForm: false,
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
        showModifyForm: false,
        modifyStudent: false,
        deleteStudent: false,
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
        showModifyForm: false,
        modifyStudent: false,
        deleteStudent: false,
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
        showModifyForm: false,
        modifyStudent: false,
        deleteStudent: false,
      });
    }

    ShowStudentModifyButton(){
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
        modifyStudent: true,
        showModifyForm: false,
        modifyStudent: true,
        deleteStudent: false,
      });
    }

    ShowStudentDeleteButton(){
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
        modifyStudent: true,
        showModifyForm: false,
        modifyStudent: false,
        deleteStudent: true,
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
        showModifyForm: false,
        modifyStudent: true,
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
        showModifyForm: false,
        modifyStudent: true,
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
        showModifyForm: false,
        modifyStudent: true,
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
        showModifyForm: false,
        modifyStudent: true,
      });
      document.getElementById('main-title').innerHTML = "Niveles";
      document.getElementsByClassName('main-icon')[0].id = "level-icon";
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
        showModifyForm: false,
        modifyStudent: true,
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
        showModifyForm: false,
        modifyStudent: false,
        deleteStudent: false,
      });
    }

    ShowLevelModifyButton(){
      this.setState({
        loginForm: false,
        studentOption: false,
        addStudentForm: false,
        showStudentRecords: true,
        teacherOption: false,
        addTeacherForm: false,
        showTeacherRecords: false,
        levelOption: true,
        addLevelForm: false,
        showLevelRecords: true,
        modifyStudent: false,
        showModifyForm: false,
        modifyStudent: true,
        deleteStudent: false,
      });
    }

    ShowLevelDeleteButton(){
      this.setState({
        loginForm: false,
        studentOption: false,
        addStudentForm: false,
        showStudentRecords: true,
        teacherOption: false,
        addTeacherForm: false,
        showTeacherRecords: false,
        levelOption: true,
        addLevelForm: false,
        showLevelRecords: true,
        modifyStudent: false,
        showModifyForm: false,
        modifyStudent: false,
        deleteStudent: true,
      });
    }

    ShowStudentModifyForm(){
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
        modifyStudent: true,
        showModifyForm: true,
      });
    }

    ShowLevelModifyForm(){
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
        showLevelRecords: true,
        modifyStudent: true,
        showModifyForm: true,
      });
    }

    CloseStudentModifyForm(){
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
        modifyStudent: true,
        showModifyForm: false,
      });
    }

    CloseLevelModifyForm(){
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
        showLevelRecords: true,
        modifyStudent: true,
        showModifyForm: false,
      });
    }

    MaximizeMenu(){
      if(this.state.isMenuMinimized){
        this.setState({
          isMenuMinimized: !this.state.isMenuMinimized,
        });
        var container = document.getElementsByClassName('min-management-menu');
        var menu = document.getElementsByClassName('min-management-options');
        var options = document.getElementsByClassName('min-management-option');
        var icons = document.getElementsByClassName('min-management-icon');
        var texts = document.getElementsByClassName('min-management-text');
        icons[0].id = 'visualize-icon';
        icons[1].id = 'add-icon';
        icons[2].id = 'modify-icon';
        icons[3].id = 'delete-icon';
        texts[0].id = 'vizualize-text';
        texts[1].id = 'add-text';
        texts[2].id = 'modify-text';
        texts[3].id = 'delete-text';
        container[0].className = 'management-menu';
        menu[0].className = 'management-options';
        for (var i = 0; i < 4; i++) {
          options[0].className = 'management-option';
          icons[0].className = 'management-icon';
          texts[0].className = 'management-text';
        }
      }
    }

    MinimizeMenu(value){
      this.setState({
        isMenuMinimized: value,
      });
    }


    InitializeSpaceCanvas(){
      initializeSpaceCanvas();
    }




    componentDidMount(){
      this.InitializeSpaceCanvas();
    }

    render() {
        return(
            <div>
              <canvas id="space-canvas">

              </canvas>
              <SideMenu MaximizeMenu={() => this.MaximizeMenu()} LevelOption={this.LevelOption.bind(this)} TeacherOption={this.TeacherOption.bind(this)} StudentOption={this.StudentOption.bind(this)}/>
              <div className="main-container">
                <div id="main-info" className="main-info">
                  <div id="login-icon" className="main-icon"></div>
                  <div id="main-title" className="main-title">Inicio sesión</div>
                </div>
                {
                  this.state.studentOption ?
                  <div>
                    <StudentMenu ShowDeleteButton={() => this.ShowStudentDeleteButton()} ShowModifyButton={() => this.ShowStudentModifyButton()} MinimizeMenu={this.MinimizeMenu.bind(this)} isMenuMinimized={this.state.isMenuMinimized} ShowStudentRecords={this.ShowStudentRecords.bind(this)} AddStudent={this.AddStudent.bind(this)}/>
                    {
                      this.state.addStudentForm ?
                      <StudentForm/>
                      :
                      undefined
                    }
                    {
                      this.state.showStudentRecords ?
                      <StudentRecords CloseModifyForm={() => this.CloseStudentModifyForm()} delete={this.state.deleteStudent} ShowModifyForm={this.ShowStudentModifyForm.bind(this)} showModifyForm={this.state.showModifyForm} modify={this.state.modifyStudent} />
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
                    <TeacherMenu MinimizeMenu={this.MinimizeMenu.bind(this)} isMenuMinimized={this.state.isMenuMinimized} ShowTeachersRecords={this.ShowTeachersRecords.bind(this)} AddTeacher={this.AddTeacher.bind(this)}/>
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
                    <LevelMenu ShowDeleteButton={() => this.ShowLevelDeleteButton()} ShowModifyButton={() => this.ShowLevelModifyButton()} MinimizeMenu={this.MinimizeMenu.bind(this)} isMenuMinimized={this.state.isMenuMinimized} ShowLevelsRecords={this.ShowLevelsRecords.bind(this)} AddLevel={this.AddLevel.bind(this)}/>
                    {
                      this.state.addLevelForm ?
                      <LevelForm/>
                      :
                      undefined
                    }
                    {
                      this.state.showLevelRecords ?
                      <LevelRecords CloseModifyForm={() => this.CloseLevelModifyForm()} delete={this.state.deleteStudent} ShowModifyForm={this.ShowLevelModifyForm.bind(this)} showModifyForm={this.state.showModifyForm} modify={this.state.modifyStudent} />
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
