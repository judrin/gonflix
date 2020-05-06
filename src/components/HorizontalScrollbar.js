import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

class HorizontalScrollbar extends Component {
  state = {
    scrollable: false
  }

  handleUpdate = ({ clientWidth, scrollWidth }) => {
    const scrollable = clientWidth < scrollWidth;
    this.setState({ scrollable })
  }

  renderView = ({ style, ...props }) => {
    const viewStyle = {
      ...style,
      whiteSpace: 'nowrap'
    };

    return (
      <div style={viewStyle} {...props} />
    )
  }

  renderTrackHorizontal = ({ style, ...props }) => {
    const trackStyle = this.state.scrollable ? {
      right: 2,
      bottom: 2,
      left: 2,
      borderRadius : 3,
      backgroundColor: 'rgba(0, 0, 0, 0.58)'
    } : {};

    return (
      <div style={{ ...style, ...trackStyle }} {...props} />
    )
  }

  renderThumbHorizontal = ({ style, ...props }) => {
    const thumbStyle = this.state.scrollable ? {
      backgroundColor: 'rgba(52, 152, 219, 0.74)',
      border: '1px solid #3498db',
      borderRadius: 3
    } : {}

    return (
      <div style={{ ...style, ...thumbStyle }} {...props} />
    )
  }

  render() {
    return (
      <Scrollbars
        style={{ height: 195, marginTop: 20 }}
        renderTrackHorizontal={this.renderTrackHorizontal}
        renderThumbHorizontal={this.renderThumbHorizontal}
        renderView={this.renderView}
        onUpdate={this.handleUpdate}
      >
        {this.props.children}
      </Scrollbars>
    )
  }
}

export default HorizontalScrollbar;