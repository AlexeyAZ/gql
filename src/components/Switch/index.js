import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const switcherHeight = '20px'
const switcherBorderSize = '1px'

const Wrap = styled.div`
  display: flex;
`
const Title = styled.span`
  padding: 0 10px;
`
const Switcher = styled.div`
  border: ${switcherBorderSize} solid black;
  border-radius: calc(${switcherHeight} / 2);
  position: relative;
  height: ${switcherHeight};
  width: 30px;
  &:before {
    transition: ${props => props.theme.trans.default};
    content: '';
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: 0;
    left: ${props =>
      props.active === 0 ? 0 : `calc(100% - ${switcherHeight} + 2 * ${switcherBorderSize})`};
    height: calc(${switcherHeight} - 2 * ${switcherBorderSize});
    width: calc(${switcherHeight} - 2 * ${switcherBorderSize});
  }
`

class Switch extends Component {
  constructor(props) {
    super(props)
    this.isControlled = props.active !== undefined
    this.state = {
      activeValue: props.defaultActive || 0,
    }
  }

  handleTitleClick = number => {
    const { data, onClick } = this.props
    if (!this.isControlled) this.setState({ activeValue: number })
    onClick(number, data[number])
  }

  handleSwitcherClick = () => {
    const { activeValue } = this.state
    const { data, onClick, onSwitcherClick } = this.props
    const newActiveValue = activeValue === 0 ? 1 : 0
    if (!this.isControlled) {
      this.setState({ activeValue: newActiveValue })
      onClick(newActiveValue, data[newActiveValue])
    }
    return onSwitcherClick()
  }

  render() {
    const { data, active } = this.props
    const { activeValue } = this.state
    const finalActiveValue = this.isControlled ? active : activeValue
    return (
      <Wrap>
        <Title active={finalActiveValue === 0} onClick={() => this.handleTitleClick(0)}>
          {data[0].title}
        </Title>
        <Switcher active={finalActiveValue} onClick={this.handleSwitcherClick} />
        <Title active={finalActiveValue === 1} onClick={() => this.handleTitleClick(1)}>
          {data[1].title}
        </Title>
      </Wrap>
    )
  }
}

Switch.propTypes = {
  active: PropTypes.bool,
  defaultActive: PropTypes.number,
  data: PropTypes.array.isRequired,
  onClick: PropTypes.func,
  onSwitcherClick: PropTypes.func,
}
Switch.defaultProps = {
  active: undefined,
  defaultActive: undefined,
  onClick: () => {},
  onSwitcherClick: () => {},
}

export default Switch
