import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Country from './Country'
import Genres from './Genres'
import Links from './Links'

const roundedRating = rating => Math.round((rating || 0 ) * 100) / 100

function ChartItem({show}) {
  return (
  <div className="row chart__item">
    <div
      className={classNames('cell', 'cell_poster', {
        'no-poster': !show.poster_path
      })}
    >
      <img
        className="poster"
        src={show.poster_path || '/no-image.png'}
        alt={show.poster_path ? show.title + ' poster' : 'No poster available'}
      />
    </div>
    <div className="cell cell_watchers">
      { show.watchers }
    </div>
    <div className="cell cell_rating">
      { roundedRating(show.rating) }
    </div>
    <div className="cell cell_title">
      { show.title }
    </div>
    <div className="cell cell_year">
      { show.year }
    </div>
    <div className="cell cell_country">
      <Country countryCode={show.country} />
    </div>
    <div className="cell cell_genres">
      <p className="legend">Genres: </p>
      <Genres genres={show.genres} />
    </div>
    <div className="cell cell_links">
      <Links
        title={show.title}
        imdb={show.ids.imdb}
        homepage={show.homepage}
        trailer={show.trailer}
      />
    </div>
    <div className="cell cell_compact">
      <p>
        <span className="compact-info">
          <span className="compact-info__label">
            Watchers:
          </span>
          { show.watchers }
        </span>
        <span className="compact-info">
          <span className="compact-info__label">
            Rating:
          </span>
          { roundedRating(show.rating) }
        </span>
      </p>
      <p>
        <span className="compact-info">
          <span className="compact-info__label">
            Year:
          </span>
          { show.year }
        </span>
        <span className="compact-info">
          <span className="compact-info__label">
            Country:
          </span>
          <Country countryCode={show.country} />
        </span>
      </p>
      <p>
        <Links
          title={show.title}
          imdb={show.ids.imdb}
          homepage={show.homepage}
          trailer={show.trailer}
        />
      </p>
    </div>
  </div>
  )
}

ChartItem.propTypes = {
  show: PropTypes.shape({
    watchers: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    ids: PropTypes.shape({
      imdb: PropTypes.string,
    }),
    homepage: PropTypes.string,
    trailer: PropTypes.string,
  }).isRequired,
};

export default ChartItem
