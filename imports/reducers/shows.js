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
    case 'SET_TOTAL_SHOWS_COUNT':
      return {
        ...shows,
        totalCount: action.totalCount,
        pageMax: Math.floor(action.totalCount / shows.limit),
      }
    case 'SET_CURRENT_PAGE':
      return {
        ...shows,
        page: action.page,
      }
    default:
      return shows
  }
}
