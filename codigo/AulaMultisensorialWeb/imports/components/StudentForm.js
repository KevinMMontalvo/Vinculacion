import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class StudentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          date: new Date(),
          locate: "es-MX",
          options: [
            { value: 'Masculino', label: 'Masculino' },
            { value: 'Femenino', label: 'Femenino' },
          ],
          emptyInputMessage: "Existen campos vacios: ",
        }
    }

    ValidateOnlyNumbers(evt) {
      var theEvent = evt || window.event;
      if (theEvent.type === 'paste') {
          key = event.clipboardData.getData('text/plain');
      } else {
          var key = theEvent.keyCode || theEvent.which;
          key = String.fromCharCode(key);
      }
      var regex = /[0-9]|\1/;
      if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
      }
    }

    ValidateOnlyLetters(evt) {
      var theEvent = evt || window.event;
      if (theEvent.type === 'paste') {
          key = event.clipboardData.getData('text/plain');
      } else {
          var key = theEvent.keyCode || theEvent.which;
          key = String.fromCharCode(key);
      }
      var regex = /[a-zA-Z]|\1/;
      if( !regex.test(key) ) {
        theEvent.returnValue = false;
        if(theEvent.preventDefault) theEvent.preventDefault();
      }
    }

    onChange = date => this.setState({ date });
    lang = "es-MX";

    ShowWarningMenssage(field) {
        ButterToast.raise({
            content:
            <Cinnamon.Crisp
              scheme={Cinnamon.Crisp.SCHEME_GREY}
              content={() => <div>{field}</div>}
              title={this.state.emptyInputMessage}
              icon={<div className="alert-warning-icon"></div>}
            />
        });
    }

    ValidateEmptyInputs(){
      let firstName = document.getElementById('first-name-input').value;
      let lastName = document.getElementById('lastname-input').value;
      let validationArray = new Array();
      if(firstName == ""){
        validationArray.push("firstName");
      }
      if(lastName == ""){
        validationArray.push("lastName");
      }
      return validationArray;
    }

    ChekWarningMessages(){
      let validationArray = this.ValidateEmptyInputs();
      for (var i = 0; i < validationArray.length; i++) {
        if(validationArray[i] == "firstName"){
          this.ShowWarningMenssage("Primer Nombre");
        }
        if(validationArray[i] == "lastName"){
          this.ShowWarningMenssage("Apellido Paterno");
        }
      }
    }

    render() {
        return(
            <div>
              <div className="student-form">
                <div className="form-container">
                  <p className="input-label">Nombre del guagua</p>
                  <div id="vertical-input" className="student-input">
                    <input id="first-name-input" onKeyPress = {() => this.ValidateOnlyLetters(event)} placeholder="Primer nombre" className="vertical-input"></input>
                    <input id="second-name-input" onKeyPress = {() => this.ValidateOnlyLetters(event)} placeholder="Segundo nombre" className="vertical-input"></input>
                    <input id="lastname-input" onKeyPress = {() => this.ValidateOnlyLetters(event)} placeholder="Apellido paterno" className="vertical-input"></input>
                    <input id="mothers-lastname-input" onKeyPress = {() => this.ValidateOnlyLetters(event)} placeholder="Apellido materno" className="vertical-input"></input>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Género</p>
                  <div className="input-container">
                    <select id="gender">
                      <option value="Masculino">Masculino</option>
                      <option value="Masculino">Femenino</option>
                    </select>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Fecha de nacimiento</p>
                  <div className="date-input-container">
                    <DatePicker
                      onChange={this.onChange}
                      value={this.state.date}
                      locate={this.lang}
                    />
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Diagnóstico</p>
                  <div className="input-container">
                    <textarea  placeholder="Observaciones sobre el estudiante"></textarea>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Condición</p>
                  <div className="input-container">
                    <select id="gender">
                      <option value="Masculino">Civíl</option>
                      <option value="Masculino">Militar</option>
                    </select>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Nivel</p>
                  <div className="input-container">
                    <select id="gender">
                      <option value="Masculino">Nivel1</option>
                      <option value="Masculino">Nivel2</option>
                    </select>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Porcentaje de discapacidad</p>
                  <div className="input-container">
                     <input maxlength="2" onKeyPress={() =>this.ValidateOnlyNumbers(event)} placeholder="%" className="horizontal-input"/>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Ayudas técnicas</p>
                  <div className="tech-help-input-container">
                    <input placeholder="Tipo de ayuda" className="vertical-input"></input>
                    <div className="add-tech-help-button"></div>
                    <div className="added-tech-help-container">

                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <div onClick={() => this.ChekWarningMessages()} className="secondary-button">Completar Registro</div>
                </div>
                <div className="separator"></div>
              </div>
              <ButterToast
                position={{vertical: POS_TOP, horizontal: POS_RIGHT}}
                timeout={6000}
              />
            </div>
        );
    }
}
