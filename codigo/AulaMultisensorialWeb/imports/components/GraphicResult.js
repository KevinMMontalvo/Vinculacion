import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { DotLoader } from 'react-spinners';
import GraphicsParametersForm from '../components/GraphicsParametersForm';

export default class GraphicResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.TranslateActivityName();
  }

  TranslateActivityName() {
    let activity = this.props.parameters.activity;
    let translatedActivity = "";
    if(activity == "gloves"){
      translatedActivity = "Guantes";
    }
    if(activity == "matrix"){
      translatedActivity = "Guantes";
    }
    if(activity == "sensor"){
      translatedActivity = "Guantes";
    }
    this.setState({
      activityName: translatedActivity,
    });
  }

  render() {
    return(
      <div>
        <div className="chart-info">
          <div className="chart-title">Estudiante: {this.props.parameters.name}</div>
          <div className="chart-subtitle">Actividad: {this.state.activityName}</div>
        </div>
        <div className="chart-container">
          {
            this.props.parameters.graphicType == "bar" ?
              <Chart
                width={'60vw'}
                height={'55vh'}
                chartType="ColumnChart"
                loader={<div>
                  <div className="loading-container">
                    <DotLoader
                      sizeUnit={"vw"}
                      size={8}
                      color={'#2BBEA2'}
                      loading={true}
                    />
                    <p className="loading-text">Cargando...</p>
                  </div>
                </div>}
                data={this.props.data}
                options={{
                  chartArea: { width: '67.5%' },
                  hAxis: {
                    title: 'Cantidad de aciertos vs errores',
                    minValue: 0,
                  },
                  vAxis: {
                    title: '',
                    maxValue: this.props.maxValue + 1,
                  },
                  colors: ['#F39C12', '#2471A3'],
                  animation: {
                    startup: true,
                    easing: 'in',
                    duration: 1000,
                  },
                }}
                // For tests
                rootProps={{ 'data-testid': '5' }}
              />
            :
            undefined
          }
          {
            this.props.parameters.graphicType == "pie" ?
              <Chart
                width={'70vw'}
                height={'55vh'}
                chartType="PieChart"
                loader={<div>
                  <div className="loading-container">
                    <DotLoader
                      sizeUnit={"vw"}
                      size={8}
                      color={'#2BBEA2'}
                      loading={true}
                    />
                    <p className="loading-text">Cargando...</p>
                  </div>
                </div>}
                data={this.props.data}
                options={{
                  title: 'Cantidad de aciertos vs errores',
                  slices: {
                    1: { offset: 0.01 },
                  },
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            :
            undefined
          }
        </div>
      </div>
    );
  }
}
