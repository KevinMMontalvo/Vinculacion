import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import Filters from '../map/Filters';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';
import Range from 'react-range-progress';

export default class GraphicsParametersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxDate: new Date(),
      minDate: new Date(),
      student: undefined,
      level: undefined,
      graphicType: undefined,
      filtersLoaded: false,
      activity: undefined,
      filters: {
        levels: [],
        periods: [],
        genders: ["Masculino", "Femenino"],
      },
      matrixSettings: {
        colors: [],
        sequences: [],
        changeLevels: [],
        appearances: [],
      },
      selectedMale: true,
      selectedFemale: true,
      fingers: ['D1','D2','D3','D4','D5','I1','I2','I3','I4','I5'],
      selectedFingers: {
        I1: true,
        I2: true,
        I3: true,
        I4: true,
        I5: true,
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
      },
    }
  }

  componentDidMount(){
    this.setState({
      level: this.props.user.level,
    }, () => {
      this.LoadLevelsInSelect();
      this.GetStudentsByLevel();
      this.GetTeacherLevel();
    });
  }

  LoadStudents() {
    var studentsString = studentsController.getStudents();
    var students = JSON.parse(studentsString);
    return students;
  }

  GetStudentsByLevel(){
    let students = this.LoadStudents();
    let studentsByLevel = [];
    let level = this.state.level;
    if(students != null){
      for (var i = 0; i < students.length; i++) {
        if(students[i].level_id == level){
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

    let I1 = document.getElementById('I1');
    let I2 = document.getElementById('I2');
    let I3 = document.getElementById('I3');
    let I4 = document.getElementById('I4');
    let I5 = document.getElementById('I5');

    let D1 = document.getElementById('D1');
    let D2 = document.getElementById('D2');
    let D3 = document.getElementById('D3');
    let D4 = document.getElementById('D4');
    let D5 = document.getElementById('D5');

    let removeIndex = -1;

    if(!this.state.selectedFingers.I1){
      I1.style.width = "0vw";
      I1.style.height = "0vw";
      removeIndex = fingers.indexOf('I1');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.I2){
      I2.style.width = "0vw";
      I2.style.height = "0vw";
      removeIndex = fingers.indexOf('I2');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.I3){
      I3.style.width = "0vw";
      I3.style.height = "0vw";
      removeIndex = fingers.indexOf('I3');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.I4){
      I4.style.width = "0vw";
      I4.style.height = "0vw";
      removeIndex = fingers.indexOf('I4');
      fingers.splice(removeIndex, 1);
    }
    if(!this.state.selectedFingers.I5){
      I5.style.width = "0vw";
      I5.style.height = "0vw";
      removeIndex = fingers.indexOf('I5');
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

    if(this.state.selectedFingers.I1){
      I1.style.width = "1vw";
      I1.style.height = "1vw";
      if(!fingers.includes('I1')){
        fingers.push('I1');
      }
    }
    if(this.state.selectedFingers.I2){
      I2.style.width = "1vw";
      I2.style.height = "1vw";
      if(!fingers.includes('I2')){
        fingers.push('I2');
      }
    }
    if(this.state.selectedFingers.I3){
      I3.style.width = "1vw";
      I3.style.height = "1vw";
      if(!fingers.includes('I3')){
        fingers.push('I3');
      }
    }
    if(this.state.selectedFingers.I4){
      I4.style.width = "1vw";
      I4.style.height = "1vw";
      if(!fingers.includes('I4')){
        fingers.push('I4');
      }
    }
    if(this.state.selectedFingers.I5){
      I5.style.width = "1vw";
      I5.style.height = "1vw";
      if(!fingers.includes('I5')){
        fingers.push('I5');
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
    if(finger == "I1"){
      selectedFingers.I1 = !selectedFingers.I1;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "I2"){
      selectedFingers.I2 = !selectedFingers.I2;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "I3"){
      selectedFingers.I3 = !selectedFingers.I3;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "I4"){
      selectedFingers.I4 = !selectedFingers.I4;
      this.setState({
        selectedFingers: selectedFingers,
      });
    }
    if(finger == "I5"){
      selectedFingers.I5 = !selectedFingers.I5;
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

  LoadPeriods() {
    var periodsString = periodsController.getPeriods();
    var periods = JSON.parse(periodsString);
    return periods;
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

  onChangeMax = maxDate => this.setState({ maxDate });

  onChangeMin = minDate => this.setState({ minDate });

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
      if(this.state.activity){
        this.GetRangeDates();
      }
    });
  }

  GetRangeDates(){
    if(this.state.activity == "gloves"){
      let activityDates = JSON.parse(globeActivitiesController.getStudentMaxMinActivityDates(this.state.student));
      if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
        this.setState({
          maxDate: new Date(activityDates.maxDate),
          minDate: new Date(activityDates.minDate),
        });
      }
    }
    if(this.state.activity == "matrix"){
      let activityDates = JSON.parse(matrixActivitiesController.getStudentMaxMinActivityDates(this.state.student));
      if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
        this.setState({
          maxDate: new Date(activityDates.maxDate),
          minDate: new Date(activityDates.minDate),
        });
      }
    }
    if(this.state.activity == "sensor"){
      console.log('yes individual');
      let activityDates = JSON.parse(cardiacActivitiesController.getStudentMaxMinActivityDates(this.state.student));
      if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
        this.setState({
          maxDate: new Date(activityDates.maxDate),
          minDate: new Date(activityDates.minDate),
        });
      }
    }
  }

  GetGlobalRangeDates(){
    if(this.state.activity == "gloves"){
      let activityDates = JSON.parse(globeActivitiesController.getGlobalMaxMinActivityDates());
      if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
        this.setState({
          maxDate: new Date(activityDates.maxDate),
          minDate: new Date(activityDates.minDate),
        });
      }
    }
    if(this.state.activity == "matrix"){
      let activityDates = JSON.parse(matrixActivitiesController.getGlobalMaxMinActivityDates());
      if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
        this.setState({
          maxDate: new Date(activityDates.maxDate),
          minDate: new Date(activityDates.minDate),
        });
      }
    }
    if(this.state.activity == "sensor"){
      console.log('yes');
      let activityDates = JSON.parse(cardiacActivitiesController.getGlobalMaxMinActivityDates());
      if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
        this.setState({
          maxDate: new Date(activityDates.maxDate),
          minDate: new Date(activityDates.minDate),
        });
      }
    }
  }

  SwitchStudentParameter(){
    let graphicSettings = this.state.graphicSettings;
    let studentSwitchButton = document.getElementById('collective-individual-switch-button');
    if(!graphicSettings.isCollective) {
      studentSwitchButton.innerHTML = "Individual";
      graphicSettings.isCollective = true;
    }
    else {
      studentSwitchButton.innerHTML = "Colectivo";
      graphicSettings.isCollective = false;
      this.setState({
        filtersLoaded: false,
      });
    }
    graphicSettings.isStudentSelected = true;
    this.setState({
      graphicSettings: graphicSettings,
    }, () => {
      if(this.state.graphicSettings.isCollective){
        let filters = {};
        filters.levels = [],
        filters.periods = [];
        filters.genders = ["Masculino", "Femenino"];
        this.setState({
          filters: filters,
        });
        this.GetGlobalRangeDates();
        if(this.state.graphicType){
          this.LoadFilterLevels();
          this.LoadFilterPeriods();
        }
      }
      else {
        this.LoadLevelsInSelect();
        this.GetStudentsByLevel();
      }
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
    if(activity == "matrix"){
      graphicSettings.isActivitySelected = true;
      graphicSettings.isDateRangeSelected = true;
      glovesOption.className = 'activity-picker-option';
      matrixOption.className = 'activity-picker-option-selected';
      sensorOption.className = 'activity-picker-option';
    }
    if(activity == "sensor"){
      graphicSettings.isActivitySelected = true;
      graphicSettings.isDateRangeSelected = true;
      glovesOption.className = 'activity-picker-option';
      matrixOption.className = 'activity-picker-option';
      sensorOption.className = 'activity-picker-option-selected';
    }
    this.setState({
      graphicSettings: graphicSettings,
      activity: activity,
    }, () => {
      if(this.state.activity){
        if(this.state.graphicSettings.isCollective){
          this.GetGlobalRangeDates();
        }
        else {
          this.GetRangeDates();
        }
      }
      /*if(this.state.graphicType && this.state.activity == "matrix"){
        this.AddAllColors();
        this.AddAllAppearances();
        this.AddAllChangeLevels();
        this.AddAllSequences();
      }*/
    });
  }

  CheckHands() {
    let fingers = this.state.fingers;
    let bothHandsSelect = document.getElementById('bothHands-button');
    let leftCheckbox = document.getElementById('leftHand-button');
    if(fingers.includes('I1') && fingers.includes('I2') && fingers.includes('I3') && fingers.includes('I4') && fingers.includes('I5')){
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
    if(fingers.includes('I1') && fingers.includes('I2') && fingers.includes('I3') && fingers.includes('I4') && fingers.includes('I5') && fingers.includes('D1') && fingers.includes('D2') && fingers.includes('D3') && fingers.includes('D4') && fingers.includes('D5')){
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
    if(fingers.includes('I1') && fingers.includes('I2') && fingers.includes('I3') && fingers.includes('I4') && fingers.includes('I5')){
      isSelected = true;
    }
    else {
      isSelected = false;
    }
    if(isSelected){
      let removeIndex = -1;
      removeIndex = fingers.indexOf('I1');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('I2');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('I3');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('I4');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('I5');
      fingers.splice(removeIndex, 1);
      selectedFingers.I1 = false;
      selectedFingers.I2 = false;
      selectedFingers.I3 = false;
      selectedFingers.I4 = false;
      selectedFingers.I5 = false;
    }
    else {
      if(!fingers.includes('I1')){
        fingers.push('I1');
        selectedFingers.I1 = true;
      }
      if(!fingers.includes('I2')){
        fingers.push('I2');
        selectedFingers.I2 = true;
      }
      if(!fingers.includes('I3')){
        fingers.push('I3');
        selectedFingers.I3 = true;
      }
      if(!fingers.includes('I4')){
        fingers.push('I4');
        selectedFingers.I4 = true;
      }
      if(!fingers.includes('I5')){
        fingers.push('I5');
        selectedFingers.I5 = true;
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
    if(fingers.includes('I1') && fingers.includes('I2') && fingers.includes('I3') && fingers.includes('I4') && fingers.includes('I5') && fingers.includes('D1') && fingers.includes('D2') && fingers.includes('D3') && fingers.includes('D4') && fingers.includes('D5')){
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
      removeIndex = fingers.indexOf('I1');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('I2');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('I3');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('I4');
      fingers.splice(removeIndex, 1);
      removeIndex = fingers.indexOf('I5');
      fingers.splice(removeIndex, 1);
      selectedFingers.D1 = false;
      selectedFingers.D2 = false;
      selectedFingers.D3 = false;
      selectedFingers.D4 = false;
      selectedFingers.D5 = false;
      selectedFingers.I1 = false;
      selectedFingers.I2 = false;
      selectedFingers.I3 = false;
      selectedFingers.I4 = false;
      selectedFingers.I5 = false;
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
      if(!fingers.includes('I1')){
        fingers.push('I1');
        selectedFingers.I1 = true;
      }
      if(!fingers.includes('I2')){
        fingers.push('I2');
        selectedFingers.I2 = true;
      }
      if(!fingers.includes('I3')){
        fingers.push('I3');
        selectedFingers.I3 = true;
      }
      if(!fingers.includes('I4')){
        fingers.push('I4');
        selectedFingers.I4 = true;
      }
      if(!fingers.includes('I5')){
        fingers.push('I5');
        selectedFingers.I5 = true;
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
    let lineOption = document.getElementById('line-option');
    if(type == "bar"){
      barOption.className = 'graphic-picker-option-selected';
      pieOption.className = 'graphic-picker-option';
      lineOption.className = 'graphic-picker-option';
    }
    if(type == "pie"){
      pieOption.className = 'graphic-picker-option-selected';
      barOption.className = 'graphic-picker-option';
      lineOption.className = 'graphic-picker-option';
    }
    if(type == "line"){
      lineOption.className = 'graphic-picker-option-selected';
      pieOption.className = 'graphic-picker-option';
      barOption.className = 'graphic-picker-option';
    }
    document.getElementById('activity-separator').style.display = "none";
    graphicType = type;
    this.setState({
      graphicSettings: graphicSettings,
      graphicType: graphicType,
    },() => {
      if(this.state.graphicSettings.isCollective){
        this.LoadFilterLevels();
        this.LoadFilterPeriods();
        this.GetGlobalRangeDates();
      }
      else {
        this.GetRangeDates();
      }
      /*if(this.state.activity == "matrix"){
        this.AddAllColors();
        this.AddAllAppearances();
        this.AddAllChangeLevels();
        this.AddAllSequences();
      }*/
    });
  }

  AddLevelAsFilter(){
    let levelId = document.getElementById('filter-level-select').value;
    let levelName;
    if(levelId){
      for (var i = 0; i < this.state.levels.length; i++) {
        if(this.state.levels[i]._id == levelId){
          levelName = this.state.levels[i].name;
        }
      }
      let filters = this.state.filters;
      let level = {};
      level.name = levelName;
      level._id = levelId;
      filters.levels.push(level);
      this.setState({
        filters: filters,
      },() => {
        document.getElementById('filter-level-select').remove(document.getElementById('filter-level-select').selectedIndex);
      });
    }
  }

  AddPeriodAsFilter(){
    let periodId = document.getElementById('filter-period-select').value;
    let periodName;
    if(periodId){
      for (var i = 0; i < this.state.periods.length; i++) {
        if(this.state.periods[i]._id == periodId){
          periodName = this.state.periods[i].name;
        }
      }
      let filters = this.state.filters;
      let period = {};
      period.name = periodName;
      period._id = periodId;
      filters.periods.push(period);
      this.setState({
        filters: filters,
      },() => {
        document.getElementById('filter-period-select').remove(document.getElementById('filter-period-select').selectedIndex);
      });
    }
  }

  LoadFilterLevels(){
    if(!this.state.filtersLoaded){
      var levelSelect = document.getElementById('filter-level-select');
      for (var i = 0; i < this.state.levels.length; i++){
        var option = document.createElement("option");
        option.text = this.state.levels[i].name;
        option.value = this.state.levels[i]._id;
        levelSelect.add(option);
      }
    }
    this.setState({
      filtersLoaded: true,
    });
  }

  LoadFilterPeriods(){
    if(!this.state.filtersLoaded){
      this.setState({
        periods: this.LoadPeriods(),
      }, () => {
        var periodSelect = document.getElementById('filter-period-select');
        for (var i = 0; i < this.state.periods.length; i++){
          var option = document.createElement("option");
          option.text = this.state.periods[i].name;
          option.value = this.state.periods[i]._id;
          periodSelect.add(option);
        }
      });
      this.setState({
        filtersLoaded: true,
      });
    }
  }

  LoadLevelsInSelect(){
		this.setState({
			levels: this.LoadLevels(),
		}, () =>
		{
			var levelSelect = document.getElementById('level-select');
			for (var i = 0; i < this.state.levels.length; i++)
			{
				var option = document.createElement("option");
				option.text = this.state.levels[i].name;
				option.value = this.state.levels[i]._id;
				levelSelect.add(option);
			}
		});
	}

  SetLevelParameter(){
    let studentSelect = document.getElementById('student-select');
    for (var i = 0; i < this.state.studentsByLevel.length; i++) {
      studentSelect.remove(1);
    }
    let levelSelect = document.getElementById('level-select').value;
    this.setState({
      level: levelSelect,
    }, () => {
      if(!this.state.graphicSettings.isCollective){
        this.GetStudentsByLevel();
        this.GetTeacherLevel();
      }
    });
  }

  RemoveFilter(index, name, type){
    let filters = this.state.filters;
    let matrixSettings = this.state.matrixSettings;
    if(type == "level"){
      var levelSelect = document.getElementById('filter-level-select');
      var option = document.createElement("option");
      option.text = name;
      option.value = index;
      levelSelect.add(option);
      for (var i = 0; i < filters.levels.length; i++)
  		{
  			if(filters.levels[i]._id == index){
          filters.levels.splice(i, 1);
        }
  		}
    }
    if(type == "period"){
      var periodSelect = document.getElementById('filter-period-select');
      var option = document.createElement("option");
      option.text = name;
      option.value = index;
      periodSelect.add(option);
      for (var i = 0; i < filters.periods.length; i++)
  		{
  			if(filters.periods[i]._id == index){
          filters.periods.splice(i, 1);
        }
  		}
    }
    if(type == "sequence"){
      var sequenceSelect = document.getElementById('sequences-select');
      var option = document.createElement("option");
      option.text = name;
      option.value = index;
      sequenceSelect.add(option);
      for (var i = 0; i < matrixSettings.sequences.length; i++)
  		{
  			if(matrixSettings.sequences[i]._id == index){
          matrixSettings.sequences.splice(i, 1);
        }
  		}
    }
		this.setState({
			filters: filters,
      matrixSettings: matrixSettings,
		});
	}

  AddAllLevelsAsFilters(){
    let filters = this.state.filters;
    let levelSelect = document.getElementById('filter-level-select');
    for (var i = 0; i < levelSelect.options.length; i++) {
      let level = {};
      level.name = levelSelect.options[i].text;
      level._id = levelSelect.options[i].value;
      filters.levels.push(level);
    }
    let selectLength = levelSelect.options.length;
    for (var i = 0; i < selectLength; i++) {
      levelSelect.remove(0);
    }
    this.setState({
      filters: filters,
    });
  }

  AddAllPeriodsAsFilters(){
    let filters = this.state.filters;
    let periodSelect = document.getElementById('filter-period-select');
    for (var i = 0; i < periodSelect.options.length; i++) {
      let period = {};
      period.name = periodSelect.options[i].text;
      period._id = periodSelect.options[i].value;
      filters.periods.push(period);
    }
    let selectLength = periodSelect.options.length;
    for (var i = 0; i < selectLength; i++) {
      periodSelect.remove(0);
    }
    this.setState({
      filters: filters,
    });
  }

  ValidateOnlyNumbers(evt){
		var theEvent = evt || window.event;
		if (theEvent.type === 'paste')
		{
			key = event.clipboardData.getData('text/plain');
		}
		else
		{
			var key = theEvent.keyCode || theEvent.which;
			key = String.fromCharCode(key);
		}
		var regex = /[0-9]|\1/;
		if (!regex.test(key))
		{
			theEvent.returnValue = false;
			if (theEvent.preventDefault)
			{
				theEvent.preventDefault();
			}
		}
	}

  SelectGender(gender){
    if(gender == "male"){
      this.setState({
        selectedMale: !this.state.selectedMale,
      }, () => {
        let maleCheckbox = document.getElementById('male-button');
        let filters = this.state.filters;
        let genders = filters.genders;
        if(this.state.selectedMale){
          maleCheckbox.style.backgroundImage = "url(check-w.svg)";
          genders.push('Masculino');
        }
        else {
          maleCheckbox.style.backgroundImage = "none";
          let removeIndex = -1;
          removeIndex = genders.indexOf('Masculino');
          genders.splice(removeIndex, 1);
        }
        filters.genders = genders;
        this.setState({
          filters: filters,
        });
      });
    }
    if(gender == "female"){
      this.setState({
        selectedFemale: !this.state.selectedFemale,
      }, () => {
        let femaleCheckbox = document.getElementById('female-button');
        let filters = this.state.filters;
        let genders = filters.genders;
        if(this.state.selectedFemale){
          femaleCheckbox.style.backgroundImage = "url(check-w.svg)";
          genders.push('Femenino');
        }
        else {
          femaleCheckbox.style.backgroundImage = "none";
          let removeIndex = -1;
          removeIndex = genders.indexOf('Femenino');
          genders.splice(removeIndex, 1);
        }
        filters.genders = genders;
        this.setState({
          filters: filters,
        });
      });
    }

  }

  dismissAll = () => {
    this.tray.dismissAll();
  }

  ShowWarningMenssage(content, title){
		this.tray.raise({
			content: <Cinnamon.Crisp
				className="butter-alert"
				scheme={Cinnamon.Slim.SCHEME_DARK}
				content={() => <div>{content}</div>}
				title={title}
				icon={<div className="alert-warning-icon"></div>}
			/>
		});
    this.dismissAll();
	}

  CheckNonValidInputs(){
    var nonValidInputs = false;
    var nonValidFilters = false;
    if(this.state.activity == "gloves"){
      if(this.state.fingers.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un dedo", "Existen campos vacios");
        nonValidInputs = true;
      }
    }
    if(this.state.activity == "matrix"){
      if(this.state.matrixSettings.colors.length == 0){
        this.AddAllColors();
      }
      if(this.state.matrixSettings.sequences.length == 0){
        this.AddAllSequences();
      }
      if(this.state.matrixSettings.appearances.length == 0){
        this.AddAllAppearances();
      }
      if(this.state.matrixSettings.changeLevels.length == 0){
        this.AddAllChangeLevels();
      }
    }
    if(this.state.graphicSettings.isCollective){
      if(this.state.filters.levels.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un nivel", "Existen campos vacios");
        nonValidFilters = true;
      }
      if(this.state.filters.periods.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un periodo", "Existen campos vacios");
        nonValidFilters = true;
      }
      if(this.state.filters.genders.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un género", "Existen campos vacios");
        nonValidFilters = true;
      }
    }
    if(nonValidFilters || nonValidInputs){
      return false;
    }
    return true;
  }

  AddColor(color){
    let matrixSettings = this.state.matrixSettings;
    let colors = matrixSettings.colors;
    if(!colors.includes(color)){
      colors.push(color);
    }
    else{
      let remove  = colors.indexOf(color);
      colors.splice(remove, 1);
    }
    matrixSettings.colors = colors;
    this.setState({
      matrixSettings: matrixSettings,
    }, () => {
      this.CheckColors();
    });
  }

  AddAllColors(){
    let matrixSettings = this.state.matrixSettings;
    let colors = [];
    for (var i = 1; i <= 9; i++) {
      colors.push(i);
    }
    matrixSettings.colors = colors;
    this.setState({
      matrixSettings: matrixSettings,
    }, () => {
      this.CheckColors();
    });
  }

  CheckColors(){
    let colors = this.state.matrixSettings.colors;
    if(colors.includes(1)){
      document.getElementById('matrix-white').className = "matrix-color-container-selected";
    }
    else{
      document.getElementById('matrix-white').className = "matrix-color-container-unselected";
    }
    if(colors.includes(2)){
      document.getElementById('matrix-yellow').className = "matrix-color-container-selected";
    }
    else{
      document.getElementById('matrix-yellow').className = "matrix-color-container-unselected";
    }
    if(colors.includes(3)){
      document.getElementById('matrix-blue').className = "matrix-color-container-selected";
    }
    else{
      document.getElementById('matrix-blue').className = "matrix-color-container-unselected";
    }
    if(colors.includes(4)){
      document.getElementById('matrix-red').className = "matrix-color-container-selected";
    }
    else{
      document.getElementById('matrix-red').className = "matrix-color-container-unselected";
    }
    if(colors.includes(5)){
      document.getElementById('matrix-orange').className = "matrix-color-container-selected";
    }
    else{
      document.getElementById('matrix-orange').className = "matrix-color-container-unselected";
    }
    if(colors.includes(6)){
      document.getElementById('matrix-green').className = "matrix-color-container-selected";
    }
    else{
      document.getElementById('matrix-green').className = "matrix-color-container-unselected";
    }
    if(colors.includes(7)){
      document.getElementById('matrix-purple').className = "matrix-color-container-selected";
    }
    else{
      document.getElementById('matrix-purple').className = "matrix-color-container-unselected";
    }
    if(colors.includes(8)){
      document.getElementById('matrix-skyblue').className = "matrix-color-container-selected";
    }
    else{
      document.getElementById('matrix-skyblue').className = "matrix-color-container-unselected";
    }
    if(colors.includes(9)){
      document.getElementById('matrix-pink').className = "matrix-color-container-selected";
    }
    else{
      document.getElementById('matrix-pink').className = "matrix-color-container-unselected";
    }
  }

  AddAllSequences(){
    let matrixSettings = this.state.matrixSettings;
    let sequenceSelect = document.getElementById('sequences-select');
    for (var i = 0; i < sequenceSelect.options.length; i++) {
      let sequence = {};
      sequence.name = sequenceSelect.options[i].text;
      sequence._id = sequenceSelect.options[i].value;
      matrixSettings.sequences.push(sequence);
    }
    let selectLength = sequenceSelect.options.length;
    for (var i = 0; i < selectLength; i++) {
      sequenceSelect.remove(0);
    }
    this.setState({
      matrixSettings: matrixSettings,
    });
  }

  AddSequence(){
    let sequenceId = document.getElementById('sequences-select').value;
    let sequenceName = document.getElementById('sequences-select').options[document.getElementById('sequences-select').selectedIndex].text;
    if(sequenceId){
      let matrixSettings = this.state.matrixSettings;
      let sequence = {};
      sequence.name = sequenceName;
      sequence._id = sequenceId;
      matrixSettings.sequences.push(sequence);
      this.setState({
        matrixSettings: matrixSettings,
      },() => {
        document.getElementById('sequences-select').remove(document.getElementById('sequences-select').selectedIndex);
      });
    }
  }

  AddChangeLevel(level){
    let matrixSettings = this.state.matrixSettings;
    let changeLevels = matrixSettings.changeLevels;
    if(!changeLevels.includes(level)){
      changeLevels.push(level);
    }
    else{
      let remove  = changeLevels.indexOf(level);
      changeLevels.splice(remove, 1);
    }
    matrixSettings.changeLevels = changeLevels;
    this.setState({
      matrixSettings: matrixSettings,
    }, () => {
      this.CheckChangeLevels();
    });
  }

  AddAllChangeLevels(){
    let matrixSettings = this.state.matrixSettings;
    let changeLevels = [];
    for (var i = 0; i <= 15; i++) {
      changeLevels.push(i);
    }
    matrixSettings.changeLevels = changeLevels;
    this.setState({
      matrixSettings: matrixSettings,
    }, () => {
      this.CheckChangeLevels();
    });
  }

  CheckChangeLevels(){
    let changeLevels = this.state.matrixSettings.changeLevels;
    if(changeLevels.includes(0)){
      document.getElementById('level-1').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-1').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(1)){
      document.getElementById('level-2').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-2').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(2)){
      document.getElementById('level-3').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-3').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(3)){
      document.getElementById('level-4').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-4').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(4)){
      document.getElementById('level-5').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-5').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(5)){
      document.getElementById('level-6').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-6').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(6)){
      document.getElementById('level-7').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-7').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(7)){
      document.getElementById('level-8').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-8').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(8)){
      document.getElementById('level-9').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-9').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(9)){
      document.getElementById('level-10').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-10').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(10)){
      document.getElementById('level-11').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-11').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(11)){
      document.getElementById('level-12').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-12').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(12)){
      document.getElementById('level-13').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-13').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(13)){
      document.getElementById('level-14').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-14').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(14)){
      document.getElementById('level-15').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-15').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(changeLevels.includes(15)){
      document.getElementById('level-16').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('level-16').className = "matrix-configuration-checkbox-icon-unselected";
    }
  }

  AddAppearance(appearance){
    let matrixSettings = this.state.matrixSettings;
    let appearances = matrixSettings.appearances;
    if(!appearances.includes(appearance)){
      appearances.push(appearance);
    }
    else{
      let remove  = appearances.indexOf(appearance);
      appearances.splice(remove, 1);
    }
    matrixSettings.appearances = appearances;
    this.setState({
      matrixSettings: matrixSettings,
    }, () => {
      this.CheckAppearances();
    });
  }

  AddAllAppearances(){
    let matrixSettings = this.state.matrixSettings;
    let appearances = [];
    for (var i = 0; i <= 9; i++) {
      appearances.push(i);
    }
    matrixSettings.appearances = appearances;
    this.setState({
      matrixSettings: matrixSettings,
    }, () => {
      this.CheckAppearances();
    });
  }

  CheckAppearances(){
    let appearances = this.state.matrixSettings.appearances;
    if(appearances.includes(0)){
      document.getElementById('appearance-1').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('appearance-1').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(appearances.includes(1)){
      document.getElementById('appearance-2').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('appearance-2').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(appearances.includes(2)){
      document.getElementById('appearance-3').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('appearance-3').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(appearances.includes(3)){
      document.getElementById('appearance-4').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('appearance-4').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(appearances.includes(4)){
      document.getElementById('appearance-5').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('appearance-5').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(appearances.includes(5)){
      document.getElementById('appearance-6').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('appearance-6').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(appearances.includes(6)){
      document.getElementById('appearance-7').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('appearance-7').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(appearances.includes(7)){
      document.getElementById('appearance-8').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('appearance-8').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(appearances.includes(8)){
      document.getElementById('appearance-9').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('appearance-9').className = "matrix-configuration-checkbox-icon-unselected";
    }
    if(appearances.includes(9)){
      document.getElementById('appearance-10').className = "matrix-configuration-checkbox-icon-selected";
    }
    else{
      document.getElementById('appearance-10').className = "matrix-configuration-checkbox-icon-unselected";
    }
  }

  GenerateGraphic(){
    if(this.CheckNonValidInputs()){
      let parameters = {};
      parameters.student = this.state.student;
      parameters.name = this.state.name;
      parameters.activity = this.state.activity;
      parameters.endDate = this.state.maxDate;
      parameters.startDate = this.state.minDate;
      parameters.fingers = this.state.fingers;
      parameters.graphicType = this.state.graphicType;
      parameters.level = this.state.level;
      if(this.state.graphicSettings.isCollective){
        parameters.levels = [];
        for (var i = 0; i < this.state.filters.levels.length; i++) {
          parameters.levels.push(this.state.filters.levels[i].name);
        }
        let maxAge = document.getElementById('max-age-input').value;
        let minAge = document.getElementById('min-age-input').value;
        if(maxAge == ""){
          maxAge = 99;
        }
        if(minAge == ""){
          minAge = 0;
        }
        parameters.maxAge = parseInt(maxAge);
        parameters.minAge = parseInt(minAge);
        parameters.genders = this.state.filters.genders;
        parameters.periods = [];
        for (var i = 0; i < this.state.filters.periods.length; i++) {
          parameters.periods.push(this.state.filters.periods[i].name);
        }
        parameters.isCollective = this.state.graphicSettings.isCollective;
      }
      if(this.state.activity == "matrix"){
        let sequences = [];
        for (var i = 0; i < this.state.matrixSettings.sequences.length; i++) {
          sequences.push(parseInt(this.state.matrixSettings.sequences[i]._id));
        }
        parameters.sequences = sequences;
        parameters.appearances = this.state.matrixSettings.appearances;
        parameters.colors = this.state.matrixSettings.colors;
        parameters.changeLevels = this.state.matrixSettings.changeLevels;
      }
      this.props.ShowGraphicResult(parameters);
    }
  }

  render() {
    return(
      <div>
        <div className="graphics-form">
          <div className="form-container">
            {
              this.state.graphicSettings.isCollective ?
                undefined
              :
              <div>
                <p className="input-label">Nivel</p>
                <div className="input-container">
                  <select onChange={() => this.SetLevelParameter()} id="level-select">
                    <option id="student-default-option" value="" selected disabled hidden>{this.state.levelName}</option>
                  </select>
                </div>
              </div>
            }
  				</div>
          <div className="form-container">
            <p className="input-label">Estudiante</p>
            {
              this.state.graphicSettings.isCollective
                ?
                  <div className="input-container">
                    Se considerarán todos los estudiantes de los cursos que se vaya a seleccionar
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
                  <div id="collective-individual-switch-button" onClick={() => this.SwitchStudentParameter()} className="option-button">Colectivo</div>
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
                  <div id="line-option" onClick={() => this.SetGraphicType("line")} className="graphic-picker-option">
                    <div id="line-picker" className="graphic-picker-icon"></div>
                    <p className="graphic-picker-text">Línea</p>
                  </div>
                </div>
                <div id="activity-separator" className="separator"></div>
              </div>
            :
            undefined
          }
          {
            this.state.activity == "matrix"  && this.state.graphicSettings.isGraphicTypeSelected ?
              <div>
                <div className="animated-form-container">
                  <p className="input-label">Colores</p>
                  <div className="input-container">
                    <div className="color-input-container">
                      <div onClick={() => this.AddColor(1)} id="matrix-white" className="matrix-color-container-unselected"></div>
                      <div onClick={() => this.AddColor(2)} id="matrix-yellow" className="matrix-color-container-unselected"></div>
                      <div onClick={() => this.AddColor(3)} id="matrix-blue" className="matrix-color-container-unselected"></div>
                      <div onClick={() => this.AddColor(4)} id="matrix-red" className="matrix-color-container-unselected"></div>
                      <div onClick={() => this.AddColor(5)} id="matrix-orange" className="matrix-color-container-unselected"></div>
                      <div onClick={() => this.AddColor(6)} id="matrix-green" className="matrix-color-container-unselected"></div>
                      <div onClick={() => this.AddColor(7)} id="matrix-purple" className="matrix-color-container-unselected"></div>
                      <div onClick={() => this.AddColor(8)} id="matrix-skyblue" className="matrix-color-container-unselected"></div>
                      <div onClick={() => this.AddColor(9)} id="matrix-pink" className="matrix-color-container-unselected"></div>
                    </div>
                  </div>
                  <div className="add-filter-button-type-container">
                    <div onClick={() => this.AddAllColors()} className="add-all-configuration-button">Agregar todos</div>
                  </div>
                  <p className="input-label">Secuecias</p>
                  <div className="input-container">
                    <div className="filter-input-container">
                      <div className="filter-input">
                        <select id="sequences-select">
                          <option value="0">Horizontal derecha</option>
                          <option value="1">Horizontal izquierda</option>
                          <option value="2">Vertical abajo</option>
                          <option value="3">Vertical arriba</option>
                          <option value="4">Rotación horaria</option>
                          <option value="5">Rotación antihoraria</option>
                          <option value="6">Rotación cuadrada horaria</option>
                          <option value="7">Rotación cuadrada antihoraria</option>
                        </select>
                      </div>
                      <div className="add-filter-button-container">
                        <div className="add-filter-button-type-container">
                          <div onClick={() => this.AddSequence()} className="add-filter-button"></div>
                        </div>
                        <div className="add-filter-button-type-container">
                          <div onClick={() => this.AddAllSequences()} className="add-all-filter-button">Agregar todos</div>
                        </div>
                      </div>
                      <div className="added-filters-contaier">
                        <div className="added-filter-text">Secuencias</div>
                        <div className="added-filter-area">
                          {this.state.matrixSettings.sequences.map((sequences) =>
            								{
            									return <Filters sequences={true}
            										RemoveFilter={this.RemoveFilter.bind(this)}
            										sequences={sequences} key={sequences._id}></Filters>;
            								})}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="input-label">Niveles de cambio</p>
                  <div className="input-container">
                    <div className="matrix-configuration-container">
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(0)} id="level-1" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">1</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(1)} id="level-2" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">2</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(2)} id="level-3" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">3</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(3)} id="level-4" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">4</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(4)} id="level-5" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">5</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(5)} id="level-6" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">6</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(6)} id="level-7" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">7</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(7)} id="level-8" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">8</div>
                      </div>
                    </div>
                  </div>
                  <div className="input-container">
                    <div className="matrix-configuration-container">
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(8)} id="level-9" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">9</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(9)} id="level-10" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">10</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(10)} id="level-11" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">11</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(11)} id="level-12" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">12</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(12)} id="level-13" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">13</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(13)} id="level-14" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">14</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(14)} id="level-15" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">15</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddChangeLevel(15)} id="level-16" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">16</div>
                      </div>
                    </div>
                  </div>
                  <div className="add-filter-button-type-container">
                    <div onClick={() => this.AddAllChangeLevels()} className="add-all-configuration-button">Agregar todos</div>
                  </div>
                  <p className="input-label">Cantidad de apariciones</p>
                  <div className="input-container">
                    <div id="matrix-configuration-percentage" className="matrix-configuration-container">
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddAppearance(0)} id="appearance-1" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">10%</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddAppearance(1)} id="appearance-2" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">20%</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddAppearance(2)} id="appearance-3" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">30%</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddAppearance(3)} id="appearance-4" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">40%</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddAppearance(4)} id="appearance-5" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">50%</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddAppearance(5)} id="appearance-6" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">60%</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddAppearance(6)} id="appearance-7" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">70%</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddAppearance(7)} id="appearance-8" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">80%</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddAppearance(8)} id="appearance-9" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">90%</div>
                      </div>
                      <div className="matrix-configuration-checkbox-container">
                        <div onClick={() => this.AddAppearance(9)} id="appearance-10" className="matrix-configuration-checkbox-icon-unselected"></div>
                        <div className="matrix-configuration-checkbox-text">100%</div>
                      </div>
                    </div>
                  </div>
                  <div className="add-filter-button-type-container">
                    <div onClick={() => this.AddAllAppearances()} className="add-all-configuration-button">Agregar todos</div>
                  </div>
                </div>
              </div>
            :
            undefined
          }
          {
            this.state.graphicSettings.isCollective && this.state.graphicSettings.isGraphicTypeSelected ?
              <div>
                <div className="animated-form-container">
                  <p className="input-label">Niveles</p>
                  <div className="input-container">
                    <div className="filter-input-container">
                      <div className="filter-input">
                        <select onChange={() => this.SetLevelParameter()} id="filter-level-select"></select>
                      </div>
                      <div className="add-filter-button-container">
                        <div className="add-filter-button-type-container">
                          <div onClick={() => this.AddLevelAsFilter()} className="add-filter-button"></div>
                        </div>
                        <div className="add-filter-button-type-container">
                          <div onClick={() => this.AddAllLevelsAsFilters()} className="add-all-filter-button">Agregar todos</div>
                        </div>
                      </div>
                      <div className="added-filters-contaier">
                        <div className="added-filter-text">Niveles</div>
                        <div className="added-filter-area">
                          {this.state.filters.levels.map((levels) =>
            								{
            									return <Filters levels={true}
            										RemoveFilter={this.RemoveFilter.bind(this)}
            										levels={levels} key={levels._id}></Filters>;
            								})}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="animated-form-container">
                  <p className="input-label">Periodos</p>
                  <div className="input-container">
                    <div className="filter-input-container">
                      <div className="filter-input">
                        <select onChange={() => this.SetPeriodParameter()} id="filter-period-select"></select>
                      </div>
                      <div className="add-filter-button-container">
                        <div className="add-filter-button-type-container">
                          <div onClick={() => this.AddPeriodAsFilter()} className="add-filter-button"></div>
                        </div>
                        <div className="add-filter-button-type-container">
                          <div onClick={() => this.AddAllPeriodsAsFilters()} className="add-all-filter-button">Agregar todos</div>
                        </div>
                      </div>
                      <div className="added-filters-contaier">
                        <div className="added-filter-text">Periodos</div>
                        <div className="added-filter-area">
                          {this.state.filters.periods.map((periods) =>
            								{
            									return <Filters periods={true}
            										RemoveFilter={this.RemoveFilter.bind(this)}
            										periods={periods} key={periods._id}></Filters>;
            								})}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="animated-form-container">
                  <p className="input-label">Género</p>
                  <div id="gender-checkbox" className="checkbox-panel">
                    <div onClick={() => this.SelectGender("male")} id="male-checkbox" className="checkbox-container">
                      <div id="male-button" className="checkbox-button"></div>
                      <div className="checkbox-text">Masculino</div>
                    </div>
                    <div onClick={() => this.SelectGender("female")} id="female-checkbox" className="checkbox-container">
                      <div id="female-button" className="checkbox-button"></div>
                      <div className="checkbox-text">Femenino</div>
                    </div>
                  </div>
                  <div id="small-separator" className="separator"></div>
                </div>
                <div className="animated-form-container">
                  <p className="input-label">Rango de edades</p>
                  <div className="student-input">
        						<input id="min-age-input" onKeyPress={() => this.ValidateOnlyNumbers(event)}
              placeholder="Edad mínima" className="vertical-input" maxLength="2" placeholder="0"></input>
        						<input id="max-age-input" onKeyPress={() => this.ValidateOnlyNumbers(event)}
              placeholder="Edad máxima" className="vertical-input" maxLength="2" placeholder="99"></input>
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
                      onChange={this.onChangeMin}
                      value={this.state.minDate}
                      locate={this.lang}/>
                  </div>
                </div>
                <div className="animated-form-container">
                  <p className="input-label">Fecha final</p>
                  <div className="date-input-container">
                    <DatePicker
                      onChange={this.onChangeMax}
                      value={this.state.maxDate}
                      locate={this.lang}/>
                  </div>
                </div>
                {
                  this.state.activity == "gloves" ?
                    <div className="animated-form-container">
                      <p className="input-label">Dedos</p>
                      <div className="hands-picker-container">
                        <div id="left-hand-picker" className="hand-picker">
                          <div onClick={() => this.SelectFinger("I1")} className="finger-1">
                            <div id="I1" className="l-selected-finger-1"></div>
                          </div>
                          <div onClick={() => this.SelectFinger("I2")} className="finger-2">
                            <div id="I2" className="l-selected-finger-2"></div>
                          </div>
                          <div onClick={() => this.SelectFinger("I3")} className="finger-3">
                            <div id="I3" className="l-selected-finger-3"></div>
                          </div>
                          <div onClick={() => this.SelectFinger("I4")} className="finger-4">
                            <div id="I4" className="l-selected-finger-4"></div>
                          </div>
                          <div onClick={() => this.SelectFinger("I5")} className="finger-5">
                            <div id="I5" className="l-selected-finger-5"></div>
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
                    </div>
                  :
                  undefined
                }
                <div>
                  <div className="button-container">
                    <div onClick={() => this.GenerateGraphic()} className="secondary-button">
                      Generar gráfica
                    </div>
                  </div>
                </div>
                <div className="separator"></div>
              </div>
            :
            undefined
          }
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
