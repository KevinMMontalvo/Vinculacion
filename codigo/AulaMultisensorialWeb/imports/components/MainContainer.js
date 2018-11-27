import React, { Component } from 'react';

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
                  <div id="login" className="main-icon"></div>
                  <div className="main-title">Inicio sesión</div>
                </div>
              </div>
            </div>
        );
    }
}
