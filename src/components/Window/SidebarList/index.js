import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { NavLink } from 'react-router-dom'

import { Link } from '../../index'

const listItemCommon = css`
  padding-top: 13px;
  padding-bottom: 13px;
  padding-left: 12px;
  padding-right: 12px;
`

const Wrap = styled.div`
  overflow: auto;
  height: 100%;
`
const Ul = styled.ul`
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;
  padding-left: 0;
`
const Li = styled.li`
  border-bottom: 1px solid ${props => props.theme.colors.blue.lighten};
  ${props =>
    !props.wrapText &&
    css`
      overflow: hidden;
      white-space: nowrap;
    `}
`
const ListItem = styled.div`
  ${listItemCommon};
  ${props =>
    !props.wrapText &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
    `}
`
const ListLink = styled(Link)`
  ${listItemCommon};
  color: ${props => props.theme.colors.gray.light};
  display: block;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.colors.gray.main};
  }
  &.active {
    background-color: rgba(255, 255, 255, 0.4);
  }
  ${props =>
    !props.wrapText &&
    css`
      text-overflow: ellipsis;
      overflow: hidden;
    `}
`

class SidebarList extends Component {
  handleLinkClick = () => {}

  render() {
    const { data, wrapText } = this.props
    return (
      <Wrap>
        <Ul>
          {data.map(item => (
            <Li key={item.key} wrapText={typeof item.wrap !== 'undefined' ? item.wrap : wrapText}>
              {item.href ? (
                <ListLink as={NavLink} to={item.href} onClick={item.onClick}>
                  {item.title}
                </ListLink>
              ) : (
                <ListItem>{item.title}</ListItem>
              )}
            </Li>
          ))}
        </Ul>
      </Wrap>
    )
  }
}
SidebarList.propTypes = {
  data: PropTypes.array,
  wrapText: PropTypes.bool,
}
SidebarList.defaultProps = {
  data: [],
  wrapText: false,
}

export default SidebarList
