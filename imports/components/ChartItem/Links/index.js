import React from 'react'

import IMDBLink from './IMDBLink';
import YTLink from './YTLink';
import HomepageLink from './HomepageLink';

const Links = ({ title, imdb, trailer, homepage }) => (
  <>
    <IMDBLink
      id={imdb}
      title={title}
    />
    <YTLink
      path={trailer}
      title={title}
    />
    <HomepageLink
      path={homepage}
      title={title}
    />
  </>
)

export default Links
