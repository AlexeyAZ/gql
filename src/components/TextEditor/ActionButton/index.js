import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { EditorButton } from '..'

const ActionButton = ({ disabled, cmd, arg, name, className, children, ...rest }) => {
  return (
    <EditorButton
      disabled={disabled}
      className={className}
      type="button"
      key={cmd}
      onMouseDown={evt => {
        evt.preventDefault()
        document.execCommand(cmd, false, arg)
      }}
      {...rest}
    >
      {children}
    </EditorButton>
  )
}

ActionButton.propTypes = {
  disabled: PropTypes.bool,
  cmd: PropTypes.string,
  arg: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.any,
}
ActionButton.defaultProps = {
  disabled: false,
  cmd: '',
  arg: '',
  name: '',
  className: '',
  children: null,
}

export default ActionButton
