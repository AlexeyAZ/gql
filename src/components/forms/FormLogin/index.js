import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Input, FormField, Button, Link } from '../../index'

const Wrap = styled.div`
  justify-content: center;
`
const FormFields = styled.div`
  margin-bottom: 32px - ${props => props.theme.formField.bottomOffset};
`
const ActionsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

class FormLogin extends Component {
  state = {
    fields: {
      email: {
        name: 'email',
        label: 'E-mail',
        value: '',
      },
      password: {
        name: 'password',
        label: 'Password',
        value: '',
      },
    },
  }

  handleInputChange = (name, value) => {
    const { fields } = this.state
    const newField = Object.assign({}, fields[name])
    newField.value = value

    this.setState({ fields: { ...fields, [name]: newField } })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    const { fields } = this.state
    const { onFormSubmit } = this.props
    onFormSubmit(fields)
  }

  render() {
    const { fields } = this.state
    return (
      <Wrap>
        <form onSubmit={this.handleFormSubmit}>
          <FormFields>
            {Object.keys(fields).map(field => (
              <FormField key={field}>
                <Input
                  id={fields[field].name}
                  onChange={value => this.handleInputChange(field, value)}
                  label={fields[field].label}
                />
              </FormField>
            ))}
          </FormFields>

          <ActionsWrap>
            <Button>Sign in</Button>
            <span>
              or <Link to="/create-user">Create user</Link>
            </span>
          </ActionsWrap>
        </form>
      </Wrap>
    )
  }
}
FormLogin.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}
export default FormLogin
