import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { compose, graphql, withApollo } from 'react-apollo'
import { withRouter } from 'react-router'
import get from 'lodash/get'

import { Header, Footer, Modal } from '../../components/index'
import { FormLogin } from '../../components/forms'
import { Routing } from '../index'

import { auth } from '../../helpers'

import routes from '../../routes'

import * as queries from '../../gql/queries'
import * as mutations from '../../gql/mutations'

const { setAuthToken, setUserId } = auth

const { userIsAuth } = auth

const Wrap = styled.div`
  ${props =>
    css`
      padding-top: ${props.theme.header.height};
      padding-bottom: ${props.theme.footer.height};
      position: relative;
      height: 100%;
    `}
  ${props =>
    props.isAuth
      ? css`
          background-image: ${props.theme.layout.gradient};
        `
      : css`
          background-image: url('/img/login-bg.jpg');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
        `};
`

const Container = styled.div`
  overflow: auto;
  position: relative;
  height: 100%;
`

class Layout extends Component {
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
        const id = get(result, 'data.loginUser._id', null)
        if (token) {
          setAuthToken(token)
          setUserId(id)
          client
            .mutate({
              mutation: mutations.auth.SET_AUTH_STATUS,
              variables: {
                status: true,
              },
            })
            .then(result => {
              history.replace({ pathname: window.location.pathname })
            })
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const {
      auth: {
        auth: { status },
      },
    } = this.props
    const isAuth = userIsAuth()
    return (
      <Wrap isAuth={isAuth}>
        {!status && (
          <Modal>
            <FormLogin onFormSubmit={this.handleSubmit} />
          </Modal>
        )}
        <Header />
        <Container>
          {status && <Routing routes={routes} userIsAuth={isAuth} status={status} />}
        </Container>
        <Footer />
      </Wrap>
    )
  }
}
Layout.propTypes = {
  auth: PropTypes.object.isRequired,
  client: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default compose(
  withRouter,
  withApollo,
  graphql(queries.auth.GET_AUTH_STATUS, {
    name: 'auth',
  }),
  graphql(mutations.auth.SET_AUTH_STATUS, {
    name: 'setAuth',
  })
)(Layout)
