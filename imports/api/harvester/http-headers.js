const { TRAKT_CLIENT_ID } = process.env

export default {
  trakt: {
      'Content-type': 'application/json',
      'trakt-api-key': TRAKT_CLIENT_ID,
      'trakt-api-version': 2,
  },
}
