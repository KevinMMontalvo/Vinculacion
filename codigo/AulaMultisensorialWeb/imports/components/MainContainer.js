import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import SideMenu from '../components/SideMenu';
import StudentMenu from '../components/StudentMenu';
import StudentForm from '../components/StudentForm';
import StudentRecords from '../components/StudentRecords';
import TeacherMenu from '../components/TeacherMenu';
import TeacherForm from '../components/TeacherForm';
import TeacherRecords from '../components/TeacherRecords';
import LevelMenu from '../components/LevelMenu';
import LevelForm from '../components/LevelForm';
import LevelRecords from '../components/LevelRecords';
import PeriodMenu from '../components/PeriodMenu';
import PeriodForm from '../components/PeriodForm';
import PeriodRecords from '../components/PeriodRecords';
import ActivePeriodForm from '../components/ActivePeriodForm';
import ActivitiesMenu from '../components/ActivitiesMenu';
import ActivitiesReport from '../components/ActivitiesReport';


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
      isLogged: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      isMenuMinimized: false,
      showModifyForm: false,
      activityOption: false,
      activitiesReport: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      modify: false,
      visblePeriod: undefined,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      delete: false,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      delete: false,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      delete: false,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      modify: true,
      showModifyForm: false,
      delete: false,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      modify: false,
      showModifyForm: false,
      delete: true,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: true,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: true,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      delete: false,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: true,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: true,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      delete: false,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  AddPeriod(){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: true,
      addPeriodForm: true,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ShowPeriodsRecords(){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: true,
      addPeriodForm: false,
      showPeriodRecords: true,
      showModifyForm: false,
      modify: false,
      delete: false,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: true,
      delete: false,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ShowPeriodModifyButton(){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: true,
      addPeriodForm: false,
      showPeriodRecords: true,
      showModifyForm: false,
      modify: true,
      delete: false,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ShowTeacherModifyButton(){
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: true,
      delete: false,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ShowLevelDeleteButton(){
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      delete: true,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ShowTeacherDeleteButton(){
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      delete: true,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ShowPeriodDeleteButton(){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: true,
      addPeriodForm: false,
      showPeriodRecords: true,
      showModifyForm: false,
      modify: false,
      delete: true,
      activityOption: false,
      activePeriod: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      modify: true,
      showModifyForm: true,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      modify: true,
      showModifyForm: true,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ShowTeacherModifyForm(){
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      modify: true,
      showModifyForm: true,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ShowPeriodModifyForm(){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: true,
      addPeriodForm: false,
      showPeriodRecords: true,
      modify: true,
      showModifyForm: true,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      modify: true,
      showModifyForm: false,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      modify: true,
      showModifyForm: false,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  CloseTeacherModifyForm(){
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
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      modify: true,
      showModifyForm: false,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ClosePeriodModifyForm(){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: true,
      addPeriodForm: false,
      showPeriodRecords: true,
      modify: true,
      showModifyForm: false,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ShowActivitiesMenu(){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      modify: false,
      showModifyForm: false,
      activityOption: true,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
    document.getElementById('main-title').innerHTML = "Actividades";
    document.getElementsByClassName('main-icon')[0].id = "activities-icon";
  }

  PeriodOption(){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: true,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
    document.getElementById('main-title').innerHTML = "Periodos";
    document.getElementsByClassName('main-icon')[0].id = "period-icon";
  }

  ShowPeriodActiveButton(){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: true,
      addPeriodForm: false,
      showPeriodRecords: true,
      showModifyForm: false,
      modify: false,
      activityOption: false,
      activePeriod: true,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
  }

  ShowActiveNewPeriodForm(period){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: true,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: true,
      periodToActive: period,
      activitiesReport: false,
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
      if(icons.length > 4) {
        icons[4].id = 'active-icon';
        texts[4].id = 'active-text';
      }
      container[0].className = 'management-menu';
      menu[0].className = 'management-options';
      if(icons.length > 4) {
        for (var i = 0; i < 5; i++) {
          options[0].className = 'management-option';
          icons[0].className = 'management-icon';
          texts[0].className = 'management-text';
        }
      }
      else {
        for (var i = 0; i < 4; i++) {
          options[0].className = 'management-option';
          icons[0].className = 'management-icon';
          texts[0].className = 'management-text';
        }
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
    this.GetActualPeriod();
  }

  SuccessfullLogin(user){
    this.setState({
      isLogged: true,
      loginForm: false,
      user: user,
    });
    document.getElementById('main-title').innerHTML = "Bienvenido";
    document.getElementsByClassName('main-icon')[0].id = "home-icon";
  }

  Logout(){
    this.setState({
      isLogged: false,
      loginForm: true,
      user: undefined,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      modify: false,
      showModifyForm: false,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: false,
    });
    document.getElementById('main-title').innerHTML = "Inicio de sesión";
    document.getElementsByClassName('main-icon')[0].id = "login-icon";
  }

  ActivitiesReport(){
    this.setState({
      loginForm: false,
      studentOption: false,
      addStudentForm: false,
      showStudentRecords: false,
      teacherOption: false,
      addTeacherForm: false,
      showTeacherRecords: false,
      levelOption: false,
      addLevelForm: false,
      showLevelRecords: false,
      periodOption: false,
      addPeriodForm: false,
      showPeriodRecords: false,
      showModifyForm: false,
      modify: false,
      activityOption: false,
      activePeriod: false,
      delete: false,
      newActivePeriodForm: false,
      activitiesReport: true,
    });
  }

  GetActualPeriod(){
    var periodsString = periodsController.getPeriods();
    var periods = JSON.parse(periodsString);
    for (var i = 0; i < periods.length; i++) {
      if(periods[i].is_visible){
        this.setState({
          visblePeriod: periods[i],
        })
      }
    }
  }

  ChangeUserInfo(name, level_id){
    if(this.state.user.type != "admin"){
      let user = {
        _id: this.state.user._id,
        name: name,
        type: "teacher",
        level: level_id
      }
      this.setState({
        user: user,
      });
    }
  }


  render() {
    return(
      <div>
        <canvas id="space-canvas">

        </canvas>
        <SideMenu
          Logout={this.Logout.bind(this)}
          user={this.state.user}
          isLogged={this.state.isLogged}
          ShowActivitiesMenu={this.ShowActivitiesMenu.bind(this)}
          MaximizeMenu={() => this.MaximizeMenu()}
          PeriodOption={this.PeriodOption.bind(this)}
          LevelOption={this.LevelOption.bind(this)}
          TeacherOption={this.TeacherOption.bind(this)}
          StudentOption={this.StudentOption.bind(this)}/>
        <div className="main-container">
          <div id="main-info" className="main-info">
            <div id="login-icon" className="main-icon"></div>
            <div id="main-title" className="main-title">Inicio de sesión</div>
          </div>
          {
            this.state.studentOption ?
              <div>
                <StudentMenu
                  ShowDeleteButton={() => this.ShowStudentDeleteButton()}
                  ShowModifyButton={() => this.ShowStudentModifyButton()}
                  MinimizeMenu={this.MinimizeMenu.bind(this)}
                  isMenuMinimized={this.state.isMenuMinimized}
                  ShowStudentRecords={this.ShowStudentRecords.bind(this)}
                  AddStudent={this.AddStudent.bind(this)}
                  userType={this.state.user.type}/>
                {
                  this.state.addStudentForm ?
                    <StudentForm
                      user={this.state.user}/>
                  :
                    undefined
                }
                {
                  this.state.showStudentRecords ?
                    <StudentRecords
                      CloseModifyForm={() => this.CloseStudentModifyForm()}
                      delete={this.state.delete}
                      ShowModifyForm={this.ShowStudentModifyForm.bind(this)}
                      showModifyForm={this.state.showModifyForm}
                      modify={this.state.modify}
                      user={this.state.user}/>
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
                <TeacherMenu
                  ShowDeleteButton={() => this.ShowTeacherDeleteButton()}
                  ShowModifyButton={() => this.ShowTeacherModifyButton()}
                  MinimizeMenu={this.MinimizeMenu.bind(this)}
                  isMenuMinimized={this.state.isMenuMinimized}
                  ShowTeachersRecords={this.ShowTeachersRecords.bind(this)}
                  AddTeacher={this.AddTeacher.bind(this)}
                  userType={this.state.user.type}/>
                {
                  this.state.addTeacherForm ?
                    <TeacherForm
                      user={this.state.user}/>
                  :
                  undefined
                }
                {
                  this.state.showTeacherRecords ?
                    <TeacherRecords
                      CloseModifyForm={() => this.CloseTeacherModifyForm()}
                      delete={this.state.delete}
                      ShowModifyForm={this.ShowTeacherModifyForm.bind(this)}
                      showModifyForm={this.state.showModifyForm}
                      modify={this.state.modify}
                      ChangeUserInfo={this.ChangeUserInfo.bind(this)}
                      user={this.state.user}/>
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
                <LevelMenu
                  ShowDeleteButton={() => this.ShowLevelDeleteButton()}
                  ShowModifyButton={() => this.ShowLevelModifyButton()}
                  MinimizeMenu={this.MinimizeMenu.bind(this)}
                  isMenuMinimized={this.state.isMenuMinimized}
                  ShowLevelsRecords={this.ShowLevelsRecords.bind(this)}
                  AddLevel={this.AddLevel.bind(this)}
                  userType={this.state.user.type}/>
                {
                  this.state.addLevelForm ?
                    <LevelForm
                      user={this.state.user}/>
                  :
                  undefined
                }
                {
                  this.state.showLevelRecords ?
                    <LevelRecords CloseModifyForm={() => this.CloseLevelModifyForm()}
                      delete={this.state.delete}
                      ShowModifyForm={this.ShowLevelModifyForm.bind(this)}
                      showModifyForm={this.state.showModifyForm}
                      modify={this.state.modify}
                      user={this.state.user}/>
                  :
                  undefined
                }
              </div>

            :
            undefined
          }
          {
            this.state.periodOption ?
              <div>
                <PeriodMenu
                  ShowDeleteButton={() => this.ShowPeriodDeleteButton()}
                  ShowModifyButton={() => this.ShowPeriodModifyButton()}
                  MinimizeMenu={this.MinimizeMenu.bind(this)}
                  isMenuMinimized={this.state.isMenuMinimized}
                  ShowPeriodsRecords={this.ShowPeriodsRecords.bind(this)}
                  AddPeriod={this.AddPeriod.bind(this)}
                  ShowPeriodActiveButton={this.ShowPeriodActiveButton.bind(this)}
                  userType={this.state.user.type}/>
                {
                  this.state.addPeriodForm ?
                    <PeriodForm
                      user={this.state.user}/>
                  :
                  undefined
                }
                {
                  this.state.showPeriodRecords ?
                    <PeriodRecords
                      CloseModifyForm={() => this.ClosePeriodModifyForm()}
                      delete={this.state.delete}
                      ShowModifyForm={this.ShowPeriodModifyForm.bind(this)}
                      showModifyForm={this.state.showModifyForm}
                      modify={this.state.modify}
                      active={this.state.activePeriod}
                      ShowActiveNewPeriodForm={this.ShowActiveNewPeriodForm.bind(this)}
                      user={this.state.user}/>
                  :
                  undefined
                }
                {
                  this.state.newActivePeriodForm ?
                    <ActivePeriodForm
                      GetActualPeriod={this.GetActualPeriod.bind(this)}
                      PeriodOption={this.PeriodOption.bind(this)}
                      periodToActive={this.state.periodToActive}
                      user={this.state.user}/>
                  :
                  undefined
                }
              </div>

            :
            undefined
          }
          {
            this.state.activityOption ?
              <div>
                <ActivitiesMenu
                  ActivitiesReport={this.ActivitiesReport.bind(this)}/>
              </div>
            :
            undefined
          }
          {
            this.state.activitiesReport ?
              <ActivitiesReport
                user={this.state.user}/>
            :
            undefined
          }
          {
            this.state.loginForm ?
              <LoginForm SuccessfullLogin={this.SuccessfullLogin.bind(this)}/>
            :
            undefined
          }
          {this.state.isLogged && this.state.visblePeriod != undefined ?
            <div className="actual-period-container">
              <b>Periodo actual:</b>
              <p>{this.state.visblePeriod.name}</p>
            </div>
          :
            undefined
          }
        </div>
      </div>
    );
  }
}
