import React, { Component } from 'react';

import SideMenu from '../components/SideMenu';
import MainContainer from '../components/MainContainer';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return(
            <div>
              <SideMenu/>
              <MainContainer>
              </MainContainer>
            </div>
        );
    }
}
