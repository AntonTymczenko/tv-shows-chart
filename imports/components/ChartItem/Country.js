import React from 'react';
import countryFlagEmoji from 'country-flag-emoji';

const Country = ({ countryCode }) => {
  if (!countryCode) return null
  const knownCountry = countryFlagEmoji.get(countryCode)
  const name = typeof knownCountry === 'object' && knownCountry.name
  const src = `https://flagpedia.net/data/flags/small/${countryCode}.png`
  return name ? (
    <img
      className="flag"
      src={src}
      title={name}
      alt={name}
    />
    )
    : <span>{ countryCode }</span>
}

export default Country
