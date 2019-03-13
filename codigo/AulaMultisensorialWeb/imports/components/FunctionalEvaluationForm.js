import React, { Component } from 'react';
import EvaluationFormRows from '../map/EvaluationFormRows';

export default class FunctionalEvaluationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          indications: "Indicaciones: El informe busca reconocer los avances y mejorías adquiridos a través del uso de los diferentes materiales dispuestos en el salón multisensorial. Reconociendo los siguientes indicadores:",
          indicators: "Iniciado: I - Adquirido: A - En proceso: EP",
          showIndications: false,
          columnTitles:{
            materials: [
              "Guantes sensoriales",
              "Botellas de la calma",
              "Panel sensorial"
            ],
          },
          standars: {
            glove: [
              {
                _id: 101,
                criteria: "Logra sentir objetos sobre sus manos y los sostiene.",
                value: ""
              },
              {
                _id: 102,
                criteria: "Diferencia texturas a través de expresiones faciales o corporales.",
                value: ""
              },
              {
                _id: 103,
                criteria: "Logra tolerar más de 5 segundos con una textura poco conocida.",
                value: ""
              },
              {
                _id: 104,
                criteria: "Aprieta los guantes cada vez con más fuerza.",
                value: ""
              },
              {
                _id: 105,
                criteria: "En caso de rigidez: los músculos se presentan más relajados.",
                value: ""
              },
              {
                _id: 106,
                criteria: "En caso de hipotonía: los músculos presentan mayor control.",
                value: ""
              },
            ],
            bottle: [
              {
                _id: 201,
                criteria: "Reconoce el sonido de las botellas agitadas y dirige su atención al estímulo.",
                value: ""
              },
              {
                _id: 202,
                criteria: "Mantiene la mirada en el estímulo hasta que el movimiento se detenga.",
                value: ""
              },
              {
                _id: 203,
                criteria: "Sostiene la botella con su mano.",
                value: ""
              },
              {
                _id: 204,
                criteria: "Sostiene y agita la botella con su mano.",
                value: ""
              },
              {
                _id: 205,
                criteria: "Después del uso de la botella denota más tranquilidad.",
                value: ""
              },
              {
                _id: 206,
                criteria: "Respirar calmadamente según el movimiento de las botellas.",
                value: ""
              },
              {
                _id: 207,
                criteria: "Muestra cambios emocionales desde la última vez que usó la botella.",
                value: ""
              },
            ],
            panel: [
              {
                _id: 301,
                criteria: "Toca por sí mismo las texturas.",
                value: ""
              },
              {
                _id: 302,
                criteria: "Diferencia texturas a través de expresiones faciales o corporales.",
                value: ""
              },
              {
                _id: 303,
                criteria: "Tolera texturas nuevas por más de 5 segundos.",
                value: ""
              },
              {
                _id: 304,
                criteria: "Muestra reacciones faciales o corporales al cambio de texturas.",
                value: ""
              },
              {
                _id: 305,
                criteria: "Relaciona las texturas de su ambiente y muestra tolerancia.",
                value: ""
              },
            ],
          },
        }
    }

    ShowIndicaions(){
      this.setState({
        showIndications: true,
      });
    }

    CloseIndicaions(){
      this.setState({
        showIndications: false,
      });
    }

    CheckUncheckValue(type, id, check, value){
      console.log(type);
      console.log(id);
      console.log(check);
      console.log(value);
      var standars = this.state.standars;
      console.log(standars.glove.length);
      if(type == 0){
        for (var i = 0; i < standars.glove.length; i++) {
          if(standars.glove[i]._id == id){
            if(!check){
              standars.glove[i].value = value;
            }
            else {
              standars.glove[i].value = "";
            }
          }
        }
      }
      if(type == 1){
        for (var i = 0; i < standars.bottle.length; i++) {
          if(standars.bottle[i]._id == id){
            if(!check){
              standars.bottle[i].value = value;
            }
            else {
              standars.bottle[i].value = "";
            }
          }
        }
      }
      if(type == 2){
        for (var i = 0; i < standars.panel.length; i++) {
          if(standars.panel[i]._id == id){
            if(!check){
              standars.panel[i].value = value;
            }
            else {
              standars.panel[i].value = "";
            }
          }
        }
      }
      this.setState({
        standars: standars,
      });
    }

    render() {
        return(
            <div>
              <div className="evauation-form-container">
                <div className="evauation-form-title">
                  INFORME FORMAL CUALITATIVO PARA FUNCIONAL
                </div>
                <div className="indications-container">
                  <div onMouseOut={() => this.CloseIndicaions()} onMouseOver={() => this.ShowIndicaions()} className="indications-icon"></div>
                  {
                    this.state.showIndications ?
                      <div className="indications-text-container">
                        <div className="indications-arrow"></div>
                        <div className="indications-text">{this.state.indications}</div>
                        <div className="indicators-text">{this.state.indicators}</div>
                      </div>
                    :
                    undefined
                  }
                  <div className="evauation-form-input-container">
                    <div className="evaluation-form-select-container">
                      <select onChange={() => this.SetStudentParameter()} id="student-select">
                        <option id="student-default-option" value="" selected disabled hidden>Selecione el estudiante</option>
                      </select>
                    </div>
                    <div className="input-info">Curso:</div>
                    <div className="input-info">Periodo:</div>
                    <div className="evaluation-form-select-container">
                      <select id="quarter-select">
                        <option selected disabled hidden>Selecione el quimestre</option>
                        <option value="1">Quimestre 1</option>
                        <option value="2">Quimestre 2</option>
                      </select>
                    </div>
                    <div className="headers-row">
                      <div className="header-medium">Material</div>
                      <div className="header-large">Criterio</div>
                      <div className="header-small">I</div>
                      <div className="header-small">EP</div>
                      <div className="header-small">A</div>
                    </div>
                    <div className="row">
                      <div className="column-medium">{this.state.columnTitles.materials[0]}</div>
                      <div className="column-map">
                        {this.state.standars.glove.map((standars) =>
                          {
                            return <EvaluationFormRows
                              standars={standars}
                              key={standars._id}
                              material={0}
                              CheckUncheckValue={this.CheckUncheckValue.bind(this)}/>;
                          })}
                      </div>
                    </div>
                    <div className="row">
                      <div className="column-medium">{this.state.columnTitles.materials[1]}</div>
                      <div className="column-map">
                        {this.state.standars.bottle.map((standars) =>
                          {
                            return <EvaluationFormRows
                              standars={standars}
                              key={standars._id}
                              material={1}
                              CheckUncheckValue={this.CheckUncheckValue.bind(this)}/>;
                          })}
                      </div>
                    </div>
                    <div className="row">
                      <div className="column-medium">{this.state.columnTitles.materials[2]}</div>
                      <div className="column-map">
                        {this.state.standars.panel.map((standars) =>
                          {
                            return <EvaluationFormRows
                              standars={standars}
                              key={standars._id}
                              material={2}
                              CheckUncheckValue={this.CheckUncheckValue.bind(this)}/>;
                          })}
                      </div>
                    </div>
                    <div>
                      <div className="button-container">
                        <div onClick={() => this.SaveForm()} className="secondary-button">
                          Guardar Ficha
                        </div>
                      </div>
                    </div>
                    <div className="separator"></div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
