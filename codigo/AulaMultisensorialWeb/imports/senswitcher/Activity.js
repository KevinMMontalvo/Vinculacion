import React, { Component } from 'react';
import { DotLoader } from 'react-spinners';

export default class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    ShowActivityDescription(row, description){
      this.props.ShowActivityDescription(row, description);
    }

    render() {
        return(
            <div>
              {
                this.props.activities.show ?
                  <div id={this.props.activities._id} className="activity-container">
                    <div className="activity-title">{this.props.activities.title}</div>
                    <div onClick={() => this.ShowActivityDescription(this.props.row, this.props.activities.description)} className="show-description-button"></div>
                  </div>
                :
                undefined
              }
            </div>
        );
    }
}
