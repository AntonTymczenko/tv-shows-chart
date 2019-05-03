import { HTTP } from 'meteor/http';
import saveOneShow from './save-one'
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
      const inserted = res.reduce((acc, i) => i ? acc + 1 : acc, 0)
      resolve({
        status: 200,
        inserted,
        updated: toSave.length - inserted,
        pagesTotal,
      })
    })
    .catch(err => reject(err))
  })
})
