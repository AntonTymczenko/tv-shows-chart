import fetchTrendingOnePage from './fetch-trending-one-page'

export default () => new Promise(async(resolve, reject) => {
    const limit = 1000
    try {
      // fetch first page
      const firstPageResult = await fetchTrendingOnePage(1, limit)
      const { pagesTotal } = firstPageResult

      if (isNaN(pagesTotal) || pagesTotal <= 1) {
        resolve(firstPageResult)
      } else {
        // fetch other pages
        const requests = []
        for (let i = 2; i <= pagesTotal; i++) {
          requests.push(fetchTrendingOnePage(i, limit))
        }
        const res = await Promise.all(requests)
        resolve(res.reduce((acc, r) => ({
          status : r.status === 200 ? 200 : acc.status || 200,
          updated : r.updated + (acc.updated || 0 ),
          inserted : r.inserted + (acc.inserted || 0 ),
        }), {}))
      }

    } catch (err) {
      reject(err)
    }
})
