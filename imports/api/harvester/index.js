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
          updateOnce()
        } else console.log('DB was updated')
      })
    }
  }

  updateOnce()
  setInterval(Meteor.bindEnvironment(updateOnce), period * 60 * 1000)
}

const { UPDATE_PERIOD = 0.5 } = process.env // in minutes

export default function() {
  updateEvery(UPDATE_PERIOD)
}
