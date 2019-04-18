import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Label = styled.label`
  margin-bottom: 4px;
  display: block;
`

const InputField = styled.input`
  ${({ theme: { trans, borderRadius } }) => css`
    transition: ${trans.default};
    background-color: white;
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
    this.setState({ value })
    onChange(value)
  }

  render() {
    const { value } = this.state
    const { label, id } = this.props
    return (
      <div>
        <Label htmlFor={id}>{label}</Label>
        <InputField id={id} onChange={this.handleChange} value={value} />
      </div>
    )
  }
}
Input.propTypes = {
  label: PropTypes.any,
  id: PropTypes.string,
  onChange: PropTypes.func,
}
Input.defaultProps = {
  label: null,
  id: null,
  onChange: () => {},
}
export default Input
