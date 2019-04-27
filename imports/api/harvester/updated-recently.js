import { Shows, LogEntries } from '/imports/api/collections'

export default function(treshold) {
  // returns 'false' or 'undefined' if DB needs to be updated
  if (typeof treshold !== 'number' || treshold < 0) {
    throw new Error('Specify treshold value in minutes')
  }
  const list = LogEntries.find({ status: 200 }, { sort: { date: -1 } }).fetch()

  const lastLogEntryDate = list.length && new Date(list[0].date)
  if (!lastLogEntryDate) {
    return // db never was updated successfully
  }
  const currentTime = new Date()
  const diff = (currentTime - lastLogEntryDate) / 1000 / 60
  return diff < treshold
}
