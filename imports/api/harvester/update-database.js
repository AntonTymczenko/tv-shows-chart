import { LogEntries } from '/imports/api/collections';
import fetchTrending from './fetch-trending';

const errMsg = id => `Unsuccessful DB update. Read more in log entry ${id}`

export default async ({ manual }, cb) => {
  try {
    const res = await fetchTrending

    LogEntries.insert({
      ...res,
      manual,
      date: new Date(),
    }, (err, id) => {
      if (err) throw err
      if (res.status !== 200) throw new Error(errMsg(id))
      return cb()
    });
  } catch(err) {
    return cb(err)
  }
}