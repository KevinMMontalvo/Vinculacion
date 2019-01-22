import React, { Component } from 'react';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';


export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emptyInputMessage: "Existen campos vacios: ",
      wrongUserOrPaswwordMessage: "Par de usuario y contraseña invalidos",
      user: '',
    }
  }

  ShowWarningMenssage(field)
  {
    this.tray.raise({
      content: <Cinnamon.Crisp
        className="butter-alert"
        scheme={Cinnamon.Slim.SCHEME_BLUE}
        content={() => <div>{field}</div>}
        title={this.state.emptyInputMessage}
        icon={<div className="alert-warning-icon"></div>}
      />
    });
  }

  ShowWrongUserOrPasswordMenssage()
  {
    this.tray.raise({
      content: <Cinnamon.Crisp
        className="butter-alert"
        scheme={Cinnamon.Slim.SCHEME_BLUE}
        content={() => <div>{"Vuelva a intentarlo"}</div>}
        title={this.state.wrongUserOrPaswwordMessage}
        icon={<div className="wrong-info-icon"></div>}
      />
    });
  }

  ValidateLogin(){
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let user = null;
    let teachers = this.LoadTeachers();
    let administrators = this.LoadAdministrators();
    if(username == ""){
      this.ShowWarningMenssage("Usuario");
    }
    if(password == ""){
      this.ShowWarningMenssage("Contraseña");
    }
    if(username != "" && password != ""){
      if(adminsController.validateAdministratorLogin(username,  password)){
        this.props.SuccessfullLogin();
        for (var i = 0; i < administrators.length; i++) {
          if(username == administrators[i].name){
            user = {
              _id: administrators[i]._id,
              name: administrators[i].name,
              type: "admin"
            };
            break;
          }
        }
        logController.insertLog(this.CreateLog(user._id, "Ingreso exitoso"));
        this.SendUser(user);
        return;
      }
      if(teachersController.validateTeacherLogin(username,  password)){
        this.props.SuccessfullLogin();
        for (var i = 0; i < teachers.length; i++) {
          if(username == teachers[i].name){
            user = {
              _id: teachers[i]._id,
              name: teachers[i].name,
              level: teachers[i].level_id,
              type: "teacher"
            };
            break;
          }
        }
        logController.insertLog(this.CreateLog(user._id, "Ingreso exitoso"));
        this.SendUser(user);
        return;
      }
      else {
        this.ShowWrongUserOrPasswordMenssage();
        for (var i = 0; i < teachers.length; i++) {
          if(username == teachers[i].name){
            user = {
              _id: teachers[i]._id,
              name: teachers[i].name,
              level: teachers[i].level_id,
              type: "teacher"
            };
            break;
          }
        }
        for (var i = 0; i < administrators.length; i++) {
          if(username == administrators[i].name){
            user = {
              _id: administrators[i]._id,
              name: administrators[i].name,
              type: "admin"
            };
            break;
          }
        }
        if(user != null){
          logController.insertLog(this.CreateLog(user._id, "Ingreso no exitoso"));
        }
        else {
          logController.insertLog(this.CreateLog("", "Ingreso no exitoso"));
        }
        return;
      }
    }
  }

  SendUser(user){
    this.props.SuccessfullLogin(user);
  }

  LoadTeachers() {
    var teachersString = teachersController.getTeachers();
    var teachers = JSON.parse(teachersString);
    return teachers;
  }

  LoadAdministrators() {
    var administratorsString = adminsController.getAdministrators();
    var administrators = JSON.parse(administratorsString);
    return administrators;
  }

  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.ValidateLogin();
    }
  }

  CreateLog(userId, action){
    let log = {
      user_id: userId,
      action: action,
      date: new Date(),
    };
    return log;
  }

  render() {
    return(
      <div>
        <div className="login-form">
          <div className="login-input-container">
            <div className="input-container">
              <input id="username" placeholder="Usuario" className="horizontal-input" type="text"></input>
            </div>
            <div className="input-container">
              <input onKeyPress={this.handleKeyPress} id="password" placeholder="Contraseña" className="horizontal-input" type="password"></input>
            </div>
            <div className="button-container">
              <div onClick={() => this.ValidateLogin()} className="primary-button">Ingresar</div>
            </div>
          </div>
        </div>
        <ButterToast
          position={{
            vertical: POS_TOP,
            horizontal: POS_RIGHT
          }}
          timeout={7500}
          ref={tray => this.tray = tray}
        />
      </div>
    );
  }
}
