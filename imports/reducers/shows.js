import { Shows } from '/imports/api/collections';

const showsReducerDefault = {
  sort: { rating: -1 },
  limit: 20,
  totalCount: 0,
  pageMax: -1,
  page: 0,
  data: [],
}

export default (shows = showsReducerDefault, action) => {
  switch (action.type) {
    case 'SET_TOTAL_SHOWS_COUNT':
      const { totalCount } = action
      const pageMax = Math.floor(totalCount / shows.limit)
      return {
        ...shows,
        totalCount,
        pageMax,
      }
    case 'SET_CURRENT_PAGE':
      const { page } = action
      const { limit, sort } = shows
      const skip = limit * page

      const data = Shows.find({}, {
        sort,
        skip,
        limit,
      }).fetch()

      return {
        ...shows,
        page,
        data,
      }
    default:
      return shows
  }
}
