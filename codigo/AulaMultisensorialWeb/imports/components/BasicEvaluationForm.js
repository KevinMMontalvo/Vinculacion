import React, { Component } from 'react';
import EvaluationFormRows from '../map/EvaluationFormRows';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class BasicEvaluationForm extends React.Component {
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
                _id: 401,
                criteria: "Sujeta el guante con las dos manos.",
                value: ""
              },
              {
                _id: 402,
                criteria: "Reconoce la ubicación del material.",
                value: ""
              },
              {
                _id: 403,
                criteria: "Identifica el material por su nombre.",
                value: ""
              },
              {
                _id: 404,
                criteria: "Manipula el guante mostrando interés.",
                value: ""
              },
              {
                _id: 405,
                criteria: "Tolera más de 3 texturas diferentes.",
                value: ""
              },
              {
                _id: 406,
                criteria: "Reconoce el material que rellena al guante.",
                value: ""
              },
              {
                _id: 407,
                criteria: "Diferencia los cambios de texturas.",
                value: ""
              },
            ],
            bottle: [
              {
                _id: 501,
                criteria: "Sigue instrucciones para aprender a utilizar el frasco siguiendo las fases correspondientes (agitación, observación, relajación).",
                value: ""
              },
              {
                _id: 502,
                criteria: "Realiza ejercicios de respiración durante el movimiento del agua que se encuentra dentro del frasco.",
                value: ""
              },
              {
                _id: 503,
                criteria: "Se relaja al culminar el movimiento del agua.",
                value: ""
              },
              {
                _id: 504,
                criteria: "Dirige la mirada hacia el movimiento del agua.",
                value: ""
              },
              {
                _id: 505,
                criteria: "Identifica el material por su nombre.",
                value: ""
              },
              {
                _id: 506,
                criteria: "Muestra interés por el movimiento del agua.",
                value: ""
              },
              {
                _id: 507,
                criteria: "Disfruta del material.",
                value: ""
              },
              {
                _id: 508,
                criteria: "Sujeta el frasco con la mano.",
                value: ""
              },
            ],
            panel: [
              {
                _id: 601,
                criteria: "Tolera las diferentes texturas que forman parte del panel sensorial.",
                value: ""
              },
              {
                _id: 602,
                criteria: "Identifica el material por su nombre.",
                value: ""
              },
              {
                _id: 603,
                criteria: "Toca las texturas que ofrece el panel.",
                value: ""
              },
              {
                _id: 604,
                criteria: "Tolera más de 5 texturas.",
                value: ""
              },
              {
                _id: 605,
                criteria: "Siente comodidad con el cambio de textura.",
                value: ""
              },
              {
                _id: 606,
                criteria: "Disfruta de la manipulación del panel.",
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
