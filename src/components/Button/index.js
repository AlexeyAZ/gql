import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

const commonWrapStyle = css`
  ${({ theme: { trans, colors, borderRadius }, verticalOffsets }) => css`
    transition: ${trans.default};
    background-color: ${colors.violet.main};
    border-radius: ${borderRadius.default};
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    color: white;
    font-size: 18px;
    line-height: 21px;
    padding-top: ${verticalOffsets && '9px'};
    padding-bottom: ${verticalOffsets && '9px'};
    padding-left: 22px;
    padding-right: 22px;
    &:hover {
      background-color: ${colors.violet.light};
    }
  `}
`

const WrapButton = styled.button`
  ${commonWrapStyle};
  border: none;
  outline: none;
`

const WrapButtonAsLink = styled(NavLink)`
  ${commonWrapStyle};
  display: flex;
  align-items: center;
  text-decoration: none;
`

const Button = ({ to, verticalOffsets, children, ...rest }) => {
  if (to) {
    return (
      <WrapButtonAsLink to={to} verticalOffsets={verticalOffsets} {...rest}>
        {children}
      </WrapButtonAsLink>
    )
  }
  return (
    <WrapButton verticalOffsets={verticalOffsets} {...rest}>
      {children}
    </WrapButton>
  )
}
Button.propTypes = {
  to: PropTypes.string,
  verticalOffsets: PropTypes.bool,
  children: PropTypes.any,
}
Button.defaultProps = {
  to: null,
  verticalOffsets: true,
  children: null,
}
export default Button
