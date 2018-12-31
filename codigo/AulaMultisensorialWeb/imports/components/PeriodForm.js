import React, { Component } from 'react';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';
import DatePicker from 'react-date-picker';

export default class PeriodForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			emptyInputMessage: "Existen campos vacios: ",
			successRegisteredMessage: "Registro completo",
			emptyFields: true,
			date: new Date(),
			locate: "es-MX",
		};
	}

	onChange = date => this.setState({ date });
	lang = "es-MX";

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
				className="butter-alert"
				scheme={Cinnamon.Slim.SCHEME_DARK}
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
				className="butter-alert"
				scheme={Cinnamon.Slim.SCHEME_DARK}
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

	dismissAll = () => {
			this.tray.dismissAll();
	}

	ValidateEmptyInputs()
	{
		let name = document.getElementById('name-input').value;
		let level_id = document.getElementById('level-select').value;
		let speciality = document.getElementById('speciality-input').value;
		let password = document.getElementById('password-input').value;

		let validationArray = new Array();
		if (name == "")
		{
			validationArray.push("name");
		}
		if (level_id == "")
		{
			validationArray.push("level");
		}
		if (speciality == "")
		{
			validationArray.push("speciality");
		}
		if (password == "")
		{
			validationArray.push("password");
		}
		return validationArray;
	}

	CheckWarningMessages()
	{
		let validationArray = this.ValidateEmptyInputs();
		for (var i = 0; i < validationArray.length; i++)
		{
			if (validationArray[i] == "name")
			{
				this.ShowWarningMenssage("Nombre y apellido");
			}
			if (validationArray[i] == "level")
			{
				this.ShowWarningMenssage("Nivel");
			}
			if (validationArray[i] == "speciality")
			{
				this.ShowWarningMenssage("Especialidad");
			}
			if (validationArray[i] == "password")
			{
				this.ShowWarningMenssage("Contraseña");
			}
		}
		if(!this.state.isTheSamePassword) {
			this.ShowPasswordNotMatchMenssage();
		}
		if (validationArray.length == 0 && this.state.isTheSamePassword)
		{
			if(this.props.periodToModify == undefined){
				this.setState({
					emptyFields: false,
				}, () => this.AddPeriod());
			}
			else {
				this.setState({
					emptyFields: false,
				}, () => this.ModifyPeriod());
			}
		}
	}

	AddPeriod()
	{
		let name = document.getElementById('name-input').value;
		let level_id = document.getElementById('level-select').value;
		let speciality = document.getElementById('speciality-input').value;
		let password = document.getElementById('password-input').value;
		let period = {
			name: name,
			level_id: level_id,
			speciality: speciality,
			password: password
		};
		periodsController.insertPeriod(period);
		this.ClearAllFields();
		this.ShowSuccessMenssage();
	}

	ClearAllFields(){
		document.getElementById('name-input').value = "";
		document.getElementById('level-select').value = "";
		document.getElementById('speciality-input').value = "";
		document.getElementById('password-input').value = "";
		document.getElementById('password-confirmation-input').value = "";
		document.getElementById('password-confirmation-input').style.borderColor = "#333";
	}

	componentDidMount(){
		if(this.props.periodToModify != undefined){
			document.getElementById('name-input').value = this.props.periodToModify.name;
			document.getElementById('level-select').value = this.props.periodToModify.level_id;
			document.getElementById('speciality-input').value = this.props.periodToModify.speciality;
		}
	}

	CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	ModifyPeriod(){
		let name = document.getElementById('name-input').value;
		let level_id = document.getElementById('level-select').value;
		let speciality = this.CapitalizeFirstLetter(document.getElementById('speciality-input').value.toString());
		let period = {
			_id: this.props.periodToModify._id,
			name: name,
			level_id: level_id,
			speciality: speciality,
		};
		periodsController.modifyPeriod(period);
		this.ClearAllFields();
		this.ShowModifySuccessMenssage();
		this.props.CloseModifyForm();
		this.props.UpdateTable();
	}

	VerifySamePassword(){
		let password = document.getElementById('password-input').value;
		let passwordToVerify = document.getElementById('password-confirmation-input').value;
		if(passwordToVerify != "" && password != ""){
			if (password == passwordToVerify) {
				document.getElementById('password-confirmation-input').style.borderColor = "#2BBEA2";
				this.ShowSamePasswordMenssage();
				this.setState({
					isTheSamePassword: true,
				});
			}
			else {
				document.getElementById('password-confirmation-input').style.borderColor = "#CD6155";
				this.ShowNotTheSamePasswordMenssage();
				this.setState({
					isTheSamePassword: false,
				});
			}
		}
	}

	render()
	{
		return (<div>
				<div className="student-form">
					<div className="form-container">
						<p className="input-label">Nombre del periodo</p>
						<div className="form-container">
							<p className="input-label">Nombre</p>
							<div className="input-container">
								<input id="name-input"
								       onKeyPress={() => this.ValidateOnlyLetters(event)} placeholder="Nombre del periodo"
								       className="horizontal-input"/>
							</div>
						</div>
					</div>
					<div className="form-container">
						<p className="input-label">Fecha de inicio</p>
						<div className="date-input-container">
							<DatePicker
								onChange={this.onChange}
								value={this.state.date}
								locate={this.lang}
							/>
						</div>
					</div>
					<div className="button-container">
						<div onClick={() => this.CheckWarningMessages()} className="secondary-button">
							{
								this.props.periodToModify != undefined ?
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
			</div>);
	}
}
