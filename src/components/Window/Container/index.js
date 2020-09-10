import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const ContainerWrap = styled.div`
  ${({ theme: { window }, size, isVerticalOffsets }) => css`
    padding-top: ${isVerticalOffsets ? window.content.verticalOffsets[size] : 0};
    padding-bottom: ${isVerticalOffsets ? window.content.verticalOffsets[size] : 0};
    padding-left: calc(${window.content.horizontalOffsets[size]});
    padding-right: ${window.content.horizontalOffsets[size]};
  `}
`

const Container = ({ size, isVerticalOffsets, children, ...rest }) => (
  <ContainerWrap size={size} isVerticalOffsets={isVerticalOffsets} {...rest}>
    {children}
  </ContainerWrap>
)

Container.propTypes = {
  size: PropTypes.string,
  isVerticalOffsets: PropTypes.bool,
  children: PropTypes.any,
}
Container.defaultProps = {
  size: 'xl',
  isVerticalOffsets: true,
  children: null,
}

export default Container
