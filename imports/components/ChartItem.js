import React from 'react'
import PropTypes from 'prop-types';

const ChartItem = ({ show }) => (
  <tr>
    <td>{ show.rating }</td>
    <td>{ show.title }</td>
  </tr>
)

ChartItem.propTypes = {
  show: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChartItem
