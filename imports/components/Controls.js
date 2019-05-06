import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import Synchronizer from '/imports/components/Synchronizer'
import { fetchCurrentPage, setSearchQuery, toggleSearchOption } from '/imports/actions/shows';

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
    <label htmlFor="">
      <input
        type="checkbox"
        value={props.searchOptions.genres}
        onChange={e => props.dispatch(toggleSearchOption('genres'))}
        id="search-in-genres"
      />
      Search in genres too
    </label>
    <Synchronizer />
  </form>
)

const mapStateToProps = (state, props) => ({
  query: state.shows.query,
  searchOptions: state.shows.searchOptions,
})

export default connect(mapStateToProps)(Controls);
