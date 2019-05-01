import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react'
import { connect } from 'react-redux';

import { Shows } from '/imports/api/collections';
import { setCurrentPage } from '/imports/actions/shows';
import ChartItem from './ChartItem'

class ChartList extends Component {
  componentDidMount() {
    this.props.dispatch(setCurrentPage(this.props.page))
  }

  componentDidUpdate(prevProps) {
    const { page, totalCount, limit, pageMax } = this.props
    const pageIndexIsPossible = page <= pageMax
    const pageIndexHasChanged = page !== prevProps.page


    const currentPageFirstIndex = page * limit
    const currentPageLastIndex = ((page + 1) * limit) - 1
    const maxIndex = totalCount - 1

    const shownCount = currentPageFirstIndex + this.props.shows.length
    const updatedDataHasImpactOnCurrentPage = shownCount < totalCount &&
      maxIndex <= currentPageLastIndex || (maxIndex > currentPageLastIndex && shownCount !== limit)

    const OKToUpdate = pageIndexIsPossible &&
      pageIndexHasChanged ||
      updatedDataHasImpactOnCurrentPage
    if (OKToUpdate) this.props.dispatch(setCurrentPage(this.props.page))
  }

  render() {
    return this.props.shows.length ? this.props.shows.map(show => (
      <ChartItem
        show={show}
        key={show._id}
      />
    )) : null
  }
}

const mapStateToProps = (state, props) => ({
  limit: state.shows.limit,
  totalCount: state.shows.totalCount,
  pageMax: state.shows.pageMax,
  page: state.shows.page,
  shows: state.shows.data,
})

export default connect(mapStateToProps)(ChartList);
