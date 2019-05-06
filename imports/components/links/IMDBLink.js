import React from 'react'

const IMDBLink = ({ title, id }) => {
  const href = id && `https://www.imdb.com/title/${id}/`

  return href ? (
    <a
      href={ href }
      target="_blank"
      title={`${title} on IMDB`}
      className="link link_imdb"
    ></a>
  ) : null
}

export default IMDBLink
