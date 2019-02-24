import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

export default class GraphicsParametersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxDate: new Date(),
      minDate: new Date(),
      student: undefined,
      graphicType: undefined,
      activity: "",
      fingers: ['D1','D2','D3','D4','D5','L1','L2','L3','L4','L5'],
      selectedFingers: {
        L1: true,
        L2: true,
        L3: true,
        L4: true,
        L5: true,
        D1: true,
        D2: true,
        D3: true,
        D4: true,
        D5: true,
      },
      graphicSettings: {
        isStudentSelected: false,
        isActivitySelected: false,
        isDateRangeSelected: false,
        isGraphicTypeSelected: false,
        isCollective: false,
      }
    }
  }

  componentDidMount(){
    this.GetStudentsByLevel();
    this.GetTeacherLevel();
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

  CheckSelectedFingers(){
    let fingers = this.state.fingers;

    let L1 = document.getElementById('L1');
    let L2 = document.getElementById('L2');
    let L3 = document.getElementById('L3');
    let L4 = document.getElementById('L4');
    let L5 = document.getElementById('L5');

    let D1 = document.getElementById('D1');
    let D2 = document.getElementById('D2');
    let D3 = document.getElementById('D3');
    let D4 = document.getElementById('D4');
    let D5 = document.getElementById('D5');

    let removeIndex = -1;

    if(!this.state.selectedFingers.L1){
      L1.style.width = "0vw";
      L1.style.height = "0vw";
      removeIndex = fingers.indexOf('L1');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.L2){
      L2.style.width = "0vw";
      L2.style.height = "0vw";
      removeIndex = fingers.indexOf('L2');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.L3){
      L3.style.width = "0vw";
      L3.style.height = "0vw";
      removeIndex = fingers.indexOf('L3');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.L4){
      L4.style.width = "0vw";
      L4.style.height = "0vw";
      removeIndex = fingers.indexOf('L4');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.L5){
      L5.style.width = "0vw";
      L5.style.height = "0vw";
      removeIndex = fingers.indexOf('L5');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.D1){
      D1.style.width = "0vw";
      D1.style.height = "0vw";
      removeIndex = fingers.indexOf('D1');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.D2){
      D2.style.width = "0vw";
      D2.style.height = "0vw";
      removeIndex = fingers.indexOf('D2');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.D3){
      D3.style.width = "0vw";
      D3.style.height = "0vw";
      removeIndex = fingers.indexOf('D3');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.D4){
      D4.style.width = "0vw";
      D4.style.height = "0vw";
      removeIndex = fingers.indexOf('D4');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.D5){
      D5.style.width = "0vw";
      D5.style.height = "0vw";
      removeIndex = fingers.indexOf('D5');
      fingers.splice(removeIndex, 1);
    }

    if(this.state.selectedFingers.L1){
      L1.style.width = "1vw";
      L1.style.height = "1vw";
      if(!fingers.includes('L1')){
        fingers.push('L1');
      }
    }
    if(this.state.selectedFingers.L2){
      L2.style.width = "1vw";
      L2.style.height = "1vw";
      if(!fingers.includes('L2')){
        fingers.push('L2');
      }
    }
    if(this.state.selectedFingers.L3){
      L3.style.width = "1vw";
      L3.style.height = "1vw";
      if(!fingers.includes('L3')){
        fingers.push('L3');
      }
    }
    if(this.state.selectedFingers.L4){
      L4.style.width = "1vw";
      L4.style.height = "1vw";
      if(!fingers.includes('L4')){
        fingers.push('L4');
      }
    }
    if(this.state.selectedFingers.L5){
      L5.style.width = "1vw";
      L5.style.height = "1vw";
      if(!fingers.includes('L5')){
        fingers.push('L5');
      }
    }
    if(this.state.selectedFingers.D1){
      D1.style.width = "1vw";
      D1.style.height = "1vw";
      if(!fingers.includes('D1')){
        fingers.push('D1');
      }
    }
    if(this.state.selectedFingers.D2){
      D2.style.width = "1vw";
      D2.style.height = "1vw";
      if(!fingers.includes('D2')){
        fingers.push('D2');
      }
    }
    if(this.state.selectedFingers.D3){
      D3.style.width = "1vw";
      D3.style.height = "1vw";
      if(!fingers.includes('D3')){
        fingers.push('D3');
      }
    }
    if(this.state.selectedFingers.D4){
      D4.style.width = "1vw";
      D4.style.height = "1vw";
      if(!fingers.includes('D4')){
        fingers.push('D4');
      }
    }
    if(this.state.selectedFingers.D5){
      D5.style.width = "1vw";
      D5.style.height = "1vw";
      if(!fingers.includes('D5')){
        fingers.push('D5');
      }
    }
    this.setState({
      fingers: fingers,
    });
  }

  SelectFinger(finger){
    let selectedFingers = this.state.selectedFingers;
    if(finger == "L1"){
      selectedFingers.L1 = !selectedFingers.L1;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "L2"){
      selectedFingers.L2 = !selectedFingers.L2;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "L3"){
      selectedFingers.L3 = !selectedFingers.L3;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "L4"){
      selectedFingers.L4 = !selectedFingers.L4;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "L5"){
      selectedFingers.L5 = !selectedFingers.L5;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }

    if(finger == "D1"){
      selectedFingers.D1 = !selectedFingers.D1;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "D2"){
      selectedFingers.D2 = !selectedFingers.D2;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "D3"){
      selectedFingers.D3 = !selectedFingers.D3;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "D4"){
      selectedFingers.D4 = !selectedFingers.D4;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "D5"){
      selectedFingers.D5 = !selectedFingers.D5;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    this.CheckSelectedFingers();
    this.CheckHands();
  }

  LoadLevels() {
		var levelsString = levelsController.getLevels();
		var levels = JSON.parse(levelsString);
		return levels;
	}

  GetTeacherLevel() {
    let levels = this.LoadLevels();
    let levelName;
    for (var i = 0; i < levels.length; i++) {
      if(levels[i]._id == this.props.user.level){
         levelName = levels[i].name;
      }
    }
    this.setState({
      levelName: levelName,
    });
  }

  onChange = date => this.setState({ date });
	lang = "es-MX";

  SetStudentParameter() {
    let graphicSettings = this.state.graphicSettings;
    let student = document.getElementById('student-select').value;
    let name = document.getElementById('student-select').options[document.getElementById('student-select').selectedIndex].text;
    graphicSettings.isStudentSelected = true;
    graphicSettings.isCollective = false;
    this.setState({
      graphicSettings: graphicSettings,
      student: student,
      name: name,
    }, () => {
      this.GetRangeDates();
    });
  }

  GetRangeDates(){
    let activityDates = JSON.parse(globeActivitiesController.getStudentMaxMinActivityDates(this.state.student));
    if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
      this.setState({
        maxDate: new Date(activityDates.maxDate),
        minDate: new Date(activityDates.minDate),
      });
    }
  }

  SwitchStudentParameter(){
    let graphicSettings = this.state.graphicSettings;
    let studentSwitchButton = document.getElementById('collective-individual-switch-button');
    if(!graphicSettings.isCollective) {
      studentSwitchButton.innerHTML = "Individual " + this.state.levelName;
      graphicSettings.isCollective = true;
    }
    else {
      studentSwitchButton.innerHTML = "Colectivo " + this.state.levelName;
      graphicSettings.isCollective = false;
      this.GetStudentsByLevel();
    }
    graphicSettings.isStudentSelected = true;
    this.setState({
      graphicSettings: graphicSettings,
    });
  }

  SetActivity(activity) {
    let matrixOption = document.getElementById('matrix-option');
    let glovesOption = document.getElementById('gloves-option');
    let sensorOption = document.getElementById('sensor-option');

    let graphicSettings = this.state.graphicSettings;
    if(activity == "gloves"){
      graphicSettings.isActivitySelected = true;
      graphicSettings.isDateRangeSelected = true;
      glovesOption.className = 'activity-picker-option-selected';
      matrixOption.className = 'activity-picker-option';
      sensorOption.className = 'activity-picker-option';
    }
    this.setState({
      graphicSettings: graphicSettings,
      activity: activity,
    });
  }

  CheckHands() {
    let fingers = this.state.fingers;
    let bothHandsSelect = document.getElementById('bothHands-button');
    let leftCheckbox = document.getElementById('leftHand-button');
    if(fingers.includes('L1') && fingers.includes('L2') && fingers.includes('L3') && fingers.includes('L4') && fingers.includes('L5')){
      leftCheckbox.style.backgroundImage = "url(check-w.svg)";
    }
    else {
      leftCheckbox.style.backgroundImage = "none";
    }
    let rightCheckbox = document.getElementById('rightHand-button');
    if(fingers.includes('D1') && fingers.includes('D2') && fingers.includes('D3') && fingers.includes('D4') && fingers.includes('D5')){
      rightCheckbox.style.backgroundImage = "url(check-w.svg)";
    }
    else {
      rightCheckbox.style.backgroundImage = "none";
    }
    if(fingers.includes('L1') && fingers.includes('L2') && fingers.includes('L3') && fingers.includes('L4') && fingers.includes('L5') && fingers.includes('D1') && fingers.includes('D2') && fingers.includes('D3') && fingers.includes('D4') && fingers.includes('D5')){
      bothHandsSelect.style.backgroundImage = "url(check-w.svg)";
    }
    else {
      bothHandsSelect.style.backgroundImage = "none";
    }
  }

  SelectUnselectLeftHand() {
    let isSelected;
    let fingers = this.state.fingers;
    let selectedFingers = this.state.selectedFingers;
    if(fingers.includes('L1') && fingers.includes('L2') && fingers.includes('L3') && fingers.includes('L4') && fingers.includes('L5')){
      isSelected = true;
    }
    else {
      isSelected = false;
    }
    if(isSelected){
      let removeIndex = -1;
      removeIndex = fingers.indexOf('L1');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('L2');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('L3');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('L4');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('L5');
      fingers.splice(removeIndex, 1);
      selectedFingers.L1 = false;
      selectedFingers.L2 = false;
      selectedFingers.L3 = false;
      selectedFingers.L4 = false;
      selectedFingers.L5 = false;
    }
    else {
      if(!fingers.includes('L1')){
        fingers.push('L1');
        selectedFingers.L1 = true;
      }
      if(!fingers.includes('L2')){
        fingers.push('L2');
        selectedFingers.L2 = true;
      }
      if(!fingers.includes('L3')){
        fingers.push('L3');
        selectedFingers.L3 = true;
      }
      if(!fingers.includes('L4')){
        fingers.push('L4');
        selectedFingers.L4 = true;
      }
      if(!fingers.includes('L5')){
        fingers.push('L5');
        selectedFingers.L5 = true;
      }
    }
    this.setState({
      selectedFingers: selectedFingers,
    });
    this.CheckSelectedFingers();
    this.CheckHands();
  }

  SelectUnselectRightHand() {
    let isSelected;
    let fingers = this.state.fingers;
    let selectedFingers = this.state.selectedFingers;
    if(fingers.includes('D1') && fingers.includes('D2') && fingers.includes('D3') && fingers.includes('D4') && fingers.includes('D5')){
      isSelected = true;
    }
    else {
      isSelected = false;
    }
    if(isSelected){
      let removeIndex = -1;
      removeIndex = fingers.indexOf('D1');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('D2');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('D3');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('D4');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('D5');
      fingers.splice(removeIndex, 1);
      selectedFingers.D1 = false;
      selectedFingers.D2 = false;
      selectedFingers.D3 = false;
      selectedFingers.D4 = false;
      selectedFingers.D5 = false;
    }
    else {
      if(!fingers.includes('D1')){
        fingers.push('D1');
        selectedFingers.D1 = true;
      }
      if(!fingers.includes('D2')){
        fingers.push('D2');
        selectedFingers.D2 = true;
      }
      if(!fingers.includes('D3')){
        fingers.push('D3');
        selectedFingers.D3 = true;
      }
      if(!fingers.includes('D4')){
        fingers.push('D4');
        selectedFingers.D4 = true;
      }
      if(!fingers.includes('D5')){
        fingers.push('D5');
        selectedFingers.D5 = true;
      }
    }
    this.setState({
      selectedFingers: selectedFingers,
    });
    this.CheckSelectedFingers();
    this.CheckHands();
  }

  SelectUnselectBothHands() {
    let isSelected;
    let fingers = this.state.fingers;
    let selectedFingers = this.state.selectedFingers;
    if(fingers.includes('L1') && fingers.includes('L2') && fingers.includes('L3') && fingers.includes('L4') && fingers.includes('L5') && fingers.includes('D1') && fingers.includes('D2') && fingers.includes('D3') && fingers.includes('D4') && fingers.includes('D5')){
      isSelected = true;
    }
    else {
      isSelected = false;
    }
    if(isSelected){
      let removeIndex = -1;
      removeIndex = fingers.indexOf('D1');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('D2');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('D3');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('D4');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('D5');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('L1');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('L2');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('L3');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('L4');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('L5');
      fingers.splice(removeIndex, 1);
      selectedFingers.D1 = false;
      selectedFingers.D2 = false;
      selectedFingers.D3 = false;
      selectedFingers.D4 = false;
      selectedFingers.D5 = false;
      selectedFingers.L1 = false;
      selectedFingers.L2 = false;
      selectedFingers.L3 = false;
      selectedFingers.L4 = false;
      selectedFingers.L5 = false;
    }
    else {
      if(!fingers.includes('D1')){
        fingers.push('D1');
        selectedFingers.D1 = true;
      }
      if(!fingers.includes('D2')){
        fingers.push('D2');
        selectedFingers.D2 = true;
      }
      if(!fingers.includes('D3')){
        fingers.push('D3');
        selectedFingers.D3 = true;
      }
      if(!fingers.includes('D4')){
        fingers.push('D4');
        selectedFingers.D4 = true;
      }
      if(!fingers.includes('D5')){
        fingers.push('D5');
        selectedFingers.D5 = true;
      }
      if(!fingers.includes('L1')){
        fingers.push('L1');
        selectedFingers.L1 = true;
      }
      if(!fingers.includes('L2')){
        fingers.push('L2');
        selectedFingers.L2 = true;
      }
      if(!fingers.includes('L3')){
        fingers.push('L3');
        selectedFingers.L3 = true;
      }
      if(!fingers.includes('L4')){
        fingers.push('L4');
        selectedFingers.L4 = true;
      }
      if(!fingers.includes('L5')){
        fingers.push('L5');
        selectedFingers.L5 = true;
      }
    }
    this.setState({
      selectedFingers: selectedFingers,
    });
    this.CheckSelectedFingers();
    this.CheckHands();
  }

  SetGraphicType(type){
    let graphicSettings = this.state.graphicSettings;
    let graphicType = this.state.graphicType;
    graphicSettings.isGraphicTypeSelected = true;
    let barOption = document.getElementById('bar-option');
    let pieOption = document.getElementById('pie-option');
    if(type == "bar"){
      barOption.className = 'graphic-picker-option-selected';
      pieOption.className = 'graphic-picker-option';
    }
    if(type == "pie"){
      pieOption.className = 'graphic-picker-option-selected';
      barOption.className = 'graphic-picker-option';
    }
    graphicType = type;
    this.setState({
      graphicSettings: graphicSettings,
      graphicType: graphicType,
    });
  }

  GenerateGraphic(){
    let parameters = {};
    parameters.student = this.state.student;
    parameters.name = this.state.name;
    parameters.activity = this.state.activity;
    parameters.endDate = this.state.maxDate;
    parameters.startDate = this.state.minDate;
    parameters.fingers = this.state.fingers;
    parameters.graphicType = this.state.graphicType;
    this.props.ShowGraphicResult(parameters);
  }

  render() {
    return(
      <div>
        <div className="graphics-form">
          <div className="form-container">
  					<p className="input-label">Estudiante</p>
            {
              this.state.graphicSettings.isCollective
                ?
                  <div className="input-container">
                    Todos los estudiantes
        					</div>
                :
                <div className="input-container">
      						<select onChange={() => this.SetStudentParameter()} id="student-select">
      							<option id="student-default-option" value="" selected disabled hidden>Selecione el estudiante</option>
      						</select>
      					</div>
            }
            {
              this.state.levelName ?
                <div className="option-input-container">
                  <div className="option-input-text">Cambiar a: </div>
                  <div id="collective-individual-switch-button" onClick={() => this.SwitchStudentParameter()} className="option-button">Colectivo {this.state.levelName}</div>
                </div>
              :
              undefined
            }
  				</div>
          {
            this.state.graphicSettings.isStudentSelected ?
              <div className="animated-form-container">
                <p className="input-label">Actividad</p>
                <div className="activity-picker">
                  <div id="matrix-option" onClick={() => this.SetActivity("matrix")} className="activity-picker-option">
                    <div id="matrix-picker" className="activity-picker-icon"></div>
                    <p className="activity-picker-text">Matriz</p>
                  </div>
                  <div id="gloves-option" onClick={() => this.SetActivity("gloves")} className="activity-picker-option">
                    <div id="globes-picker" className="activity-picker-icon"></div>
                    <p className="activity-picker-text">Guantes</p>
                  </div>
                  <div id="sensor-option" onClick={() => this.SetActivity("sensor")} className="activity-picker-option">
                    <div id="sensor-picker" className="activity-picker-icon"></div>
                    <p className="activity-picker-text">Sensor de ritmo cardiaco</p>
                  </div>
                </div>
              </div>
            :
            undefined
          }
          {
            this.state.graphicSettings.isActivitySelected ?
              <div className="animated-form-container">
                <p className="input-label">Tipo de gráfico</p>
                <div className="graphic-picker">
                  <div id="bar-option" onClick={() => this.SetGraphicType("bar")} className="graphic-picker-option">
                    <div id="bar-picker" className="graphic-picker-icon"></div>
                    <p className="graphic-picker-text">Barras</p>
                  </div>
                  <div id="pie-option" onClick={() => this.SetGraphicType("pie")} className="graphic-picker-option">
                    <div id="pie-picker" className="graphic-picker-icon"></div>
                    <p className="graphic-picker-text">Pastel</p>
                  </div>
                </div>
              </div>
            :
            undefined
          }
          {
            this.state.graphicSettings.isGraphicTypeSelected ?
              <div>
                <div className="animated-form-container">
                  <p className="input-label">Fecha inicial</p>
                  <div className="date-input-container">
                    <DatePicker
                      onChange={this.onChange}
                      value={this.state.minDate}
                      locate={this.lang}/>
                  </div>
                </div>
                <div className="animated-form-container">
                  <p className="input-label">Fecha final</p>
                  <div className="date-input-container">
                    <DatePicker
                      onChange={this.onChange}
                      value={this.state.maxDate}
                      locate={this.lang}/>
                  </div>
                </div>
                <div className="animated-form-container">
                  <p className="input-label">Dedos</p>
                  <div className="hands-picker-container">
                    <div id="left-hand-picker" className="hand-picker">
                      <div onClick={() => this.SelectFinger("L1")} className="finger-1">
                        <div id="L1" className="l-selected-finger-1"></div>
                      </div>
                      <div onClick={() => this.SelectFinger("L2")} className="finger-2">
                        <div id="L2" className="l-selected-finger-2"></div>
                      </div>
                      <div onClick={() => this.SelectFinger("L3")} className="finger-3">
                        <div id="L3" className="l-selected-finger-3"></div>
                      </div>
                      <div onClick={() => this.SelectFinger("L4")} className="finger-4">
                        <div id="L4" className="l-selected-finger-4"></div>
                      </div>
                      <div onClick={() => this.SelectFinger("L5")} className="finger-5">
                        <div id="L5" className="l-selected-finger-5"></div>
                      </div>
                    </div>
                    <div id="right-hand-picker" className="hand-picker">
                      <div onClick={() => this.SelectFinger("D5")} className="finger-5">
                        <div id="D5" className="r-selected-finger-5"></div>
                      </div>
                      <div onClick={() => this.SelectFinger("D4")} className="finger-4">
                        <div id="D4" className="r-selected-finger-4"></div>
                      </div>
                      <div onClick={() => this.SelectFinger("D3")} className="finger-3">
                        <div id="D3" className="r-selected-finger-3"></div>
                      </div>
                      <div onClick={() => this.SelectFinger("D2")} className="finger-2">
                        <div id="D2" className="r-selected-finger-2"></div>
                      </div>
                      <div onClick={() => this.SelectFinger("D1")} className="finger-1">
                        <div id="D1" className="r-selected-finger-1"></div>
                      </div>
                    </div>
                    <div className="checkbox-panel">
                      <div onClick={() => this.SelectUnselectLeftHand()} id="left-hand-checkbox" className="checkbox-container">
                        <div id="leftHand-button" className="checkbox-button"></div>
                        <div className="checkbox-text">Mano izquierda</div>
                      </div>
                      <div onClick={() => this.SelectUnselectRightHand()} id="right-hand-checkbox" className="checkbox-container">
                        <div id="rightHand-button" className="checkbox-button"></div>
                        <div className="checkbox-text">Mano derecha</div>
                      </div>
                      <div onClick={() => this.SelectUnselectBothHands()} id="both-hands-checkbox" className="checkbox-container">
                        <div id="bothHands-button" className="checkbox-button"></div>
                        <div className="checkbox-text">Manos izquierda & derecha</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="button-container">
                      <div onClick={() => this.GenerateGraphic()} className="secondary-button">
                        Generar gráfica
                      </div>
                    </div>
                  </div>
                  <div className="separator"></div>
                </div>
              </div>
            :
            undefined
          }
        </div>

      </div>
    );
  }
}
