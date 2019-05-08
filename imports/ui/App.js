import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Meteor } from 'meteor/meteor';

import configureStore from '/imports/store'
import Controls from '/imports/components/Controls'
import ChartHead from '/imports/components/ChartHead'
import ChartList from '/imports/components/ChartList'
import Pagination from '/imports/components/Pagination'

const store = configureStore()

class App extends Component {
  render() {
    return (
      <div className="container">
        <header>
          <h1>TV shows chart</h1>
        </header>

        <main>
          <Controls />
          <div className="chart">
            <ChartHead />
            <ChartList />
          </div>
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
