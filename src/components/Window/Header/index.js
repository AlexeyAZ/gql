import React from 'react'
import PropTypes from 'prop-types'

import styles from './header.module.scss'

const Header = ({ switchSidebar }) => {
  return (
    <div className={styles.wrap} onClick={switchSidebar}>
      x
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Header
