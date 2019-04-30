import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

import { Shows } from '/imports/api/collections';
import ReactPaginate from 'react-paginate';

const Pagination = ({ pageCount }) => (
  <ReactPaginate
    previousLabel={'previous'}
    nextLabel={'next'}
    breakLabel={'...'}
    breakClassName={'break-me'}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={data => {console.log(data)}}
    containerClassName={'pagination'}
    subContainerClassName={'pages pagination'}
    activeClassName={'active'}
  />
)

export default withTracker(({ limit }) => {
  Meteor.subscribe('shows')

  const totalCount = Shows.find().count()
  const pageCount = Math.ceil(totalCount / limit)

  return {
    pageCount,
  }
})(Pagination);
