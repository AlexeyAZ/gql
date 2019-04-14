import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { auth } from '../../helpers'

import styles from './modal.module.scss'

const { logout, userIsAuth } = auth

class Modal extends Component {
  render() {
    const { children } = this.props
    return (
      <div className={styles.wrap}>
        <div className={styles.container}>{children}</div>
      </div>
    )
  }
}

Modal.propTypes = {}

export default Modal
