const { TRAKT_CLIENT_ID, TMDB_TOKEN } = process.env

export default {
  trakt: {
      'Content-type': 'application/json',
      'trakt-api-key': TRAKT_CLIENT_ID,
      'trakt-api-version': 2,
  },
  tmdb: {
    'Authorization': `Bearer ${TMDB_TOKEN}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
}
