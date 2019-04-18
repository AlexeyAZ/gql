import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import styled, { css } from 'styled-components'

import { auth } from '../../helpers'

const { logout, userIsAuth } = auth

const Wrap = styled.header`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.4);
  position: absolute;
  left: 0;
  top: 0;
  height: ${props => props.theme.header.height};
  width: 100%;
  z-index: 1;
`

class Header extends Component {
  handleLogout = e => {
    const { history } = this.props
    e.preventDefault()
    logout()
    setTimeout(() => history.push({ location: 'login' }), 500)
  }

  render() {
    const { children } = this.props
    return (
      <Wrap>
        {userIsAuth() && (
          <Fragment>
            <Link to="/user">User</Link>
            <Link to="/users">Get all users</Link>
            <Link onClick={this.handleLogout} to="/login">
              login
            </Link>
            <button onClick={this.handleLogout} type="button">
              Logout
            </button>
          </Fragment>
        )}
        {children}
      </Wrap>
    )
  }
}
Header.propTypes = {
  history: PropTypes.object,
  children: PropTypes.any,
}
Header.defaultProps = {
  history: {},
  children: null,
}
export default withRouter(Header)
