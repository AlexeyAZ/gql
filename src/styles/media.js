import { css } from 'styled-components'

const media = mediaQueries =>
  Object.keys(mediaQueries).reduce((acc, label) => {
    acc[label] = (...args) => css`
      @media (min-width: ${mediaQueries[label]}px) {
        ${css(...args)}
      }
    `

    return acc
  }, {})

export default media
