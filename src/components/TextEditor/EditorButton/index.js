import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Button = styled.button`
  ${({ disabled }) => css`
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    height: 18px;
    width: 18px;
    ${disabled &&
      css`
        /* pointer-events: none;
      user-select: none; */
      `}
  `}
`

const EditorButton = ({ disabled, className, children, ...rest }) => {
  return (
    <Button disabled={disabled} className={className} {...rest}>
      {children}
    </Button>
  )
}

EditorButton.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.any,
}
EditorButton.defaultProps = {
  disabled: false,
  className: '',
  children: null,
}

export default EditorButton
