import React, { Component } from 'react';
import UserMenu from '../components/UserMenu';

export default class SideMenu extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			openUserMenu: false,
		};
	}

	StudentOption()
	{
		this.props.StudentOption();
		this.props.MaximizeMenu();
	}

	TeacherOption()
	{
		this.props.TeacherOption();
		this.props.MaximizeMenu();
	}

	LevelOption()
	{
		this.props.LevelOption();
		this.props.MaximizeMenu();
	}

	PeriodOption()
	{
		this.props.PeriodOption();
		this.props.MaximizeMenu();
	}

	ActivitiesMenu()
	{
		/*Aca podes probar lo que queras*/
		this.props.ShowActivitiesMenu();
		//activitiesController.startMatrizActivity("Globe");
	}

	Logout()
	{
		this.props.Logout();
	}

	render()
	{
		return (<div>
				<div className="side-menu">
					{this.props.isLogged ? <div className="menu-options">
						<div onClick={() => this.StudentOption()} id="option1" className="menu-option">Estudiantes</div>
						<div onClick={() => this.TeacherOption()} id="option2" className="menu-option">Docentes</div>
						<div onClick={() => this.LevelOption()} id="option3" className="menu-option">Niveles</div>
						<div onClick={() => this.PeriodOption()} id="option4" className="menu-option">Periodos</div>
						<div onClick={() => this.ActivitiesMenu()} id="option5" className="menu-option">Actividades
						</div>
					</div> : <div className="menu-icon"></div>}
					<div className="menu-title">FUVIME</div>
					{this.props.user != undefined ? <div>
						<div className="user-info-container">
							<div className="user-icon-container"></div>
							<div className="username-container">{this.props.user.name}</div>
							<UserMenu userId={this.props.user._id} Logout={this.Logout.bind(this)}/>
						</div>
					</div> : undefined}
				</div>
			</div>);
	}
}

/*
TODO
campo de fecha no se limpia, consultar cambio de formato
 */
