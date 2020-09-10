import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { Editor, Actions } from '..'

const Wrap = styled.div`
  flex: 1;
  display: flex;
  flex-flow: column;
`

const EditorField = styled(Editor)`
  flex: 1;
`

const TextEditor = ({ editorRef, className, ...rest }) => {
  return (
    <Wrap className={className}>
      <EditorField inputAreaRef={editorRef} {...rest} />
      <Actions />
    </Wrap>
  )
}
TextEditor.propTypes = {
  editorRef: PropTypes.any,
  className: PropTypes.string,
}
TextEditor.defaultProps = {
  editorRef: null,
  className: '',
}

export default TextEditor
