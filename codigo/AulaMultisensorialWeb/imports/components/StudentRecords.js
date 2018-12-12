import React, { Component } from 'react';

import Registry from '../map/Registry';

export default class StudentsRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          students: [],
          isDataLoaded: false
        }
    }

    componentWillMount(){
      const { MongoClient, ObjectId } = require('mongodb');
      Tracker.autorun(() => {
        this.setState({
          students: this.LoadStudents(),
        }, () => this.CheckLoadedData())
      });
    }

    CheckLoadedData(){
      if(true){
        this.setState({
          isDataLoaded: true
        }, () => console.log(this.state.students))
      }
    }

    LoadStudents() {
      var students = JSON.parse('[{ "_id" : "5c10615ffb6fc04dd6eae4e1", "names" : "asd hjbjhb", "surnames" : "kjnkj nkj", "level_id" : "Masculino", "diagnostic" : "asd", "birthdate" : "1995-10-31T10:00:00Z", "gender" : "Masculino", "condition" : "Masculino", "technical_help" : [{ "name" : "asdfsfg", "_id" : 0 }, { "name" : "jrtjhtrh", "_id" : 1 }], "percentage_of_disability" : "0" }]');
      return students;
    }

    render() {
        return(
            <div>
              <div className="record-container">
                {
                  this.state.isDataLoaded ?
                  <div>
                    {this.state.students.map((students) =>
                      {
                        return <Registry students={students} key={students._id}></Registry>;
                      })
                    }
                  </div>
                  :
                  undefined
                }
              </div>
            </div>
        );
    }
}
