import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const StyledHeader = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 1px -2px 1px rgba(0, 0, 0, 1);
  border-top: 1px solid rgba(0, 0, 0, 0.03);
  border-left: 1px solid rgba(0, 0, 0, 0.03);
  border-right: 1px solid rgba(0, 0, 0, 0.03);
  position: relative;
  z-index: 2;
  height: ${props => props.theme.window.header.height};
`

const Header = ({ children, switchSidebar }) => {
  return (
    <StyledHeader>
      <button onClick={switchSidebar} type="button">
        X
      </button>
      {children}
    </StyledHeader>
  )
}
Header.propTypes = {
  children: PropTypes.any,
  switchSidebar: PropTypes.func,
}
Header.defaultProps = {
  children: null,
  switchSidebar: () => {},
}
export default Header
