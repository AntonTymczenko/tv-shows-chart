import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';

import IMDBLink from './links/IMDBLink';
import { chartFields } from '/imports/constants';

const renderSpecialCell = ({ slug }, show) => {
  switch (slug) {
    case 'links':
      return (
        <IMDBLink id={_.get(show, 'ids.imdb')} />
      )
    case 'poster':
      return show.poster_path ?
        <img src={show.poster_path} />
        : null
    default:
      return null
  }
}

const ChartItem = ({ show }) => (
  <tr>
    { chartFields.map(field => (
      <td key={field.slug}>{
        show[field.slug] || renderSpecialCell(field, show)
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
