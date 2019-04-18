import React from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

const Wrap = styled.div``

const SidebarList = ({ children }) => <Wrap>{children}</Wrap>
SidebarList.propTypes = {
  children: PropTypes.any,
}
SidebarList.defaultProps = {
  children: null,
}

export default SidebarList
