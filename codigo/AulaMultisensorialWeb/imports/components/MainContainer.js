import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';

export default class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div>
              <div className="main-container">
                <div className="main-info">
                  <div id="login-icon" className="main-icon"></div>
                  <div className="main-title">Inicio sesión</div>
                </div>
                <LoginForm/>
              </div>
            </div>
        );
    }
}
