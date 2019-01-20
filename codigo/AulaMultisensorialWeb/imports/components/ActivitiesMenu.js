import React, { Component } from 'react';

export default class ActivitiesMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    MinimizeMenu(){
      this.props.MinimizeMenu(true);
      if(!this.props.isMenuMinimized){
        var container = document.getElementsByClassName('management-menu');
        var menu = document.getElementsByClassName('management-options');
        var options = document.getElementsByClassName('management-option');
        var icons = document.getElementsByClassName('management-icon');
        var texts = document.getElementsByClassName('management-text');
        icons[0].id = 'min-vizualize-icon';
        icons[1].id = 'min-add-icon';
        icons[2].id = 'min-modify-icon';
        icons[3].id = 'min-delete-icon';
        texts[0].id = 'min-vizualize-text';
        texts[1].id = 'min-add-text';
        texts[2].id = 'min-modify-text';
        texts[3].id = 'min-delete-text';
        container[0].className = 'min-management-menu';
        menu[0].className = 'min-management-options';
        for (var i = 0; i < 4; i++) {
          options[0].className = 'min-management-option';
          icons[0].className = 'min-management-icon';
          texts[0].className = 'min-management-text';
        }
      }
    }

    MatrixActivity(){

    }

    GlovesActivity(){

    }

    CardiacSensorActivity(){

    }

    render() {
        return(
            <div>
              <div className="activities-menu">
                <div className="activities-options">
                  <div onClick={() => this.MatrixActivity()} id="matrix" className="activity-option">
                    <div id="matrix-icon" className="activity-icon"></div>
                    <div className="activity-text">Matriz</div>
                  </div>
                  <div onClick={() => this.GlovesActivity()} id="gloves" className="activity-option">
                    <div id="gloves-icon" className="activity-icon"></div>
                    <div className="activity-text">Guantes</div>
                  </div>
                  <div onClick={() => this.CardiacSensorActivity()} id="cardiac-sensor" className="activity-option">
                    <div id="cardiac-sensor-icon" className="activity-icon"></div>
                    <div className="activity-text">Sensor cardíaco</div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
