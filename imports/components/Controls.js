import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { connect } from 'react-redux';

const updateDB = () => {
  Meteor.call('updateDatabaseOnDemand')
}

const Controls = props => (
  <button onClick={updateDB}>UPDATE</button>
)

const mapStateToProps = (state, props) => ({
})

export default connect(mapStateToProps)(Controls);
