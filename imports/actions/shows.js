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
    const { page, limit, data } = getState().shows
    const currentPageFirstIndex = page * limit
    const currentPageLastIndex = ((page + 1) * limit) - 1
    const maxIndex = totalCount - 1
    const updatedDataHasImpactOnCurrentPage =
      maxIndex >= currentPageFirstIndex && maxIndex <= currentPageLastIndex ||
      maxIndex > currentPageLastIndex && data.length !== limit

    if (updatedDataHasImpactOnCurrentPage) dispatch(fetchCurrentPage())
  }
}

const fetchCurrentPage = () => {
  return (dispatch, getState) => {
    const { sort, page, limit } = getState().shows

    const data = Shows.find({}, {
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
