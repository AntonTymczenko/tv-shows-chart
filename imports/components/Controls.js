import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Synchronizer from '/imports/components/Synchronizer'
import { fetchCurrentPage, setSearchQuery, toggleSearchOption } from '/imports/actions/shows';
import { chartFields } from '/imports/constants';

const Controls = props => {
  const [queryText, setQueryText] = useState(props.query)
  const [queryTimeout, setQueryTimeout] = useState(null)

  const handleSearchChange = e => {
    const text = e.target.value
    setQueryText(text)
    clearTimeout(queryTimeout)
    setQueryTimeout(setTimeout(() => {
      props.dispatch(setSearchQuery(text))
    }, 400))
  }

  return (
    <form onSubmit={e => {
      e.preventDefault()
      props.dispatch(fetchCurrentPage())
    }}>
      <input
        type="text"
        value={queryText}
        onChange={
          e => handleSearchChange(e)
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
        { !props.searchOptions.everywhere &&
          chartFields.filter(f => f.searchable).map(field => (
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
}

const mapStateToProps = (state, props) => ({
  query: state.shows.query,
  searchOptions: state.shows.searchOptions,
})

export default connect(mapStateToProps)(Controls);
