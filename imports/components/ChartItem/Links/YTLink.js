import React from 'react'

const YTLink = ({ title, path }) => path ? (
  <a
    href={ path }
    target="_blank"
    title={`${title} trailer on YouTube`}
    className="link link_yt"
  ></a>
) : null

export default YTLink
