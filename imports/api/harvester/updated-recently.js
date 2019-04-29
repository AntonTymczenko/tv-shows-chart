import { Shows, LogEntries } from '/imports/api/collections'

export default function(treshold) {
  // returns 'false' or 'undefined' if DB needs to be updated
  if (typeof treshold !== 'number' || treshold < 0) {
    throw new Error('Specify treshold value in minutes')
  }
  const mostRecentLogOfSuccess = LogEntries.findOne(
    { status: 200 },
    { sort: { date: -1 } }
  )
  if (!mostRecentLogOfSuccess) {
    return // db never was updated successfully
  }
  const dateOfSuccess = new Date(mostRecentLogOfSuccess.date)
  const currentTime = new Date()
  const agoMinutes = (currentTime - dateOfSuccess) / 1000 / 60
  const agoMinutesRounded = Math.ceil(agoMinutes)

  return agoMinutesRounded < treshold
}
