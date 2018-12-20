import React, { Component } from 'react';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class TeacherForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			options: [{
				value: 'Masculino',
				label: 'Masculino'
			}, {
				value: 'Femenino',
				label: 'Femenino'
			},],
			emptyInputMessage: "Existen campos vacios: ",
			successRegisteredMessage: "Registro completo",
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

	ShowWarningMenssage(field)
	{
		ButterToast.raise({
			content: <Cinnamon.Crisp
				scheme={Cinnamon.Crisp.SCHEME_GREY}
				content={() => <div>{field}</div>}
				title={this.state.emptyInputMessage}
				icon={<div className="alert-warning-icon"></div>}
			/>
		});
	}

	ShowSuccessMenssage()
	{
		ButterToast.raise({
			content: <Cinnamon.Crisp
				scheme={Cinnamon.Crisp.SCHEME_GREY}
				content={() => <div>{"Docente registrado"}</div>}
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

	ValidateEmptyInputs()
	{
		let firstName = document.getElementById('first-name-input').value;
		let lastName = document.getElementById('lastname-input').value;
		let level_id = document.getElementById('level-select').value;
		let speciality = document.getElementById('speciality-input').value;

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
		if (speciality == "")
		{
			validationArray.push("speciality");
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
			if (validationArray[i] == "level")
			{
				this.ShowWarningMenssage("Nivel");
			}
			if (validationArray[i] == "speciality")
			{
				this.ShowWarningMenssage("Especialidad");
			}
		}
		if (validationArray.length == 0)
		{
			if(this.props.teacherToModify == undefined){
				this.setState({
					emptyFields: false,
				}, () => this.AddTeacher());
			}
			else {
				this.setState({
					emptyFields: false,
				}, () => this.ModifyTeacher());
			}
		}
	}

	AddTeacher()
	{
		let names = document.getElementById('first-name-input').value + " " + document.getElementById('second-name-input').value;
		let surnames = document.getElementById('lastname-input').value + " " + document.getElementById('mothers-lastname-input').value;
		let level_id = document.getElementById('level-select').value;
		let speciality = document.getElementById('speciality-input').value;
		let teacher = {
			name: names + " " + surnames,
			level_id: level_id,
			speciality: speciality,
		};
		teachersController.insertTeacher(teacher);
		this.ClearAllFields();
		this.ShowSuccessMenssage();
	}

	ClearAllFields(){
		document.getElementById('first-name-input').value = "";
		document.getElementById('second-name-input').value = "";
		document.getElementById('lastname-input').value = "";
		document.getElementById('mothers-lastname-input').value = "";
		document.getElementById('level-select').value = "";
		document.getElementById('speciality-input').value = "";
	}

	componentDidMount(){
		if(this.props.teacherToModify != undefined){
			var names = this.props.teacherToModify.name.split(" ");
			document.getElementById('first-name-input').value = names[0];
			document.getElementById('second-name-input').value = names[1];
			document.getElementById('lastname-input').value = names[0];
			document.getElementById('mothers-lastname-input').value = names[1];
			document.getElementById('level-select').value = this.props.teacherToModify.level_id;
			document.getElementById('speciality-input').value = this.props.teacherToModify.speciality;
		}
		this.LoadLevelsInSelect();
	}

	CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	ModifyTeacher(){
		let names = this.CapitalizeFirstLetter(document.getElementById('first-name-input').value.toString()) + " " + this.CapitalizeFirstLetter(document.getElementById('second-name-input').value.toString());
		let surnames = this.CapitalizeFirstLetter(document.getElementById('lastname-input').value.toString()) + " " + this.CapitalizeFirstLetter(document.getElementById('mothers-lastname-input').value.toString());
		let level_id = document.getElementById('level-select').value;
		let speciality = this.CapitalizeFirstLetter(document.getElementById('speciality-input').value.toString());
		let teacher = {
			_id: this.props.teacherToModify._id,
			name: names + " " + surnames,
			level_id: level_id,
			speciality: speciality,
		};
		teachersController.modifyTeacher(teacher);
		this.ClearAllFields();
		this.ShowModifySuccessMenssage();
		this.props.CloseModifyForm();
		this.props.UpdateTable();
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
		return (<div>
				<div className="student-form">
					<div className="form-container">
						<p className="input-label">Nombre del docente</p>
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
						<p className="input-label">Nivel</p>
						<div className="input-container">
							<select id="level-select">
								<option value="" selected disabled hidden>Selecione el nivel del docente</option>
							</select>
						</div>
					</div>
					<div className="form-container">
						<p className="input-label">Especialidad</p>
						<div className="input-container">
							<input id="speciality-input"
							       onKeyPress={() => this.ValidateOnlyLetters(event)} placeholder="Especialidad del docente"
							       className="horizontal-input"/>
						</div>
					</div>
					<div className="button-container">
						<div onClick={() => this.CheckWarningMessages()} className="secondary-button">
							{
								this.props.teacherToModify != undefined ?
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
				/>
			</div>);
	}
}
