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
    <Synchronizer />
    <div className="search-options">
      <span>
        Search in:
      </span>
      <label htmlFor="search-everywhere">
        <input
          id="search-everywhere"
          type="checkbox"
          value={props.searchOptions.everywhere}
          checked={props.searchOptions.everywhere}
          onChange={e => props.dispatch(toggleSearchOption('everywhere'))}
        />
        Everywhere
      </label>
      {[{
        name: 'Title',
        slug: 'title',
      },{
        name: 'Genres',
        slug: 'genres',
      },{
        name: 'Overview',
        slug: 'overview',
      }].map(field => (
        <label htmlFor={`search-in-${field.slug}`}>
          <input
            id={`search-in-${field.slug}`}
            type="checkbox"
            value={props.searchOptions[field.slug]}
            checked={props.searchOptions[field.slug]}
            onChange={e => props.dispatch(toggleSearchOption(field.slug))}
          />
          {field.name}
        </label>
      ))}
    </div>
  </form>
)

const mapStateToProps = (state, props) => ({
  query: state.shows.query,
  searchOptions: state.shows.searchOptions,
})

export default connect(mapStateToProps)(Controls);
