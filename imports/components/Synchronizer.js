import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { connect } from 'react-redux';

import { Shows } from '/imports/api/collections';
import { setTotalShowsCount } from '/imports/actions/shows';

const LoadingStatus = props => (
  <p className="sync-status">{ props.loading && 'LOADING...' }</p>
)


const mapStateToProps = (state, props) => ({
  queryObj: state.shows.queryObj,
})

export default connect(mapStateToProps)(withTracker(props => {
  const handle = Meteor.subscribe('shows')

  const count = Shows.find(props.queryObj).count()

  props.dispatch(setTotalShowsCount(
    count
  ))
  return {
    loading: !handle.ready()
  }
})(LoadingStatus));
