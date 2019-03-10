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
    if(this.props.parameters.activity == "gloves"){
      let activityDates = JSON.parse(globeActivitiesController.getStudentMaxMinActivityDates(this.props.parameters.student));
      if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
        this.setState({
          maxDate: new Date(activityDates.maxDate),
          minDate: new Date(activityDates.minDate),
        });
      }
    }
    if(this.props.parameters.activity == "matrix"){
      let activityDates = JSON.parse(matrixActivitiesController.getStudentMaxMinActivityDates(this.props.parameters.student));
      if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
        this.setState({
          maxDate: new Date(activityDates.maxDate),
          minDate: new Date(activityDates.minDate),
        });
      }
    }
  }

  GetGlobalRangeDates(){
    if(this.props.parameters.activity == "gloves"){
      let activityDates = JSON.parse(globeActivitiesController.getGlobalMaxMinActivityDates());
      if(activityDates.maxDate != undefined && activityDates.minDate != undefined){
        this.setState({
          maxDate: new Date(activityDates.maxDate),
          minDate: new Date(activityDates.minDate),
        });
      }
    }
    if(this.props.parameters.activity == "matrix"){
      let activityDates = JSON.parse(matrixActivitiesController.getGlobalMaxMinActivityDates());
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
		this.setState({
			filters: filters,
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
          filteredLevels: filteredLevels,
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
          filteredPeriods: filteredPeriods,
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
                    title: 'Cantidad de aciertos vs errores',
                    minValue: 0,
                  },
                  vAxis: {
                    title: '',
                    maxValue: this.props.maxValue + 1,
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
              										levels={levels} key={levels._id}
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
              										periods={periods} key={periods._id}
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
