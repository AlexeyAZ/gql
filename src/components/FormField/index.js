import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrap = styled.div`
  margin-bottom: ${props => props.theme.formField.bottomOffset};
`

const FormField = ({ children }) => <Wrap>{children}</Wrap>
FormField.propTypes = {
  children: PropTypes.any,
}
FormField.defaultProps = {
  children: null,
}
export default FormField
