import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import ChartItem from '/imports/components/ChartItem'
import Shows from '/imports/api/shows';

const App = props => (
  <div>
    <header>
      <h1>TV shows chart</h1>
    </header>

    <main>
      <table>
        <thead>
          <tr>
            <th>Rating</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
        { props.shows.length
          ? props.shows.map(show => (
            <ChartItem show={show} key={show._id}/>
          ))
          : null
        }
        </tbody>
      </table>
    </main>
  </div>
);

App.propTypes = {
  shows: PropTypes.array,
}

export default withTracker(() => {
  return {
    shows: Shows.find({}).fetch(),
  };
})(App);
