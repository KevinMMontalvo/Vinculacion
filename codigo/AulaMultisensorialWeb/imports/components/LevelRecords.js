import React, { Component } from 'react';
import LevelForm from '../components/LevelForm';
import Registry from '../map/Registry';
import Filter, { Sort, FilterValue } from 'data-engine';
import ButterToast, { Cinnamon, POS_BOTTOM, POS_RIGHT, POS_TOP } from 'butter-toast';

export default class LevelRecords extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          levels: [],
          allLevels: [],
          isDataLoaded: false,
          sortWay: 'des',
          sortAttribute: 'des',
          attributes: [
                        {
                          value: 'name',
                          text: 'Nombre del nivel'
                        },
                        {
                          value: 'max_age',
                          text: 'Edad máxima'
                        },
                        {
                          value: 'min_age',
                          text: 'Edad mínima'
                        }
                      ],
        }
    }

    componentWillMount(){
      const { MongoClient, ObjectId } = require('mongodb');
      this.setState({
        levels: this.LoadLevels(),
        allLevels: this.LoadLevels(),
      }, () => this.CheckLoadedData());
    }

    componentDidMount(){
      this.LoadAttributesInSelect();
    }

    CheckLoadedData(){
      if(this.state.levels.length > 0){
        this.setState({
          isDataLoaded: true
        });
      }
    }

    LoadLevels() {
      var levelsString = levelsController.getLevels();
      console.log(levelsString);
      var levels = JSON.parse(levelsString);
      return levels;
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
      var levelsArray = this.state.levels;
      sortJsonArray(levelsArray, attributeValue,this.state.sortWay);
      this.setState({
        levels: levelsArray,
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
      var allLevels = this.state.allLevels;
      var searchResultArray = [];
      if(attributeValue == ""){
        for (var i = 0; i < allLevels.length; i++) {
          for (var j = 0; j < this.state.attributes.length; j++) {
            if (allLevels[i][this.state.attributes[j].value].toString().toUpperCase().includes(searchValue.toString().toUpperCase())) {
              searchResultArray.push(allLevels[i]);
              break;
            }
          }
        }
      }
      else{
        for (var i = 0; i < this.state.levels.length; i++) {
          if (allLevels[i][attributeValue].toString().toUpperCase().includes(searchValue.toString().toUpperCase())) {
            searchResultArray.push(allLevels[i]);
          }
        }
      }
      if(searchValue == ""){
        searchResultArray = allLevels;
      }
      this.setState({
        levels: searchResultArray,
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

    ShowModifyForm(level){
      this.props.ShowModifyForm();
      this.setState({
        levelToModify: level,
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

    render() {
        return(
            <div>
              {
                this.props.showModifyForm ?
                  <LevelForm CloseModifyForm={() => this.CloseModifyForm()} levelToModify={this.state.levelToModify}/>
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
                        {this.state.levels.map((levels) =>
                          {
                            return <Registry
                                      show={"levels"}
                                      ShowDeletedRegistry={() => this.ShowDeletedRegistry()}
                                      delete={this.props.delete}
                                      ShowModifyForm={this.ShowModifyForm.bind(this)}
                                      modify={this.props.modify}
                                      levels={levels}
                                      key={levels._id}>
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
