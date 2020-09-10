import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import posed from 'react-pose'
import styled from 'styled-components'

import { Content } from '../../components'

import PrivateRoute from './PrivateRoute'

const RouteWrap = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 },
})

const StyledWrap = styled(RouteWrap)`
  overflow: hidden;
  position: relative;
  height: 100%;
`

const Routing = ({ userIsAuth, redirectUrl, routes }) => {
  return (
    // <Route
    //   render={({ location }) => {
    //     return (
    // <PoseGroup animateOnMount>
    <StyledWrap>
      <Content>
        <Switch>
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
      </Content>
    </StyledWrap>
    // </PoseGroup>
    //     )
    //   }}
    // />
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
