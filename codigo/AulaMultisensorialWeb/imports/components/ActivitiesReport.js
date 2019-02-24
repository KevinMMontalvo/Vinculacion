import React, { Component } from 'react';
import GraphicsParametersForm from '../components/GraphicsParametersForm';
import GraphicResult from '../components/GraphicResult';

export default class ActivitiesReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReportForm: true,
      showGraphicResult: false,
      parameters: undefined,
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

  ShowGraphicResult(parameters){
    let data;
    let maxValue = 0;
    if(parameters.graphicType == "bar"){
      data = JSON.parse(globeActivitiesController.getBarChartDataIndividual(parameters.startDate, parameters.endDate, parameters.student, parameters.fingers));
      maxValue = this.GetMaxValue(data);
    }
    if(parameters.graphicType == "pie"){
      data = JSON.parse(globeActivitiesController.getPieChartDataIndividual(parameters.startDate, parameters.endDate, parameters.student, parameters.fingers));
    }
    this.setState({
      showReportForm: false,
      showGraphicResult: true,
      parameters: parameters,
      data: data,
      maxValue: maxValue,
    });
  }

  GetMaxValue(data){
    let values = [];
    for (var i = 1; i < data.length; i++) {
      values.push(parseInt(data[i][1]));
      values.push(parseInt(data[i][2]));
    }
    let maxValue = 0;
    for (var i = 0; i < values.length; i++) {
      if(values[i] > maxValue){
        maxValue = values[i];
      }
    }
    return maxValue;
  }

  render() {
    return(
      <div>
        <div className="report-container">
          {
            this.state.showReportForm
              ?
                <GraphicsParametersForm
                  user={this.props.user}
                  ShowGraphicResult={this.ShowGraphicResult.bind(this)}/>
              :
              undefined
          }
          {
            this.state.showGraphicResult
              ?
                <GraphicResult
                  parameters={this.state.parameters}
                  data={this.state.data}
                  maxValue={this.state.maxValue}/>
              :
              undefined
          }
        </div>
      </div>
    );
  }
}
