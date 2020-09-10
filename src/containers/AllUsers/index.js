import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'

import { Window } from '../../components'

import * as queries from '../../gql/queries'

const dataTemplate = {
  email: 'Email',
  firstName: 'Name',
  lastName: 'Lastname',
}

const UserInfo = ({ data }) => (
  <table style={{ borderCollapse: 'collapse' }}>
    <tbody>
      {Object.keys(dataTemplate).map(item => (
        <tr key={item}>
          <td>
            <p>{dataTemplate[item]}</p>
          </td>
          <td>
            <p>{data[item]}</p>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)
UserInfo.propTypes = {
  data: PropTypes.object.isRequired,
}

class AllUsers extends Component {
  render() {
    const {
      users: { getAllUsers },
      match,
    } = this.props
    const activeUser =
      getAllUsers &&
      get(match, 'params.id', null) &&
      getAllUsers.find(item => item._id === match.params.id)

    const sidebarData =
      getAllUsers &&
      getAllUsers.length > 0 &&
      getAllUsers.map(({ _id, nickName, firstName, email }) => ({
        key: _id,
        title: nickName || firstName || email,
        href: `/users/${_id}`,
      }))
    return <Window sidebarData={sidebarData}>{activeUser && <UserInfo data={activeUser} />}</Window>
  }
}

export default compose(
  withRouter,
  graphql(queries.users.GET_ALL_USERS, {
    name: 'users',
    options: {
      fetchPolicy: 'network-only',
    },
  })
)(AllUsers)
