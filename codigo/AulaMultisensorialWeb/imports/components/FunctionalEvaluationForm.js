import React, { Component } from 'react';
import EvaluationFormRows from '../map/EvaluationFormRows';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class FunctionalEvaluationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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

    CheckUncheckValue(type, id, check, value){
      var standars = this.state.standars;
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

    dismissAll = () => {
      this.tray.dismissAll();
    }

    ShowWarningMenssage(title, content){
      this.tray.raise({
        content: <Cinnamon.Crisp
          className="butter-alert"
          scheme={Cinnamon.Slim.SCHEME_BLUE}
          content={() => <div>{content}</div>}
          title={title}
          icon={<div className="alert-warning-icon"></div>}
        />
      });
      this.dismissAll();
    }

    ShowAddSuccessMenssage(){
  		this.tray.raise({
  			content: <Cinnamon.Crisp
  				className="butter-alert"
  				scheme={Cinnamon.Slim.SCHEME_DARK}
  				content={() => <div>{"Formulario guardado"}</div>}
  				title={"Registro completo"}
  				icon={<div className="alert-success-icon"></div>}
              />
  		});
      this.dismissAll();
  	}

    CheckEmptyFields(){
      var standars = this.state.standars;
      for (var i = 0; i < standars.glove.length; i++) {
        if(standars.glove[i].value == ""){
          this.ShowWarningMenssage("Existen campos vacios", "Sección guantes sensoriales - pregunta " + (parseInt(i) + 1));
          return true;
        }
      }
      for (var i = 0; i < standars.bottle.length; i++) {
        if(standars.bottle[i].value == ""){
          this.ShowWarningMenssage("Existen campos vacios", "Sección botellas de la calma - pregunta " + (parseInt(i) + 1));
          return true;
        }
      }
      for (var i = 0; i < standars.panel.length; i++) {
        if(standars.panel[i].value == ""){
          this.ShowWarningMenssage("Existen campos vacios", "Sección panel sensorial - pregunta " + (parseInt(i) + 1));
          return true;
        }
      }
      return false;
    }

    SaveForm(){
      if(!this.CheckEmptyFields()){
        let record = {};
        record.student_id = this.props.student;
        record.period = this.props.period;
        record.number = this.props.quarter;
        let questions = [];
        let standars = this.state.standars;
        for (var i = 0; i < standars.glove.length; i++) {
          let question = [];
          question[0] = standars.glove[i]._id;
          question[1] = standars.glove[i].criteria;
          question[2] = standars.glove[i].value;
          questions.push(question);
        }
        for (var i = 0; i < standars.bottle.length; i++) {
          let question = [];
          question[0] = standars.bottle[i]._id;
          question[1] = standars.bottle[i].criteria;
          question[2] = standars.bottle[i].value;
          questions.push(question);
        }
        for (var i = 0; i < standars.panel.length; i++) {
          let question = [];
          question[0] = standars.panel[i]._id;
          question[1] = standars.panel[i].criteria;
          question[2] = standars.panel[i].value;
          questions.push(question);
        }
        record.questions = questions;
        if(recordsController.insertStudentRecord(record)){
          this.ShowAddSuccessMenssage();
        }
      }
    }

    render() {
        return(
            <div>
              <div className="evauation-form-container">
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
                    {
                      this.props.record != null ?
                        <div onClick={() => this.ModifyForm()} className="secondary-button">
                          Guardar Ficha
                        </div>
                      :
                      <div onClick={() => this.SaveForm()} className="secondary-button">
                        Guardar Ficha
                      </div>
                    }
                  </div>
                </div>
                <div className="separator"></div>
              </div>
              <ButterToast
                position={{
                  vertical: POS_TOP,
                  horizontal: POS_RIGHT
                }}
                timeout={7500}
                ref={tray => this.tray = tray}
              />
            </div>
        );
    }
}
