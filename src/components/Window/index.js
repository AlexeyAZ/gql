import React, { Component } from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import posed, { PoseGroup } from 'react-pose'
import { withRouter } from 'react-router'

import * as queries from '../../gql/queries'
import * as mutations from '../../gql/mutations'

import Sidebar from './Sidebar'
import Content from './Content'
import Header from './Header'

import { style } from '../../helpers'
import styles from './window.module.scss'
import sassVariables from '../../styles/_variables.scss'

const { getStyleObj, getNumValue } = style
const variables = getStyleObj(sassVariables)

const RouteContainer = posed.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 },
})

const Container = posed.div({
  enter: { staggerChildren: 50 },
})

class Window extends Component {
  componentDidMount() {
    const { isSidebarShow, hideSidebar, showSidebar } = this.props
    if (isSidebarShow) {
      return showSidebar()
    }
    return hideSidebar()
  }

  render() {
    const {
      location,
      size,
      autoHeight,
      isHeaderShow,
      windows,
      children,
      sidebarContent,
      switchSidebar,
      hideSidebar,
      showSidebar,
    } = this.props
    return (
      // <PoseGroup>
      //   <RouteContainer key={location.key}>
      // <Container>
      <div className={cn(styles.wrap, { [styles.wrapAutoHeight]: autoHeight })}>
        {/* <div className={styles.paddedContainer}> */}
        <div className={cn(styles.container, styles[`container-${size}`])}>
          {isHeaderShow && (
            <Header
              switchSidebar={switchSidebar}
              hideSidebar={hideSidebar}
              showSidebar={showSidebar}
            />
          )}
          <div className={styles.contentWrap}>
            <Sidebar show={windows.windows.sidebar}>{sidebarContent}</Sidebar>
            <Content size={size}>{children}</Content>
          </div>
        </div>
        {/* </div> */}
      </div>
      // </Container>
      //   </RouteContainer>
      // </PoseGroup>
    )
  }
}
Window.propTypes = {
  size: PropTypes.oneOf(Object.keys(variables.windowSizes)),
  autoHeight: PropTypes.bool,
  sidebarContent: PropTypes.any,
  isSidebarShow: PropTypes.bool,
  isHeaderShow: PropTypes.bool,
  children: PropTypes.any.isRequired,
}
Window.defaultProps = {
  size: 'xl',
  autoHeight: false,
  sidebarContent: null,
  isSidebarShow: true,
  isHeaderShow: true,
}

export default compose(
  withRouter,
  graphql(queries.windows.GET_WINDOWS_DATA, {
    name: 'windows',
  }),
  graphql(mutations.windows.SWITCH_SIDEBAR, {
    name: 'switchSidebar',
  }),
  graphql(mutations.windows.HIDE_SIDEBAR, {
    name: 'hideSidebar',
  }),
  graphql(mutations.windows.SHOW_SIDEBAR, {
    name: 'showSidebar',
  })
)(Window)
