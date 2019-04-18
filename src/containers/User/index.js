import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'

import * as queries from '../../gql/queries'

import { Window } from '../../components'

import { auth } from '../../helpers'

const { getUserId } = auth

const dataTemplate = {
  email: 'Email',
  firstName: 'Имя',
  lastName: 'Фамилия',
}

class User extends Component {
  render() {
    const {
      user: { getUser },
    } = this.props

    return (
      <Window>
        {getUser && (
          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              {Object.keys(dataTemplate).map(item => (
                <tr key={item}>
                  <td>
                    <p>{dataTemplate[item]}</p>
                  </td>
                  <td>
                    <p>{getUser[item]}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Window>
    )
  }
}
User.propTypes = {
  user: PropTypes.object.isRequired,
}

export default compose(
  graphql(queries.users.GET_USER, {
    name: 'user',
    options: props => {
      return {
        fetchPolicy: 'network-only',
        variables: { id: get(props, 'location.state.id', null) || getUserId() },
        // context: {
        //   headers: {
        //     Authorization: get(props, 'location.state.token', null) || getAuthToken()
        //   }
        // }
      }
    },
  })
)(User)
