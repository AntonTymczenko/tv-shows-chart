import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';

import { chartFields } from '/imports/constants';
import ChartList from '/imports/components/ChartList'
import Pagination from '/imports/components/Pagination'

const updateDB = () => {
  Meteor.call('updateDatabase')
}

class App extends Component {
  state = {
    page: 1,
    limit: 10,
    sort: { rating: -1 },
  }

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
              <ChartList
                sort={this.state.sort}
                page={this.state.page}
                limit={this.state.limit}
              />
            </tbody>
          </table>
          <Pagination limit={this.state.limit}/>
        </main>
      </div>
    )
  }
}

export default App
