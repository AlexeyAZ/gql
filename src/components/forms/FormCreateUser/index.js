import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { Input } from '../../index'

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`
const Form = styled.form`
  max-width: 200px;
`

class FormCreateUser extends Component {
  state = {
    fields: {
      nickName: {
        name: 'nickName',
        label: 'Nick',
        value: '',
      },
      firstName: {
        name: 'firstName',
        label: 'First name',
        value: '',
      },
      lastName: {
        name: 'lastName',
        label: 'Last name',
        value: '',
      },
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
        <Form onSubmit={this.handleFormSubmit}>
          {Object.keys(fields).map(field => (
            <Fragment key={field}>
              <Input
                onChange={value => this.handleInputChange(field, value)}
                id={fields[field].name}
                label={fields[field].label}
              />
            </Fragment>
          ))}
          <button type="submit">Create account</button>
          {' or '}
          <Link to="/login">Sign in</Link>
        </Form>
      </Wrap>
    )
  }
}
FormCreateUser.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

export default FormCreateUser
