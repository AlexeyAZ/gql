import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'
import { Link as RouterLink } from 'react-router-dom'

import styles from './link.module.scss'

const Link = ({ className, children, ...rest }) => {
  return (
    <RouterLink className={cn(styles.link, className)} {...rest}>
      {children}
    </RouterLink>
  )
}
Link.propTypes = {
  className: PropTypes.object,
  children: PropTypes.any,
}
Link.defaultProps = {
  className: {},
  children: null,
}

export default Link
