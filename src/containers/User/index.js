import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import posed, { PoseGroup } from 'react-pose'

import * as queries from '../../gql/queries'

import { Window } from '../../components'

import { auth } from '../../helpers'

const { getUserId } = auth

const Container = posed.div({
  enter: { staggerChildren: 50 },
})

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

export default compose(
  graphql(queries.users.GET_USER, {
    name: 'user',
    options: props => {
      console.log(get(props, 'location.state.id', null))
      console.log(getUserId())
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
