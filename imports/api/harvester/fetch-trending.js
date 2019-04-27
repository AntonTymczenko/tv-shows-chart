import { HTTP } from 'meteor/http';
import { Shows } from '/imports/api/collections';

const { TRAKT_CLIENT_ID } = process.env

export default new Promise((resolve, reject) => {
  const url = 'https://api.trakt.tv/shows/trending'
  const headers = {
    'Content-type': 'application/json',
    'trakt-api-key': TRAKT_CLIENT_ID,
    'trakt-api-version': 2,
  }

  HTTP.get(url, { headers }, (err, res) => {
    if (err) {
      const status = err.response && err.response.statusCode  || 500
      resolve({ status })
    }

    const toSave = res.data.map(show => ({
      ...show.show,
      rating: show.watchers,
    }))

    toSave.forEach(show => {
      Shows.update(
        { 'ids.trakt': show.ids.trakt },
        { $set: show},
        { upsert: true }
      )
    })

    resolve({ status: 200 })
  })
})
