import { Shows } from '/imports/api/collections';

export const setLimit = (limitPerPage = 20) => {
  return dispatch => {
    const limit = parseInt(limitPerPage)
    if (isNaN(limit)) {
      // TODO: some error
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
