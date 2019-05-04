import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentPage } from '/imports/actions/shows';

const updateDB = cb => {
  Meteor.call('updateDatabaseOnDemand', (err, res) => {
    if (err) return console.error(err)
    cb()
  })
}

const Controls = props => (
  <button onClick={() => updateDB(() =>
    props.dispatch(fetchCurrentPage())
  )}>UPDATE</button>
)

const mapStateToProps = (state, props) => ({
})

export default connect(mapStateToProps)(Controls);
