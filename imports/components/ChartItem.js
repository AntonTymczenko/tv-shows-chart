import React from 'react'

const ChartItem = ({ show }) => (
  <tr>
    <td>{ show.rating }</td>
    <td>{ show.title }</td>
  </tr>
)

export default ChartItem
