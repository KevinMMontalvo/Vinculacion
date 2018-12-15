import React, { Component } from 'react';

import TechnicalHelp from '../map/TechnicalHelp';

export default class Registry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          age: 0,
        }
    }

    CalculateAge() {
      var birthdate = new Date(this.props.students.birthdate);
      var ageDifMs = Date.now() - birthdate.getTime();
      var ageDate = new Date(ageDifMs);
      this.setState({
        age: Math.abs(ageDate.getUTCFullYear() - 1970),
        birthdate: birthdate,
      });
    }

    componentWillMount(){
      this.CalculateAge();
    }

    render() {
        return(
            <div>
              <div className="registry">
                <div className="identifier-column">{this.props.students.names.charAt(0)}</div>
                <div className="information-column">
                  <div className="registry-row">
                    <b>Nombre:</b> <p>{this.props.students.names}</p>
                  </div>
                  <div className="registry-row">
                    <b>Apellidos:</b> <p>{this.props.students.surnames}</p>
                  </div>
                  <div className="registry-row">
                    <b>Género:</b> <p>{this.props.students.gender}</p>
                  </div>
                  <div className="registry-row">
                    <b>Diagnostico:</b> <p>{this.props.students.diagnostic}</p>
                  </div>
                  <div className="registry-row">
                    <b>Fecha de naciemiento:</b> <p>{this.state.birthdate. getDate() + ' - ' + (this.state.birthdate. getMonth() + 1) + ' - ' + this.state.birthdate. getUTCFullYear()}</p>
                  </div>
                  <div className="registry-row">
                    <b>Edad:</b> <p>{this.state.age}</p>
                  </div>
                  <div className="registry-row">
                    <b>Condición:</b> <p>{this.props.students.condition}</p>
                  </div>
                  <div className="registry-row">
                    <b>Nivel:</b> <p>{this.props.students.level_id}</p>
                  </div>
                  <div className="registry-row">
                    <b>Porcentaje de discapacidad:</b> <p>{this.props.students.percentage_of_disability}%</p>
                  </div>
                  <div className="registry-row">
                    <b>Ayudas técnicas:</b>
                    <div className="map-container">
                      {
                        this.props.students.technical_helps.map((techHelps) =>
        								{
        									return <TechnicalHelp remove={false} techHelps={techHelps} key={techHelps._id}></TechnicalHelp>;
        								})
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
