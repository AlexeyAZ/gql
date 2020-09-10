import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Container from '../Container'

const Wrap = styled.div`
  ${({ theme: { trans, window, media }, size, withSidebar }) => css`
    transition: ${trans.default};
    background-color: rgba(255, 255, 255, 0.4);
    overflow: auto;
    height: 100%;
    white-space: pre-wrap;
    ${media.l`
      padding-left: calc(${withSidebar && size !== 's' ? window.sidebar.width : '0px'});
    `}
  `}
`

const Content = ({
  size,
  customContent,
  withHeader,
  withSidebar,
  children,
  containerStyle,
  className,
}) => {
  return (
    <Wrap withHeader={withHeader} withSidebar={withSidebar} size={size} className={className}>
      {customContent || (
        <Container css={containerStyle} size={size}>
          {children}
        </Container>
      )}
    </Wrap>
  )
}
Content.propTypes = {
  size: PropTypes.string,
  customContent: PropTypes.any,
  withHeader: PropTypes.bool,
  withSidebar: PropTypes.bool,
  children: PropTypes.any,
  containerStyle: PropTypes.array,
  className: PropTypes.string,
}
Content.defaultProps = {
  size: 'xl',
  customContent: null,
  withHeader: true,
  withSidebar: false,
  children: null,
  containerStyle: null,
  className: '',
}
export default Content
