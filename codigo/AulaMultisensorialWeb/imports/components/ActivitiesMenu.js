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

    TurnOn(){
      arduinoController.sendMessage("ON:")
    }

    TurnOff()   {
      arduinoController.sendMessage("OFF:")
    }

    render() {
        return(
            <div>
              <div className="management-menu">
                <div className="management-options">
                  <div onClick={() => this.TurnOn()} id="visualize" className="management-option">
                    <div id="turn-on-icon" className="management-icon"></div>
                    <div className="management-text">Encender</div>
                  </div>
                  <div onClick={() => this.TurnOff()} id="add" className="management-option">
                    <div id="turn-off-icon" className="management-icon"></div>
                    <div className="management-text">Apagar</div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
