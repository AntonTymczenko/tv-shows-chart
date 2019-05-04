import { HTTP } from 'meteor/http';

import httpHeaders from './http-headers';
import { Shows } from '/imports/api/collections';

const msgAPI = api => {
  switch (api) {
    case 'trakt':
      return 'summary of a show via TraktID='
    case 'tmdb':
      return 'poster and other details via TMDB_ID='
    default:
      return 'unknown API '
  }
}
const errMsg = (id, api) => `Error trying to update ${msgAPI(api)}${id}`

export default ({ _id, ids }) => new Promise((resolve, reject) => {
    // Trakt summary
    const traktRequest = new Promise((resolve, reject) => {
    const url = `https://api.trakt.tv/shows/${ids.trakt}`
    const headers = httpHeaders.trakt
    const query = 'extended=full'
    HTTP.get(url, { headers, query }, (err, res) => {
      if (err) return resolve({
        ...err,
        status: err.response && err.response.statusCode || 500,
      })

      Shows.update(
        { _id },
        { $set: res.data},
        (err, res) => {
          if (err) return reject(err)
          if (res !== 1) return reject(new Error(errMsg(ids.trakt, 'trakt')))
          resolve(_id)
        }
      )
    })
  })

  // TMDB additional info (poster, ...)
  const tmdbRequest = new Promise((resolve, reject) => {
    resolve(_id)
  })

  Promise.all([traktRequest, tmdbRequest])
  .then(res => resolve(res[0]))
  .catch(err => reject(err))
})
