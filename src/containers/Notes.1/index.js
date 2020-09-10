import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { graphql, compose } from 'react-apollo'
import styled, { css } from 'styled-components'
import get from 'lodash/get'
import debounce from 'lodash/debounce'

import { Window, Input, Button, Editor, Actions } from '../../components'
import { Container } from '../../components/window'

import * as queries from '../../gql/queries'
import * as mutations from '../../gql/mutations'

import { auth } from '../../helpers'

import { ROUTE_ALL_NOTES } from '../../constants'

import { ReactComponent as BoldIcon } from '../../images/icons/bold.svg'
import { ReactComponent as ItalicIcon } from '../../images/icons/italic.svg'
import { ReactComponent as UnderlineIcon } from '../../images/icons/underline.svg'
import { ReactComponent as StrikeThroughIcon } from '../../images/icons/strikeThrough.svg'
import { ReactComponent as ImageIcon } from '../../images/icons/image.svg'
import { ReactComponent as ClockIcon } from '../../images/icons/clock.svg'
import { ReactComponent as LinkIcon } from '../../images/icons/link.svg'

import { ReactComponent as CopyIcon } from '../../images/icons/copy.svg'
import { ReactComponent as ShareIcon } from '../../images/icons/share.svg'
import { ReactComponent as TrashIcon } from '../../images/icons/trash.svg'

const { getUserId } = auth

const NOT_FOUND = 'not-found'
// const CREATE_NOTE = 'create-note'
const LOCAL_NOTE_ID = 'localNoteId'

const editableActionsData = [
  {
    cmd: 'bold',
    img: BoldIcon,
  },
  {
    cmd: 'italic',
    img: ItalicIcon,
  },
  {
    cmd: 'underline',
    img: UnderlineIcon,
  },
  {
    cmd: 'strikeThrough',
    img: StrikeThroughIcon,
  },
  {
    cmd: 'insertImage',
    img: ImageIcon,
    disabled: true,
  },
  {
    cmd: '',
    img: ClockIcon,
  },
  {
    cmd: 'createLink',
    img: LinkIcon,
  },
]

const commonActionsData = ({ deleteNote }) => [
  {
    img: CopyIcon,
    key: 'copy',
  },
  {
    img: ShareIcon,
    key: 'share',
  },
  {
    img: TrashIcon,
    key: 'trash',
    onClick: () => deleteNote(),
  },
]

const ContentWrap = styled.div`
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`
const ContentContainer = styled(Container)`
  flex: 1;
  overflow: auto;
`
const HeaderWrap = styled.div`
  display: flex;
  flex: 1;
`
const HeaderInput = styled(Input)`
  height: 100%;
`
const NoteInput = styled(Input)`
  background-color: transparent;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`

class Notes extends Component {
  state = {
    notesRaw: [],
    notes: [],
    searchInputValue: '',
    noteTitleValue: '',
  }

  handleNoteChange = debounce(({ content, title, postId }) => {
    const { notesRaw } = this.state
    const { user, updateNote, match } = this.props
    const newNoteUrlId = get(match, 'params.id', null)
    const note = notesRaw.find(item => item._id === postId)
    console.log(content)
    console.log(note)

    const getValue = (value, oldValue) => {
      if (typeof value === 'undefined') {
        return oldValue
      }
      if (value === '' || value !== oldValue) {
        return value
      }
      return oldValue
    }

    console.log(getValue(title, note.title))

    updateNote({
      variables: {
        postId,
        title: getValue(title, note.title),
        content: getValue(content, note.content),
      },
    }).then(({ data: { updatePost } }) => {
      if (newNoteUrlId !== postId || typeof content === 'undefined') {
        console.log('newNoteUrlId !== postId')
        return user.refetch().then(({ data: { getUser: { posts } } }) => {
          this.setState({ notesRaw: posts, notes: posts })
        })
      }
    })
  }, 500)

  componentDidUpdate(prevProps) {
    const { notes, notesRaw } = this.state
    const {
      user,
      user: { getUser },
      match,
      history,
    } = this.props
    const userNotes = get(getUser, 'posts', [])
    const noteUrlId = get(match, 'params.id', null)
    const prevNoteUrlId = get(prevProps.match, 'params.id', null)
    if (userNotes.length > 0) {
      if (notesRaw.length !== userNotes.length) {
        console.log('update note array')
        return this.setState({ notes: userNotes, notesRaw: userNotes })
      }
    }
    if (noteUrlId !== prevNoteUrlId) {
      this.setState({
        notes: userNotes.filter(item => notes.find(note => note._id === item._id)),
        notesRaw: userNotes,
      })
    }
    return true
  }

  handleAddNote = () => {
    const { createNote, user, history } = this.props
    createNote({
      variables: {
        userId: getUserId(),
        title: '',
        content: '',
      },
    }).then(({ data: { createPost: { _id } } }) =>
      user.refetch().then(() => {
        console.log('update handleAddNote')
        this.setState({ searchInputValue: '' })
        history.push(`/notes/${_id}`)
      })
    )
  }

