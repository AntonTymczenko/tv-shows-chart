import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';
import countryFlagEmoji from "country-flag-emoji";

import IMDBLink from './links/IMDBLink';
import YTLink from './links/YTLink';
import { chartFields } from '/imports/constants';

const renderSpecialCell = (slug, show) => {
  switch (slug) {
    case 'links':
      return (
        <>
          <IMDBLink
            id={_.get(show, 'ids.imdb')}
            title={show.title}
          />
          <YTLink
            path={show.trailer}
            title={show.title}
          />
        </>
      )
    case 'poster':
      return show.poster_path ?
        <img className="poster" src={show.poster_path} />
        : null
    case 'rating':
      return (
        <span>{
          Math.round(show.rating * 100) / 100
        }</span>
      )
    case 'country':
      if (!show.country) return null
      const knownCountry = countryFlagEmoji.get(show.country)
      const name = typeof knownCountry === 'object' && knownCountry.name
      return name ?
        <img
          className="flag"
          src={`https://flagpedia.net/data/flags/small/${show.country}.png`}
          title={name}
          alt={name}
        />
        : <span>{ show.country }</span>
    case 'genresList':
      if (!Array.isArray(show.genres) || !show.genres.length) return null
      return (
        <span>
          {show.genres.reduce((acc, g, i) => acc + g + (i !== (show.genres.length - 1) ? ', ' : '')
          ,'')}
        </span>
      )
    default:
      return show[slug] || null
  }
}

const ChartItem = ({ show }) => (
  <tr>
    { chartFields.map(({ slug }) => (
      <td key={slug}>{
        renderSpecialCell(slug, show)
      }</td>
    ))}
  </tr>
)

ChartItem.propTypes = {
  show: PropTypes.shape({
    watchers: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChartItem
