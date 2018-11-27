import React, { Component } from 'react';

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div>
              <div className="side-menu">
                <div className="menu-title">FUVIME</div>
                <div className="menu-icon"></div>
                <div className="user-info-container"></div>
              </div>
            </div>
        );
    }
}
