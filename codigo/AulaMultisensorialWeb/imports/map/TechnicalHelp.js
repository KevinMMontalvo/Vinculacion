import React, { Component } from 'react';

export default class TechnicalHelp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    RemoveTechnicalHelp(index){
      this.props.RemoveTechnicalHelp(index);
    }

    render() {
        return(
            <div>
              <div className="tech-help-map-component">
                <div className="tech-help-index">
                  {this.props.techHelps._id + 1}
                </div>
                <div className="tech-help-name">
                  {this.props.techHelps.name}
                </div>
                <div onClick={() => this.RemoveTechnicalHelp(this.props.techHelps._id)} className="tech-help-delete-button"></div>
              </div>
            </div>
        );
    }
}
