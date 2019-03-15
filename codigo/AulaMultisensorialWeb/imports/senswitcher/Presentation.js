import React, { Component } from 'react';
import { DotLoader } from 'react-spinners';
import Activities from '../senswitcher/Activities';

export default class Presentation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
        }
    }

    ShowLoadingBar(){
      setTimeout(() => {
            this.setState({
            loading: false
          })
        }, 4000);
    }

    ShowActivities(){
      this.props.ShowActivities();
    }

    ShowActivityDescription(row, description){
      this.props.ShowActivityDescription(row, description)
    }

    CloseActivityDescription(){
      this.props.CloseActivityDescription()
    }

    componentDidMount(){
      this.ShowLoadingBar();
    }

    render() {
        return(
            <div>
              <div className="presentation-container">
                <div className="presentation-image">
                  {
                    this.state.loading ?
                      <div className="image-loader">
                        <DotLoader
                          sizeUnit={"vw"}
                          size={8}
                          color={'#2BBEA2'}
                          loading={this.state.loading}
                        />
                        <p className="loading-image-text">Cargando...</p>
                      </div>
                    :
                    this.props.showActivities ?
                      <Activities
                        activitiesRow1={this.props.activitiesRow1}
                        activitiesRow2={this.props.activitiesRow2}
                        activitiesRow3={this.props.activitiesRow3}
                        showActivityDescription={this.props.showActivityDescription}
                        ShowActivityDescription={this.ShowActivityDescription.bind(this)}
                        CloseActivityDescription={this.CloseActivityDescription.bind(this)}/>
                    :
                    <div className="presentation-column">
                      <div className="presentation-title">BIENVENIDOS AL SENSWITCHER</div>
                      <div className="presentation-subtitle">Actividades interactivas para el aula multisensorial</div>
                      <div className="senswitcher-button-container">
                        <div onClick={() => this.ShowActivities()} className="senswitcher-button">ACTIVIDADES</div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
        );
    }
}
