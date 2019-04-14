import React, { Component } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

import styles from './sidebar.module.scss'

class Sidebar extends Component {
  render() {
    const { show, switchSidebar, hideSidebar, showSidebar, children } = this.props
    return (
      <div className={cn(styles.wrap, { [styles.visible]: show })}>
        {/* <Menu hideSidebar={hideSidebar} showSidebar={showSidebar} switchSidebar={switchSidebar} /> */}
        {children}
      </div>
    )
  }
}
Window.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any.isRequired,
}
Window.defaultProps = {
  show: true,
}

export default Sidebar
