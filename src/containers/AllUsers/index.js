import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'

import posed, { PoseGroup } from 'react-pose'

import { Window, Link } from '../../components'

import * as queries from '../../gql/queries'

const Container = posed.div({
  enter: { staggerChildren: 50 },
})

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
    return (
      <Window
        sidebarContent={
          <Fragment>
            {getAllUsers && (
              <ul>
                {getAllUsers.map(user => (
                  <li key={user._id}>
                    <Link to={`/users/${user._id}`}>
                      {user.nickName || user.firstName || user.email}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Fragment>
        }
      >
        {activeUser && <UserInfo data={activeUser} />}
      </Window>
    )
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
