import { LogEntries } from '/imports/api/collections';
import fetchTrending from './fetch-trending';

const errMsg = id => `Unsuccessful DB update. Read more in log entry ${id}`

export default async function(cb) {
  // do some DB update
  let status = 500
  try {
    const res = await fetchTrending
    status = res.status
  } catch (err) {
    return cb(err)
  }

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
