import React from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = (state, props) => ({
  pageCount: state.shows.pageMax + 1,
})

export default connect(mapStateToProps)(withTracker(props => {
  const handle = Meteor.subscribe('shows')

  const count = Shows.find().count()


  return {
    ...props,
  }
})(Pagination));
