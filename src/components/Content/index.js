import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Wrap = styled.div`
  ${({ theme: { content, media } }) => css`
    overflow: auto;
    padding-top: ${content.verticalOffsets.s};
    padding-bottom: ${content.verticalOffsets.s};
    padding-left: ${content.horizontalOffsets.s};
    padding-right: ${content.horizontalOffsets.s};
    height: 100%;
    ${media.l`
      padding-top: ${content.verticalOffsets.l};
      padding-bottom: ${content.verticalOffsets.l};
      padding-left: ${content.horizontalOffsets.l};
      padding-right: ${content.horizontalOffsets.l};
    `}
  `}
`

const Content = ({ children }) => {
  return <Wrap>{children}</Wrap>
}
Content.propTypes = {
  children: PropTypes.any,
}
Content.defaultProps = {
  children: null,
}
export default Content
