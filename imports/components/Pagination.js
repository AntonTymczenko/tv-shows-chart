import React from 'react';
import { connect } from 'react-redux';
import SVG from 'react-inlinesvg';

import { setCurrentPage, setLimit } from '/imports/actions/shows';
import ReactPaginate from 'react-paginate';

const Pagination = ({ limit, page, pageCount, dispatch }) => (
  <div className="pagination">
    <div className="per-page-select-wrapper">
      <label htmlFor="per-page-select">Per page</label>
      <select
        id="per-page-select"
        className="select-css"
        value={limit}
        onChange={e => dispatch(setLimit(parseInt(e.target.value))) }
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="40">40</option>
      </select>
    </div>
    <div className="pagination__list-wrapper">
    <ReactPaginate
      previousLabel={ <SVG src="/arrow_left.svg" ></SVG> }
      nextLabel={ <SVG src="/arrow_right.svg" ></SVG> }
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
  </div>
)

const mapStateToProps = (state, props) => ({
  limit: state.shows.limit,
  page: state.shows.page,
  pageCount: state.shows.pageMax + 1,
})

export default connect(mapStateToProps)(Pagination);
