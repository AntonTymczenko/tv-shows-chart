import { Shows } from '/imports/api/collections';

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

export const fetchCurrentPage = () => {
  return (dispatch, getState) => {
    const { sort, page, limit } = getState().shows

    const data = Shows.find({}, {
      sort,
      skip: limit * page,
      limit,
    }).fetch()
    // console.log('fetched page ', page , 'length:', data.length)

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
