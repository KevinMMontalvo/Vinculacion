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
			canNotCompleteTheActionMenssage: "No se pudo completar la acción",
			successModifiedMessage: "Cambios realizados",
			emptyFields: true,
			startDate: new Date(),
			locate: "es-MX",
		};
	}

	onChange = startDate => this.setState({ startDate });
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
		this.tray.raise({
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
		this.tray.raise({
			content: <Cinnamon.Crisp
				className="butter-alert"
				scheme={Cinnamon.Slim.SCHEME_DARK}
				content={() => <div>{"Periodo registrado"}</div>}
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

	dismissAll = () => {
			this.tray.dismissAll();
	}

	ValidateEmptyInputs()
	{
		let name = document.getElementById('name-input').value;
		let validationArray = new Array();
		if (name == "")
		{
			validationArray.push("name");
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
				this.ShowWarningMenssage("Nombre del periodo");
			}
		}
		if (validationArray.length == 0)
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
		let startDate = this.state.startDate;
		let period = {
			name: name,
			start_date: startDate,
			is_visible: false,
		};
		if(periodsController.insertPeriod(period)){
			this.ClearAllFields();
			this.ShowSuccessMenssage();
		}
		else{
			this.CanNotCompleteTheActionMenssage();
		}
	}

	ClearAllFields(){
		document.getElementById('name-input').value = "";
		this.setState({
			startDate: new Date(),
		});
	}

	componentDidMount(){
		if(this.props.periodToModify != undefined){
			document.getElementById('name-input').value = this.props.periodToModify.name;
		}
	}

	CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	ModifyPeriod(){
		console.log(this.props.periodToModify.is_visible);
		let name = document.getElementById('name-input').value;
		let startDate = this.state.startDate;
		let period = {
			_id: this.props.periodToModify._id,
			name: name,
			start_date: startDate,
			is_visible: this.props.periodToModify.is_visible,
		};
		periodsController.modifyPeriod(period);
		this.ClearAllFields();
		this.ShowModifySuccessMenssage();
		this.props.CloseModifyForm();
		this.props.UpdateTable();
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
								value={this.state.startDate}
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
