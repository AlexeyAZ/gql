import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import SidebarList from '../SidebarList'

const Wrap = styled.div`
  ${({ show, showMobile, theme: { window, trans, media } }) => css`
    transition: ${trans.default};
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    flex-shrink: 0;
    width: ${show && showMobile ? '100%' : 0};
    z-index: 1;
    ${media.l`
      width: ${show ? window.sidebar.width : 0};
    `}
  `}
`

const Content = styled.div`
  ${({ theme: { window, media } }) => css`
    height: 100%;
    width: 100%;
    ${media.l`
      width: ${window.sidebar.width};
    `}
  `}
`

class Sidebar extends Component {
  render() {
    const { show, showMobile, data } = this.props
    return (
      <Wrap show={show} showMobile={showMobile}>
        <Content>
          <SidebarList data={data} />
        </Content>
      </Wrap>
    )
  }
}
Sidebar.propTypes = {
  show: PropTypes.bool,
  data: PropTypes.array,
}
Sidebar.defaultProps = {
  show: true,
  data: [],
}
export default Sidebar
