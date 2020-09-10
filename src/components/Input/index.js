import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Wrap = styled.div``

const Label = styled.label`
  margin-bottom: 4px;
  display: block;
`

const InputField = styled.input`
  ${({ theme: { trans, borderRadius, colors }, disabled }) => css`
    transition: ${trans.default};
    background-color: ${disabled ? 'rgba(0,0,0,0.1)' : 'white'};
    border-radius: ${borderRadius.default};
    border: none;
    outline: none;
    padding-top: 5px;
    padding-bottom: 6px;
    padding-left: 12px;
    padding-right: 12px;
    width: 100%;
    &::placeholder {
      color: rgba(34, 40, 47, 0.35);
    }
    &:focus {
    }
  `}
`

class Input extends Component {
  state = {
    value: '',
  }

  handleChange = e => {
    const { value } = e.target
    const { onChange } = this.props
    return onChange(value)
  }

  render() {
    const { value } = this.state
    const { disabled, wrapStyle, label, id, onChange, className, ...rest } = this.props
    // const inputValue = this.isControlled ? value : this.state.value
    return (
      <Wrap css={wrapStyle}>
        {label && <Label htmlFor={id}>{label}</Label>}
        <InputField
          value={value}
          id={id}
          onChange={this.handleChange}
          disabled={disabled}
          className={className}
          {...rest}
        />
      </Wrap>
    )
  }
}
Input.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  wrapStyle: PropTypes.array,
  label: PropTypes.any,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
}
Input.defaultProps = {
  value: undefined,
  defaultValue: undefined,
  wrapStyle: [],
  label: null,
  id: null,
  disabled: false,
  className: '',
  onChange: () => {},
}
export default Input
