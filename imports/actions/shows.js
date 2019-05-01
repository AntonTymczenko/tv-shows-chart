export const setTotalShowsCount = (totalCount = 0) => ({
  type: 'SET_TOTAL_SHOWS_COUNT',
  totalCount,
})

export const setCurrentPage = (page = 0) => ({
  type: 'SET_CURRENT_PAGE',
  page,
})
