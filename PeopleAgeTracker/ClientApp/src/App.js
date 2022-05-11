import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { People } from './components/People';
import { Modal, Button } from "react-bootstrap";
import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={People} />
      </Layout>
    );
  }
}
