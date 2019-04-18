import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Wrap = styled.button`
  ${({ theme: { trans, colors, borderRadius } }) => css`
    transition: ${trans.default};
    background-color: ${colors.violet.main};
    border-radius: ${borderRadius.default};
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    border: none;
    outline: none;
    color: white;
    font-size: 22px;
    line-height: 26px;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 22px;
    padding-right: 22px;
  `}
`

const Button = ({ children }) => {
  return <Wrap>{children}</Wrap>
}
Button.propTypes = {
  children: PropTypes.any,
}
Button.defaultProps = {
  children: null,
}
export default Button
