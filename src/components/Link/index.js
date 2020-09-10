import React from 'react'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

const Wrap = styled(RouterLink)`
  ${({
    theme: {
      trans,
      colors: { blue },
    },
  }) => css`
    transition: ${trans.default};
    color: ${blue.darken};
    &:hover {
      color: ${blue.darkest};
    }
  `}
`

const Link = ({ className, children, ...rest }) => {
  return (
    <Wrap className={className} {...rest}>
      {children}
    </Wrap>
  )
}
Link.propTypes = {
  children: PropTypes.any,
}
Link.defaultProps = {
  children: null,
}
export default Link
