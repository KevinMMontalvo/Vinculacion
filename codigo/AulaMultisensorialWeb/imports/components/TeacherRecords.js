import React, { Component } from 'react';
import TeacherForm from '../components/TeacherForm';
import Registry from '../map/Registry';
import Filter, { Sort, FilterValue } from 'data-engine';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class TeachersRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          teacher: [],
          allTeachers: [],
          isDataLoaded: false,
          sortWay: 'des',
          sortAttribute: 'des',
          attributes: [
                        {
                          value: 'name',
                          text: 'Nombre completo'
                        },
                        {
                          value: 'level_id',
                          text: 'Nivel'
                        },
                        {
                          value: 'speciality',
                          text: 'Especialidad'
                        },
                      ],
        }
    }

    componentWillMount(){
      const { MongoClient, ObjectId } = require('mongodb');
      this.setState({
        teachers: this.LoadTeachers(),
        allTeachers: this.LoadTeachers(),
      }, () => this.CheckLoadedData());
    }

    componentDidMount(){
      this.LoadAttributesInSelect();
    }

    CheckLoadedData(){
      if(this.state.teachers.length > 0){
        this.setState({
          isDataLoaded: true
        });
      }
    }

    LoadTeachers() {
      var teachersString = teachersController.getTeachers();
      var teachers = JSON.parse(teachersString);
      return teachers;
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
      var teachersArray = this.state.teachers;
      sortJsonArray(teachersArray, attributeValue,this.state.sortWay);
      this.setState({
        teachers: teachersArray,
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
      var allTeachers = this.state.allTeachers;
      var searchResultArray = [];
      if(attributeValue == ""){
        for (var i = 0; i < allTeachers.length; i++) {
          for (var j = 0; j < this.state.attributes.length; j++) {
            if (allTeachers[i][this.state.attributes[j].value].toString().toUpperCase().includes(searchValue.toString().toUpperCase())) {
              searchResultArray.push(allTeachers[i]);
              break;
            }
          }
        }
      }
      else{
        for (var i = 0; i < this.state.teachers.length; i++) {
          if (allTeachers[i][attributeValue].toString().toUpperCase().includes(searchValue.toString().toUpperCase())) {
            searchResultArray.push(allTeachers[i]);
          }
        }
      }
      if(searchValue == ""){
        searchResultArray = allTeachers;
      }
      this.setState({
        teachers: searchResultArray,
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

    ShowModifyForm(teacher){
      this.props.ShowModifyForm();
      this.setState({
        teacherToModify: teacher,
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

    UpdateTable(){
      this.setState({
        teachers: this.LoadTeachers(),
        allTeachers: this.LoadTeachers(),
      })
    }

    render() {
        return(
            <div>
              {
                this.props.showModifyForm ?
                  <TeacherForm UpdateTable={this.UpdateTable.bind(this)} CloseModifyForm={() => this.CloseModifyForm()} teacherToModify={this.state.teacherToModify}/>
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
                        {this.state.teachers.map((teachers) =>
                          {
                            return <Registry
                                      show={"teachers"}
                                      ShowDeletedRegistry={() => this.ShowDeletedRegistry()}
                                      delete={this.props.delete}
                                      ShowModifyForm={this.ShowModifyForm.bind(this)}
                                      modify={this.props.modify}
                                      teachers={teachers}
                                      key={teachers._id}
                                      UpdateTable={this.UpdateTable.bind(this)}>

                                    </Registry>;
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
