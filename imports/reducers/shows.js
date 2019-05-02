const showsReducerDefault = {
  sort: { watchers: -1 },
  limit: 20,
  totalCount: 0,
  pageMax: -1,
  page: 0,
  data: [],
}

export default (shows = showsReducerDefault, action) => {
  switch (action.type) {
    case 'SET_SORT_TYPE':
      return {
        ...shows,
        sort: action.sort,
      }
    case 'SET_TOTAL_SHOWS_COUNT':
      return {
        ...shows,
        totalCount: action.totalCount,
        pageMax: Math.floor(action.totalCount / shows.limit),
      }
    case 'SET_LIMIT':
      return {
        ...shows,
        limit: action.limit,
        pageMax: Math.floor(shows.totalCount / action.limit),
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...shows,
        page: action.page,
      }
    case 'FETCH_CURRENT_PAGE':
      return {
        ...shows,
        data: action.data,
      }
    case 'ERROR':
      console.error(action.msg)
    default:
      return shows
  }
}
