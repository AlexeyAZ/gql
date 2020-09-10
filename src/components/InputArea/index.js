import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrap = styled.div`
  color: ${props => props.theme.colors.gray.main};
  outline: none;
  min-height: 200px;
  &:empty {
    &:before {
      content: attr(placeholder);
      color: ${props => props.theme.colors.gray.light};
      display: block;
      pointer-events: none;
      user-select: none;
    }
  }
  p {
    margin-top: 0;
  }
`

const findLastTextNode = node => {
  if (node.nodeType === Node.TEXT_NODE) return node
  let children = node.childNodes
  for (let i = children.length - 1; i >= 0; i--) {
    let textNode = findLastTextNode(children[i])
    if (textNode !== null) return textNode
  }
  return null
}

const replaceCaret = el => {
  // Place the caret at the end of the element
  const target = findLastTextNode(el)
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    var range = document.createRange()
    var sel = window.getSelection()
    range.setStart(target, target.nodeValue.length)
    range.collapse(true)
    sel.removeAllRanges()
    sel.addRange(range)
    if (el instanceof HTMLElement) el.focus()
  }
}

class InputArea extends Component {
  constructor(props) {
    super(props)

    this.getRef = ref => {
      this.contentEditable = ref
    }
  }

  componentDidMount() {
    const { autofocus } = this.props
    if (autofocus) {
      this.autofocus()
    }
  }

  componentDidUpdate(prevProps) {
    const { html, autofocus } = this.props
    // if (html !== this.contentEditable.innerHTML) {
    //   this.contentEditable.innerHTML = html
    // }
    replaceCaret(this.contentEditable)
    // if (prevProps.html !== html && autofocus) {
    //   this.autofocus()
    // }
  }

  autofocus = () => {
    this.contentEditable.focus()
  }

  handleInputChange = e => {
    const { onInput } = this.props
    onInput(e.target.innerHTML)
  }

  createMarkup = html => ({ __html: html })

  render() {
    const { autofocus, inputAreaRef, html, placeholder, onInput, ...rest } = this.props
    return (
      <Wrap
        placeholder={placeholder}
        suppressContentEditableWarning
        ref={this.getRef}
        onInput={this.handleInputChange}
        dangerouslySetInnerHTML={this.createMarkup(html)}
        contentEditable
        {...rest}
      />
    )
  }
}
InputArea.propTypes = {
  autofocus: PropTypes.bool,
  inputAreaRef: PropTypes.any,
  html: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onInput: PropTypes.func,
}
InputArea.defaultProps = {
  autofocus: false,
  inputAreaRef: null,
  html: '',
  placeholder: 'Enter text',
  className: '',
  onInput: () => undefined,
}

export default InputArea
