import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCurrentPage, setSearchQuery } from '/imports/actions/shows';

const handleSearchChange = (dispatch, event) => {
  dispatch(setSearchQuery(event.target.value.trim))
}

const Controls = props => (
  <form onSubmit={e => {
    e.preventDefault()
    props.dispatch(fetchCurrentPage())
  }}>
    <input
      type="text"
      value={props.query}
      onChange={
        e => props.dispatch(setSearchQuery(e.target.value))
      }
    />
    <button>SEARCH</button>
  </form>
)

const mapStateToProps = (state, props) => ({
  query: state.shows.query,
})

export default connect(mapStateToProps)(Controls);
