import React from 'react';
import { chartFields } from '/imports/constants';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { handleSortChange } from '/imports/actions/shows';

const sortClasses = (field, stateSort) => {
  const currentSortType = Object.keys(stateSort)[0]
  const order = stateSort[currentSortType] === -1 ? 'asc' : 'desc'
  return classNames({
    sortable: field.sortable,
    active: currentSortType && field.slug === currentSortType,
  }, order, 'cell')
}

const ChartHead = props => (
  <div className="chart__head">
    { chartFields.filter(f => !f.hidden).map(field => (
      <div
        key={field.slug}
        className={ sortClasses(field, props.sort) }
        onClick={() => field.sortable && props.dispatch(handleSortChange(field.slug))}
      >{ field.name }</div>
    ))}
  </div>
)


const mapStateToProps = (state, props) => ({
  sort: state.shows.sort,
})

export default connect(mapStateToProps)(ChartHead);
