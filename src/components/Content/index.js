import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import { styleHelpers } from '../../helpers'

const { getIntValue } = styleHelpers

const Wrap = styled.div`
  ${props => css`
    position: fixed;
    top: ${getIntValue(props.theme.header.height) +
      getIntValue(props.theme.content.verticalOffsets)}px;
    bottom: ${getIntValue(props.theme.footer.height) +
      getIntValue(props.theme.content.verticalOffsets)}px;
    left: ${props.theme.content.horizontalOffsets};
    right: ${props.theme.content.horizontalOffsets};
    width: calc(100% - ${2 * getIntValue(props.theme.content.horizontalOffsets)}px);
    max-width: ${props.theme.content.maxWidth};
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
