import React, { Component } from 'react';

export default class Filters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    RemoveFilter(index, name, type){
      this.props.RemoveFilter(index, name, type);
    }

    render() {
        return(
            <div>
              <div className="filter-map-component">
                <div className="filter-name">
                  {
                    this.props.levels ?
                      <div>{this.props.levels.name}</div>
                    :
                    undefined
                  }
                  {
                    this.props.periods ?
                      <div>{this.props.periods.name}</div>
                    :
                    undefined
                  }
                </div>
                {
                  this.props.levels && !this.props.modal ?
                    <div onClick={() => this.RemoveFilter(this.props.levels._id, this.props.levels.name, "level")} className="filter-delete-button"></div>
                  :
                  undefined
                }
                {
                  this.props.periods && !this.props.modal ?
                    <div onClick={() => this.RemoveFilter(this.props.periods._id, this.props.periods.name, "period")} className="filter-delete-button"></div>
                  :
                  undefined
                }
                {
                  this.props.levels && this.props.modal ?
                    <div onClick={() => this.RemoveFilter(this.props.levels._id, this.props.levels.name, "level")} className="modal-filter-delete-button"></div>
                  :
                  undefined
                }
                {
                  this.props.periods && this.props.modal ?
                    <div onClick={() => this.RemoveFilter(this.props.periods._id, this.props.periods.name, "period")} className="modal-filter-delete-button"></div>
                  :
                  undefined
                }
              </div>
            </div>
        );
    }
}
