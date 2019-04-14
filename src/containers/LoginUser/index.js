import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { graphql, compose, withApollo } from 'react-apollo'
import get from 'lodash/get'

import { Window } from '../../components/index'

import * as queries from '../../gql/queries'
import * as mutations from '../../gql/mutations'

import { auth } from '../../helpers'

import { FormLogin } from '../../components/forms'

import styles from './loginUser.module.scss'
import { ReactComponent as Logo } from '../../images/logo/logo-main.svg'

const { getTokenBody, setAuthCookie, setUserIdCookie } = auth

class LoginUser extends Component {
  // componentDidMount() {
  //   const { hideSidebar } = this.props
  //   hideSidebar()
  // }
  handleSwitchSidebar = e => {
    e.preventDefault()
    this.props.switchSidebar()
  }

  handleSubmit = fields => {
    const { loginUser, client, location, history } = this.props
    client
      .query({
        query: queries.users.LOGIN_USER,
        variables: {
          email: fields.email.value,
          password: fields.password.value,
        },
        fetchPolicy: 'network-only',
      })
      .then(result => {
        console.log(result)
        const token = get(result, 'data.loginUser.token', null)
        const formatToken = getTokenBody(token)
        const id = get(result, 'data.loginUser._id', null)
        if (token) {
          setAuthCookie(token)
          setUserIdCookie(id)
          history.push({ pathname: '/user', state: { token: formatToken, id } })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      // <div className={styles.wrap}>
      //   <Logo />
      <Window size="s" autoHeight isSidebarShow={false} isHeaderShow={false}>
        <FormLogin onFormSubmit={this.handleSubmit} />
      </Window>
      // </div>
    )
  }
}

export default withRouter(
  compose(
    withApollo,
    graphql(mutations.windows.SWITCH_SIDEBAR, {
      name: 'switchSidebar',
    })
  )(LoginUser)
)
