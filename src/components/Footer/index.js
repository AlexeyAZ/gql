import React from 'react'
// import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrap = styled.footer`
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2), inset 0 0 10px rgba(255, 255, 255, 0.4);
  position: absolute;
  left: 0;
  bottom: 0;
  height: ${props => props.theme.footer.height};
  width: 100%;
`
const Footer = () => {
  return <Wrap>Footer</Wrap>
}
Footer.propTypes = {}
export default Footer
