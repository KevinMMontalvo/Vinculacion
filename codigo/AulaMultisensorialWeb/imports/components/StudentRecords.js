import React, { Component } from 'react';

import Registry from '../map/Registry';
import Filter, { Sort, FilterValue } from 'data-engine';

export default class StudentsRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          students: [],
          allStudents: [],
          isDataLoaded: false,
          sortWay: 'des',
          attributes: [
                        {
                          value: 'names',
                          text: 'Primer nombre'
                        },
                        {
                          value: 'surnames',
                          text: 'Apellido paterno'
                        },
                        {
                          value: 'birthdate',
                          text: 'Fecha de nacimiento / Edad'
                        },
                        {
                          value: 'condition',
                          text: 'Condicion'
                        },
                        {
                          value: 'level_id',
                          text: 'Nivel'
                        },
                        {
                          value: 'gender',
                          text: 'Género'
                        },
                        {
                          value: 'percentage_of_disability',
                          text: 'Procentaje de discapacidad'
                        }
                      ]
        }
    }

    componentWillMount(){
      const { MongoClient, ObjectId } = require('mongodb');
      this.setState({
        students: this.LoadStudents(),
      }, () => this.CheckLoadedData());
    }

    componentDidMount(){
      this.LoadAttributesInSelect();
    }

    CheckLoadedData(){
      if(this.state.students.length > 0){
        this.setState({
          isDataLoaded: true
        });
      }
    }

    LoadStudents() {
      var studentsString = studentsController.getStudents();
      var students = JSON.parse(studentsString);
      return students;
    }

    LoadAttributesInSelect(){
      var sortSelect = document.getElementById('sort-select');
      for (var i = 0; i < this.state.attributes.length; i++) {
        var option = document.createElement("option");
        option.text = this.state.attributes[i].text;
        option.value = this.state.attributes[i].value;
        sortSelect.add(option);
      }
    }

    SortData(){
      var attributeValue = document.getElementById('sort-select').value;
      var sortJsonArray = require('sort-json-array');
      var studentsArray = this.state.students;
      sortJsonArray(studentsArray, attributeValue,this.state.sortWay);
      this.setState({
        students: studentsArray,
      })
    }

    ChangeSortWay(){
      if(this.state.sortWay == "asc"){
        this.setState({
          sortWay: 'des'
        }, () => this.SortData());
        document.getElementById('sort-acendent').style.transform = "rotate(0deg)";
      }
      if(this.state.sortWay == "des"){
        this.setState({
          sortWay: 'asc'
        }, () => this.SortData());
        document.getElementById('sort-acendent').style.transform = "rotate(180deg)";
      }
    }

    SearchData(){
      var Filter = require('data-filter');
      const filter = new Filter(this.state.students);
      var name = document.getElementById('sort-select').value;
      var value = document.getElementById('search-input').value;
      console.log(name);
      console.log(value);
      const filtered = filter.addFilter(name, value, 'string');
      console.log(filtered);
    }

    render() {
        return(
            <div>
              <div className="record-tools">
                <div className="tool-input-container">
                  <input id="search-input" placeholder="Buscar estudiante..." className="search-input"></input>
                  <div onClick={() => this.SearchData()} className="search-icon"></div>
                </div>
                <div className="tool-input-container">
                  <div onClick={() => this.ChangeSortWay()} id="sort-acendent" className="sort-icon"></div>
                  <select onChange={() => this.SortData()} id="sort-select" className="sort-select">
                    <option value="" selected disabled hidden>Selecione el atributo para ordenar la información</option>
                  </select>
                </div>
              </div>
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