  handleDeleteNote = () => {
    const { user, deleteNote, match } = this.props
    const noteId = get(match, 'params.id', null)
    deleteNote({
      variables: {
        id: noteId,
      },
    }).then(res => user.refetch())
  }

  handleInputChange = value => {
    const { history } = this.props
    const { notesRaw } = this.state
    const filteredNotes = notesRaw.filter(item => item.title.includes(value))
    this.setState({ notes: filteredNotes, searchInputValue: value }, () =>
      history.push(`/notes/${ROUTE_ALL_NOTES}`)
    )
  }

  renderHeaderContent = () => {
    const { notesRaw, searchInputValue } = this.state
    return (
      <HeaderWrap>
        <HeaderInput
          value={searchInputValue}
          disabled={notesRaw.length === 0}
          onChange={this.handleInputChange}
          placeholder="Найти"
          wrapStyle={css`
            flex: 1;
            margin-right: 20px;
          `}
        />
        <Button
          onClick={this.handleAddNote}
          verticalOffsets={false}
          css={css`
            padding-left: 50px;
            padding-right: 50px;
          `}
        >
          Create
        </Button>
      </HeaderWrap>
    )
  }

  renderContainerContent = (html, activeNoteId, activeNote, noteTitle) => {
    const { noteTitleValue } = this.state
    if (activeNoteId === ROUTE_ALL_NOTES) {
      return (
        <ContentWrap>
          <ContentContainer>All notes</ContentContainer>
        </ContentWrap>
      )
    }
    if (!activeNote) {
      return (
        <ContentWrap>
          <ContentContainer>Not found</ContentContainer>
        </ContentWrap>
      )
    }
    return (
      <ContentWrap>
        <ContentContainer>
          <Fragment key={activeNoteId}>
            <NoteInput
              placeholder="Note title"
              defaultValue={noteTitle}
              onChange={value => this.handleNoteChange({ title: value, postId: activeNoteId })}
            />
          </Fragment>
          <Editor
            html={html}
            onKeyDown={value => this.handleNoteChange({ content: value, postId: activeNoteId })}
            onInput={value => this.handleNoteChange({ content: value, postId: activeNoteId })}
          />
        </ContentContainer>
        <Actions
          editableActions={editableActionsData}
          commonActions={commonActionsData({ deleteNote: this.handleDeleteNote })}
        />
      </ContentWrap>
    )
  }

  handleSidebarNoteClick = title => {
    const { user } = this.props
    this.setState({ noteTitleValue: title }, () =>
      user.refetch().then(res => this.setState({ notesRaw: res.data.getUser.posts }))
    )
  }

  renderSidebarContent = () => {
    const { user } = this.props
    const { notes } = this.state
    return notes.map(({ _id, title }) => ({
      key: _id,
      title,
      href: `/notes/${_id}`,
      onClick: () => this.handleSidebarNoteClick(title),
    }))
  }

  render() {
    const { match } = this.props
    const { notes, notesRaw } = this.state
    const activeNoteId = match.params.id
    const activeNote = notes.length > 0 && notes.find(note => note._id === activeNoteId)
    const content = activeNote ? activeNote.content : ''
    const title = activeNote ? activeNote.title : ''
    console.log('render')

    return (
      <Window
        contentContainerStyle={css`
          display: flex;
          height: 100%;
        `}
        customContentContainer={this.renderContainerContent(
          content,
          activeNoteId,
          activeNote,
          title
        )}
        showMobileSidebar={
          !activeNoteId || activeNoteId === NOT_FOUND || activeNoteId === ROUTE_ALL_NOTES
        }
        isSidebarShow={notesRaw.length > 0}
        headerContent={this.renderHeaderContent()}
        sidebarData={this.renderSidebarContent()}
      />
    )
  }
}
Notes.propTypes = {
  user: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  createNote: PropTypes.func,
}
Notes.defaultProps = {
  user: {},
  createNote: () => undefined,
}

export default compose(
  withRouter,
  graphql(queries.users.GET_USER, {
    name: 'user',
    options: props => {
      return {
        notifyOnNetworkStatusChange: true,
        errorPolicy: 'all',
        fetchPolicy: 'network-only',
        variables: { id: get(props, 'location.state.id', null) || getUserId() },
      }
    },
  }),
  graphql(mutations.notes.CREATE_NOTE, {
    name: 'createNote',
    options: {
      fetchPolicy: 'no-cache',
    },
  }),
  graphql(mutations.notes.UPDATE_NOTE, {
    name: 'updateNote',
    options: {
      fetchPolicy: 'no-cache',
    },
  }),
  graphql(mutations.notes.DELETE_NOTE, {
    name: 'deleteNote',
  })
)(Notes)
