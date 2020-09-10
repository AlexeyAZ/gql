import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ContentEditable from 'react-contenteditable'

import { Input, RichTextEditor, Button } from '../..'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const FormButton = styled(Button)`
  align-self: flex-start;
`

class FormCreateNote extends Component {
  state = {
    fields: {
      title: {
        name: 'title',
        label: 'Title',
        value: '',
      },
      content: {
        name: 'content',
        label: 'Note content',
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
      <Form onSubmit={this.handleFormSubmit}>
        <FormContainer>
          {Object.keys(fields).map(
            field =>
              field === 'title' && (
                <Input
                  key={field}
                  onChange={value => this.handleInputChange(field, value)}
                  id={fields[field].name}
                  label={fields[field].label}
                />
              )
          )}
          <RichTextEditor
            html=""
            onInput={value => this.handleInputChange('content', value)}
            autofocus
          />
        </FormContainer>
        <FormButton type="submit">Create note</FormButton>
      </Form>
    )
  }
}
FormCreateNote.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}

export default FormCreateNote
