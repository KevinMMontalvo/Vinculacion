import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import { DotLoader } from 'react-spinners';
import Modal from 'react-responsive-modal';
import DatePicker from 'react-date-picker';
import GraphicsParametersForm from '../components/GraphicsParametersForm';
import Filters from '../map/Filters';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class GraphicResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openChartModal: false,
      maxDate: new Date(),
      minDate: new Date(),
      selectedFingers: {
        I1: false,
        I2: false,
        I3: false,
        I4: false,
        I5: false,
        D1: false,
        D2: false,
        D3: false,
        D4: false,
        D5: false,
      },
      filters: {
        levels: [],
        periods: [],
        genders: [],
      },
      selectedMale: false,
      selectedFemale: false,
      matrixSettings: {
        colors: [],
        sequences: [],
        changeLevels: [],
        appearances: [],
      },
      title: undefined,
    }
  }

  onChangeMax = maxDate => this.setState({ maxDate });

  onChangeMin = minDate => this.setState({ minDate });

  onOpenChartModal = (value) => {
    this.setState({ openChartModal: true }, () => {
      this.SetChartSettings(value);
    });
  };

  onCloseChartModal = () => {
    this.setState({ openChartModal: false });
  };

  componentDidMount() {
    this.TranslateActivityName();
    this.GetTitle();
  }

  GetTitle(){
    let title = "";
    if(this.props.parameters.activity == "gloves" || this.props.parameters.activity == "matrix"){
      title = "Cantidad de aciertos vs errores";
    }
    if(this.props.parameters.activity == "sensor"){
      title = "Pulso inicial vs pulso final";
    }
    this.setState({
      title: title,
    });
  }

  TranslateActivityName() {
    let activity = this.props.parameters.activity;
    let translatedActivity = "";
    if(activity == "gloves"){
      translatedActivity = "Guantes";
    }
    if(activity == "matrix"){
      translatedActivity = "Matriz";
    }
    if(activity == "sensor"){
      translatedActivity = "Sensor cardiaco";
    }
    this.setState({
      activityName: translatedActivity,
    });
  }

  ChangeChartType(type){
    this.props.ChangeChartType(type);
  }

  NewGraphic(){
    this.props.NewGraphic();
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
      this.GetStudentsByLevel();
      this.GetTeacherLevel();
    });
  }

  LoadLevels() {
		var levelsString = levelsController.getLevels();
		var levels = JSON.parse(levelsString);
		return levels;
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

  SetStudentParameter() {
    let student = document.getElementById('student-select').value;
    let name = document.getElementById('student-select').options[document.getElementById('student-select').selectedIndex].text;
    this.setState({
      student: student,
      name: name,
    }, () => {
      this.GetRangeDates();
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
      let activityDates = JSON.parse(cardiacActivitiesController.getGlobalMaxMinActivityDates());
      if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
        this.setState({
          maxDate: new Date(activityDates.maxDate),
          minDate: new Date(activityDates.minDate),
        });
      }
    }
  }

  GetTeacherLevel() {
    let levels = this.LoadLevels();
    let levelName;
    for (var i = 0; i < levels.length; i++) {
      if(levels[i]._id == this.props.parameters.level){
         levelName = levels[i].name;
      }
    }
    this.setState({
      levelName: levelName,
    });
  }

  LoadFingers(){
    let fingers = this.props.parameters.fingers;
    let selectedFingers = this.state.selectedFingers;
    if(fingers.includes("I1")){
      selectedFingers.I1 = true;
    }
    if(fingers.includes("I2")){
      selectedFingers.I2 = true;
    }
    if(fingers.includes("I3")){
      selectedFingers.I3 = true;
    }
    if(fingers.includes("I4")){
      selectedFingers.I4 = true;
    }
    if(fingers.includes("I5")){
      selectedFingers.I5 = true;
    }

    if(fingers.includes("D1")){
      selectedFingers.D1 = true;
    }
    if(fingers.includes("D2")){
      selectedFingers.D2 = true;
    }
    if(fingers.includes("D3")){
      selectedFingers.D3 = true;
    }
    if(fingers.includes("D4")){
      selectedFingers.D4 = true
    }
    if(fingers.includes("D5")){
      selectedFingers.D5 = true;
    }
    this.setState({
      selectedFingers: selectedFingers,
    });
    this.CheckSelectedFingers();
    this.CheckHands();
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

  LoadFilterLevels(){
    var levelSelect = document.getElementById('filter-level-select');
    for (var i = 0; i < this.state.filteredLevels.length; i++){
      var option = document.createElement("option");
      option.text = this.state.filteredLevels[i].name;
      option.value = this.state.filteredLevels[i]._id;
      levelSelect.add(option);
    }
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

  SetLevelParameter(){
    let studentSelect = document.getElementById('student-select');
    for (var i = 0; i < this.state.studentsByLevel.length; i++) {
      studentSelect.remove(1);
    }
    let levelSelect = document.getElementById('level-select').value;
    this.setState({
      level: levelSelect,
    }, () => {
      if(!this.props.parameters.isCollective){
        this.GetStudentsByLevel();
        this.GetTeacherLevel();
      }
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

  LoadPeriods() {
    var periodsString = periodsController.getPeriods();
    var periods = JSON.parse(periodsString);
    return periods;
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

  SetChartSettings(value) {
    if(value == 'student'){
      this.setState({
        studentOption: true,
        level: this.props.parameters.level,
        dateOption: false,
        fingersOption: false,
        gendersOption: false,
        periodsOption: false,
        levelsOption: false,
        colorsOption: false,
        sequencesOption: false,
        changeLevelsOption: false,
        appearancesOption: false,
      }, () => {
        this.LoadLevelsInSelect();
        this.GetStudentsByLevel();
        this.GetTeacherLevel();
      });
    }
    if(value == 'date'){
      this.setState({
        studentOption: false,
        dateOption: true,
        student: this.props.parameters.student,
        fingersOption: false,
        gendersOption: false,
        periodsOption: false,
        levelsOption: false,
        colorsOption: false,
        sequencesOption: false,
        changeLevelsOption: false,
        appearancesOption: false,
      }, () => {
        if(this.props.parameters.isCollective){
          this.GetGlobalRangeDates();
        }
        else{
          this.GetRangeDates();
        }
      });
    }
    if(value == 'fingers'){
      document.getElementById('chart-container').className = "big-chart-modal-container";
      this.setState({
        studentOption: false,
        dateOption: false,
        fingers: this.props.parameters.fingers,
        fingersOption: true,
        gendersOption: false,
        periodsOption: false,
        levelsOption: false,
        colorsOption: false,
        sequencesOption: false,
        changeLevelsOption: false,
        appearancesOption: false,
      }, () => {
        this.LoadFingers();
      });
    }
    if(value == 'levels'){
      this.setState({
        levels: this.LoadLevels(),
      }, () => {
        document.getElementById('chart-container').className = "big-chart-modal-container";
        let filters = this.state.filters;
        let filteredLevels = this.state.levels;
        let levels = [];
        for (var i = 0; i < this.props.parameters.levels.length; i++) {
          for (var j = 0; j < this.state.levels.length; j++) {
            if(this.props.parameters.levels[i] == this.state.levels[j].name){
              let level = {};
              level._id = this.state.levels[j]._id;
              level.name = this.state.levels[j].name;
              levels.push(level);
              filteredLevels.splice(j, 1);
            }
          }
        }
        filters.levels = levels;
        this.setState({
          studentOption: false,
          dateOption: false,
          filters: filters,
          fingersOption: false,
          gendersOption: false,
          periodsOption: false,
          levelsOption: true,
          colorsOption: false,
          filteredLevels: filteredLevels,
          sequencesOption: false,
          changeLevelsOption: false,
          appearancesOption: false,
        }, () => {
          this.LoadFilterLevels();
        });
      });
    }
    if(value == 'periods'){
      this.setState({
        periods: this.LoadPeriods(),
      }, () => {
        document.getElementById('chart-container').className = "big-chart-modal-container";
        let filters = this.state.filters;
        let filteredPeriods = this.state.periods;
        let periods = [];
        for (var i = 0; i < this.props.parameters.periods.length; i++) {
          for (var j = 0; j < this.state.periods.length; j++) {
            if(this.props.parameters.periods[i] == this.state.periods[j].name){
              let period = {};
              period._id = this.state.periods[j]._id;
              period.name = this.state.periods[j].name;
              periods.push(period);
              filteredPeriods.splice(j, 1);
            }
          }
        }
        filters.periods = periods;
        this.setState({
          studentOption: false,
          dateOption: false,
          filters: filters,
          fingersOption: false,
          gendersOption: false,
          periodsOption: true,
          levelsOption: false,
          colorsOption: false,
          filteredPeriods: filteredPeriods,
          sequencesOption: false,
          changeLevelsOption: false,
          appearancesOption: false,
        }, () => {
          this.LoadFilterPeriods();
        });
      });
    }
    if(value == "genders"){
      this.setState({
        studentOption: false,
        dateOption: false,
        fingersOption: false,
        gendersOption: true,
        periodsOption: false,
        levelsOption: false,
        colorsOption: false,
        sequencesOption: false,
        changeLevelsOption: false,
        appearancesOption: false,
      }, () => {
        let filters = this.state.filters;
        let genders = [];
        let maleCheckbox = document.getElementById('male-button');
        let femaleCheckbox = document.getElementById('female-button');
        if(this.props.parameters.genders.includes("Masculino")){
          maleCheckbox.style.backgroundImage = "url(check-w.svg)";
          genders.push("Masculino");
          filters.genders = genders;
          this.setState({
            selectedMale: true,
            filters: filters,
          });
        }
        else{
          maleCheckbox.style.backgroundImage = "none";
        }
        if(this.props.parameters.genders.includes("Femenino")){
          femaleCheckbox.style.backgroundImage = "url(check-w.svg)";
          genders.push("Femenino");
          filters.genders = genders;
          this.setState({
            selectedFemale: true,
            filters: filters,
          });
        }
        else{
          femaleCheckbox.style.backgroundImage = "none";
        }
      });
    }
    if(value == "colors"){
      this.setState({
        studentOption: false,
        dateOption: false,
        fingersOption: false,
        gendersOption: false,
        periodsOption: false,
        levelsOption: false,
        colorsOption: true,
        sequencesOption: false,
        changeLevelsOption: false,
        appearancesOption: false
      }, () => {
        let colors = this.props.parameters.colors;
        let matrixSettings = this.state.matrixSettings;
        matrixSettings.colors = colors;
        this.setState({
          matrixSettings: matrixSettings
        },() => {
          this.CheckColors();
        });
      });
    }
    if(value == "sequences"){
      document.getElementById('chart-container').className = "big-chart-modal-container";
      this.setState({
        studentOption: false,
        dateOption: false,
        fingersOption: false,
        gendersOption: false,
        periodsOption: false,
        levelsOption: false,
        colorsOption: false,
        sequencesOption: true,
        changeLevelsOption: false,
        appearancesOption: false,
      }, () => {
        let parameterSequences = this.props.parameters.sequences;
        let sequences = [];
        for (var i = 0; i < parameterSequences.length; i++) {
          var sequence = {};
          if(parameterSequences[i] == 0){
            sequence._id = parameterSequences[i];
            sequence.name = "Horizontal derecha";
          }
          if(parameterSequences[i] == 1){
            sequence._id = parameterSequences[i];
            sequence.name = "Horizontal izquierda";
          }
          if(parameterSequences[i] == 2){
            sequence._id = parameterSequences[i];
            sequence.name = "Vertical abajo";
          }
          if(parameterSequences[i] == 3){
            sequence._id = parameterSequences[i];
            sequence.name = "Vertical arriba";
          }
          if(parameterSequences[i] == 4){
            sequence._id = parameterSequences[i];
            sequence.name = "Rotación horaria";
          }
          if(parameterSequences[i] == 5){
            sequence._id = parameterSequences[i];
            sequence.name = "Rotación antihoraria";
          }
          if(parameterSequences[i] == 6){
            sequence._id = parameterSequences[i];
            sequence.name = "Rotación cuadrada horaria";
          }
          if(parameterSequences[i] == 7){
            sequence._id = parameterSequences[i];
            sequence.name = "Rotación cuadrada antihoraria";
          }
          sequences.push(sequence);
        }
        let matrixSettings = this.state.matrixSettings;
        matrixSettings.sequences = sequences;
        this.setState({
          matrixSettings: matrixSettings
        },() => {
          for (var i = 0; i < this.state.matrixSettings.sequences.length; i++) {
            document.getElementById('sequences-select').remove(document.getElementById('sequences-select').options[this.state.matrixSettings.sequences[i]._id]);
          }
        });
      });
    }
    if(value == "changeLevels"){
      document.getElementById('chart-container').className = "big-chart-modal-container";
      this.setState({
        studentOption: false,
        dateOption: false,
        fingersOption: false,
        gendersOption: false,
        periodsOption: false,
        levelsOption: false,
        colorsOption: false,
        sequencesOption: false,
        changeLevelsOption: true,
        appearancesOption: false,
      }, () => {
        let changeLevels = this.props.parameters.changeLevels;
        let matrixSettings = this.state.matrixSettings;
        matrixSettings.changeLevels = changeLevels;
        this.setState({
          matrixSettings: matrixSettings
        },() => {
          this.CheckChangeLevels();
        });
      });
    }
    if(value == "appearances"){
      document.getElementById('chart-container').className = "big-chart-modal-container";
      this.setState({
        studentOption: false,
        dateOption: false,
        fingersOption: false,
        gendersOption: false,
        periodsOption: false,
        levelsOption: false,
        colorsOption: false,
        sequencesOption: false,
        changeLevelsOption: false,
        appearancesOption: true,
      }, () => {
        let appearances = this.props.parameters.appearances;
        let matrixSettings = this.state.matrixSettings;
        matrixSettings.appearances = appearances;
        this.setState({
          matrixSettings: matrixSettings
        },() => {
          this.CheckAppearances();
        });
      });
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

  LoadFilterPeriods(){
    this.setState({
      periods: this.LoadPeriods(),
    }, () => {
      var periodSelect = document.getElementById('filter-period-select');
      for (var i = 0; i < this.state.filteredPeriods.length; i++){
        var option = document.createElement("option");
        option.text = this.state.filteredPeriods[i].name;
        option.value = this.state.filteredPeriods[i]._id;
        periodSelect.add(option);
      }
    });
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

  ChangeChartSettings(){
    var nonValidInputs = false;
    var nonValidFilters = false;
    if(this.state.studentOption){
      this.props.ChangeStudent(this.state.student, this.state.name, this.state.level);
    }
    if(this.state.dateOption){
      this.props.ChangeDate(this.state.minDate, this.state.maxDate);
    }
    if(this.state.fingersOption){
      if(this.state.fingers.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un dedo", "Existen campos vacios");
        nonValidInputs = true;
      }
      else{
        this.props.ChangeFingers(this.state.fingers);
      }
    }
    if(this.state.levelsOption){
      let parameters = this.props.parameters;
      parameters.levels = [];
      for (var i = 0; i < this.state.filters.levels.length; i++) {
        parameters.levels.push(this.state.filters.levels[i].name);
      }
      if(parameters.levels.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un nivel", "Existen campos vacios");
        nonValidFilters = true;
      }
      else{
        this.props.ChangeFilters(parameters);
      }
    }
    if(this.state.periodsOption){
      let parameters = this.props.parameters;
      parameters.periods = [];
      for (var i = 0; i < this.state.filters.periods.length; i++) {
        parameters.periods.push(this.state.filters.periods[i].name);
      }
      if(parameters.periods.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un periodo", "Existen campos vacios");
        nonValidFilters = true;
      }
      else{
        this.props.ChangeFilters(parameters);
      }
    }
    if(this.state.gendersOption){
      let parameters = this.props.parameters;
      parameters.genders = this.state.filters.genders;
      if(parameters.genders.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un género", "Existen campos vacios");
        nonValidFilters = true;
      }
      else{
        this.props.ChangeFilters(parameters);
      }
    }
    if(this.state.colorsOption){
      let parameters = this.props.parameters;
      parameters.colors = this.state.matrixSettings.colors;
      if(parameters.colors.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un color", "Existen campos vacios");
        nonValidFilters = true;
      }
      else{
        this.props.ChangeFilters(parameters);
      }
    }
    if(this.state.sequencesOption){
      let sequences = [];
      for (var i = 0; i < this.state.matrixSettings.sequences.length; i++) {
        sequences.push(parseInt(this.state.matrixSettings.sequences[i]._id));
      }
      let parameters = this.props.parameters;
      parameters.sequences = sequences;
      if(parameters.sequences.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos una secuencia", "Existen campos vacios");
        nonValidFilters = true;
      }
      else{
        this.props.ChangeFilters(parameters);
      }
    }
    if(this.state.changeLevelsOption){
      let parameters = this.props.parameters;
      parameters.changeLevels = this.state.matrixSettings.changeLevels;
      if(parameters.changeLevels.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un nivel de cambio", "Existen campos vacios");
        nonValidFilters = true;
      }
      else{
        this.props.ChangeFilters(parameters);
      }
    }
    if(this.state.appearancesOption){
      let parameters = this.props.parameters;
      parameters.appearances = this.state.matrixSettings.appearances;
      if(parameters.appearances.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un porcentaje de aparición", "Existen campos vacios");
        nonValidFilters = true;
      }
      else{
        this.props.ChangeFilters(parameters);
      }
    }
    if(!nonValidFilters && !nonValidInputs){
      this.setState({
        studentOption: false,
        dateOption: false,
        openChartModal: false,
      });
      document.getElementById('chart-container').className = "chart-modal-container";
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

  CheckNonValidInputs(){
    var nonValidInputs = false;
    var nonValidFilters = false;
    if(this.props.parameters.activity == "gloves"){
      if(this.props.parameters.fingers.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un dedo", "Existen campos vacios");
        nonValidInputs = true;
      }
    }
    if(this.props.parameters.isCollective){
      if(this.props.parameters.levels.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un nivel", "Existen campos vacios");
        nonValidFilters = true;
      }
      if(this.props.parameters.periods.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un periodo", "Existen campos vacios");
        nonValidFilters = true;
      }
      if(this.props.parameters.genders.length == 0){
        this.ShowWarningMenssage("Tiene que selecionar por lo menos un género", "Existen campos vacios");
        nonValidFilters = true;
      }
    }
    if(nonValidFilters || nonValidInputs){
      return false;
    }
    return true;
  }

  render() {
    return(
      <div>
        <div className="chart-info">
          <div className="chart-info-container">
            <div onClick={() => this.NewGraphic()} className="return-new-graphic-container">
              <div className="return-new-graphic-icon"></div>
              <div className="return-new-graphic-text">Nueva gráfica</div>
            </div>
            <div className="chart-title">
              {
                this.props.parameters.isCollective ?
                  <div>Gráfica colectiva</div>
                :
                <div>Estudiante: {this.props.parameters.name}</div>
              }
            </div>
          </div>
          <div className="chart-info-container">
            <div className="graphic-settings-container">
              <div className="graphic-settings-icon"></div>
              <div className="graphic-settings-text">Opciones de la gráfica</div>
              <div className="individual-gloves-chart-menu">
                {
                  !this.props.parameters.isCollective ?
                    <div className="individual-gloves-chart-menu-option">
                      <div className="individual-gloves-chart-menu-option-selected"></div>
                      <div className="individual-gloves-chart-menu-option-text">Estudiante</div>
                      <div className="individual-gloves-chart-menu-option-icon"></div>
                      <div className="individual-gloves-chart-submenu-container">
                        <div onClick={() => this.onOpenChartModal('student')} className="individual-gloves-chart-submenu-option">
                          <div className="individual-gloves-chart-submenu-option-text">Cambiar estudiante...</div>
                        </div>
                      </div>
                    </div>
                  :
                  undefined
                }
                <div className="individual-gloves-chart-menu-option">
                  <div className="individual-gloves-chart-menu-option-selected"></div>
                  <div className="individual-gloves-chart-menu-option-text">Tipo</div>
                  <div className="individual-gloves-chart-menu-option-icon"></div>
                  <div className="individual-gloves-chart-submenu-container">
                    <div className="individual-gloves-chart-submenu-option">
                      {
                        this.props.parameters.graphicType == "bar" ?
                          <div>
                            <div onClick={() => this.ChangeChartType("pie")} className="individual-gloves-chart-submenu-option-text">Cambiar a pastel</div>
                            <div onClick={() => this.ChangeChartType("line")} className="individual-gloves-chart-submenu-option-text">Cambiar a línea</div>
                          </div>
                        :
                        undefined
                      }
                      {
                        this.props.parameters.graphicType == "pie" ?
                          <div>
                            <div onClick={() => this.ChangeChartType("bar")} className="individual-gloves-chart-submenu-option-text">Cambiar a barras</div>
                            <div onClick={() => this.ChangeChartType("line")} className="individual-gloves-chart-submenu-option-text">Cambiar a línea</div>
                          </div>
                        :
                        undefined
                      }
                      {
                        this.props.parameters.graphicType == "line" ?
                          <div>
                            <div onClick={() => this.ChangeChartType("bar")} className="individual-gloves-chart-submenu-option-text">Cambiar a barras</div>
                            <div onClick={() => this.ChangeChartType("pie")} className="individual-gloves-chart-submenu-option-text">Cambiar a pastel</div>
                          </div>
                        :
                        undefined
                      }
                    </div>
                  </div>
                </div>
                <div className="individual-gloves-chart-menu-option">
                  <div className="individual-gloves-chart-menu-option-selected"></div>
                  <div className="individual-gloves-chart-menu-option-text">Fecha</div>
                  <div className="individual-gloves-chart-menu-option-icon"></div>
                  <div className="individual-gloves-chart-submenu-container">
                    <div onClick={() => this.onOpenChartModal('date')} className="individual-gloves-chart-submenu-option">
                      <div className="individual-gloves-chart-submenu-option-text">Cambiar rango...</div>
                    </div>
                  </div>
                </div>
                {
                  this.props.parameters.activity == "gloves" ?
                    <div className="individual-gloves-chart-menu-option">
                      <div className="individual-gloves-chart-menu-option-selected"></div>
                      <div className="individual-gloves-chart-menu-option-text">Dedos</div>
                      <div className="individual-gloves-chart-menu-option-icon"></div>
                      <div className="individual-gloves-chart-submenu-container">
                        <div onClick={() => this.onOpenChartModal('fingers')} className="individual-gloves-chart-submenu-option">
                          <div className="individual-gloves-chart-submenu-option-text">Cambiar dedos...</div>
                        </div>
                      </div>
                    </div>
                  :
                  undefined
                }
                {
                  this.props.parameters.activity == "matrix" ?
                    <div className="individual-gloves-chart-menu-option">
                      <div className="individual-gloves-chart-menu-option-selected"></div>
                      <div className="individual-gloves-chart-menu-option-text">Configuración de la matriz</div>
                      <div className="individual-gloves-chart-menu-option-icon"></div>
                      <div className="individual-gloves-chart-submenu-container">
                        <div onClick={() => this.onOpenChartModal('colors')} className="individual-gloves-chart-submenu-option">
                          <div className="individual-gloves-chart-submenu-option-text">Cambiar colores...</div>
                        </div>
                        <div onClick={() => this.onOpenChartModal('sequences')} className="individual-gloves-chart-submenu-option">
                          <div className="individual-gloves-chart-submenu-option-text">Cambiar sequencias...</div>
                        </div>
                        <div onClick={() => this.onOpenChartModal('changeLevels')} className="individual-gloves-chart-submenu-option">
                          <div className="individual-gloves-chart-submenu-option-text">Cambiar niveles de cambio...</div>
                        </div>
                        <div onClick={() => this.onOpenChartModal('appearances')} className="individual-gloves-chart-submenu-option">
                          <div className="individual-gloves-chart-submenu-option-text">Cambiar apariciones...</div>
                        </div>
                      </div>
                    </div>
                  :
                  undefined
                }
                {
                  this.props.parameters.isCollective ?
                    <div>
                      <div className="individual-gloves-chart-menu-option">
                        <div className="individual-gloves-chart-menu-option-selected"></div>
                        <div className="individual-gloves-chart-menu-option-text">Niveles</div>
                        <div className="individual-gloves-chart-menu-option-icon"></div>
                        <div className="individual-gloves-chart-submenu-container">
                          <div onClick={() => this.onOpenChartModal('levels')} className="individual-gloves-chart-submenu-option">
                            <div className="individual-gloves-chart-submenu-option-text">Cambiar niveles...</div>
                          </div>
                        </div>
                      </div>
                      <div className="individual-gloves-chart-menu-option">
                        <div className="individual-gloves-chart-menu-option-selected"></div>
                        <div className="individual-gloves-chart-menu-option-text">Géneros</div>
                        <div className="individual-gloves-chart-menu-option-icon"></div>
                        <div className="individual-gloves-chart-submenu-container">
                          <div onClick={() => this.onOpenChartModal('genders')} className="individual-gloves-chart-submenu-option">
                            <div className="individual-gloves-chart-submenu-option-text">Cambiar géneros...</div>
                          </div>
                        </div>
                      </div>
                      <div className="individual-gloves-chart-menu-option">
                        <div className="individual-gloves-chart-menu-option-selected"></div>
                        <div className="individual-gloves-chart-menu-option-text">Periodos</div>
                        <div className="individual-gloves-chart-menu-option-icon"></div>
                        <div className="individual-gloves-chart-submenu-container">
                          <div onClick={() => this.onOpenChartModal('periods')} className="individual-gloves-chart-submenu-option">
                            <div className="individual-gloves-chart-submenu-option-text">Cambiar periodos...</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  :
                  undefined
                }
              </div>
            </div>
            <div className="chart-subtitle">
              Actividad: {this.state.activityName}
            </div>
          </div>
        </div>
        <div className="chart-container">
          {
            this.props.parameters.graphicType == "bar" && this.props.data[0] ?
              <Chart
                width={'70vw'}
                height={'65vh'}
                chartType="ColumnChart"
                loader={<div>
                  <div className="loading-container">
                    <DotLoader
                      sizeUnit={"vw"}
                      size={8}
                      color={'#2BBEA2'}
                      loading={true}
                    />
                    <p className="loading-text">Cargando...</p>
                  </div>
                </div>}
                data={this.props.data}
                options={{
                  chartArea: { width: '67.5%' },
                  hAxis: {
                    title: this.state.title,
                    minValue: 0,
                  },
                  vAxis: {
                    title: '',
                    maxValue: this.props.maxValue + 1,
                    minValue: 0,
                  },
                  colors: ['#F39C12', '#2471A3'],
                  animation: {
                    startup: true,
                    easing: 'in',
                    duration: 1000,
                  },
                }}
                // For tests
                rootProps={{ 'data-testid': '5' }}
              />
            :
            undefined
          }
          {
            this.props.parameters.graphicType == "pie" && this.props.data[0] ?
              <Chart
                width={'70vw'}
                height={'65vh'}
                chartType="PieChart"
                loader={<div>
                  <div className="loading-container">
                    <DotLoader
                      sizeUnit={"vw"}
                      size={8}
                      color={'#2BBEA2'}
                      loading={true}
                    />
                    <p className="loading-text">Cargando...</p>
                  </div>
                </div>}
                data={this.props.data}
                options={{
                  title: 'Cantidad de aciertos vs errores',
                  slices: {
                    1: { offset: 0.01 },
                  },
                }}
                rootProps={{ 'data-testid': '1' }}
              />
            :
            undefined
          }
          {
            this.props.parameters.graphicType == "line" && this.props.data[0] ?
              <Chart
                width={'70vw'}
                height={'65vh'}
                chartType="LineChart"
                loader={<div>
                  <div className="loading-container">
                    <DotLoader
                      sizeUnit={"vw"}
                      size={8}
                      color={'#2BBEA2'}
                      loading={true}
                    />
                    <p className="loading-text">Cargando...</p>
                  </div>
                </div>}
                data={this.props.data}
                options={{
                  hAxis: {
                    title: 'Tiempo',
                  },
                  vAxis: {
                    title: 'Aciertos - errores',
                  },
                }}
                rootProps={{ 'data-testid': '2' }}
              />
            :
            undefined
          }
          {
            !this.props.data[0] ?
              <div>
                <div>No existen datos registrados</div>
              </div>
            :
            undefined
          }
        </div>
        <Modal
          open={this.state.openChartModal}
          onClose={this.onCloseChartModal}
        center>
          <div id="chart-container" className="chart-modal-container">
            {
              this.state.studentOption ?
                <div>
                  <div className="form-container">
          					<p className="input-label">Nivel</p>
                    <div className="input-container">
                      <select className="modal-select" onChange={() => this.SetLevelParameter()} id="level-select">
                        <option id="student-default-option" value="" selected disabled hidden>{this.state.levelName}</option>
                      </select>
                    </div>
          				</div>
                  <div className="form-container">
          					<p className="input-label">Estudiante</p>
                    <div className="input-container">
                      <select className="modal-select" onChange={() => this.SetStudentParameter()} id="student-select">
                        <option id="student-default-option" value="" selected disabled hidden>Selecione el estudiante</option>
                      </select>
                    </div>
          				</div>
                </div>
              :
              undefined
            }
            {
              this.state.dateOption ?
                <div>
                  <div className="animated-form-container">
                    <p className="input-label">Fecha inicial</p>
                    <div className="date-input-container">
                      <DatePicker
                        className="white-date-picker"
                        onChange={this.onChangeMin}
                        value={this.state.minDate}
                        locate={this.lang}/>
                    </div>
                  </div>
                  <div className="animated-form-container">
                    <p className="input-label">Fecha final</p>
                    <div className="date-input-container">
                      <DatePicker
                        className="white-date-picker"
                        onChange={this.onChangeMax}
                        value={this.state.maxDate}
                        locate={this.lang}/>
                    </div>
                  </div>
                </div>
              :
              undefined
            }
            {
              this.state.fingersOption ?
                <div>
                  <div className="animated-form-container">
                    <p className="input-label">Dedos</p>
                    <div className="hands-picker-container-modal">
                      <div id="left-hand-picker-modal" className="hand-picker">
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
                      <div id="right-hand-picker-modal" className="hand-picker">
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
                      <div className="checkbox-panel-modal">
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
                </div>
              :
              undefined
            }
            {
              this.state.levelsOption ?
                <div>
                  <div className="animated-form-container">
                    <p className="input-label">Niveles</p>
                    <div className="input-container">
                      <div className="filter-input-container">
                        <div className="modal-filter-input">
                          <select className="modal-select" onChange={() => this.SetLevelParameter()} id="filter-level-select"></select>
                        </div>
                        <div className="add-filter-button-container">
                          <div className="add-filter-button-type-container">
                            <div onClick={() => this.AddLevelAsFilter()} className="add-filter-button"></div>
                          </div>
                          <div className="add-filter-button-type-container">
                            <div onClick={() => this.AddAllLevelsAsFilters()} className="modal-add-all-filter-button">Agregar todos</div>
                          </div>
                        </div>
                        <div className="modal-added-filters-contaier">
                          <div className="modal-added-filter-text">Niveles</div>
                          <div className="modal-added-filter-area">
                            {this.state.filters.levels.map((levels) =>
              								{
              									return <Filters levels={true}
              										RemoveFilter={this.RemoveFilter.bind(this)}
              										levels={levels}
                                  key={levels._id}
                                  modal={true}></Filters>;
              								})}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              :
              undefined
            }
            {
              this.state.periodsOption ?
                <div>
                  <div className="animated-form-container">
                    <p className="input-label">Periodos</p>
                    <div className="input-container">
                      <div className="filter-input-container">
                        <div className="modal-filter-input">
                          <select className="modal-select" onChange={() => this.SetPeriodParameter()} id="filter-period-select"></select>
                        </div>
                        <div className="add-filter-button-container">
                          <div className="add-filter-button-type-container">
                            <div onClick={() => this.AddPeriodAsFilter()} className="add-filter-button"></div>
                          </div>
                          <div className="add-filter-button-type-container">
                            <div onClick={() => this.AddAllPeriodsAsFilters()} className="modal-add-all-filter-button">Agregar todos</div>
                          </div>
                        </div>
                        <div className="modal-added-filters-contaier">
                          <div className="modal-added-filter-text">Periodos</div>
                          <div className="modal-added-filter-area">
                            {this.state.filters.periods.map((periods) =>
              								{
              									return <Filters periods={true}
              										RemoveFilter={this.RemoveFilter.bind(this)}
              										periods={periods}
                                  key={periods._id}
                                  modal={true}></Filters>;
              								})}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              :
              undefined
            }
            {
              this.state.gendersOption ?
                <div>
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
                </div>
              :
              undefined
            }
            {
              this.state.colorsOption ?
                <div>
                  <div className="animated-form-container">
                    <p className="input-label">Colores</p>
                    <div className="input-container">
                      <div className="color-input-container-modal">
                        <div onClick={() => this.AddColor(1)} id="matrix-white" className="matrix-color-container-unselected"></div>
                        <div onClick={() => this.AddColor(2)} id="matrix-yellow" className="matrix-color-container-unselected"></div>
                        <div onClick={() => this.AddColor(3)} id="matrix-blue" className="matrix-color-container-unselected"></div>
                        <div onClick={() => this.AddColor(4)} id="matrix-red" className="matrix-color-container-unselected"></div>
                        <div onClick={() => this.AddColor(5)} id="matrix-orange" className="matrix-color-container-unselected"></div>
                      </div>
                    </div>
                  </div>
                  <div className="animated-form-container">
                    <div className="input-container">
                      <div className="color-input-container-modal">
                        <div onClick={() => this.AddColor(6)} id="matrix-green" className="matrix-color-container-unselected"></div>
                        <div onClick={() => this.AddColor(7)} id="matrix-purple" className="matrix-color-container-unselected"></div>
                        <div onClick={() => this.AddColor(8)} id="matrix-skyblue" className="matrix-color-container-unselected"></div>
                        <div onClick={() => this.AddColor(9)} id="matrix-pink" className="matrix-color-container-unselected"></div>
                      </div>
                    </div>
                    <div className="add-filter-button-type-container">
                      <div onClick={() => this.AddAllColors()} className="modal-add-all-configuration-button">Agregar todos</div>
                    </div>
                  </div>
                </div>
              :
              undefined
            }
            {
              this.state.sequencesOption ?
                <div className="animated-form-container">
                  <p className="input-label">Secuecias</p>
                  <div className="input-container">
                    <div className="filter-input-container">
                      <div className="modal-filter-input">
                        <select className="modal-select" id="sequences-select">
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
                          <div onClick={() => this.AddAllSequences()} className="modal-add-all-filter-button">Agregar todos</div>
                        </div>
                      </div>
                      <div className="modal-added-filters-contaier">
                        <div className="modal-added-filter-text">Secuencias</div>
                        <div className="modal-added-filter-area">
                          {this.state.matrixSettings.sequences.map((sequences) =>
                            {
                              return <Filters sequences={true}
                                RemoveFilter={this.RemoveFilter.bind(this)}
                                sequences={sequences}
                                key={sequences._id}
                                modal={true}></Filters>;
                            })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              :
                undefined
            }
            {
              this.state.changeLevelsOption ?
                <div>
                  <div className="animated-form-container">
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
                      <div onClick={() => this.AddAllChangeLevels()} className="modal-add-all-configuration-button">Agregar todos</div>
                    </div>
                  </div>
                </div>
              :
              undefined
            }
            {
              this.state.appearancesOption ?
                <div>
                  <div className="animated-form-container">
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
                      </div>
                    </div>
                  </div>
                  <div className="animated-form-container">
                    <div className="input-container">
                      <div id="matrix-configuration-percentage" className="matrix-configuration-container">
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
                  </div>
                  <div className="add-filter-button-type-container">
                    <div onClick={() => this.AddAllAppearances()} className="modal-add-all-configuration-button">Agregar todos</div>
                  </div>
                </div>
              :
              undefined
            }
            <div className="button-container">
              <div onClick={() => this.ChangeChartSettings()} className="change-chart-settings-button">Cambiar</div>
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
