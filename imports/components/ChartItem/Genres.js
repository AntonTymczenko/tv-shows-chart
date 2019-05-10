import React from 'react';

const Genres = ({ genres }) => {
  return genres.length ?
    <span>
      { genres.reduce((acc, g, i) =>
        acc + g + (i !== (genres.length - 1) ? ', ' : '')
      ,'')}
    </span>
    : null
}

export default Genres
