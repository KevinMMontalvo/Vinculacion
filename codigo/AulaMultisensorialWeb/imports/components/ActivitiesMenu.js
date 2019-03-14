import React, { Component } from 'react';

export default class ActivitiesMenu extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {};
	}

	MinimizeMenu()
	{
		this.props.MinimizeMenu(true);
		if (!this.props.isMenuMinimized)
		{
			var container = document.getElementsByClassName('management-menu');
			var menu = document.getElementsByClassName('management-options');
			var options = document.getElementsByClassName('management-option');
			var icons = document.getElementsByClassName('management-icon');
			var texts = document.getElementsByClassName('management-text');
			icons[0].id = 'min-vizualize-icon';
			icons[1].id = 'min-add-icon';
			icons[2].id = 'min-modify-icon';
			icons[3].id = 'min-delete-icon';
			texts[0].id = 'min-vizualize-text';
			texts[1].id = 'min-add-text';
			texts[2].id = 'min-modify-text';
			texts[3].id = 'min-delete-text';
			container[0].className = 'min-management-menu';
			menu[0].className = 'min-management-options';
			for (var i = 0; i < 4; i++)
			{
				options[0].className = 'min-management-option';
				icons[0].className = 'min-management-icon';
				texts[0].className = 'min-management-text';
			}
		}
	}

	MatrixActivity()
	{

		//activitiesController.startActivity("Matrix", "5c1bbb3f75c6cf37a489efcb");

		console.log(recordsController.getStudentRecord("asdas"));
	}

	GlovesActivity()
	{
		activitiesController.startActivity("Globe", "5c1bbb3f75c6cf37a489efcb");
	}

	CardiacSensorActivity()
	{
		activitiesController.startActivity("CardiacSensor", "5c1bbb3f75c6cf37a489efcb");
	}

	ActivitiesReport()
	{
		this.props.ActivitiesReport();
	}

	EvaluationForms()
	{
		this.props.EvaluationForms();
	}

	render()
	{
		return (<div>
			<div className="activities-menu">
				<div className="activities-column">
					<div className="activity-row">
						<div className="activities-options">
							<div onClick={() => this.ActivitiesReport()}
								id="activity-report"
							className="activity-option">
								<div id="report-icon" className="report-icon"></div>
								<div className="report-text">Reporte de actividades</div>
							</div>
							<div onClick={() => this.EvaluationForms()}
								id="evaluation-forms"
							className="activity-option">
								<div id="evaluation-icon" className="report-icon"></div>
								<div className="report-text">Formularios de evaluación</div>
							</div>
						</div>
					</div>
					<div className="activity-row">
						<div className="activities-options">
							<div onClick={() => this.MatrixActivity()} id="matrix" className="activity-option">
								<div id="matrix-icon" className="activity-icon"></div>
								<div className="activity-text">Matriz</div>
							</div>
							<div onClick={() => this.GlovesActivity()} id="gloves" className="activity-option">
								<div id="gloves-icon" className="activity-icon"></div>
								<div className="activity-text">Guantes</div>
							</div>
							<div onClick={() => this.CardiacSensorActivity()} id="cardiac-sensor"
							     className="activity-option">
								<div id="cardiac-sensor-icon" className="activity-icon"></div>
								<div className="activity-text">Sensor cardíaco</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>);
	}
}
