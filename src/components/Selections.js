import React from 'react'
import { baos,kuans } from '../data'

class Selections extends React.Component {

  static propTypes = {
    bao: React.PropTypes.string,
    kuan: React.PropTypes.string,
    changeBao: React.PropTypes.func,
    changeKuan: React.PropTypes.func,
  }

  calcDivClassName = name => {
    switch (this.props.bao) {
      case '施工包':
        name += ' bumpLeft'
        break;
      case '主材包':
        name += ' bumpCenter'
        break;
      case '设计包':
        name += ' bumpRight'
        break;
      default:
    }
    return name
  }

  handleBaoClick = name => {
    this.props.changeBao(name)
    this.props.changeKuan('')
  }

  handleKuanClick = name => {
    this.props.changeKuan(name)
  }

  render(){
    // const { bao,kuan } = this.props
    const { bao,kuan } = this.props
    return (
      <div className="Selections">
        <ul className="baos">
        {
          baos.map((name,index) =>
            <li
              key={index}
              className={bao===name?'selected':''}
              onClick={() => this.handleBaoClick(name)}
            >{`${name}预约`}</li>)
        }
        </ul>
        <section>
        {
          baos.indexOf(bao) > -1 &&
          <div className={this.calcDivClassName('bump')} />
        }

          <ul className="kuans">
          {
            kuans[bao].map((k,index) =>
              <li
                key={index}
                className={kuan===k.name?'selected':''}
                onClick={() => this.handleKuanClick(k.name)}
              >
                {k.name}
                <span>{`（${k.price}）`}</span>
              </li>)
          }
          </ul>
        </section>

      </div>
    )
  }
}



export default Selections
