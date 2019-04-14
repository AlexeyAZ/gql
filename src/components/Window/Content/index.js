import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './content.module.scss'

const Content = ({ size, children }) => {
  return (
    <div className={cn(styles.wrap, styles[`wrap-${size}`])}>
      <div className={styles.inner}>{children}</div>
    </div>
  )
}

Content.propTypes = {
  size: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
}

export default Content
