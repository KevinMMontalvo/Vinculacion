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
                <div className="login-input-container">
                  <div className="input-container">
                    <input id="username" placeholder="Usuario" className="horizontal-input" type="text"></input>
                  </div>
                  <div className="input-container">
                    <input id="password" placeholder="Contraseña" className="horizontal-input" type="password"></input>
                  </div>
                  <div className="button-container">
                    <div className="primary-button">Ingresar</div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
