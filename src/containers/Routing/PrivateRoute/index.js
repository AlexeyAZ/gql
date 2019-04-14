import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ userIsAuth, redirectUrl, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (userIsAuth ? <Component {...props} /> : <Redirect push to={redirectUrl} />)}
  />
)

PrivateRoute.propTypes = {
  redirectUrl: PropTypes.string,
  userIsAuth: PropTypes.bool,
}

PrivateRoute.defaultProps = {
  redirectUrl: '/login',
  userIsAuth: false,
}

export default PrivateRoute
