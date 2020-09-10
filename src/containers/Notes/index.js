import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { graphql, compose, withApollo } from 'react-apollo'
import styled, { css } from 'styled-components'
import get from 'lodash/get'
import debounce from 'lodash/debounce'
import moment from 'moment'
import ContentEditable from 'react-contenteditable'

import { Window, Input, Button, Editor, Actions } from '../../components'
import { Container } from '../../components/window'

import * as queries from '../../gql/queries'
import * as mutations from '../../gql/mutations'

import { auth } from '../../helpers'
import { ROUTE_ALL_NOTES, NOTE_STORAGE, NOTE_STORAGE_DEFAULT_SCHEME } from '../../constants'
import { noteStorage } from '../../config'

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

const { userIdName, getUserId } = auth

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

const commonActionsData = ({ deleteNote, updateUserInfo }) => [
  {
    img: CopyIcon,
    key: 'copy',
  },
  {
    img: ShareIcon,
    key: 'share',
    onClick: () => updateUserInfo(),
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
    activeRow: {},
    searchInputValue: '',
    currentNote: {
      title: '',
      content: '',
      noteId: null,
    },
  }

  // eslint-disable-next-line react/sort-comp
  // handleNoteTitleChange = debounce((value, activeNoteId) => {
  //   const { updateNote, user } = this.props
  //   const { currentNote } = this.state

  //   updateNote({
  //     variables: {
  //       title: value,
  //       postId: activeNoteId,
  //       localUpdatedAt: String(+moment()),
  //     },
  //     refetchQueries: ['GET_USER'],
  //     awaitRefetchQueries: true
  //   })
  // }, 500)

  componentDidMount() {
    const { client, history } = this.props
    noteStorage
      .getItem(NOTE_STORAGE)
      .then(res => {
        console.log(res)
        if (!res) noteStorage.setItem(NOTE_STORAGE, NOTE_STORAGE_DEFAULT_SCHEME)
      })
      .catch(err => console.log(err))
    // TODO: получать заметки при монтировании компонента и сравнивать их с заметками в localStorage
    // client.query({
    //   query: queries.users.GET_USER
    // })
  }

  componentDidUpdate(prevProps, prevState) {
    const { user } = this.props
    console.log(user.loading)
    console.log(prevProps.user.loading)
  }

  // handleFindNote = value => {
  //   const { history } = this.props
  //   const { notesRaw } = this.state
  //   const filteredNotes = notesRaw.filter(item => item.title.includes(value))
  //   this.setState({ notes: filteredNotes, searchInputValue: value }, () => history.push(`/notes/${ROUTE_ALL_NOTES}`))
  // }

  handleCreateNote = fields => {
    const { client, history } = this.props

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
        title: '',
        content: '',
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
  }

  // handleDeleteNote = () => {
  //   const { user, deleteNote, match } = this.props
  //   const noteId = get(match, 'params.id', null)
  //   deleteNote({
  //     variables: {
  //       id: noteId
  //     }
  //   })
  //     .then(res => user.refetch())
  // }

  handleNoteTitleChange = (value, activeNoteId) => {
    const { client, location } = this.props
    const {
      getUser,
      getUser: { posts },
    } = client.readQuery({
      query: queries.users.GET_USER,
      variables: { id: get(location, 'state.id', null) || getUserId() },
    })
    const newPosts = posts.map(post => {
      if (post._id === activeNoteId) {
        post.title = value
        post.updatedAt = +moment()
      }
      return post
    })
    client.writeQuery({
      query: queries.users.GET_USER,
      data: {
        getUser: { ...getUser, posts: newPosts },
      },
    })
    const changedNote = posts.find(post => post._id === activeNoteId)
    noteStorage
      .getItem(NOTE_STORAGE)
      .then(res => {
        let newChanged
        const { changed } = res
        const existingNote = changed.find(item => item._id === changedNote._id)
        if (existingNote) {
          newChanged = changed.map(item => {
            if (item._id === changedNote._id) {
              return changedNote
            }
            return item
          })
        } else {
          newChanged = JSON.parse(JSON.stringify(changed))
          newChanged.push(changedNote)
        }

        noteStorage.setItem(NOTE_STORAGE, { ...res, changed: newChanged }).then(r => console.log(r))
      })
      .catch(error => console.log(error))

    // TODO: сохранять заметки в локал сторадж и доставать их оттуда при загрузке сайта
    // console.log({...currentNoteStorage, changed: { ...currentNoteStorage.changed, changedNote }})
    // noteStorage.setItem(NOTE_STORAGE, {...currentNoteStorage, changed: { ...currentNoteStorage.changed, }})
  }

  handleNoteContentChange = (e, activeNoteId) => {
    const { client, location } = this.props
    const { value } = e.target

    const {
      getUser,
      getUser: { posts },
    } = client.readQuery({
      query: queries.users.GET_USER,
      variables: { id: get(location, 'state.id', null) || getUserId() },
    })
    const newPosts = posts.map(post => {
      if (post._id === activeNoteId) {
        post.content = value
      }
      return post
    })
    client.writeQuery({
      query: queries.users.GET_USER,
      data: {
        getUser: { ...getUser, posts: newPosts },
      },
    })
    // const changedNote = posts.find(post => post._id === activeNoteId)
  }

  sync = () => {}

  getActiveNoteId = () => {
    const { match } = this.props

    const activeNoteId = match.params.id
    return activeNoteId
  }

  getActiveNote = () => {
    const {
      user: { getUser },
    } = this.props

    const userNotes = get(getUser, 'posts', [])
    const activeNoteId = this.getActiveNoteId()
    const activeNote = userNotes.length > 0 && userNotes.find(note => note._id === activeNoteId)
    return activeNote
  }

  renderContainerContent = () => {
    const {
      currentNote,
      currentNote: { title, content },
    } = this.state
    const { user } = this.props

    const activeNoteId = this.getActiveNoteId()
    const activeNote = this.getActiveNote()

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
          <NoteInput
            key={activeNoteId}
            placeholder="Note title"
            defaultValue={activeNote.title}
            onChange={value => this.handleNoteTitleChange(value, activeNoteId)}
            onBlur={this.sync}
          />
          <ContentEditable
            html={activeNote.content}
            onChange={e => this.handleNoteContentChange(e, activeNoteId)}
          />
        </ContentContainer>
        <Actions
          editableActions={editableActionsData}
          commonActions={commonActionsData({
            deleteNote: this.handleDeleteNote,
            updateUserInfo: user.refetch,
          })}
        />
      </ContentWrap>
    )
  }

  renderSidebarContent = () => {
    const {
      user,
      user: { getUser },
    } = this.props
    const { currentNote } = this.state
    const userNotes = get(getUser, 'posts', [])
    const activeNoteId = this.getActiveNoteId()
    const getTitle = (title, content) => {
      if (title) {
        return title
      }
      const temp = document.createElement('DIV')
      temp.innerHTML = content
      const contentText = temp.innerText
      if (contentText) {
        return contentText.slice(0, 30)
      }
      return ' '
    }

    return userNotes.map(({ _id, title, content }) => {
      return {
        key: _id,
        title: getTitle(title, content),
        href: `/notes/${_id}`,
      }
      // const userNoteTitle = _id === activeNoteId ? currentNote.title : title
      // const userNoteContent = _id === activeNoteId ? currentNote.content : content
      // return ({
      //   key: _id,
      //   title: getTitle(userNoteTitle, userNoteContent),
      //   href: `/notes/${_id}`,
      //   onClick: () => {
      //       // .then(res => console.log(res))
      //     return user.refetch()
      //     //   .then(res => console.log(res))
      //     // // this.setState({ currentNote: { ...currentNote, title: userNoteTitle, content: userNoteContent, noteId: _id } })
      //     //   // .then(res => )
      //   }
      // })
    })
  }

  renderHeaderContent = () => {
    const { searchInputValue } = this.state
    const {
      user: { getUser },
    } = this.props
    const userNotes = get(getUser, 'posts', [])
    return (
      <HeaderWrap>
        <HeaderInput
          value={searchInputValue}
          disabled={userNotes.length === 0}
          onChange={this.handleFindNote}
          placeholder="Найти"
          wrapStyle={css`
            flex: 1;
            margin-right: 20px;
          `}
        />
        <Button
          onClick={this.handleCreateNote}
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

  render() {
    const {
      match,
      user,
      user: { getUser },
    } = this.props
    const userNotes = get(getUser, 'posts', [])
    const activeNoteId = match.params.id

    return (
      <Window
        contentContainerStyle={css`
          display: flex;
          height: 100%;
        `}
        customContentContainer={this.renderContainerContent()}
        showMobileSidebar={
          !activeNoteId || activeNoteId === NOT_FOUND || activeNoteId === ROUTE_ALL_NOTES
        }
        isSidebarShow={userNotes.length > 0}
        headerContent={this.renderHeaderContent()}
        sidebarData={this.renderSidebarContent()}
      />
    )
  }
}
Notes.propTypes = {
  client: PropTypes.object.isRequired,
  user: PropTypes.object,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  createNote: PropTypes.func,
}
Notes.defaultProps = {
  user: {},
  createNote: () => undefined,
}

export default compose(
  withRouter,
  withApollo,
  graphql(queries.users.GET_USER, {
    name: 'user',
    options: props => {
      return {
        notifyOnNetworkStatusChange: true,
        errorPolicy: 'all',
        // fetchPolicy: 'network-only',
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
  graphql(mutations.notes.UPDATE_NOTES, {
    name: 'updateNotes',
    // options: {
    //   fetchPolicy: 'no-cache',
    // }
  }),
  graphql(mutations.notes.DELETE_NOTE, {
    name: 'deleteNote',
  })
)(Notes)
