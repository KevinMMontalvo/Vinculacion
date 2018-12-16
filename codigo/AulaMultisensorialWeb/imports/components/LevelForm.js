import React, { Component } from 'react';
import DatePicker from 'react-date-picker';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';
import TechnicalHelp from '../map/TechnicalHelp';

export default class LevelForm extends React.Component
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
		var regex = /[a-zA-Z]|\1/;
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
				content={() => <div>{"Estudiante registrado"}</div>}
				title={this.state.successRegisteredMessage}
				icon={<div className="alert-success-icon"></div>}
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
			this.setState({
				emptyFields: false,
			}, () => this.AddStudent());
		}
	}

	AddTechnicalHelp()
	{
		let techHelpName = document.getElementById('technical-help-input').value;
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
		let names = document.getElementById('first-name-input').value + " " + document.getElementById('second-name-input').value;
		let surnames = document.getElementById('lastname-input').value + " " + document.getElementById('mothers-lastname-input').value;
		let level_id = document.getElementById('level-select').value;
		let diagnostic = document.getElementById('diagnostic-input').value;
		let birthdate = this.state.date;
		let gender = document.getElementById('gender-select').value;
		let condition = document.getElementById('condition-select').value;
		let technical_helps = this.state.techHelps;
		let percentage_of_disability = parseInt(document.getElementById('percentage-of-disability-input').value);
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
		studentsController.insertStudent(student);
		this.ClearAllFields();
		this.ShowSuccessMenssage();
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

	render()
	{
		return (<div>
				<div className="student-form">
					<div className="form-container">
						<p className="input-label">Temática</p>
						<div className="input-container">
							<input id="theme"
							       onKeyPress={() => this.ValidateOnlyLetters(event)} placeholder="Especialidad del docente"
							       className="horizontal-input"/>
						</div>
					</div>
					<div className="form-container">
						<p className="input-label">Rango de edades</p>
						<div id="vertical-input" className="student-input">
							<input id="min-age" onKeyPress={() => this.ValidateOnlyNumbers(event)}
							       placeholder="Edad mínima" className="vertical-input" maxLength="2"></input>
							<input id="max-age" onKeyPress={() => this.ValidateOnlyNumbers(event)}
							       placeholder="Edad máxima" className="vertical-input" maxLength="2"></input>
						</div>
					</div>
					<div className="button-container">
						<div onClick={() => this.CheckWarningMessages()} className="secondary-button">
							Completar Registro
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

/*
TODO
campo de nombres y apellidos no admite ñ y tildes--------later


BUG
cuando estas en el formulario de registro de estudiantes y se le da clic en alguna opcion del menu no carga nada.

 */