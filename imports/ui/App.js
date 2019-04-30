import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import ChartItem from '/imports/components/ChartItem'
import { Shows } from '/imports/api/collections';
import { chartFields } from '/imports/constants';

const updateDB = () => {
  Meteor.call('updateDatabase')
}

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
              <tr>
                { chartFields.map(field => (
                  <th key={field.slug}>{ field.name }</th>
                ))}
              </tr>
            </thead>
            <tbody>
              { this.props.shows.length ? this.props.shows.map(show => (
                <ChartItem
                  show={show}
                  key={show._id}
                  chartFields={chartFields}
                />
              )) : null }
            </tbody>
          </table>
        </main>
      </div>
    )
  }
}

App.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withTracker(() => {
  Meteor.subscribe('shows')
  return {
    shows: Shows.find({}, { limit: 20, sort: { rating: -1 } }).fetch(),
  }
})(App);
