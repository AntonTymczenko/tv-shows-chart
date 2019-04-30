import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import React from 'react'

import { Shows } from '/imports/api/collections';
import ChartItem from './ChartItem'

const ChartList = ({ shows }) =>
  shows.length ? shows.map(show => (
      <ChartItem
        show={show}
        key={show._id}
      />
    )) : null

export default withTracker(({ sort, page = 1, limit = 0 }) => {
  Meteor.subscribe('shows')

  const skip = limit * (page - 1)

  const shows = Shows.find({}, {
    sort,
    skip,
    limit,
  }).fetch()

  return {
    shows,
  }
})(ChartList)
