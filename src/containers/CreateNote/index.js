import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose, withApollo } from 'react-apollo'
import { css } from 'styled-components'
import moment from 'moment'
import get from 'lodash/get'

import * as queries from '../../gql/queries'
import * as mutations from '../../gql/mutations'

import { FormCreateNote } from '../../components/forms'
import { Window } from '../../components'

import { auth } from '../../helpers'
import { NOTE_STORAGE } from '../../constants'
import { noteStorage } from '../../config'

const { getUserId } = auth

class CreateNote extends Component {
  handleCreateNote = fields => {
    const { client, location, createNote, user, history } = this.props

    const {
      getUser,
      getUser: { posts },
    } = client.readQuery({
      query: queries.users.GET_USER,
      variables: { id: getUserId() },
    })
    const storage = noteStorage.getItem(NOTE_STORAGE)
    let newPosts = JSON.parse(JSON.stringify(posts))
    const addNewNote = id => {
      const newNote = {
        title: fields.title.value,
        content: fields.content.value,
        createdAt: +moment(),
        updatedAt: +moment(),
        _id: `local_id_${id}`,
        __typename: 'Post',
      }
      newPosts.push(newNote)
      return newNote
    }
    storage.then(({ local_note_id }) => {
      addNewNote(local_note_id)
      noteStorage.setItem(NOTE_STORAGE, { ...storage, local_note_id: local_note_id + 1 })

      client.writeQuery({
        query: queries.users.GET_USER,
        data: {
          getUser: { ...getUser, posts: newPosts },
        },
        variables: { id: getUserId() },
      })
      history.push(`/notes/local_id_${local_note_id}`)
    })

    // createNote({
    //   variables: {
    //     userId: getUserId(),
    //     title: fields.title.value,
    //     content: fields.content.value,
    //   },
    // }).then(({ data: { createPost: { _id }}}) => {
    //   history.push(`/notes/${_id}`)
    // })
  }

  render() {
    return (
      <Window
        isSidebarShow={false}
        contentContainerStyle={css`
          height: 100%;
        `}
      >
        <FormCreateNote onFormSubmit={this.handleCreateNote} />
      </Window>
    )
  }
}
CreateNote.propTypes = {
  history: PropTypes.object.isRequired,
  createNote: PropTypes.func.isRequired,
}

export default compose(
  withApollo,
  graphql(mutations.notes.CREATE_NOTE, {
    name: 'createNote',
    options: {
      fetchPolicy: 'no-cache',
    },
  })
)(CreateNote)
