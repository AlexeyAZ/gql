import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Wrap = styled.div`
  ${({ theme: { trans, window }, ...rest }) => css`
    transition: ${trans.default};
    background-color: rgba(255, 255, 255, 0.55);
    position: absolute;
    top: ${window.header.height};
    left: ${rest.withSidebar ? window.sidebar.width : 0};
    right: 0;
    bottom: 0;
  `}
`

const Content = ({ withSidebar, children }) => {
  return <Wrap withSidebar={withSidebar}>{children}</Wrap>
}
Content.propTypes = {
  withSidebar: PropTypes.bool,
  children: PropTypes.any,
}
Content.defaultProps = {
  withSidebar: false,
  children: null,
}
export default Content
