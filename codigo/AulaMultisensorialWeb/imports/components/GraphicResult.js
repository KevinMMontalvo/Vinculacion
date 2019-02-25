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

  ChangeGlovesChartType(type){
    this.props.ChangeGlovesChartType(type);
  }

  NewGraphic(){
    this.props.NewGraphic();
  }

  render() {
    return(
      <div>
        <div className="chart-info">
          <div className="chart-info-container">
            <div onClick={() => this.NewGraphic()} className="return-new-graphic-container">
              <div className="return-new-graphic-icon"></div>
              <div className="return-new-graphic-text">Nueva gráfica</div>
            </div>
            <div className="chart-title">
              Estudiante: {this.props.parameters.name}
            </div>
          </div>
          <div className="chart-info-container">
            <div className="graphic-settings-container">
              <div className="graphic-settings-icon"></div>
              <div className="graphic-settings-text">Opciones de la gráfica</div>
              {
                this.props.parameters.activity == "gloves" ?
                  <div className="individual-gloves-chart-menu">
                    <div className="individual-gloves-chart-menu-option">
                      <div className="individual-gloves-chart-menu-option-selected"></div>
                      <div className="individual-gloves-chart-menu-option-text">Nivel</div>
                      <div className="individual-gloves-chart-menu-option-icon"></div>
                      <div className="individual-gloves-chart-submenu-container">
                        <div className="individual-gloves-chart-submenu-option">
                          <div className="individual-gloves-chart-submenu-option-text">Cambiar nivel...</div>
                        </div>
                      </div>
                    </div>
                    <div className="individual-gloves-chart-menu-option">
                      <div className="individual-gloves-chart-menu-option-selected"></div>
                      <div className="individual-gloves-chart-menu-option-text">Estudiante</div>
                      <div className="individual-gloves-chart-menu-option-icon"></div>
                      <div className="individual-gloves-chart-submenu-container">
                        <div className="individual-gloves-chart-submenu-option">
                          <div className="individual-gloves-chart-submenu-option-text">Cambiar estudiante...</div>
                          <div className="individual-gloves-chart-submenu-option-text">Gráfica en colectivo...</div>
                        </div>
                      </div>
                    </div>
                    <div className="individual-gloves-chart-menu-option">
                      <div className="individual-gloves-chart-menu-option-selected"></div>
                      <div className="individual-gloves-chart-menu-option-text">Tipo</div>
                      <div className="individual-gloves-chart-menu-option-icon"></div>
                      <div className="individual-gloves-chart-submenu-container">
                        <div className="individual-gloves-chart-submenu-option">
                          {
                            this.props.parameters.graphicType == "bar" ?
                              <div onClick={() => this.ChangeGlovesChartType("pie")} className="individual-gloves-chart-submenu-option-text">Cambiar a pastel</div>
                            :
                            undefined
                          }
                          {
                            this.props.parameters.graphicType == "pie" ?
                              <div onClick={() => this.ChangeGlovesChartType("bar")} className="individual-gloves-chart-submenu-option-text">Cambiar a barras</div>
                            :
                            undefined
                          }
                        </div>
                      </div>
                    </div>
                    <div className="individual-gloves-chart-menu-option">
                      <div className="individual-gloves-chart-menu-option-selected"></div>
                      <div className="individual-gloves-chart-menu-option-text">Fecha</div>
                      <div className="individual-gloves-chart-menu-option-icon"></div>
                      <div className="individual-gloves-chart-submenu-container">
                        <div className="individual-gloves-chart-submenu-option">
                          <div className="individual-gloves-chart-submenu-option-text">Cambiar rango...</div>
                        </div>
                      </div>
                    </div>
                    <div className="individual-gloves-chart-menu-option">
                      <div className="individual-gloves-chart-menu-option-selected"></div>
                      <div className="individual-gloves-chart-menu-option-text">Dedos</div>
                      <div className="individual-gloves-chart-menu-option-icon"></div>
                      <div className="individual-gloves-chart-submenu-container">
                        <div className="individual-gloves-chart-submenu-option">
                          <div className="individual-gloves-chart-submenu-option-text">Cambiar dedos...</div>
                        </div>
                      </div>
                    </div>
                  </div>
                :
                undefined
              }
            </div>
            <div className="chart-subtitle">
              Actividad: {this.state.activityName}
            </div>
          </div>
        </div>
        <div className="chart-container">
          {
            this.props.parameters.graphicType == "bar" ?
              <Chart
                width={'70vw'}
                height={'65vh'}
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
                height={'65vh'}
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
