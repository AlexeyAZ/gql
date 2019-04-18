import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import styled, { css } from 'styled-components'

import * as queries from '../../gql/queries'
import * as mutations from '../../gql/mutations'

import Sidebar from './Sidebar'
import Content from './Content'
import Header from './Header'

const Wrap = styled.div`
  position: relative;
  height: 100%;
`

class Window extends Component {
  componentDidMount() {
    const { isSidebarShow, hideSidebar, showSidebar } = this.props
    if (isSidebarShow) {
      return showSidebar()
    }
    return hideSidebar()
  }

  render() {
    const {
      size,
      autoHeight,
      isHeaderShow,
      windows,
      children,
      sidebarContent,
      switchSidebar,
      hideSidebar,
      showSidebar,
    } = this.props
    return (
      <Wrap>
        {isHeaderShow && (
          <Header
            switchSidebar={switchSidebar}
            hideSidebar={hideSidebar}
            showSidebar={showSidebar}
          />
        )}
        <Sidebar show={windows.windows.sidebar}>{sidebarContent}</Sidebar>
        <Content withSidebar={windows.windows.sidebar} size={size}>
          {children}
        </Content>
      </Wrap>
    )
  }
}
Window.propTypes = {
  windows: PropTypes.object,
  autoHeight: PropTypes.bool,
  sidebarContent: PropTypes.any,
  isSidebarShow: PropTypes.bool,
  isHeaderShow: PropTypes.bool,
  children: PropTypes.any,
  switchSidebar: PropTypes.func,
  hideSidebar: PropTypes.func,
  showSidebar: PropTypes.func,
}
Window.defaultProps = {
  windows: {},
  autoHeight: false,
  sidebarContent: null,
  isSidebarShow: true,
  isHeaderShow: true,
  children: null,
  switchSidebar: () => {},
  hideSidebar: () => {},
  showSidebar: () => {},
}

export default compose(
  graphql(queries.windows.GET_WINDOWS_DATA, {
    name: 'windows',
  }),
  graphql(mutations.windows.SWITCH_SIDEBAR, {
    name: 'switchSidebar',
  }),
  graphql(mutations.windows.HIDE_SIDEBAR, {
    name: 'hideSidebar',
  }),
  graphql(mutations.windows.SHOW_SIDEBAR, {
    name: 'showSidebar',
  })
)(Window)
