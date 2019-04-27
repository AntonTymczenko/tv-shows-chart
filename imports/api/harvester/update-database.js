import { LogEntries, Shows } from '/imports/api/collections'

const errMsg = id => `Unsuccessful DB update. Read more in log entry ${id}`

export default function(cb) {
  // do some DB update
  const status = Math.round(Math.random()) ? 200 : 500

  // Write Log about last DB update try
  LogEntries.insert({
    date: new Date(),
    status,
  }, (err, id) => {
    if (err) return cb(err)
    if (status !== 200) return cb(new Error(errMsg(id)))
    return cb()
  });
}
