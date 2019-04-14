import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Input, FormField, Button, Link } from '../../index'

import styles from './formLogin.module.scss'

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
      <div className={styles.wrap}>
        <form onSubmit={this.handleFormSubmit} className={styles.form}>
          <div className={styles.formFields}>
            {Object.keys(fields).map(field => (
              <FormField key={field}>
                <Input
                  id={fields[field].name}
                  onChange={value => this.handleInputChange(field, value)}
                  label={fields[field].label}
                />
              </FormField>
            ))}
          </div>

          <div className={styles.actionsWrap}>
            <Button className={styles.button}>Sign in</Button>
            <span>
              or <Link to="/create-user">Create user</Link>
            </span>
          </div>
        </form>
      </div>
    )
  }
}

FormLogin.propTypes = {}

export default FormLogin
