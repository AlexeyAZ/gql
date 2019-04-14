import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import styles from './sidebar.module.scss'

const Sidebar = ({ show, ...rest }) => {
  return (
    <div className={styles.wrap} {...rest}>
      Sidebar
    </div>
  )
}

Sidebar.propTypes = {}

export default Sidebar
