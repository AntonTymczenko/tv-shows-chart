import React from 'react'

const IMDBLink = ({ id }) => {
  const href = id && `https://www.imdb.com/title/${id}/`

  return href ? (
    <a href={ href } target="_blank">IMDB</a>
  ) : null
}

export default IMDBLink
