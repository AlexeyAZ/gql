import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Wrap = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: ${props => props.theme.zIndex.modal};
`

const Container = styled.div`
  background-color: white;
  padding: 20px;
  max-width: ${props => props.theme.content.maxWidth};
`

const Modal = ({ children }) => (
  <Wrap>
    <Container>{children}</Container>
  </Wrap>
)
Modal.propTypes = {
  children: PropTypes.any,
}
Modal.defaultProps = {
  children: null,
}
export default Modal
