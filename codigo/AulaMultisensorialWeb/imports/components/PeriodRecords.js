import React, { Component } from 'react';
import PeriodForm from '../components/PeriodForm';
import Registry from '../map/Registry';
import Filter, { Sort, FilterValue } from 'data-engine';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class PeriodRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          period: [],
          allPeriods: [],
          isDataLoaded: false,
          sortWay: 'des',
          sortAttribute: 'des',
          attributes: [
                        {
                          value: 'name',
                          text: 'Nombre del periodo'
                        },
                        {
                          value: 'start_date',
                          text: 'Fecha de inicio'
                        },
                      ],
        }
    }

    componentWillMount(){
      const { MongoClient, ObjectId } = require('mongodb');
      this.setState({
        periods: this.LoadPeriods(),
        allPeriods: this.LoadPeriods(),
      }, () => this.CheckLoadedData());
    }

    componentDidMount(){
      this.LoadAttributesInSelect();
    }

    CheckLoadedData(){
      if(this.state.periods.length > 0){
        this.setState({
          isDataLoaded: true
        });
      }
    }

    LoadPeriods() {
      var periodsString = periodsController.getPeriods();
      var periods = JSON.parse(periodsString);
      return periods;
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
      var periodsArray = this.state.periods;
      sortJsonArray(periodsArray, attributeValue,this.state.sortWay);
      this.setState({
        periods: periodsArray,
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
      var allPeriods = this.state.allPeriods;
      var searchResultArray = [];
      if(attributeValue == ""){
        for (var i = 0; i < allPeriods.length; i++) {
          for (var j = 0; j < this.state.attributes.length; j++) {
            if (allPeriods[i][this.state.attributes[j].value].toString().toUpperCase().includes(searchValue.toString().toUpperCase())) {
              searchResultArray.push(allPeriods[i]);
              break;
            }
          }
        }
      }
      else{
        for (var i = 0; i < this.state.periods.length; i++) {
          if (allPeriods[i][attributeValue].toString().toUpperCase().includes(searchValue.toString().toUpperCase())) {
            searchResultArray.push(allPeriods[i]);
          }
        }
      }
      if(searchValue == ""){
        searchResultArray = allPeriods;
      }
      this.setState({
        periods: searchResultArray,
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
  		this.tray.raise({
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

    ShowModifyForm(period){
      this.props.ShowModifyForm();
      this.setState({
        periodToModify: period,
      });
    }

    ShowDeletedRegistry(){
  		this.tray.raise({
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
        periods: this.LoadPeriods(),
        allPeriods: this.LoadPeriods(),
      })
    }

    render() {
        return(
            <div>
              {
                this.props.showModifyForm ?
                  <PeriodForm UpdateTable={this.UpdateTable.bind(this)} CloseModifyForm={() => this.CloseModifyForm()} periodToModify={this.state.periodToModify}/>
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
                        {this.state.periods.map((periods) =>
                          {
                            return <Registry
                                      show={"periods"}
                                      ShowDeletedRegistry={() => this.ShowDeletedRegistry()}
                                      delete={this.props.delete}
                                      ShowModifyForm={this.ShowModifyForm.bind(this)}
                                      modify={this.props.modify}
                                      active={this.props.active}
                                      periods={periods}
                                      key={periods._id}
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
