import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { compose, graphql, withApollo } from 'react-apollo'
import get from 'lodash/get'

import { FormCreateUser } from '../../components/forms'
import { Window } from '../../components/index'

import * as mutations from '../../gql/mutations'

import { auth } from '../../helpers'

const { getTokenBody, setAuthToken, setUserId } = auth

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
      const token = get(result, 'data.createUser.token', null)
      const formatToken = getTokenBody(token)
      const id = get(result, 'data.createUser._id', null)
      if (token) {
        setAuthToken(token)
        setUserId(id)
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
CreateUser.propTypes = {
  createUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
}
export default compose(
  withRouter,
  withApollo,
  graphql(mutations.users.CREATE_USER, {
    name: 'createUser',
  })
)(CreateUser)
