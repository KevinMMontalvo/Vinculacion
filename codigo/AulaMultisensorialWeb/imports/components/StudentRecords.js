import React, { Component } from 'react';
import StudentForm from '../components/StudentForm';
import Registry from '../map/Registry';
import Filter, { Sort, FilterValue } from 'data-engine';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class StudentsRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          students: [],
          allStudents: [],
          isDataLoaded: false,
          sortWay: 'des',
          sortAttribute: 'des',
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
                      ],
        }
    }

    componentWillMount(){
      const { MongoClient, ObjectId } = require('mongodb');
      this.setState({
        students: this.LoadStudents(),
        allStudents: this.LoadStudents(),
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
      //var studentsString = studentsController.getStudents();
      var studentsString = '[{ "_id": { "$oid": "5c106a8c75c6cfe7a4adc8d1" }, "names": "Mateo Francisco", "surnames": "Mateo Aldaz", "level_id": "Masculino", "diagnostic": "discapacidad auditiva", "birthdate": { "$date": "1988-12-07T10:00:00.000Z" }, "gender": "Masculino", "condition": "Civil", "technical_helps": [ { "name": "jhgasd", "_id": 0 }, { "name": "kjabsd", "_id": 1 } ], "percentage_of_disability": 57 },{ "_id": { "$oid": "5c107c7e370512508047ad57" }, "names": "Kevin Marcelo", "surnames": "Montalvo Velasteguí", "level_id": "Masculino", "diagnostic": "adfsaf", "birthdate": { "$date": "2018-12-12T08:11:33.082Z" }, "gender": "Masculino", "condition": "Masculino", "technical_helps": [ { "name": "pokp", "_id": 0 } ], "percentage_of_disability": 55 },{ "_id": { "$oid": "5c12975575c6cfc7cc90b7b7" }, "names": "Pepito Juan", "surnames": "Perez ", "level_id": "Nivel-2", "diagnostic": "Nada que agregar", "birthdate": { "$date": "2007-12-13T10:00:00.000Z" }, "gender": "Masculino", "condition": "Cívil", "technical_helps": [ { "name": "Silla de ruedas", "_id": 0 } ], "percentage_of_disability": 22 },{ "_id": { "$oid": "5c16712075c6cf46ec886665" }, "names": "Prueba Capitialize", "surnames": "Tíldes Etcetc", "level_id": "Nivel-2", "diagnostic": "ÉóéñÑé ajvsdjas", "birthdate": { "$date": "2004-01-08T10:00:00.000Z" }, "gender": "Masculino", "condition": "Cívil", "technical_helps": [], "percentage_of_disability": 77 }]';
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
      var option = document.createElement("option");
      option.text = "Ningún atributo";
      option.value = "";
      sortSelect.add(option);
    }

    SortData(){
      var attributeValue = document.getElementById('sort-select').value;
      var sortJsonArray = require('sort-json-array');
      var studentsArray = this.state.students;
      sortJsonArray(studentsArray, attributeValue,this.state.sortWay);
      this.setState({
        students: studentsArray,
      });
      var searchValue = document.getElementById('search-input').value;
      if(searchValue != ""){
        this.SearchData();
      }
    }

    ChangeSortWay(){
      var attributeValue = document.getElementById('sort-select').value;
      if(attributeValue != ""){
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
        this.ShowSortWayMessage();
      }
    }

    SearchData(){
      var attributeValue = document.getElementById('sort-select').value;
      var searchValue = document.getElementById('search-input').value;
      var allStudents = this.state.allStudents;
      var searchResultArray = [];
      if(attributeValue == ""){
        for (var i = 0; i < allStudents.length; i++) {
          for (var j = 0; j < this.state.attributes.length; j++) {
            if (allStudents[i][this.state.attributes[j].value].toString().toUpperCase().includes(searchValue.toString().toUpperCase())) {
              searchResultArray.push(allStudents[i]);
              break;
            }
          }
        }
      }
      else{
        for (var i = 0; i < this.state.students.length; i++) {
          if (allStudents[i][attributeValue].toString().toUpperCase().includes(searchValue.toString().toUpperCase())) {
            searchResultArray.push(allStudents[i]);
          }
        }
      }
      if(searchValue == ""){
        searchResultArray = allStudents;
      }
      this.setState({
        students: searchResultArray,
      });
    }

    ShowSortWayMessage(){
      let way = "";
      if(this.state.sortWay == "asc"){
        way = "Descendente";
      }
      else {
        way = "Ascendente";
      }
  		ButterToast.raise({
  			content: <Cinnamon.Crisp
  				className="butter-alert"
  				scheme={Cinnamon.Slim.SCHEME_DARK}
  				content={() => <div>{way}</div>}
  				title={"Ordenamiento"}
  				icon={<div className="alert-info-icon"></div>}
  			/>
  		});
      this.dismissAll();
  	}

    dismissAll = () => {
        this.tray.dismissAll();
    }

    ShowModifyForm(student){
      this.props.ShowModifyForm();
      this.setState({
        studentToModify: student,
      });
    }

    ShowDeletedRegistry(){
  		ButterToast.raise({
  			content: <Cinnamon.Crisp
  				className="butter-alert"
  				scheme={Cinnamon.Slim.SCHEME_DARK}
  				content={() => <div>{"Eliminado"}</div>}
  				title={"Registro"}
  				icon={<div className="alert-info-icon"></div>}
  			/>
  		});
      this.dismissAll();
  	}

    CloseModifyForm(){
      this.props.CloseModifyForm();
    }

    render() {
        return(
            <div>
              {
                this.props.showModifyForm ?
                  <StudentForm CloseModifyForm={() => this.CloseModifyForm()} studentToModify={this.state.studentToModify}/>
                :
                <div>
                  <div className="record-tools">
                    <div className="tool-input-container">
                      <input onKeyPress={() => this.SearchData()} onKeyUp={() => this.SearchData()} onKeyDown={() => this.SearchData()} id="search-input" placeholder="Ingrese lo que esta buscando..." className="search-input"></input>
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
                            return <Registry ShowDeletedRegistry={() => this.ShowDeletedRegistry()} delete={this.props.delete} ShowModifyForm={this.ShowModifyForm.bind(this)} modify={this.props.modify} students={students} key={students._id}></Registry>;
                          })
                        }
                      </div>
                      :
                      undefined
                    }
                  </div>
                  <ButterToast
          					position={{
          						vertical: POS_TOP,
          						horizontal: POS_RIGHT
          					}}
          					timeout={3000}
                    ref={tray => this.tray = tray}
          				/>
                </div>
              }
            </div>
        );
    }
}
