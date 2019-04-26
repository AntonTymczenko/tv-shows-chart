import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Shows from '/imports/api/shows';

const App = props => (
  <div>
    <header>
      <h1>TV shows chart</h1>
    </header>
  </div>
);

export default withTracker(() => {
  return {
    shows: Shows.find({}).fetch(),
  };
})(App);
