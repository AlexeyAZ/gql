import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './button.module.less'
import vars from '../../styles/_variables.module.less'
console.log(vars)

const Button = ({ className, children, ...rest }) => {
  return (
    <button className={cn(styles.wrap, className)} {...rest}>
      {children}
    </button>
  )
}
Button.propTypes = {
  className: PropTypes.object,
  children: PropTypes.any,
}
Button.defaultProps = {
  className: {},
  children: null,
}

export default Button
