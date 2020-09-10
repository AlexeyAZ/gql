import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import styled, { css } from 'styled-components'

import * as queries from '../../../gql/queries'
import * as mutations from '../../../gql/mutations'

import { Sidebar, Content, Header } from '..'

const Wrap = styled.div`
  ${({ theme: { window }, size, autoHeight }) => css`
    background-color: rgba(255, 255, 255, 0.4);
    margin-left: auto;
    margin-right: auto;
    position: relative;
    max-width: ${window.size[size]};
    height: ${autoHeight ? 'auto' : '100%'};
  `}
`

const Body = styled.div`
  ${({ theme: { window } }) => css`
    position: relative;
    height: calc(100% - ${window.header.height});
  `}
`

class Window extends Component {
  componentDidMount() {
    const { isSidebarShow, hideSidebar, showSidebar } = this.props
    if (isSidebarShow) {
      return showSidebar()
    }
    return hideSidebar()
  }

  componentDidUpdate(prevProps) {
    const { isSidebarShow, hideSidebar, showSidebar } = this.props
    if (prevProps.isSidebarShow !== isSidebarShow) {
      if (isSidebarShow) {
        return showSidebar()
      }
      return hideSidebar()
    }
  }

  render() {
    const {
      size,
      windows,
      autoHeight,
      isHeaderShow,
      headerContent,
      sidebarData,
      customContentContainer,
      contentContainerStyle,
      children,
      sidebarContent,
      onSwitchSidebar,
      switchSidebar,
      hideSidebar,
      showSidebar,
      showMobileSidebar,
    } = this.props
    return (
      <Wrap size={size} autoHeight={autoHeight}>
        {isHeaderShow && (
          <Header
            content={headerContent}
            onSwitchSidebar={onSwitchSidebar}
            isSidebarShow={windows.windows.sidebar}
            switchSidebar={switchSidebar}
            hideSidebar={hideSidebar}
            showSidebar={showSidebar}
          />
        )}
        <Body>
          <Sidebar data={sidebarData} showMobile={showMobileSidebar} show={windows.windows.sidebar}>
            {sidebarContent}
          </Sidebar>
          <Content
            containerStyle={contentContainerStyle}
            customContent={customContentContainer}
            withHeader={isHeaderShow}
            withSidebar={windows.windows.sidebar}
            size={size}
          >
            {children}
          </Content>
        </Body>
      </Wrap>
    )
  }
}
Window.propTypes = {
  size: PropTypes.string,
  windows: PropTypes.object,
  autoHeight: PropTypes.bool,
  sidebarContent: PropTypes.any,
  isSidebarShow: PropTypes.bool,
  isHeaderShow: PropTypes.bool,
  showMobileSidebar: PropTypes.bool,
  headerContent: PropTypes.any,
  sidebarData: PropTypes.array,
  customContentContainer: PropTypes.any,
  children: PropTypes.any,
  onSwitchSidebar: PropTypes.func,
  switchSidebar: PropTypes.func,
  hideSidebar: PropTypes.func,
  showSidebar: PropTypes.func,
}
Window.defaultProps = {
  size: 'xl',
  windows: {},
  autoHeight: false,
  sidebarContent: null,
  isSidebarShow: true,
  showMobileSidebar: false,
  headerContent: null,
  sidebarData: [],
  customContentContainer: null,
  isHeaderShow: true,
  children: null,
  onSwitchSidebar: () => {},
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
