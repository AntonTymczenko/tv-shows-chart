import { Shows } from '/imports/api/collections';

export default show => new Promise((resolve, reject) => {
  Shows.upsert(
    { 'ids.trakt': show.ids.trakt },
    { $set: show},
    { upsert: true },
    (err, { numberAffected, insertedId }) => {
      resolve(insertedId)
      if (err) return reject(err)
    }
  )
})
