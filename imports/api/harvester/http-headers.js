const { TRAKT_CLIENT_ID } = process.env

export default {
    'Content-type': 'application/json',
    'trakt-api-key': TRAKT_CLIENT_ID,
    'trakt-api-version': 2,
}
