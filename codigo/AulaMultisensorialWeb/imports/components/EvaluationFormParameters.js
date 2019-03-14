import React, { Component } from 'react';
import EvaluationFormRows from '../map/EvaluationFormRows';
import FunctionalEvaluationForm from '../components/FunctionalEvaluationForm';
import BasicEvaluationForm from '../components/BasicEvaluationForm';

export default class EvaluationFormParameters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          indications: "Indicaciones: El informe busca reconocer los avances y mejorías adquiridos a través del uso de los diferentes materiales dispuestos en el salón multisensorial. Reconociendo los siguientes indicadores:",
          indicators: "Iniciado: I - Adquirido: A - En proceso: EP",
          showIndications: false,
          isFunciotional: false,
          isBasic: false,
          levels: [],
          student: undefined,
          studentsByLevel: [],
          period: undefined,
          quarter: undefined,
          visiblePeriod: undefined,
          record:[],
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
        this.GetStudentRecord();
      });
    }

    GetStudentRecord(){
      let recordString = recordsController.getStudentRecords(this.state.student);
      if(recordString != ""){
        let record = JSON.parse(recordString);
        this.setState({
          record: record,
        });
      }
    }

    SetQuarterParameter(){
      let quarter = document.getElementById('quarter-select').value;
      this.setState({
        quarter: quarter,
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
                          period={this.props.period.name}/>
                      :
                      undefined
                    }
                    {
                      this.state.isBasic ?
                        <BasicEvaluationForm
                          record={this.state.record}
                          student={this.state.student}
                          quarter={this.state.quarter}
                          period={this.props.period.name}/>
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
