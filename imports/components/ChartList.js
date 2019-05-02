import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react'
import { connect } from 'react-redux';

import ChartItem from './ChartItem'

class ChartList extends Component {
  render() {
    return this.props.shows.length ? this.props.shows.map(show => (
      <ChartItem
        show={show}
        key={show._id}
      />
    )) : null
  }
}

const mapStateToProps = (state, props) => ({
  shows: state.shows.data,
})

export default connect(mapStateToProps)(ChartList);
