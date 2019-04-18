import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Wrap = styled.div`
  ${props => css`
    transition: ${props.theme.trans.default};
    background-color: rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    position: absolute;
    top: ${props.theme.window.header.height};
    bottom: 0;
    left: 0;
    width: ${props.show ? props.theme.window.sidebar.width : 0};
    z-index: 1;
  `}
`

class Sidebar extends Component {
  render() {
    const { show, switchSidebar, hideSidebar, showSidebar, children } = this.props
    return (
      <Wrap show={show}>
        {/* <Menu hideSidebar={hideSidebar} showSidebar={showSidebar} switchSidebar={switchSidebar} /> */}
        {children}
      </Wrap>
    )
  }
}
Sidebar.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.any,
}
Sidebar.defaultProps = {
  show: true,
  children: null,
}
export default Sidebar
