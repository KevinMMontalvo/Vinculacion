import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';
import TechnicalHelp from '../map/TechnicalHelp';

export default class StudentForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			date: new Date(),
			locate: "es-MX",
			options: [{
				value: 'Masculino',
				label: 'Masculino'
			}, {
				value: 'Femenino',
				label: 'Femenino'
			},],
			emptyInputMessage: "Existen campos vacios: ",
			successRegisteredMessage: "Registro completo",
			successModifiedMessage: "Cambios realizados",
			canNotCompleteTheActionMenssage: "No se pudo completar la acción",
			techHelps: [],
			emptyFields: true,
		};
	}

	ValidateOnlyNumbers(evt)
	{
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

	ValidateOnlyLetters(evt)
	{
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
		var regex = /^[a-zA-ZñÑ\s\W]/;
		if (!regex.test(key))
		{
			theEvent.returnValue = false;
			if (theEvent.preventDefault)
			{
				theEvent.preventDefault();
			}
		}
	}

	onChange = date => this.setState({ date });
	lang = "es-MX";

	ShowWarningMenssage(field)
	{
		this.tray.raise({
			content: <Cinnamon.Crisp
				className="butter-alert"
				scheme={Cinnamon.Slim.SCHEME_BLUE}
				content={() => <div>{field}</div>}
				title={this.state.emptyInputMessage}
				icon={<div className="alert-warning-icon"></div>}
			/>
		});
	}

	ShowAddSuccessMenssage()
	{
		this.tray.raise({
			content: <Cinnamon.Crisp
				className="butter-alert"
				scheme={Cinnamon.Slim.SCHEME_DARK}
				content={() => <div>{"Estudiante registrado"}</div>}
				title={this.state.successRegisteredMessage}
				icon={<div className="alert-success-icon"></div>}
			/>
		});
	}

	ShowModifySuccessMenssage()
	{
		ButterToast.raise({
			content: <Cinnamon.Crisp
				className="butter-alert"
				scheme={Cinnamon.Slim.SCHEME_DARK}
				content={() => <div>{"Registro modificado"}</div>}
				title={this.state.successModifiedMessage}
				icon={<div className="alert-success-icon"></div>}
			/>
		});
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

	ValidateEmptyInputs()
	{
		let firstName = document.getElementById('first-name-input').value;
		let lastName = document.getElementById('lastname-input').value;
		let level_id = document.getElementById('level-select').value;
		let gender = document.getElementById('gender-select').value;
		let condition = document.getElementById('condition-select').value;

		let validationArray = new Array();
		if (firstName == "")
		{
			validationArray.push("firstName");
		}
		if (lastName == "")
		{
			validationArray.push("lastName");
		}
		if (level_id == "")
		{
			validationArray.push("level");
		}
		if (gender == "")
		{
			validationArray.push("gender");
		}
		if (condition == "")
		{
			validationArray.push("condition");
		}
		return validationArray;
	}

	CheckWarningMessages()
	{
		let validationArray = this.ValidateEmptyInputs();
		for (var i = 0; i < validationArray.length; i++)
		{
			if (validationArray[i] == "firstName")
			{
				this.ShowWarningMenssage("Primer nombre");
			}
			if (validationArray[i] == "lastName")
			{
				this.ShowWarningMenssage("Apellido paterno");
			}
			if (validationArray[i] == "condition")
			{
				this.ShowWarningMenssage("Condición");
			}
			if (validationArray[i] == "gender")
			{
				this.ShowWarningMenssage("Género");
			}
			if (validationArray[i] == "level")
			{
				this.ShowWarningMenssage("Nivel");
			}
		}
		if (validationArray.length == 0)
		{
			if(this.props.studentToModify == undefined){
				this.setState({
					emptyFields: false,
				}, () => this.AddStudent());
			}
			else{
				this.setState({
					emptyFields: false,
				}, () => this.ModifyStudent());
			}
		}
	}

	AddTechnicalHelp()
	{
		let techHelpName = this.CapitalizeFirstLetter(document.getElementById('technical-help-input').value.toString());
		if (techHelpName == "")
		{
			this.ShowWarningMenssage("Ayuda técnica");
		}
		else
		{
			let techHelpArray = this.state.techHelps;
			let techHelpJSON = {};
			techHelpJSON.name = techHelpName;
			techHelpJSON._id = techHelpArray.length;
			techHelpArray.push(techHelpJSON);
			this.setState({
				techHelps: techHelpArray,
			});
			document.getElementById('technical-help-input').value = "";
		}
	}

	RemoveTechnicalHelp(index)
	{
		let techHelpArray = this.state.techHelps;
		techHelpArray.splice(index, 1);
		for (var i = index; i < techHelpArray.length; i++)
		{
			techHelpArray[i]._id--;
		}
		this.setState({
			techHelps: techHelpArray,
		});
	}

	AddStudent()
	{
		let names = this.CapitalizeFirstLetter(document.getElementById('first-name-input').value.toString()) + " " + this.CapitalizeFirstLetter(document.getElementById('second-name-input').value.toString());
		let surnames = this.CapitalizeFirstLetter(document.getElementById('lastname-input').value.toString()) + " " + this.CapitalizeFirstLetter(document.getElementById('mothers-lastname-input').value.toString());
		let level_id = document.getElementById('level-select').value;
		let diagnostic = this.CapitalizeFirstLetter(document.getElementById('diagnostic-input').value.toString());
		let birthdate = this.state.date;
		let gender = document.getElementById('gender-select').value;
		let condition = document.getElementById('condition-select').value;
		let technical_helps = this.state.techHelps;
		let percentage_of_disability = document.getElementById('percentage-of-disability-input').value;
		if (percentage_of_disability == ""){
			percentage_of_disability = 0;
		}
		else {
			percentage_of_disability = parseInt(percentage_of_disability);
		}
		if(technical_helps == ""){
			technical_helps = new Array();
		}
		let student = {
			names: names,
			surnames: surnames,
			level_id: level_id,
			diagnostic: diagnostic,
			birthdate: birthdate,
			gender: gender,
			condition: condition,
			technical_helps: technical_helps,
			percentage_of_disability: percentage_of_disability,
		};
		if(studentsController.insertStudent(student)){
			this.ClearAllFields();
			this.ShowAddSuccessMenssage();
		}
		else {
			this.CanNotCompleteTheActionMenssage();
		}
	}

	ModifyStudent(){
		let names = this.CapitalizeFirstLetter(document.getElementById('first-name-input').value.toString()) + " " + this.CapitalizeFirstLetter(document.getElementById('second-name-input').value.toString());
		let surnames = this.CapitalizeFirstLetter(document.getElementById('lastname-input').value.toString()) + " " + this.CapitalizeFirstLetter(document.getElementById('mothers-lastname-input').value.toString());
		let level_id = document.getElementById('level-select').value;
		let diagnostic = this.CapitalizeFirstLetter(document.getElementById('diagnostic-input').value.toString());
		let birthdate = this.state.date;
		let gender = document.getElementById('gender-select').value;
		let condition = document.getElementById('condition-select').value;
		let technical_helps = this.state.techHelps;
		let percentage_of_disability = document.getElementById('percentage-of-disability-input').value;
		if (percentage_of_disability == ""){
			percentage_of_disability = 0;
		}
		else {
			percentage_of_disability = parseInt(percentage_of_disability);
		}
		if(technical_helps == ""){
			technical_helps = new Array();
		}
		let student = {
			_id: this.props.studentToModify._id,
			names: names,
			surnames: surnames,
			level_id: level_id,
			diagnostic: diagnostic,
			birthdate: birthdate,
			gender: gender,
			condition: condition,
			technical_helps: technical_helps,
			percentage_of_disability: percentage_of_disability,
		};
		if(studentsController.modifyStudent(student)){
			this.ClearAllFields();
			this.ShowModifySuccessMenssage();
			this.props.CloseModifyForm();
			this.props.UpdateTable();
		}
		else {
			this.CanNotCompleteTheActionMenssage();
		}
	}


	ClearAllFields(){
		document.getElementById('first-name-input').value = "";
		document.getElementById('second-name-input').value = "";
		document.getElementById('lastname-input').value = "";
		document.getElementById('mothers-lastname-input').value = "";
		document.getElementById('level-select').value = "";
		document.getElementById('diagnostic-input').value = "";
		document.getElementById('gender-select').value = "";
		document.getElementById('condition-select').value = "";
		document.getElementById('percentage-of-disability-input').value = "";
		this.setState({
			birthdate: new Date(),
			techHelps: [],
		});
	}

	CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	componentDidMount(){
		if(this.props.studentToModify != undefined){
			var names = this.props.studentToModify.names.split(" ");
			document.getElementById('first-name-input').value = names[0];
			document.getElementById('second-name-input').value = names[1];
			var surnames = this.props.studentToModify.surnames.split(" ");
			document.getElementById('lastname-input').value = surnames[0];
			document.getElementById('mothers-lastname-input').value = surnames[1];
			document.getElementById('level-select').value = this.props.studentToModify.level_id;
			document.getElementById('diagnostic-input').value = this.props.studentToModify.diagnostic;
			document.getElementById('gender-select').value = this.props.studentToModify.gender;
			document.getElementById('condition-select').value = this.props.studentToModify.condition;
			document.getElementById('percentage-of-disability-input').value = this.props.studentToModify.percentage_of_disability;
			this.setState({
				techHelps: this.props.studentToModify.technical_helps,
			});
		}
		this.LoadLevelsInSelect();
	}

	LoadLevels() {
		var levelsString = levelsController.getLevels();
		var levels = JSON.parse(levelsString);
		return levels;
	}

	LoadLevelsInSelect(){
		this.setState({
			levels: this.LoadLevels(),
		},() => {
			var levelSelect = document.getElementById('level-select');
			for (var i = 0; i < this.state.levels.length; i++) {
				var option = document.createElement("option");
				option.text = this.state.levels[i].name;
				option.value = this.state.levels[i]._id;
				levelSelect.add(option);
			}
		});
	}

	render()
	{
		return (
			<div>
				<div className="student-form">
					<div className="form-container">
						<p className="input-label">Nombre del estudiante</p>
						<div id="vertical-input" className="student-input">
							<input id="first-name-input" onKeyPress={() => this.ValidateOnlyLetters(event)}
							placeholder="Primer nombre" className="vertical-input"></input>
							<input id="second-name-input" onKeyPress={() => this.ValidateOnlyLetters(event)}
							placeholder="Segundo nombre" className="vertical-input"></input>
							<input id="lastname-input" onKeyPress={() => this.ValidateOnlyLetters(event)}
							placeholder="Apellido paterno" className="vertical-input"></input>
							<input id="mothers-lastname-input" onKeyPress={() => this.ValidateOnlyLetters(event)}
							placeholder="Apellido materno" className="vertical-input"></input>
						</div>
					</div>
					<div className="form-container">
						<p className="input-label">Género</p>
						<div className="input-container">
							<select id="gender-select">
								<option value="" selected disabled hidden>Selecione el género del estudiante</option>
								<option value="Masculino">Masculino</option>
								<option value="Femenino">Femenino</option>
							</select>
						</div>
					</div>
					<div className="form-container">
						<p className="input-label">Fecha de nacimiento</p>
						<div className="date-input-container">
							<DatePicker
								onChange={this.onChange}
								value={this.state.date}
								locate={this.lang}
							/>
						</div>
					</div>
					<div className="form-container">
						<p className="input-label">Diagnóstico</p>
						<div className="input-container">
							<textarea id="diagnostic-input" placeholder="Observaciones sobre el estudiante"></textarea>
						</div>
					</div>
					<div className="form-container">
						<p className="input-label">Condición</p>
						<div className="input-container">
							<select id="condition-select">
								<option value="" selected disabled hidden>Selecione la condición del estudiante</option>
								<option value="Cívil">Civíl</option>
								<option value="Militar">Militar</option>
							</select>
						</div>
					</div>
					<div className="form-container">
						<p className="input-label">Nivel</p>
						<div className="input-container">
							<select id="level-select">
								<option value="" selected disabled hidden>Selecione el nivel del estudiante</option>
							</select>
						</div>
					</div>
					<div className="form-container">
						<p className="input-label">Porcentaje de discapacidad</p>
						<div className="input-container">
							<input id="percentage-of-disability-input" maxLength="2"
								onKeyPress={() => this.ValidateOnlyNumbers(event)} placeholder="%"
							className="horizontal-input"/>
						</div>
					</div>
					<div className="form-container">
						<p className="input-label">Ayudas técnicas</p>
						<div className="tech-help-input-container">
							<input id="technical-help-input" placeholder="Tipo de ayuda"
							className="vertical-input"></input>
							<div onClick={() => this.AddTechnicalHelp()} className="add-tech-help-button"></div>
							<div className="added-tech-help-container">
								<div className="tech-helps-title">Ayudas técnicas del estudiante</div>
								{this.state.techHelps.map((techHelps) =>
									{
										return <TechnicalHelp remove={true}
											RemoveTechnicalHelp={this.RemoveTechnicalHelp.bind(this)}
											techHelps={techHelps} key={techHelps._id}></TechnicalHelp>;
									})}
							</div>
						</div>
					</div>
					<div className="button-container">
						<div onClick={() => this.CheckWarningMessages()} className="secondary-button">
							{
								this.props.studentToModify != undefined ?
									<div>Modificar Registro</div>
								:
								<div>Completar Registro</div>
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
