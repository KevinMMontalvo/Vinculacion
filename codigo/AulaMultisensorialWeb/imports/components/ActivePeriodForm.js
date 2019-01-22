import React, { Component } from 'react';
import Filter, { Sort, FilterValue } from 'data-engine';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';
import Modal from 'react-responsive-modal';
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
          selectedStudents: [],
          studentsToChangeLevel: [],
          canNotCompleteTheActionMenssage: "No se pudo completar la acción",
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

    ShowStudentLevelWarning()
  	{
  		this.tray.raise({
  			content: <Cinnamon.Crisp
  				className="butter-alert"
  				scheme={Cinnamon.Slim.SCHEME_DARK}
  				content={() => <div>{"Los estudiantes que no hayan sido cambiados de nivel se mantendran en el mismo al finalizar el proceso de activación de periodo"}</div>}
  				title={"Cambio de nivel"}
  				icon={<div className="alert-success-icon"></div>}
  			/>
  		});
  		this.dismissAll();
  	}

    CanNotCompleteTheActionMenssage()
  	{
  		this.tray.raise({
  			content: <Cinnamon.Crisp
  				className="butter-alert"
  				scheme={Cinnamon.Slim.SCHEME_DARK}
  				content={() => <div>{"Vuelva a intentarlo"}</div>}
  				title={this.state.canNotCompleteTheActionMenssage}
  				icon={<div className="wrong-info-icon"></div>}
  			/>
  		});
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
      for (var i = 0; i < students.length; i++) {
        students[i].changed = false;
      }
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
      let studentsToChangeLevel = this.state.studentsToChangeLevel;
      for (var i = 0; i < studentsToChangeLevel.length; i++) {
        this.CheckRemainingStudents(studentsToChangeLevel[i]._id);
      }
      this.setState({
        studentsByCurrentLevel: studentsByCurrentLevel,
      });
    }

    SelectAll(){
      let selectedStudents = [];
      for (var i = 0; i < this.state.studentsByCurrentLevel.length; i++) {
        document.getElementById(this.state.studentsByCurrentLevel[i]._id).className = "student-by-level-container-selected";
        document.getElementById(this.state.studentsByCurrentLevel[i]._id).childNodes[1].style.backgroundSize = "0.8vw";
        document.getElementById(this.state.studentsByCurrentLevel[i]._id).childNodes[1].style.backgroundColor = "#D0D3D4";
        let student = {
          _id: this.state.studentsByCurrentLevel[i]._id,
        };
        selectedStudents.push(student);
      }
      this.setState({
        areAllSelected: true,
        selectedStudents: selectedStudents,
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
        selectedStudents: [],
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
      this.ShowStudentLevelWarning();
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

    SelectStudent(studentId){
      let selectedStudents = this.state.selectedStudents;
      let student = {
        _id: studentId,
      };
      selectedStudents.push(student);
      this.setState({
        selectedStudents: selectedStudents,
      });
    }

    UnselectStudent(studentId){
      let selectedStudents = this.state.selectedStudents;
      let spliceIndex = -1;
      let student = {
        _id: studentId,
      };
      for (var i = 0; i < selectedStudents.length; i++) {
        if(selectedStudents[i]._id == studentId){
          spliceIndex = i;
          break;
        }
      }
      selectedStudents.splice(spliceIndex, 1);
      this.setState({
        selectedStudents: selectedStudents,
      });
    }

    Changelevel(){
      let newLevel = document.getElementById('period-level-select').value;
      let selectedStudents = this.state.selectedStudents;
      let studentsToChangeLevel = this.state.studentsToChangeLevel;
      for (var i = 0; i < selectedStudents.length; i++) {
        selectedStudents[i].level_id = newLevel;
        studentsToChangeLevel.push(selectedStudents[i]);
        this.CheckRemainingStudents(selectedStudents[i]._id);
      }

      this.setState({
        selectedStudents: [],
        studentsToChangeLevel: studentsToChangeLevel,
      });
    }

    CheckRemainingStudents(id){
      let studentsByCurrentLevel = this.state.studentsByCurrentLevel;
      for (var i = 0; i < studentsByCurrentLevel.length; i++) {
        if(studentsByCurrentLevel[i]._id == id){
          studentsByCurrentLevel[i].changed = true;
        }
      }
      this.setState({
        studentsByCurrentLevel: studentsByCurrentLevel,
      });
    }

    ChangeStudentsLevel(){
      if(periodsController.changeVisiblePeriod(this.props.periodToActive._id)){
        for (var i = 0; i < this.state.studentsToChangeLevel.length; i++) {
          if(studentsController.updateStudentLevel(this.state.studentsToChangeLevel[i]._id, this.state.studentsToChangeLevel[i].level_id)){
            logController.insertLog(this.CreateLog(this.props.user._id, "Nivel del estudiante cambio exitosamente"));
          }
          else {
            logController.insertLog(this.CreateLog(this.props.user._id, "Fallo en cambio del nivel del estudiante"));
          }
        }
        this.onOpenDialogModal();
        logController.insertLog(this.CreateLog(this.props.user._id, "Periodo activado correctamente"));
      }
      else {
        this.CanNotCompleteTheActionMenssage();
        logController.insertLog(this.CreateLog(this.props.user._id, "Fallo en la activación del periodo"));
      }
    }

    onOpenDialogModal = () => {
      this.setState({ openDialog: true });
    };

    onCloseDialogModal = () => {
      this.setState({ openDialog: false }, () => {
        this.props.PeriodOption();
        this.props.GetActualPeriod();
      });
    };

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
                            SelectStudent={this.SelectStudent.bind(this)}
                            UnselectStudent={this.UnselectStudent.bind(this)}
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
                <div onClick={() => this.Changelevel()} className="change-level-button">Cambiar</div>
              </div>
              <div className="active-period-button-container">
                {this.state.levelIndex != 0 ?
                  <div onClick={() => this.PreviousLevel()} className="back-button">Anterior</div>
                :
                    undefined
                }
                {(this.state.levelIndex + 1) == this.state.levels.length ?
                  <div onClick={() => this.ChangeStudentsLevel()} className="next-button">Finalizar</div>
                :
                <div onClick={() => this.NextLevel()} className="next-button">Siguiente</div>
                }
              </div>
              <Modal open={this.state.openDialog} onClose={this.onCloseDialogModal} center>
                <div className="student-level-dialog-container">
                  <p>{this.props.periodToActive.name} ahora consta como periodo actual</p>
                  <div className="dialog-button-container">
                    <div onClick={() => this.onCloseDialogModal()} className="dialog-button">Ok</div>
                  </div>
                </div>
              </Modal>
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
