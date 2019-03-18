import React, { Component } from 'react';
import EvaluationFormRows from '../map/EvaluationFormRows';
import FunctionalEvaluationForm from '../components/FunctionalEvaluationForm';
import BasicEvaluationForm from '../components/BasicEvaluationForm';

export default class EvaluationFormParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          indications: "Indicaciones: El informe busca reconocer los avances y mejorías adquiridos a través del uso de los diferentes materiales dispuestos en el salón multisensorial. Reconociendo los siguientes indicadores:",
          indicators: "Iniciado: I - En proceso: EP - Adquirido: A",
          showIndications: false,
          isFunciotional: false,
          isBasic: false,
          levels: [],
          student: undefined,
          studentsByLevel: [],
          period: undefined,
          quarter: undefined,
          visiblePeriod: undefined,
          record: undefined,
          basicStandars: {
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
          functionalStandars: {
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

    SetStandars(standars, form){
      if(form == "basic"){
        this.setState({
          basicStandars: standars,
        });
      }
      if(form == "functional"){
        this.setState({
          functionalStandars: standars,
        });
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

    LoadLevels(){
  		var levelsString = levelsController.getLevels();
  		var levels = JSON.parse(levelsString);
  		return levels;
  	}

    LoadStudents() {
      var studentsString = studentsController.getStudents();
      var students = JSON.parse(studentsString);
      return students;
    }

    CheckLevel(){
      let levelName = "";
      for (var i = 0; i < this.state.levels.length; i++) {
        if(this.props.user.level == this.state.levels[i]._id){
          levelName = this.state.levels[i].name;
        }
      }
      if(levelName.toUpperCase().includes("FUNCIONAL")){
        this.setState({
          isFunciotional: true,
          levelName: levelName,
        });
      }
      else {
        this.setState({
          isBasic: true,
          levelName: levelName,
        });
      }
    }

    LoadStudentsByLevel(){
      let studentsByLevel = [];
      for (var i = 0; i < this.state.students.length; i++) {
        if (this.state.students[i].level_id == this.props.user.level) {
          studentsByLevel.push(this.state.students[i]);
        }
      }
      this.setState({
        studentsByLevel: studentsByLevel,
      }, () => {
        this.LoadStudentsInSelect();
      });
    }

    LoadStudentsInSelect(){
      var studentSelect = document.getElementById('student-select');
      for (var i = 0; i < this.state.studentsByLevel.length; i++)
      {
        var option = document.createElement("option");
        option.text = this.state.studentsByLevel[i].names + " " + this.state.studentsByLevel[i].surnames;
        option.value = this.state.studentsByLevel[i]._id;
        studentSelect.add(option);
      }
    }

    SetStudentParameter(){
      let student = document.getElementById('student-select').value;
      this.setState({
        student: student,
      }, () => {
        if(this.state.quarter == 1 || this.state.quarter == 2){
          this.GetStudentRecord();
        }
      });
    }

    GetStudentRecord(){
      let recordString = recordsController.getStudentRecords(this.state.student);
      if(recordString != null){
        let record = JSON.parse(recordString);
        this.setState({
          record: record,
        }, () => {
          this.ShowValues();
        });
      }
      else{
        this.setState({
          record: undefined,
        }, () => {
          this.RestartValues();
        });
      }
    }

    SetQuarterParameter(){
      let quarter = parseInt(document.getElementById('quarter-select').value);
      this.setState({
        quarter: quarter,
      }, () => {
        if(this.state.student != undefined){
          this.GetStudentRecord();
        }
      });
    }

    SetRecord(record){
      this.setState({
        record: record,
      });
    }

    ShowValues(){
      if(this.state.record != undefined){
        if(this.state.quarter == this.state.record[0].number){
          let standars;
          if(this.state.isBasic){
            standars = this.state.basicStandars;
          }
          if(this.state.isFunciotional){
            standars = this.state.functionalStandars;
          }
          for (var i = 0; i < this.state.record[0].questions.length; i++) {
            for (var j = 0; j < standars.glove.length; j++) {
              if(standars.glove[j]._id == this.state.record[0].questions[i][0]){
                standars.glove[j].value = this.state.record[0].questions[i][2];
              }
            }
          }
          for (var i = 0; i < this.state.record[0].questions.length; i++) {
            for (var j = 0; j < standars.bottle.length; j++) {
              if(standars.bottle[j]._id == this.state.record[0].questions[i][0]){
                standars.bottle[j].value = this.state.record[0].questions[i][2];
              }
            }
          }
          for (var i = 0; i < this.state.record[0].questions.length; i++) {
            for (var j = 0; j < standars.panel.length; j++) {
              if(standars.panel[j]._id == this.state.record[0].questions[i][0]){
                standars.panel[j].value = this.state.record[0].questions[i][2];
              }
            }
          }
          if(this.state.isBasic){
            this.setState({
              basicStandars: standars,
            });
          }
          if(this.state.isFunciotional){
            this.setState({
              functionalStandars: standars,
            });
          }
        }
        else {
          this.RestartValues();
        }
      }
    }

    RestartValues(){
      let basicStandars = this.state.basicStandars;
      for (var i = 0; i < basicStandars.glove.length; i++) {
        basicStandars.glove[i].value = "";
      }
      for (var i = 0; i < basicStandars.bottle.length; i++) {
        basicStandars.bottle[i].value = "";
      }
      for (var i = 0; i < basicStandars.panel.length; i++) {
        basicStandars.panel[i].value = "";
      }
      this.setState({
        basicStandars: basicStandars,
      });
      let functionalStandars = this.state.functionalStandars;
      for (var i = 0; i < functionalStandars.glove.length; i++) {
        functionalStandars.glove[i].value = "";
      }
      for (var i = 0; i < functionalStandars.bottle.length; i++) {
        functionalStandars.bottle[i].value = "";
      }
      for (var i = 0; i < functionalStandars.panel.length; i++) {
        functionalStandars.panel[i].value = "";
      }
      this.setState({
        functionalStandars: functionalStandars,
      });
    }

    componentDidMount(){
      this.setState({
        levels: this.LoadLevels(),
        students: this.LoadStudents(),
      }, () => {
        this.CheckLevel();
        this.LoadStudentsByLevel();
      });
    }

    render() {
        return(
            <div>
              <div className="evauation-form-container">
                <div className="evauation-form-title">
                  FORMULARIO DE EVALUACIÓN
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
                    <div className="input-info">Nivel - {this.state.levelName}</div>
                    <div className="input-info">{this.props.period.name}</div>
                    <div className="evaluation-form-select-container">
                      <select onChange={() => this.SetQuarterParameter()} id="quarter-select">
                        <option selected disabled hidden>Selecione el quimestre</option>
                        <option value="1">Quimestre 1</option>
                        <option value="2">Quimestre 2</option>
                      </select>
                    </div>
                    <div className="paragraph-separator"></div>
                    {
                      this.state.isFunciotional ?
                        <div className="evauation-form-title">
                          INFORME FORMAL CUALITATIVO PARA FUNCIONAL
                        </div>
                      :
                      <div className="evauation-form-title">
                        INFORME FORMAL CUALITATIVO BÁSICO
                      </div>
                    }
                    {
                      this.state.isFunciotional ?
                        <FunctionalEvaluationForm
                          record={this.state.record}
                          student={this.state.student}
                          quarter={this.state.quarter}
                          period={this.props.period.name}
                          standars={this.state.functionalStandars}
                          SetRecord={this.SetRecord.bind(this)}
                          SetStandars={this.SetStandars.bind(this)}/>
                      :
                      undefined
                    }
                    {
                      this.state.isBasic ?
                        <BasicEvaluationForm
                          record={this.state.record}
                          student={this.state.student}
                          quarter={this.state.quarter}
                          period={this.props.period.name}
                          standars={this.state.basicStandars}
                          SetRecord={this.SetRecord.bind(this)}
                          SetStandars={this.SetStandars.bind(this)}/>
                      :
                      undefined
                    }
                  </div>
                </div>
              </div>
            </div>
        );
    }
}
