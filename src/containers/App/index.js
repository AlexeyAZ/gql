import React, { Component } from 'react'
import { Router } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ThemeProvider } from 'styled-components'

import client from '../../gql/client'
import { history } from '../../config'

import { Layout } from '../index'

const common = {
  layout: {
    gradient:
      'linear-gradient(233.59deg, #FFEBEB 0.84%, #FADAE5 9.84%, #EACBE9 21.25%, #CAC1F0 34.48%, #98BCF3 51.35%, #75B1E4 62.51%, #51A6D2 75.35%, #259BBE 88.35%, #2586A4 102.04%, #25728A 116.92%, #235F72 130.18%, #204C5A 144.61%)',
  },
  sidebar: {
    width: '50px',
  },
  header: {
    height: '50px',
  },
  footer: {
    height: '50px',
  },
}
const theme = {
  main: {},
  secondary: {},
}

class App extends Component {
  render() {
    const siteTheme = { ...theme['main'], ...common }
    return (
      <ApolloProvider client={client}>
        <ThemeProvider theme={siteTheme}>
          <Router history={history}>
            <Layout />
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    )
  }
}

export default App
