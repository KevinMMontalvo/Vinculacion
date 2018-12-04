import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';
import TechnicalHelp from '../map/TechnicalHelp';

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
          techHelps: [],
          emptyFields: true,
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

    CheckWarningMessages(){
      let validationArray = this.ValidateEmptyInputs();
      for (var i = 0; i < validationArray.length; i++) {
        if(validationArray[i] == "firstName"){
          this.ShowWarningMenssage("Primer nombre");
        }
        if(validationArray[i] == "lastName"){
          this.ShowWarningMenssage("Apellido paterno");
        }
      }
      if(validationArray.length == 0){
        this.setState({
          emptyFields: false,
        }, () => this.AddStudent())
      }
    }

    AddTechnicalHelp(){
      let techHelpName = document.getElementById('technical-help-input').value;
      if(techHelpName == ""){
        this.ShowWarningMenssage("Ayuda técnica")
      }
      else {
        let techHelpArray = this.state.techHelps;
        let techHelpJSON = {};
        techHelpJSON.name = techHelpName;
        techHelpJSON._id = techHelpArray.length;
        techHelpArray.push(techHelpJSON);
        this.setState({
          techHelps: techHelpArray,
        });
        document.getElementById('technical-help-input').value = "";
      }
    }

    RemoveTechnicalHelp(index){
      let techHelpArray = this.state.techHelps;
      techHelpArray.splice(index, 1);
      for (var i = index; i < techHelpArray.length; i++) {
        techHelpArray[i]._id--;
      }
      this.setState({
        techHelps: techHelpArray,
      })
    }

    AddStudent() {
      let names = document.getElementById('first-name-input').value + " " + document.getElementById('second-name-input').value;
      let surnames = document.getElementById('lastname-input').value + " " + document.getElementById('mothers-lastname-input').value;
      let level_id = document.getElementById('level-select').value;
      let diagnostic = document.getElementById('diagnostic-input').value;
      let birthdate = this.state.date;
      let gender = document.getElementById('gender-select').value;
      let condition = document.getElementById('condition-select').value;
      let technical_help = this.state.techHelps;
      let percentage_of_disability = document.getElementById('percentage-of-disability-input').value;
      let student = {
        names: names,
        surnames: surnames,
        level_id: level_id,
        diagnostic: diagnostic,
        birthdate: birthdate,
        gender: gender,
        condition : condition,
        technical_help: technical_help,
        percentage_of_disability: percentage_of_disability,
      }
      console.log(student);
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
                    <select id="gender-select">
                      <option value="" selected disabled hidden>Selecione el género del estudiante</option>
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
                    <textarea id="diagnostic-input" placeholder="Observaciones sobre el estudiante"></textarea>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Condición</p>
                  <div className="input-container">
                    <select id="condition-select">
                      <option value="" selected disabled hidden>Selecione la condición del estudiante</option>
                      <option value="Masculino">Civíl</option>
                      <option value="Masculino">Militar</option>
                    </select>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Nivel</p>
                  <div className="input-container">
                    <select id="level-select">
                      <option value="" selected disabled hidden>Selecione el nivel del estudiante</option>
                      <option value="Masculino">Nivel1</option>
                      <option value="Masculino">Nivel2</option>
                    </select>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Porcentaje de discapacidad</p>
                  <div className="input-container">
                     <input id="percentage-of-disability-input" maxLength="2" onKeyPress={() =>this.ValidateOnlyNumbers(event)} placeholder="%" className="horizontal-input"/>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Ayudas técnicas</p>
                  <div className="tech-help-input-container">
                    <input id="technical-help-input" placeholder="Tipo de ayuda" className="vertical-input"></input>
                    <div onClick={() => this.AddTechnicalHelp()} className="add-tech-help-button"></div>
                    <div className="added-tech-help-container">
                      <div className="tech-helps-title">Ayudas técnicas del estudiante</div>
                      {this.state.techHelps.map((techHelps) => {
                        return <TechnicalHelp RemoveTechnicalHelp={this.RemoveTechnicalHelp.bind(this)} techHelps={techHelps}  key={techHelps._id}></TechnicalHelp>
                      })}
                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <div onClick={() => this.CheckWarningMessages()} className="secondary-button">Completar Registro</div>
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