import React from 'react'
import PropTypes from 'prop-types'

const Menu = ({ switchSidebar, hideSidebar, showSidebar }) => {
  return (
    <div className={styles.wrap} onClick={switchSidebar}>
      {'<'}
    </div>
  )
}

Menu.propTypes = {
  children: PropTypes.any.isRequired,
}

export default Menu
