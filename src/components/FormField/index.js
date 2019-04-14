import React from 'react'
import PropTypes from 'prop-types'
import cn from 'classnames'

import styles from './formField.module.scss'

const FormField = ({ className, children, ...rest }) => {
  return (
    <div className={cn(styles.wrap, className)} {...rest}>
      {children}
    </div>
  )
}
FormField.propTypes = {
  className: PropTypes.object,
  children: PropTypes.any,
}
FormField.defaultProps = {
  className: {},
  children: null,
}

export default FormField
