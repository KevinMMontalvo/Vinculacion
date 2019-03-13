import React, { Component } from 'react';

export default class EvaluationFormRows extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div>
              <div className="standars-contianer">
                <div className="criteria-column">{this.props.standars.criteria}</div>
                <div className="i-column"></div>
                <div className="ep-column"></div>
                <div className="a-column"></div>
              </div>
            </div>
        );
    }
}
