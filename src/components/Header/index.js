import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import { auth } from '../../helpers'

import styles from './header.module.scss'

const { logout, userIsAuth } = auth

class Header extends Component {
  handleLogout = e => {
    const { history } = this.props
    e.preventDefault()
    logout()
    history.replace({ location: 'login' })
  }
  render() {
    const { children } = this.props
    return (
      <header className={styles.wrap}>
        {userIsAuth() && (
          <Fragment>
            <Link to="/user">User</Link>
            <Link to="/users">Get all users</Link>
            <button onClick={this.handleLogout}>Logout</button>
          </Fragment>
        )}
        {children}
      </header>
    )
  }
}

Header.propTypes = {}

export default withRouter(Header)
