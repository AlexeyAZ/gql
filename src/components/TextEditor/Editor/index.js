import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { InputArea } from '../..'

const Wrap = styled.div`
  display: flex;
  min-height: 100%;
`

const EditorField = styled(InputArea)`
  flex: 1;
`

const Editor = ({ editorRef, className, ...rest }) => {
  return (
    <Wrap className={className}>
      <EditorField inputAreaRef={editorRef} {...rest} />
    </Wrap>
  )
}
Editor.propTypes = {
  editorRef: PropTypes.any,
  className: PropTypes.string,
}
Editor.defaultProps = {
  editorRef: null,
  className: '',
}

export default Editor
