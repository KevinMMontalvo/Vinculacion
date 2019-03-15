import {Meteor} from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  Router,
  Switch,
  BrowserRouter
} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Tracker} from 'meteor/tracker';

import Main from '../imports/ui/Main';
import SenSwitcher from '../imports/ui/SenSwitcher';

const history = createBrowserHistory();

window.browserHistory = history;

Tracker.autorun(() => {

});

Meteor.startup(() => {
  ReactDOM.render(
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Main}/>
        <Route exact path="/senswitcher" component={SenSwitcher}/>
      </Switch>
    </Router>, document.getElementById('render-target')
  );
});
