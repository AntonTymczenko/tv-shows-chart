const chartFields = [
  {
    name: 'Poster',
    slug: 'poster',
  }, {
    name: 'Watchers',
    slug: 'watchers',
    reverse: true,
    sortable: true,
  }, {
    name: 'Rating',
    slug: 'rating',
    reverse: true,
    sortable: true,
  }, {
    name: 'Title',
    slug: 'title',
    sortable: true,
    searchable: true,
  }, {
    name: 'Year',
    slug: 'year',
    sortable: true,
  }, {
    name: 'Country',
    slug: 'country',
    sortable: true,
  }, {
    name: 'Genres',
    slug: 'genres',
    searchable: true,
  }, {
    name: 'Overview',
    slug: 'overview',
    searchable: true,
    hidden: true,
  }, {
    name: 'Links',
    slug: 'links'
  }
]
export {
  chartFields,
}
