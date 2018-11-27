import React, { Component } from 'react';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div>
              <div className="login-form">
                <div className="input-container">
                  <input placeholder="Usuario" className="login-input" type="text"></input>
                </div>
                <div className="input-container">
                  <input placeholder="Contraseña" className="login-input" type="password"></input>
                </div>
                <div className="button-container">
                  <div className="primary-button">Ingresar</div>
                </div>
              </div>
            </div>
        );
    }
}
