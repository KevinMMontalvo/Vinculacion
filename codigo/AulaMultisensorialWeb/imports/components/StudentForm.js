import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

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
        }
    }

    onChange = date => this.setState({ date });
    lang = "es-MX";

    render() {
        return(
            <div>
              <div className="student-form">
                <div className="form-container">
                  <p className="input-label">Nombre del guagua</p>
                  <div id="vertical-input" className="student-input">
                    <input placeholder="Primer nombre" className="vertical-input"></input>
                    <input placeholder="Segundo nombre" className="vertical-input"></input>
                    <input placeholder="Apellido paterno" className="vertical-input"></input>
                    <input placeholder="Apellido materno" className="vertical-input"></input>
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
                  <p className="input-label">Género</p>
                  <div className="input-container">
                    <select id="gender">
                      <option value="Masculino">Masculino</option>
                      <option value="Masculino">Femenino</option>
                    </select>
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
                     <input placeholder="%" className="horizontal-input"/>
                  </div>
                </div>
                <div className="form-container">
                  <p className="input-label">Ayudas técnicas</p>
                  <div className="tech-help-input-container">
                    <input placeholder="Ayuda" className="vertical-input"></input>
                    <div className="add-tech-help-button"></div>
                    <div className="added-tech-help-container">

                    </div>
                  </div>
                </div>
                <div className="button-container">
                  <div className="primary-button">Completar Registro</div>
                </div>
                <div className="separator"></div>
              </div>
            </div>
        );
    }
}
