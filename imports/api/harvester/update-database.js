import { LogEntries } from '/imports/api/collections';
import fetchTrending from './fetch-trending';

const errMsg = id => `Unsuccessful DB update. Read more in log entry ${id}`

export default async ({ manual }) => {
  try {
    const startTime = new Date()
    const res = await fetchTrending()
    const updateTime = new Date() - startTime

    LogEntries.insert({
      ...res,
      manual,
      date: new Date(),
      updateTime,
    }, (err, id) => {
      if (err) throw err
      if (res.status !== 200) throw new Error(errMsg(id))
    });
  } catch(err) {
    console.error(err.stack || err)
  }
}
