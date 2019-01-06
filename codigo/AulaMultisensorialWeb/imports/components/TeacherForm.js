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
			canNotCompleteTheActionMenssage: "No se pudo completar la acción",
			successModifiedMessage: "Cambios realizados",
			emptyFields: true,
			isTheSamePassword: false,
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

	ShowSamePasswordMenssage()
	{
		this.tray.raise({
			content: <Cinnamon.Crisp
				className="butter-alert"
				scheme={Cinnamon.Slim.SCHEME_DARK}
				content={() => <div>{"Contraseña correcta"}</div>}
				title={"Las contraseñas coinciden"}
				icon={<div className="alert-success-icon"></div>}
			/>
		});
		this.dismissAll();
	}

	ShowNotTheSamePasswordMenssage()
	{
		this.tray.raise({
			content: <Cinnamon.Crisp
				className="butter-alert"
				scheme={Cinnamon.Slim.SCHEME_DARK}
				content={() => <div>{"Contraseña incorrecta"}</div>}
				title={"Las contraseñas no coinciden"}
				icon={<div className="alert-warning-icon"></div>}
			/>
		});
		this.dismissAll();
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

	ShowPasswordNotMatchMenssage()
	{
		this.tray.raise({
			content: <Cinnamon.Crisp
				className="butter-alert"
				scheme={Cinnamon.Slim.SCHEME_DARK}
				content={() => <div>{"Debe confirmar su contraseña para poder continuar"}</div>}
				title={"Las contraseñas no coinciden"}
				icon={<div className="alert-warning-icon"></div>}
			/>
		});
		this.dismissAll();
	}

	dismissAll = () => {
			this.tray.dismissAll();
	}

	ValidateEmptyInputs()
	{
		let name = document.getElementById('name-input').value;
		let level_id = document.getElementById('level-select').value;
		let speciality = document.getElementById('speciality-input').value;
		if(this.props.teacherToModify == undefined){
			let password = document.getElementById('password-input').value;
			if (password == "")
			{
				validationArray.push("password");
			}
		}
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
			if(this.props.teacherToModify == undefined){
				if (validationArray[i] == "password")
				{
					this.ShowWarningMenssage("Contraseña");
				}
			}
		}
		if(!this.state.isTheSamePassword) {
			this.ShowPasswordNotMatchMenssage();
		}
		if (validationArray.length == 0 && this.state.isTheSamePassword)
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
		let name = document.getElementById('name-input').value;
		let level_id = document.getElementById('level-select').value;
		let speciality = document.getElementById('speciality-input').value;
		let password = document.getElementById('password-input').value;
		let teacher = {
			name: name,
			level_id: level_id,
			speciality: speciality,
			password: password
		};
		if(teachersController.insertTeacher(teacher)){
			this.ClearAllFields();
			this.ShowSuccessMenssage();
		}
		else{
			this.CanNotCompleteTheActionMenssage();
		}
	}

	ClearAllFields(){
		document.getElementById('name-input').value = "";
		document.getElementById('level-select').value = "";
		document.getElementById('speciality-input').value = "";
		if(this.props.teacherToModify == undefined){
			document.getElementById('password-input').value = "";
			document.getElementById('password-confirmation-input').value = "";
			document.getElementById('password-confirmation-input').style.borderColor = "#333";
		}
	}

	componentDidMount(){
		if(this.props.teacherToModify != undefined){
			document.getElementById('name-input').value = this.props.teacherToModify.name;
			document.getElementById('level-select').value = this.props.teacherToModify.level_id;
			document.getElementById('speciality-input').value = this.props.teacherToModify.speciality;
			this.setState({
				isTheSamePassword: true,
			})
		}
		this.LoadLevelsInSelect();
	}

	CapitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

	ModifyTeacher(){
		let name = document.getElementById('name-input').value;
		let level_id = document.getElementById('level-select').value;
		let speciality = this.CapitalizeFirstLetter(document.getElementById('speciality-input').value.toString());
		let teacher = {
			_id: this.props.teacherToModify._id,
			name: name,
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
						<p className="input-label">Nombre del docente</p>
						<div className="form-container">
							<p className="input-label">Nombre</p>
							<div className="input-container">
								<input id="name-input"
								       onKeyPress={() => this.ValidateOnlyLetters(event)} placeholder="Nombre y apellido del docente"
								       className="horizontal-input"/>
							</div>
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
					{
						this.props.teacherToModify == undefined ?
						<div>
							<div className="form-container">
								<p className="input-label">Información de la cuenta</p>
								<div className="input-container">
									<input onBlur={() => this.VerifySamePassword()} id="password-input"
									       placeholder="Contraseña"
									       className="horizontal-input"
											 	 type="password"/>
								</div>
								<div className="input-container">
									<input onKeyDown={() => this.VerifySamePassword()} onKeyUp={() => this.VerifySamePassword()} onKeyPress={() => this.VerifySamePassword()} id="password-confirmation-input"
									       placeholder="Confirmar contraseña"
									       className="horizontal-input"
											 	 type="password"/>
								</div>
							</div>
						</div>
						:
						undefined
					}
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
					ref={tray => this.tray = tray}
				/>
			</div>);
	}
}
