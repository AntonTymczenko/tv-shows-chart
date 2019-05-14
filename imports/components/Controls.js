import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Synchronizer from '/imports/components/Synchronizer'
import { fetchCurrentPage, setSearchQuery, toggleSearchOption } from '/imports/actions/shows';
import { chartFields } from '/imports/constants';

const Controls = props => {
  const [queryText, setQueryText] = useState(props.query)
  const [queryTimeout, setQueryTimeout] = useState(null)
  const [showControls, setShowControls] = useState(false)

  const handleSearchChange = e => {
    const text = e.target.value
    setQueryText(text)
    clearTimeout(queryTimeout)
    setQueryTimeout(setTimeout(() => {
      props.dispatch(setSearchQuery(text))
    }, 400))
  }

  const toggleAdditionalSearchOptions = e => {
    e.preventDefault()
    setShowControls(!showControls)
  }

  return (
    <form onSubmit={e => {
      e.preventDefault()
      props.dispatch(fetchCurrentPage())
    }}>
      <div className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Search"
          value={queryText}
          onChange={
            e => handleSearchChange(e)
          }
        />
        { queryText.trim() &&
          <button className="search__button search__button_submit"></button>
        }
        <button
          className={
            classNames('search__button', 'search__button_controls',
            { search__button_controls_active: showControls })
          }
          onClick={toggleAdditionalSearchOptions}
        ></button>
      </div>

      { showControls &&
      <div className="search__options">
        <label
          htmlFor="search-everywhere"
          className="switch"
        >
          <span className="switch__label">
            Search everywhere
          </span>
          <span className="switch__slider-container">
            <input
              id="search-everywhere"
              type="checkbox"
              value={props.searchOptions.everywhere}
              checked={props.searchOptions.everywhere}
              onChange={e => props.dispatch(toggleSearchOption('everywhere'))}
            />
            <span className="switch__slider"></span>
          </span>
        </label>
        { !props.searchOptions.everywhere &&
          chartFields.filter(f => f.searchable).map(field => (
          <label
            htmlFor={`search-in-${field.slug}`}
            key={field.slug}
            className="switch"
          >
            <span className="switch__label">
              {field.name}
            </span>
            <span className="switch__slider-container">
              <input
                id={`search-in-${field.slug}`}
                type="checkbox"
                value={props.searchOptions[field.slug]}
                checked={props.searchOptions[field.slug]}
                onChange={e => props.dispatch(toggleSearchOption(field.slug))}
              />
              <span className="switch__slider"></span>
            </span>
          </label>
        ))}
      </div>
      }
      <Synchronizer />
    </form>
  )
}

const mapStateToProps = (state, props) => ({
  query: state.shows.query,
  searchOptions: state.shows.searchOptions,
})

export default connect(mapStateToProps)(Controls);
