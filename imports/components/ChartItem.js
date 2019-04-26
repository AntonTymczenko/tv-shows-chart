import React from 'react'
import PropTypes from 'prop-types';

const ChartItem = ({ show }) => (
  <tr>
    <td>{ show.rating }</td>
    <td>{ show.title }</td>
  </tr>
)

ChartItem.propTypes = {
  rating: PropTypes.number,
  title: PropTypes.string,
};

export default ChartItem
