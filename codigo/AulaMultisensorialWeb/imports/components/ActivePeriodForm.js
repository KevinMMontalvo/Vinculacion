import React, { Component } from 'react';
import Filter, { Sort, FilterValue } from 'data-engine';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';
import StudentByLevel from '../map/StudentByLevel';

export default class ActivePeriodForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          levels: undefined,
          students: undefined,
          studentsByCurrentLevel: undefined,
          levelIndex: 0,
          areAllSelected: false,
        }
    }

    componentWillMount(){
      const { MongoClient, ObjectId } = require('mongodb');
      this.setState({
        levels: this.LoadLevels(),
        students: this.LoadStudents(),
      }, () => this.CheckLoadedData());
    }

    componentDidMount(){
      this.LoadLevelsInSelect();
      this.SeparateStudents();
    }

    CheckLoadedData(){
      if(this.state.levels.length > 0 && this.state.students.length > 0){
        this.setState({
          isDataLoaded: true
        });
      }
    }

    LoadLevels() {
      var levelsString = levelsController.getLevels();
      var levels = JSON.parse(levelsString);
      return levels;
    }

    dismissAll = () => {
        this.tray.dismissAll();
    }

    LoadStudents() {
  		var studentsString = studentsController.getStudents();
  		var students = JSON.parse(studentsString);
  		return students;
  	}

    LoadLevels() {
  		var levelsString = levelsController.getLevels();
  		var levels = JSON.parse(levelsString);
  		return levels;
  	}

  	LoadLevelsInSelect(){
  		this.setState({
  			levels: this.LoadLevels(),
  		}, () => {
  			var levelSelect = document.getElementById('period-level-select');
        for (var i = 0; i < this.state.levels.length; i++) {
          levelSelect.remove(0);
        }
  			for (var i = 0; i < this.state.levels.length; i++) {
  				var option = document.createElement("option");
  				option.text = this.state.levels[i].name;
  				option.value = this.state.levels[i]._id;
          if(this.state.levels[this.state.levelIndex]._id == this.state.levels[i]._id){
            option.disabled = true;
          }
          else {
            levelSelect.add(option);
          }
  			}
  		});
  	}

    SeparateStudents() {
      let studentsToSeparate = this.state.students;
      let studentsByCurrentLevel = [];
      let currentLevel = this.state.levels[this.state.levelIndex]._id;
      for (var i = 0; i < studentsToSeparate.length; i++) {
        if(studentsToSeparate[i].level_id == currentLevel){
          studentsByCurrentLevel.push(studentsToSeparate[i]);
        }
      }
      this.setState({
        studentsByCurrentLevel: studentsByCurrentLevel,
      });
    }

    SelectAll(){
      for (var i = 0; i < this.state.studentsByCurrentLevel.length; i++) {
        document.getElementById(this.state.studentsByCurrentLevel[i]._id).className = "student-by-level-container-selected";
        document.getElementById(this.state.studentsByCurrentLevel[i]._id).childNodes[1].style.backgroundSize = "0.8vw";
        document.getElementById(this.state.studentsByCurrentLevel[i]._id).childNodes[1].style.backgroundColor = "#D0D3D4";
      }
      this.setState({
        areAllSelected: true,
      });
    }

    UnselectAll(){
      for (var i = 0; i < this.state.studentsByCurrentLevel.length; i++) {
        document.getElementById(this.state.studentsByCurrentLevel[i]._id).className = "student-by-level-container-unselected";
        document.getElementById(this.state.studentsByCurrentLevel[i]._id).childNodes[1].style.backgroundSize = "0";
        document.getElementById(this.state.studentsByCurrentLevel[i]._id).childNodes[1].style.backgroundColor = "#FFF";
      }
      this.setState({
        areAllSelected: false,
      });
    }

    CheckSelected(){
      let selected = document.getElementsByClassName('student-by-level-container-selected');
      let unselected = document.getElementsByClassName('student-by-level-container-unselected');
      if(selected.length == 0){
        this.setState({
          areAllSelected: false,
        });
      }
      if(unselected.length == 0){
        this.setState({
          areAllSelected: true,
        });
      }
      if(selected.length < this.state.studentsByCurrentLevel.length){
        this.setState({
          areAllSelected: false,
        });
      }
    }

    NextLevel() {
      if(this.state.levelIndex + 1 < this.state.levels.length){
        this.setState({
          levelIndex: this.state.levelIndex + 1,
        }, () => {
          this.LoadLevelsInSelect();
          this.SeparateStudents();
        });
      }
    }

    PreviousLevel() {
      if(this.state.levelIndex > 0){
        this.setState({
          levelIndex: this.state.levelIndex - 1,
        }, () => {
          this.LoadLevelsInSelect();
          this.SeparateStudents();
        });
      }
    }

    RemoveOptions(){
      var levelSelect = document.getElementById('period-level-select');
      for (var i = 0; i < this.state.levels.length - 1 ; i++) {
        levelSelect.remove(i);
      }
    }

    render() {
        return(
            <div>
              <div className="student-level-container">
                <b className="current-level-title">Nivel actual de los estudiantes: </b>
                <p className="current-level-text">{this.state.levels[this.state.levelIndex].name}</p>
                {this.state.areAllSelected ?
                <div onClick={() => this.UnselectAll()} className="select-all-button">Deselecionar todos</div>
                :
                <div onClick={() => this.SelectAll()} className="select-all-button">Selecionar todos</div>
                }

              </div>
              <div className="active-period-form-container">
                {this.props.periodToActive != undefined ?
                  <div>
                    {this.state.studentsByCurrentLevel != undefined ?
                      this.state.studentsByCurrentLevel.map((studentsByCurrentLevel) =>
                      {
                        return <StudentByLevel
                                  studentsByCurrentLevel={studentsByCurrentLevel}
                                  key={studentsByCurrentLevel._id}
                                  CheckSelected={this.CheckSelected.bind(this)}>
                                </StudentByLevel>
                      })
                      :
                      undefined
                    }
                  </div>
                :
                undefined
                }
              </div>
              <div className="change-student-level-container">
                <b className="change-level-title">Cambiar al nivel: </b>
                <select id="period-level-select">
  								<option value="" selected disabled hidden>Selecione el nivel del estudiante</option>
  							</select>
                <div className="change-level-button">Cambiar</div>
              </div>
              <div className="active-period-button-container">
                {this.state.levelIndex != 0 ?
                    <div onClick={() => this.PreviousLevel()} className="back-button">Anterior</div>
                  :
                    undefined
                }
                {(this.state.levelIndex + 1) == this.state.levels.length ?
                    <div className="next-button">Finalizar</div>
                  :
                    <div onClick={() => this.NextLevel()} className="next-button">Siguiente</div>
                }
              </div>
            </div>
        );
    }
}
