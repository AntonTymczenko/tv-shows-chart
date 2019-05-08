const showsReducerDefault = {
  sort: { watchers: -1 },
  query: '',
  queryObj: {},
  searchOptions: {
    everywhere: false,
    title: true,
    genres: false,
    overview: false,
  },
  limit: 20,
  totalCount: 0,
  pageMax: 0,
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
    case 'SET_SEARCH_QUERY':
      return {
        ...shows,
        query: action.query,
      }
    case 'SET_SEARCH_QUERY_OBJ':
      return {
        ...shows,
        queryObj: action.queryObj,
      }
    case 'UPDATE_SEARCH_OPTION_EVERYWHERE':
      return {
        ...shows,
        searchOptions: {
          ...shows.searchOptions,
          // set to false if one or more other options are 'false'
          everywhere: !Object.keys(shows.searchOptions)
            .filter(key => !shows.searchOptions[key] && key !== 'everywhere')
            .length
        }
      }
    case 'SET_SEARCH_OPTIONS_ALL_TRUE':
      return {
        ...shows,
        searchOptions: Object.keys(shows.searchOptions)
          .reduce((acc, key) => ({ ...acc, [key]: true }), {})
      }
    case 'SET_SEARCH_OPTIONS_ONLY_TITLE':
      return {
        ...shows,
        searchOptions: {...Object.keys(shows.searchOptions)
          .reduce((acc, key) => ({ ...acc, [key]: false }), {}),
          title: true,
        }
      }
    case 'TOGGLE_SEARCH_OPTION_TITLE':
      return {
        ...shows,
        searchOptions: {
          ...shows.searchOptions,
          title: !shows.searchOptions.title,
        }
      }
    case 'TOGGLE_SEARCH_OPTION_GENRES':
      return {
        ...shows,
        searchOptions: {
          ...shows.searchOptions,
          genres: !shows.searchOptions.genres,
        }
      }
    case 'TOGGLE_SEARCH_OPTION_OVERVIEW':
      return {
        ...shows,
        searchOptions: {
          ...shows.searchOptions,
          overview: !shows.searchOptions.overview,
        }
      }
    case 'ERROR':
      console.error(action.msg)
    default:
      return shows
  }
}
