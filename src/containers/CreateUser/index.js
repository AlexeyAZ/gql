import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { compose, graphql, withApollo } from 'react-apollo'
import get from 'lodash/get'

import { FormCreateUser } from '../../components/forms'
import { Window } from '../../components/index'

import * as mutations from '../../gql/mutations'
import * as queries from '../../gql/queries'

import { auth } from '../../helpers'

const { getTokenBody, setAuthCookie, setUserIdCookie } = auth

class CreateUser extends Component {
  handleCreateUser = fields => {
    const { createUser, history } = this.props

    createUser({
      variables: {
        nickName: fields.nickName.value,
        firstName: fields.firstName.value,
        lastName: fields.lastName.value,
        email: fields.email.value,
        password: fields.password.value,
      },
    }).then(result => {
      console.log(result)
      const token = get(result, 'data.createUser.token', null)
      const formatToken = getTokenBody(token)
      const id = get(result, 'data.createUser._id', null)
      if (token) {
        setAuthCookie(token)
        setUserIdCookie(id)
        history.push({ pathname: '/user', state: { token: formatToken, id } })
      }
    })
  }

  render() {
    return (
      <Window size="s" autoHeight isSidebarShow={false} isHeaderShow={false}>
        <FormCreateUser onFormSubmit={this.handleCreateUser} />
      </Window>
    )
  }
}

export default compose(
  withRouter,
  withApollo,
  graphql(mutations.users.CREATE_USER, {
    name: 'createUser',
  })
)(CreateUser)
