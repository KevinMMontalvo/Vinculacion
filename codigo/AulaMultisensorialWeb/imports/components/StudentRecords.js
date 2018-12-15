import React, { Component } from 'react';

import Registry from '../map/Registry';

export default class StudentsRecords extends React.Component
{
	constructor(props)
	{
		super(props);
		this.state = {
			students: [],
			isDataLoaded: false
		};
	}

	componentWillMount()
	{
		const { MongoClient, ObjectId } = require('mongodb');

		this.setState({
			students: this.LoadStudents(),
		}, () => this.CheckLoadedData());

	}

	CheckLoadedData()
	{
		if (this.state.students.length > 0)
		{
			this.setState({
				isDataLoaded: true
			});
		}
	}

	LoadStudents()
	{
		var studentsString = studentsController.getStudents();
		var students = JSON.parse(studentsString);
		console.log(studentsString);
		return students;
	}

	render()
	{
		return (<div>
				<div className="record-container">
					{this.state.isDataLoaded ? <div>
						{this.state.students.map((students) =>
						{
							return <Registry students={students} key={students._id}></Registry>;
						})}
					</div> : undefined}
				</div>
			</div>);
	}
}
