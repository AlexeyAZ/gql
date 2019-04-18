import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose, withApollo } from 'react-apollo'
import get from 'lodash/get'

import { Window } from '../../components/index'

import * as queries from '../../gql/queries'
import * as mutations from '../../gql/mutations'

import { auth } from '../../helpers'

import { FormLogin } from '../../components/forms'

const { getTokenBody, setAuthCookie, setUserIdCookie } = auth

class LoginUser extends Component {
  handleSwitchSidebar = e => {
    const { switchSidebar } = this.props
    e.preventDefault()
    switchSidebar()
  }

  handleSubmit = fields => {
    const { client, history } = this.props
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
      <Window size="s" autoHeight isSidebarShow={false} isHeaderShow={false}>
        <FormLogin onFormSubmit={this.handleSubmit} />
      </Window>
    )
  }
}
LoginUser.propTypes = {
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  switchSidebar: PropTypes.func,
}
LoginUser.defaultProps = {
  switchSidebar: () => {},
}
export default compose(
  withApollo,
  graphql(mutations.windows.SWITCH_SIDEBAR, {
    name: 'switchSidebar',
  })
)(LoginUser)
