import React, { Component } from 'react';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class LevelForm extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			emptyInputMessage: "Existen campos vacios: ",
			successRegisteredMessage: "Registro completo",
			successModifiedMessage: "Cambios realizados",
			canNotCompleteTheActionMenssage: "No se pudo completar la acción",
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
				content={() => <div>{"Nivel registrado"}</div>}
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
		ButterToast.raise({
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
		let levelName = document.getElementById('level-name-input').value;
		let maxAge = document.getElementById('max-age-input').value;
		let minAge = document.getElementById('min-age-input').value;

		let validationArray = new Array();
		if (levelName == "")
		{
			validationArray.push("levelName");
		}
		if (maxAge == "")
		{
			validationArray.push("maxAge");
		}
		if (minAge == "")
		{
			validationArray.push("minAge");
		}
		return validationArray;
	}

	CheckWarningMessages()
	{
		let validationArray = this.ValidateEmptyInputs();
		console.log(validationArray.length);
		for (var i = 0; i < validationArray.length; i++)
		{
			if (validationArray[i] == "levelName")
			{
				this.ShowWarningMenssage("Nombre del nivel");
			}
			if (validationArray[i] == "maxAge")
			{
				this.ShowWarningMenssage("Edad máxima");
			}
			if (validationArray[i] == "minAge")
			{
				this.ShowWarningMenssage("Edad mínima");
			}
		}
		if (validationArray.length == 0)
		{
			if(this.props.levelToModify == undefined){
				this.setState({
					emptyFields: false,
				}, () => this.AddLevel());
			}
			else {
				this.setState({
					emptyFields: false,
				}, () => this.ModifyLevel());
			}
		}
	}

	AddLevel()
	{
		let levelName = document.getElementById('level-name-input').value;
		let maxAge = parseInt(document.getElementById('max-age-input').value);
		let minAge = parseInt(document.getElementById('min-age-input').value);
		let level = {
			name: levelName,
			min_age: minAge,
			max_age: maxAge,
		};
		if(levelsController.insertLevel(level)){
			this.ClearAllFields();
			this.ShowSuccessMenssage();
		}
		else{
			this.CanNotCompleteTheActionMenssage();
		}
	}

	ClearAllFields(){
		let levelName = document.getElementById('level-name-input').value = "";
		let maxAge = document.getElementById('max-age-input').value = "";
		let minAge = document.getElementById('min-age-input').value = "";
	}

	componentDidMount(){
		if(this.props.levelToModify != undefined){
			document.getElementById('level-name-input').value = this.props.levelToModify.name;
			document.getElementById('max-age-input').value = this.props.levelToModify.max_age;
			document.getElementById('min-age-input').value = this.props.levelToModify.min_age;
		}
	}

	ModifyLevel(){
		let levelName = document.getElementById('level-name-input').value;
		let maxAge = parseInt(document.getElementById('max-age-input').value);
		let minAge = parseInt(document.getElementById('min-age-input').value);
		let level = {
			_id: this.props.levelToModify._id,
			name: levelName,
			min_age: minAge,
			max_age: maxAge,
		};
		if(levelsController.modifyLevel(level)){
			this.ClearAllFields();
			this.ShowModifySuccessMenssage();
			this.props.CloseModifyForm();
			this.props.UpdateTable();
		}
		else{
			this.CanNotCompleteTheActionMenssage();
		}
	}

	render()
	{
		return (<div>
			<div className="student-form">
				<div className="form-container">
					<p className="input-label">Nombre</p>
					<div className="input-container">
						<input id="level-name-input"
							onKeyPress={() => this.ValidateOnlyLetters(event)}
							placeholder="Nombre del nivel"
						className="horizontal-input"/>
					</div>
				</div>
				<div className="form-container">
					<p className="input-label">Rango de edades</p>
					<div id="vertical-input" className="student-input">
						<input id="min-age-input" onKeyPress={() => this.ValidateOnlyNumbers(event)}
						placeholder="Edad mínima" className="vertical-input" maxLength="2"></input>
						<input id="max-age-input" onKeyPress={() => this.ValidateOnlyNumbers(event)}
						placeholder="Edad máxima" className="vertical-input" maxLength="2"></input>
					</div>
				</div>
				<div className="button-container">
					<div onClick={() => this.CheckWarningMessages()} className="secondary-button">
						{
							this.props.levelToModify != undefined ?
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
