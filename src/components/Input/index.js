import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from './input.module.scss'

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
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input className={styles.field} id={id} onChange={this.handleChange} value={value} />
      </div>
    )
  }
}

Input.propTypes = {}
export default Input
