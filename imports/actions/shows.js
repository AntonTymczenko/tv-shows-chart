import { Shows } from '/imports/api/collections';
import { chartFields } from '/imports/constants';

const showError = (msg = 'Unknown error in actions') => ({
  type: 'ERROR',
  msg,
})

export const setLimit = (limitPerPage = 20) => {
  return dispatch => {
    const limit = parseInt(limitPerPage)
    if (isNaN(limit)) {
      dispatch(showError('Limit per page should be an integer'))
    } else {
      dispatch({
        type: 'SET_LIMIT',
        limit,
      })
      dispatch(setCurrentPage(0))
    }
  }
}

export const setTotalShowsCount = (totalCount = 0) => {
  return (dispatch, getState) => {
    dispatch ({
      type: 'SET_TOTAL_SHOWS_COUNT',
      totalCount,
    })
    dispatch(fetchCurrentPage())
  }
}

export const fetchCurrentPage = () => {
  return (dispatch, getState) => {
    const { sort, page, limit, queryObj } = getState().shows

    const data = Shows.find(queryObj, {
      sort,
      skip: limit * page,
      limit,
    }).fetch()

    dispatch ({
      type: 'FETCH_CURRENT_PAGE',
      data,
    })
  }
}

export const setCurrentPage = (page = 0) => {
  return dispatch => {
    dispatch({
      type: 'SET_CURRENT_PAGE',
      page,
    })
    dispatch(fetchCurrentPage())
  }
}

const setSortOrder = (slug, order) => {
  return dispatch => {
    dispatch({
      type: 'SET_SORT_TYPE',
      sort: {
        [slug]: order,
      },
    })
    dispatch(setCurrentPage(0))
  }
}

const getFullSortingField = slug =>
  chartFields.find(field => field.slug === slug)

const getDistructuredSort = sortObj => {
  const type = Object.keys(sortObj)[0]
  const order = sortObj[type]
  return {
    type,
    order,
  }
}

export const handleSortChange = (slug) => {
  return (dispatch, getState) => {
    const field = getFullSortingField(slug)
    const isLegitSlug = field && field.sortable
    if (!isLegitSlug) {
      dispatch(showError(`Sorting slug ${slug} not found in sortable 'chartFields'`))
    } else {
      const { type, order } = getDistructuredSort(getState().shows.sort)
      const theSame = type === slug

      const defaultOrder = field && field.reverse ? -1 : 1

      const newOrder = theSame ? order * -1 : defaultOrder
      dispatch(setSortOrder(slug, newOrder))
    }
  }
}

export const setSearchQueryText = query => ({
  type: 'SET_SEARCH_QUERY',
  query,
})

export const setSearchQueryObject = () => {
  return (dispatch, getState) => {
    const queryObj = {}
    const trimmedQuery = getState().shows.query.trim()
    if (trimmedQuery) {
      const regex = new RegExp(trimmedQuery, 'i')
      queryObj['$or'] = []
      const options = getState().shows.searchOptions
      const optionKeysActive = Object.keys(options)
        .filter(name => options[name])
      for (let key of optionKeysActive) {
        queryObj['$or'].push({ [key]: regex })
      }
      if (!queryObj['$or'].length) delete queryObj['$or']
    }
    dispatch({
      type: 'SET_SEARCH_QUERY_OBJ',
      queryObj,
    })
  }
}

export const setSearchQuery = query => {
  return dispatch => {
    dispatch(setSearchQueryText(query))
    dispatch(setCurrentPage(0))
    dispatch(setSearchQueryObject())
  }
}

export const toggleSearchOption = name => {
  return (dispatch, getState) => {
    const options = getState().shows.searchOptions
    // don't allow to turn off all checkboxes:
    const totalOptionsTurnedOn = Object.keys(options)
      .map(key => !!options[key])
      .reduce((acc, o) => o ? acc + 1 : acc, 0)
    let madeSomeChange = false
    switch (name) {
      case 'everywhere':
        if (!options.everywhere) {
          dispatch({
            type: 'SET_SEARCH_OPTIONS_ALL_TRUE'
          })
        } else {
          dispatch({
            type: 'SET_SEARCH_OPTIONS_ONLY_TITLE'
          })
        }
        madeSomeChange = true
        break;
      case 'title':
        if (!options.title || totalOptionsTurnedOn > 1) {
          dispatch({
            type: 'TOGGLE_SEARCH_OPTION_TITLE',
          })
          dispatch({
            type: 'UPDATE_SEARCH_OPTION_EVERYWHERE'
          })
          madeSomeChange = true
        }
        break;
      case 'genres':
        if (!options.genres || totalOptionsTurnedOn > 1) {
          dispatch({
            type: 'TOGGLE_SEARCH_OPTION_GENRES',
          })
          dispatch({
            type: 'UPDATE_SEARCH_OPTION_EVERYWHERE'
          })
          madeSomeChange = true
        }
        break;
      case 'overview':
        if (!options.overview || totalOptionsTurnedOn > 1) {
          dispatch({
            type: 'TOGGLE_SEARCH_OPTION_OVERVIEW',
          })
          dispatch({
            type: 'UPDATE_SEARCH_OPTION_EVERYWHERE'
          })
          madeSomeChange = true
        }
        break;
      default:
        return dispatch(showError(`No such search option ${name} to toggle in state`))
    }
    if (madeSomeChange) dispatch(setSearchQueryObject())
  }
}
