import { Meteor } from 'meteor/meteor'
import updatedLessThanMinutes from './updated-recently'
import updateDatabase from './update-database'

const updateEvery = period => {
  function updateOnce() {
    const needsUpdate = !updatedLessThanMinutes(period)
    if (needsUpdate) {
      updateDatabase(err => {
        if (err) {
          console.error(err.message || err)
          console.error('Will retry to update in 1 minute')
          Meteor.setTimeout(updateOnce, 60000)
        } else console.log('DB was updated')
      })
    }
  }

  updateOnce()
  Meteor.setInterval(updateOnce, period * 60 * 1000)
}

const UPDATE_PERIOD = parseInt(process.env.UPDATE_PERIOD) || 1440 // in minutes

export default function() {
  updateEvery(UPDATE_PERIOD)
}
