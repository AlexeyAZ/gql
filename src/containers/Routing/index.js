import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'

import PrivateRoute from './PrivateRoute'

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0, duration: 0, beforeChildren: true },
})

const Routing = ({ userIsAuth, redirectUrl, routes }) => {
  return (
    <Route
      render={({ location }) => {
        return (
          <PoseGroup>
            <RouteContainer key={location.pathname}>
              <Switch location={location}>
                {routes.map(route =>
                  route.private ? (
                    <PrivateRoute
                      userIsAuth={userIsAuth}
                      redirectUrl={redirectUrl}
                      key={route.path}
                      {...route}
                    />
                  ) : (
                    <Route {...route} key={route.path} />
                  )
                )}
                {/* <Route component={() => <Page404 supportLink="/support" />} /> */}
              </Switch>
            </RouteContainer>
          </PoseGroup>
        )
      }}
    />
  )
}
Routing.propTypes = {
  redirectUrl: PropTypes.string,
  userIsAuth: PropTypes.bool,
  routes: PropTypes.array,
}
Routing.defaultProps = {
  redirectUrl: '/login',
  userIsAuth: false,
  routes: [],
}

export default Routing
