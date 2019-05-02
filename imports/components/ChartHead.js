import React from 'react';
import { chartFields } from '/imports/constants';
import { connect } from 'react-redux';
import classNames from 'classnames';

const handleSortChange = slug => {
  console.log(slug)
}


const sortClasses = (field, stateSort) => {
  const currentSortType = Object.keys(stateSort)[0]
  const order = stateSort[currentSortType] === -1 ? 'asc' : 'desc'
  return classNames({
    sortable: field.sortable,
    active: currentSortType && field.slug === currentSortType,
  }, order)
}

const ChartHead = props => (
  <tr className="chart-head">
    { chartFields.map(field => (
      <th
        key={field.slug}
        className={ sortClasses(field, props.sort) }
        onClick={() => handleSortChange(field.slug)}
      >{ field.name }</th>
    ))}
  </tr>
)


const mapStateToProps = (state, props) => ({
  sort: state.shows.sort,
})

export default connect(mapStateToProps)(ChartHead);
