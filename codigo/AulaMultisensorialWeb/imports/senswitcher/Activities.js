import React, { Component } from 'react';
import { DotLoader } from 'react-spinners';
import Activity from '../senswitcher/Activity';

export default class Activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    ShowActivityDescription(row, description){
      this.props.ShowActivityDescription(row, description)
    }

    CloseActivityDescription(){
      this.props.CloseActivityDescription()
    }



    componentDidMount(){

    }

    render() {
        return(
            <div>
              <div className="activities-container">
                <div id="activities-row-1" className="activities-row">
                  {
                    this.props.activitiesRow1.map((activities) =>
                      {
                        return <Activity
                          activities={activities}
                          key={activities._id}
                          row={1}
                          ShowActivityDescription={this.ShowActivityDescription.bind(this)}/>;
                      })
                  }
                </div>
                <div id="activities-row-2" className="activities-row">
                  {
                    this.props.activitiesRow2.map((activities) =>
                      {
                        return <Activity
                          activities={activities}
                          key={activities._id}
                          row={2}
                          ShowActivityDescription={this.ShowActivityDescription.bind(this)}/>;
                      })
                  }
                </div>
                <div id="activities-row-3" className="activities-row">
                  {
                    this.props.activitiesRow3.map((activities) =>
                      {
                        return <Activity
                          activities={activities}
                          key={activities._id}
                          row={3}
                          ShowActivityDescription={this.ShowActivityDescription.bind(this)}/>;
                      })
                  }
                </div>
                {
                  this.props.showActivityDescription ?
                    <div className="description-container">
                      <div id="activity-description" className="activity-description-text"></div>
                      <div onClick={() => this.CloseActivityDescription()} className="close-description-button"></div>
                    </div>
                  :
                  undefined
                }
              </div>
            </div>
        );
    }
}
