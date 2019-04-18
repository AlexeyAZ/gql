import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'

import { Redirect } from '../../../components/index'

const PrivateRoute = ({ userIsAuth, redirectUrl, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (userIsAuth ? <Component {...props} /> : <Redirect to={redirectUrl} />)}
  />
)
PrivateRoute.propTypes = {
  userIsAuth: PropTypes.bool,
  redirectUrl: PropTypes.string,
  component: PropTypes.any.isRequired,
}
PrivateRoute.defaultProps = {
  userIsAuth: false,
  redirectUrl: '/login',
}
export default PrivateRoute
