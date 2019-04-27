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
          setTimeout(Meteor.bindEnvironment(updateOnce), 60000)
        } else console.log('DB was updated')
      })
    }
  }

  updateOnce()
  setInterval(Meteor.bindEnvironment(updateOnce), period * 60 * 1000)
}

const { UPDATE_PERIOD = 5 } = process.env // in minutes

export default function() {
  updateEvery(UPDATE_PERIOD)
}
