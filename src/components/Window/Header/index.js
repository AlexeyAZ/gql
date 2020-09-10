import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledHeader = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid ${props => props.theme.colors.blue.lighten};
  display: flex;
  padding: 8px 12px;
  position: relative;
  z-index: 2;
  height: ${props => props.theme.window.header.height};
`

class Header extends Component {
  handleSwitchSidebar = () => {
    const { switchSidebar, onSwitchSidebar } = this.props
    switchSidebar().then(({ data: { switchSidebar: { sidebar } } }) => onSwitchSidebar(sidebar))
  }

  render() {
    const { content, isSidebarShow, switchSidebar, onSwitchSidebar, ...rest } = this.props
    return (
      <StyledHeader {...rest}>
        <button onClick={this.handleSwitchSidebar} type="button">
          {isSidebarShow ? '<' : '>'}
        </button>
        {content}
      </StyledHeader>
    )
  }
}
Header.propTypes = {
  content: PropTypes.any,
  isSidebarShow: PropTypes.bool.isRequired,
  switchSidebar: PropTypes.func,
  onSwitchSidebar: PropTypes.func,
}
Header.defaultProps = {
  content: null,
  switchSidebar: () => {},
  onSwitchSidebar: () => {},
}
export default Header
