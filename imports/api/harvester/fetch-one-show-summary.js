import { HTTP } from 'meteor/http';

import httpHeaders from './http-headers';
import { Shows } from '/imports/api/collections';
import { worstResult } from './helpers';

const { TMDB_KEY } = process.env

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
    const error = new Error(errMsg(ids.trakt, 'trakt'))
    HTTP.get(url, { headers, query }, (err, res) => {
      if (err) return resolve({
        ...error,
        request_url: url,
        response: err.response,
        status: err.response && err.response.statusCode || 500,
      })

      Shows.update(
        { _id },
        { $set: res.data},
        (err, res) => {
          if (err || res !== 1) return reject(error)
          resolve({ status: 200 })
        }
      )
    })
  })

  // TMDB additional info (poster, ...)
  const tmdbRequest = new Promise((resolve, reject) => {
    const ok = { status: 200 }
    if (!ids.tmdb) return resolve(ok)
    const url = `https://api.themoviedb.org/3/tv/${ids.tmdb}`
    const query = `api_key=${TMDB_KEY}`
    const error = new Error(errMsg(ids.tmdb, 'tmdb'))

    const makeRequest = callback => HTTP.get(url, { query }, (err, res) => {
      if (err) {
        if (err.response && err.response.statusCode === 429) {
          const timeout = err.response.headers['retry-after'] * 1000
          Meteor.setTimeout(
            () => makeRequest(tmdbResolve)
          , timeout)
        } else {
          return callback({
            ...error,
            request_url: url,
            response: err.response,
            status: err.response && err.response.statusCode || 500,
          })
        }
      }

      // if no error, return document's new parts
      return callback({
        poster_path: res.data.poster_path && `https://image.tmdb.org/t/p/w500${res.data.poster_path}`,
        last_aired: res.data.last_air_date && new Date(res.data.last_air_date),
      })
    })

    const tmdbResolve = res => {
      if (res.status) return resolve(res)

      Shows.update(
        { _id },
        { $set: res },
        (err, res) => {
          if (err || res !== 1) return reject(error)
          resolve(ok)
        }
      )
    }

    makeRequest(tmdbResolve)
  })

  Promise.all([traktRequest, tmdbRequest])
  .then(res => {
    resolve(worstResult(res))
  })
  .catch(err => reject(err))
})
