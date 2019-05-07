import React from 'react'

const HomepageLink = ({ title, path }) => path ? (
  <a
    href={ path }
    target="_blank"
    title={`${title} homepage`}
    className="link link_home"
  ></a>
) : null

export default HomepageLink
