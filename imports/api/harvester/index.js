import { Meteor } from 'meteor/meteor'
import updatedLessThanMinutes from './updated-recently'
import updateDatabase from './update-database'

const updateOnce = (period = 0, { manual = false } = {}) => {
  if (manual) {
    updateDatabase({ manual })
  } else if (!updatedLessThanMinutes(period)) {
    updateDatabase({ manual })
  }
}

const updateEvery = period => {
  updateOnce(period)
  Meteor.setInterval(() => updateOnce(period), period * 60 * 1000)
}

const UPDATE_PERIOD = parseInt(process.env.UPDATE_PERIOD) || 1440 // in minutes

Meteor.methods({
  updateDatabaseOnDemand() {
    // TODO: add option of update only current page
    updateOnce(undefined, { manual: true })
  }
})

export default function() {
  updateEvery(UPDATE_PERIOD)
}
