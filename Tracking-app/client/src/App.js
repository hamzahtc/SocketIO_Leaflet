import React, { Component } from 'react'
import Viewer from './Viewer'
import Tracker from './Tracker'
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './Login';

export default class App extends Component {
  render() {
    return (
      <div>
    <Router>
      <Route path="/" exact component={Login}/>
      <Route path="/user/:username" exact component={Viewer}/>
      <Route path="/tracker" exact  component={Tracker}/>
    </Router>
      </div>
    )
  }
}
