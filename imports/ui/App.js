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
  componentDidMount() {
    const navbar = document.getElementById('navbar')
    const sticky = navbar.offsetTop

    window.onscroll = () => {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add('controls-header_fixed')
      } else {
        navbar.classList.remove('controls-header_fixed')
      }
    }
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>TV shows chart</h1>
        </header>

        <nav className="controls-header" id="navbar">
          <div className="container">
            <Controls />
            <ChartHead />
          </div>
        </nav>

        <main>
          <ChartList />
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
