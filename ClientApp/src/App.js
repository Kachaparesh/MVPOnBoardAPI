import React, { Component } from 'react';
import {Route} from 'react-router'
import { Layout } from './components/Layout';
import AppAPICall from './components/AppAPICall';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={AppAPICall} />
        <Route path='/product' component={AppAPICall} />
        <Route path='/store' component={AppAPICall} />
        <Route path='/sale' component={AppAPICall} />
      </Layout>
    );
  }
}