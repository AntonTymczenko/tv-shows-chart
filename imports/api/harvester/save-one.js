import { Shows } from '/imports/api/collections';

export default show => new Promise((resolve, reject) => {
  try {
    Shows.upsert(
      { 'ids.trakt': show.ids.trakt },
      { $set: show},
      { upsert: true },
      (err, { numberAffected, insertedId }) => {
        if (err) reject(err)
        if (insertedId) {
          // TODO: get summary for a new show in our DB
        }
        resolve(!!insertedId)
      }
    )
  } catch (err) {
    reject(err)
  }
})
