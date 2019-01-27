import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { DotLoader } from 'react-spinners';


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
          <Chart
            width={'45vw'}
            height={'47.5vh'}
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
            data={[
              ['Estudiante', 'Aciertos', 'Errores'],
              ['Fecha 1', 15, 20],
              ['Fecha 2', 2, 12],
              ['Fecha 3', 9, 9],
              ['Fecha 4', 1, 0],
              ['Fecha 5', 13, 18],
            ]}
            options={{
              chartArea: { width: '67.5%' },
              hAxis: {
                title: 'Cantidad de aciertos/errores',
                minValue: 0,
              },
              vAxis: {
                title: 'Estudiante',
                maxValue: 30,
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
        </div>
      </div>
    );
  }
}
