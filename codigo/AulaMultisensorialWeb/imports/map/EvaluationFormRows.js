import React, { Component } from 'react';

export default class EvaluationFormRows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    CheckUncheckValue(type, id,  check, value){
      this.props.CheckUncheckValue(type, id,  check, value);
    }

    render() {
        return(
            <div>
              <div className="standars-contianer">
                <div className="criteria-column">{this.props.standars.criteria}</div>
                {
                  this.props.standars.value == "I" ?
                    <div onClick={() => this.CheckUncheckValue(this.props.material, this.props.standars._id, true, "I")} className="i-column">
                      <div className="selected-value"></div>
                    </div>
                  :
                  <div onClick={() => this.CheckUncheckValue(this.props.material, this.props.standars._id, false, "I")} className="i-column"></div>
                }
                {
                  this.props.standars.value == "EP" ?
                    <div onClick={() => this.CheckUncheckValue(this.props.material, this.props.standars._id, true, "EP")} className="ep-column">
                      <div className="selected-value"></div>
                    </div>
                  :
                  <div onClick={() => this.CheckUncheckValue(this.props.material, this.props.standars._id, false, "EP")} className="ep-column"></div>
                }
                {
                  this.props.standars.value == "A" ?
                    <div onClick={() => this.CheckUncheckValue(this.props.material, this.props.standars._id, true, "A")} className="a-column">
                      <div className="selected-value"></div>
                    </div>
                  :
                  <div onClick={() => this.CheckUncheckValue(this.props.material, this.props.standars._id, false, "A")} className="a-column"></div>
                }
              </div>
            </div>
        );
    }
}
