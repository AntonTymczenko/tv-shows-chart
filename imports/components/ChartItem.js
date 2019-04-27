import React from 'react'
import PropTypes from 'prop-types';

const ChartItem = ({ show, chartFields }) => (
  <tr>
    { chartFields.map(field => (
      <td key={field.slug}>{
        show[field.slug]
      }</td>
    ))}
  </tr>
)

ChartItem.propTypes = {
  show: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChartItem
