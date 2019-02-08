import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { DotLoader } from 'react-spinners';
import GraphicsParametersForm from '../components/GraphicsParametersForm';

export default class ActivitiesReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  CreateLog(userId, action){
    let log = {
      user_id: userId,
      action: action,
      date: new Date(),
    };
    return log;
  }

  render() {
    return(
      <div>
        <div className="report-container">
          <GraphicsParametersForm
            user={this.props.user}/>
        </div>
      </div>
    );
  }
}
