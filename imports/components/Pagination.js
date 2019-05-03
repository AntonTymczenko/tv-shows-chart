import React from 'react';
import { connect } from 'react-redux';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { setTotalShowsCount, setCurrentPage, setLimit } from '/imports/actions/shows';
import { Shows } from '/imports/api/collections';
import ReactPaginate from 'react-paginate';

const Pagination = ({ limit, page, pageCount, dispatch }) => (
  <div className="pagination">
    <label htmlFor="per-page-select">Per page</label>
    <select
      id="per-page-select"
      value={limit}
      onChange={e => dispatch(setLimit(parseInt(e.target.value))) }
    >
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="40">40</option>
    </select>
    <ReactPaginate
      previousLabel={'previous'}
      nextLabel={'next'}
      breakLabel={'...'}
      breakClassName={'break-me'}
      forcePage={page}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={({ selected }) => dispatch(setCurrentPage(selected))}
      subContainerClassName={'pages pagination'}
      activeClassName={'active'}
    />
  </div>
)

const mapStateToProps = (state, props) => ({
  limit: state.shows.limit,
  page: state.shows.page,
  pageCount: state.shows.pageMax + 1,
})

export default connect(mapStateToProps)(withTracker(props => {
  const handle = Meteor.subscribe('shows')

  const count = Shows.find().count()

  props.dispatch(setTotalShowsCount(
    count
  ))

  return {
    ...props,
    loading: !handle.ready()
  }
})(Pagination));
