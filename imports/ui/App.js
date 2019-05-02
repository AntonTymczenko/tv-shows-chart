import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import configureStore from '/imports/store'
import ChartHead from '/imports/components/ChartHead'
import ChartList from '/imports/components/ChartList'
import Pagination from '/imports/components/Pagination'
import './App.styl'

const updateDB = () => {
  Meteor.call('updateDatabaseOnDemand')
}

const store = configureStore()

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>TV shows chart</h1>
        </header>

        <main>
          <button onClick={updateDB}>UPDATE</button>
          <table>
            <thead>
              <ChartHead />
            </thead>
            <tbody>
              <ChartList />
            </tbody>
          </table>
          <Pagination/>
        </main>
      </div>
    )
  }
}

const withProvider = WrappedComponent => props => (
  <Provider store={store}>
    <WrappedComponent {...props} />
  </Provider>
)

export default withProvider(App)
