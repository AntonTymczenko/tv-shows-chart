import { Shows } from '/imports/api/collections';

export default show => new Promise((resolve, reject) => {
  Shows.upsert(
    { 'ids.trakt': show.ids.trakt },
    { $set: show},
    { upsert: true },
    (err, { numberAffected, insertedId }) => {
      resolve({
        _id: insertedId,
        ids: show.ids,
      })
      if (err) return reject(err)
    }
  )
})
