import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

export default class GraphicsParametersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    this.GetStudentsByLevel();
  }

  LoadStudents() {
    var studentsString = studentsController.getStudents();
    var students = JSON.parse(studentsString);
    return students;
  }

  GetStudentsByLevel(){
    let students = this.LoadStudents();
    let studentsByLevel = [];
    if(students != null){
      for (var i = 0; i < students.length; i++) {
        console.log(students[i].level_id);
        console.log(this.props.user.level);
        if(students[i].level_id == this.props.user.level){
          studentsByLevel.push(students[i]);
        }
      }
      this.setState({
        studentsByLevel: studentsByLevel,
      },() => {
        var studentSelect = document.getElementById('student-select');
  			for (var i = 0; i < this.state.studentsByLevel.length; i++)
  			{
  				var option = document.createElement("option");
  				option.text = this.state.studentsByLevel[i].names + " " + this.state.studentsByLevel[i].surnames;
  				option.value = this.state.studentsByLevel[i]._id;
  				studentSelect.add(option);
  			}
      });
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
        <div className="student-form">
          <div className="form-container">
  					<p className="input-label">Estudiante</p>
  					<div className="input-container">
  						<select id="student-select">
  							<option value="" selected disabled hidden>Selecione el estudiante</option>
  						</select>
  					</div>
  				</div>
          <div className="form-container">
  					<p className="input-label">Actividad</p>
  					<div className="activity-picker">
              <div className="activity-picker-option">
                <div id="matrix-picker" className="activity-picker-icon"></div>
                <p className="activity-picker-text">Matriz</p>
              </div>
              <div className="activity-picker-option">
                <div id="globes-picker" className="activity-picker-icon"></div>
                <p className="activity-picker-text">Guantes</p>
              </div>
              <div className="activity-picker-option">
                <div id="sensor-picker" className="activity-picker-icon"></div>
                <p className="activity-picker-text">Sensor de ritmo cardiaco</p>
              </div>
  					</div>
  				</div>
          <div className="form-container">
  					<p className="input-label">Fecha inicial</p>
  					<div className="date-input-container">
  						<DatePicker
  							onChange={this.onChange}
  							value={this.state.date}
  							locate={this.lang}/>
  					</div>
  				</div>
          <div className="form-container">
  					<p className="input-label">Fecha final</p>
  					<div className="date-input-container">
  						<DatePicker
  							onChange={this.onChange}
  							value={this.state.date}
  							locate={this.lang}/>
  					</div>
  				</div>
          <div className="form-container">
            <p className="input-label">Dedos</p>
            <div className="hands-picker-container">
              <div id="left-hand-picker" className="hand-picker">
                <div className="finger-1"></div>
                <div className="finger-2"></div>
                <div className="finger-3"></div>
                <div className="finger-4"></div>
                <div className="finger-5"></div>
              </div>
              <div id="right-hand-picker" className="hand-picker">
                <div className="finger-5"></div>
                <div className="finger-4"></div>
                <div className="finger-3"></div>
                <div className="finger-2"></div>
                <div className="finger-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
