import { HTTP } from 'meteor/http';
import saveOneShow from './save-one'
import fetchOneShowSummary from './fetch-one-show-summary';
import headers from './http-headers';

export default (page, limit) => new Promise((resolve, reject) => {
  const url = 'https://api.trakt.tv/shows/trending'

  const query = `page=${page}&limit=${limit}`

  HTTP.get(url, { headers, query }, (err, res) => {
    if (err) return resolve({
      ...err,
      status: err.response && err.response.statusCode || 500,
    })

    const pagesTotal = res.headers['x-pagination-page-count']

    const toSave = res.data.map(show => ({
      ...show.show,
      watchers: show.watchers,
    }))

    Promise.all(toSave.map(show => saveOneShow(show)))
    .then(res => {
      const inserted = res.reduce((acc, show) => show._id ? acc.concat(show) : acc, [])
      const result = {
        status: 200,
        updated: toSave.length - inserted.length,
        inserted: inserted.length,
        pagesTotal,
      }
      if (inserted.length) {
        Promise.all(inserted.map(show => fetchOneShowSummary(show)))
        .then(res => {
          return resolve(result)
        })
        .catch(err => reject(err))
      } else {
        return resolve(result)
      }
    })
    .catch(err => reject(err))
  })
})
