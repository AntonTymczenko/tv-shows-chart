import React from 'react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';

import ChartItem from '/imports/components/ChartItem'
import { Shows } from '/imports/api/collections';
import { chartFields } from '/imports/constants';

const App = ({ shows }) => (
  <div>
    <header>
      <h1>TV shows chart</h1>
    </header>

    <main>
      <table>
        <thead>
          <tr>
            { chartFields.map(field => (
              <th key={field.slug}>{ field.name }</th>
            ))}
          </tr>
        </thead>
        <tbody>
          { shows.length ? shows.map(show => (
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
);

App.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withTracker(() => ({
  shows: Shows.find({}).fetch(),
}))(App);
