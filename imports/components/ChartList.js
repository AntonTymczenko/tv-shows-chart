import { Meteor } from 'meteor/meteor';
import React from 'react'
import { connect } from 'react-redux';

import ChartItem from './ChartItem'

const ChartList = props =>
  props.shows.length ? props.shows.map(show => (
      <ChartItem
        show={show}
        key={show._id}
      />
    )) : null

const mapStateToProps = (state, props) => ({
  shows: state.shows.data,
})

export default connect(mapStateToProps)(ChartList);
