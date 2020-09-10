import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { ActionButton, EditorButton } from '..'

const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 0.4);
  padding: 8px 14px;
`

const Image = styled.svg`
  transition: ${props => props.theme.trans.default};
  fill: ${props => props.theme.colors.gray.light};
  height: 100%;
  width: 100%;
`

const EditableButton = styled(ActionButton)`
  margin-right: 15px;
  &:hover {
    ${Image} {
      fill: ${props => props.theme.colors.gray.main};
    }
  }
`

const CommonButton = styled(EditorButton)`
  margin-left: 15px;
  &:hover {
    ${Image} {
      fill: ${props => props.theme.colors.gray.main};
    }
  }
`

const Actions = ({ editableActions, commonActions, className, ...rest }) => {
  return (
    <Wrap {...rest}>
      <div>
        {editableActions.map(item => (
          <EditableButton
            onClick={() => console.log(1)}
            disabled={item.disabled}
            key={item.cmd}
            cmd={item.cmd}
            arg={item.arg}
            name={item.name}
          >
            <Image as={item.img} />
          </EditableButton>
        ))}
      </div>
      <div>
        {commonActions.map(item => (
          <CommonButton key={item.key} {...item}>
            <Image as={item.img} />
          </CommonButton>
        ))}
      </div>
    </Wrap>
  )
}
Actions.propTypes = {
  editableActions: PropTypes.arrayOf(
    PropTypes.shape({
      cmd: PropTypes.string.isRequired,
      arg: PropTypes.string,
      name: PropTypes.string,
      img: PropTypes.any,
    })
  ),
  commonActions: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      img: PropTypes.any,
    })
  ),
  editorRef: PropTypes.any,
  className: PropTypes.string,
}
Actions.defaultProps = {
  editableActions: [],
  commonActions: [],
  editorRef: null,
  className: '',
}

export default Actions
