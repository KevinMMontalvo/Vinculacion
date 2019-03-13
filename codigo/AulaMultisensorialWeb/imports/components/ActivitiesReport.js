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

  GetGraphicData(parameters){
    let data;
    let maxValue = 0;
    if(parameters.activity == "gloves"){
      if(parameters.graphicType == "bar"){
        if(parameters.isCollective){
          data = JSON.parse(globeActivitiesController.getBarChartDataCollective(parameters.startDate, parameters.endDate, parameters.minAge, parameters.maxAge, parameters.genders, parameters.levels, parameters.periods, parameters.fingers));
        }
        else{
          data = JSON.parse(globeActivitiesController.getBarChartDataIndividual(parameters.startDate, parameters.endDate, parameters.student, parameters.fingers));
        }
        maxValue = this.GetMaxValue(data);
      }
      if(parameters.graphicType == "pie"){
        if(parameters.isCollective){
          data = JSON.parse(globeActivitiesController.getPieChartDataCollective(parameters.startDate, parameters.endDate, parameters.minAge, parameters.maxAge, parameters.genders, parameters.levels, parameters.periods, parameters.fingers));
        }
        else{
          data = JSON.parse(globeActivitiesController.getPieChartDataIndividual(parameters.startDate, parameters.endDate, parameters.student, parameters.fingers));
        }
      }
      if(parameters.graphicType == "line"){
        if(parameters.isCollective){
          data = JSON.parse(globeActivitiesController.getLineChartDataCollective(parameters.startDate, parameters.endDate, parameters.minAge, parameters.maxAge, parameters.genders, parameters.levels, parameters.periods, parameters.fingers));
        }
        else{
          data = JSON.parse(globeActivitiesController.getLineChartDataIndividual(parameters.startDate, parameters.endDate, parameters.student, parameters.fingers));
        }
      }
    }
    if(parameters.activity == "matrix"){
      if(parameters.graphicType == "bar"){
        if(parameters.isCollective){
          data = JSON.parse(matrixActivitiesController.getBarChartDataCollective(parameters.startDate, parameters.endDate, parameters.minAge, parameters.maxAge, parameters.genders, parameters.levels, parameters.periods, parameters.colors, parameters.sequences, parameters.changeLevels, parameters.appearances));
        }
        else{
          data = JSON.parse(matrixActivitiesController.getBarChartDataIndividual(parameters.startDate, parameters.endDate, parameters.student, parameters.colors, parameters.sequences, parameters.changeLevels, parameters.appearances));
        }
        maxValue = this.GetMaxValue(data);
      }
      if(parameters.graphicType == "pie"){
        if(parameters.isCollective){
          data = JSON.parse(matrixActivitiesController.getPieChartDataCollective(parameters.startDate, parameters.endDate, parameters.minAge, parameters.maxAge, parameters.genders, parameters.levels, parameters.periods, parameters.colors, parameters.sequences, parameters.changeLevels, parameters.appearances));
        }
        else{
          data = JSON.parse(matrixActivitiesController.getPieChartDataIndividual(parameters.startDate, parameters.endDate, parameters.student, parameters.colors, parameters.sequences, parameters.changeLevels, parameters.appearances));
        }
      }
      if(parameters.graphicType == "line"){
        if(parameters.isCollective){
          data = JSON.parse(matrixActivitiesController.getLineChartDataCollective(parameters.startDate, parameters.endDate, parameters.minAge, parameters.maxAge, parameters.genders, parameters.levels, parameters.periods, parameters.colors, parameters.sequences, parameters.changeLevels, parameters.appearances));
        }
        else{
          data = JSON.parse(matrixActivitiesController.getLineChartDataIndividual(parameters.startDate, parameters.endDate, parameters.student, parameters.colors, parameters.sequences, parameters.changeLevels, parameters.appearances));
        }
      }
    }
    this.setState({
      parameters: parameters,
      data: data,
      maxValue: maxValue,
      showReportForm: false,
      showGraphicResult: true,
    });
  }

  ShowGraphicResult(parameters){
    this.GetGraphicData(parameters);
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

  ChangeChartType(type){
    let parameters = this.state.parameters;
    parameters.graphicType = type;
    this.GetGraphicData(parameters);
  }

  ChangeStudent(student, name, level){
    let parameters = this.state.parameters;
    let data;
    let maxValue = 0;
    parameters.student = student;
    parameters.name = name;
    parameters.level = level;
    this.GetGraphicData(parameters);
  }

  ChangeDate(minDate, maxDate){
    let parameters = this.state.parameters;
    let data;
    let maxValue = 0;
    parameters.startDate = minDate;
    parameters.endDate = maxDate;
    this.GetGraphicData(parameters);
  }

  ChangeFingers(fingers){
    let parameters = this.state.parameters;
    let data;
    let maxValue = 0;
    parameters.fingers = fingers;
    this.GetGraphicData(parameters);
  }

  ChangeFilters(newParameters){
    let parameters = newParameters;
    let data;
    let maxValue = 0;
    this.GetGraphicData(parameters);
  }

  NewGraphic(){
    this.setState({
      showReportForm: true,
      showGraphicResult: false,
    });
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
                  maxValue={this.state.maxValue}
                  ChangeChartType={this.ChangeChartType.bind(this)}
                  NewGraphic={this.NewGraphic.bind(this)}
                  ChangeStudent={this.ChangeStudent.bind(this)}
                  ChangeDate={this.ChangeDate.bind(this)}
                  ChangeFingers={this.ChangeFingers.bind(this)}
                  ChangeFilters={this.ChangeFilters.bind(this)}/>
              :
              undefined
          }
        </div>
      </div>
    );
  }
}
