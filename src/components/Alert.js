import React from 'react'

class Alert extends React.Component {

  render() {
    return (
      this.props.hidden?null:
      <div className="Alert">
        <header>e键美家报名活动</header>
        <main>{this.props.msg}</main>
        <button onClick={this.props.close}>确定</button>
      </div>
    )
  }
}

Alert.propTypes = {
  msg: React.PropTypes.string,
  close: React.PropTypes.func,
  hidden: React.PropTypes.bool,
}

export default Alert
