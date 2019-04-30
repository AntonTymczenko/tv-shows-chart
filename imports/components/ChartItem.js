import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash';
import IMDBLink from './links/IMDBLink';

const renderSpecialCell = ({ slug }, show) => {
  switch (slug) {
    case 'ids.imdb':
      return (
        <IMDBLink id={_.get(show, slug)} />
      )
    default:
      return null
  }
}

const ChartItem = ({ show, chartFields }) => (
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
