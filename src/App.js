import React, { Component } from 'react';
import Selections from './components/Selections'
import Alert from './components/Alert'
import { kuans,current } from './data'
import { addAppointment } from './api'
import './public.css'
import './App.css'
import wewei from './image/wewei.jpg'
import URLSearchParams from 'url-search-params'

class App extends Component {

  state = {
    bao:'',
    kuan:'',
    price: 0,
    popupHidden:true,
    msg:""
  }

  componentWillMount() {
    // TODO: axios implantation
    this.setState({
      bao:current.bao,
      kuan:current.kuan,
    })
    const search = window.location.search
    if(search !== ''){
      const kuan = new URLSearchParams(window.location.search).get('kuan')
      this.setState({kuan})
    }
  }

  changeBao = bao => {
    this.setState({bao})
  }

  changeKuan = kuan => {
    this.setState({kuan})
  }

  calcPrice = () => {
    const { bao,kuan } = this.state
    const filteredKuan = kuans[bao].filter(k => k.name === kuan)
    return filteredKuan[0].price
  }


  handleClick = () => {
    const { bao,kuan,popupHidden } = this.state

    if(popupHidden){
      const notVerified = this.verify()
      if(notVerified){
        this.openPopup(notVerified)
        return
      }

      const price = this.calcPrice()
      this.signup({
        bao,
        kuan,
        price,
        name: this.name.value,
        phone: this.phone.value,
      }).then(msg => this.openPopup(msg))
      .catch(err => this.openPopup('预约失败。'))
      this.name.value = ''
      this.phone.value = ''
    }
  }

  verify = () => {
    if(this.name.value === '' || this.phone.value === ''){
      return '请填写完整信息。'
    }
    if(this.phone.value.length < 8){
      return '请填写正确的电话号码。'
    }
    if(this.state.kuan === ''){
      return '亲，请选择一款。'
    }
    return false
  }
  //post提交信息，并返回弹窗提示的string
  signup = (info) => {//info: {bao:'',kuan:''}
    console.log(info)
    return addAppointment(info)
  }

  closePopup = () => {this.setState({popupHidden:true})}

  openPopup = (msg) => {this.setState({popupHidden:false,msg:msg})}

  render() {
    const { bao,kuan,popupHidden,msg } = this.state
    return (
      <div>
        <div className="App">

        {/* <section>
            <header class="logo-orange">
                东箭完整家居.e键美家
            </header>
            <div class="banner" id="center">
                <img src="images/banner1.jpg" className="banner_img"/>
                <img src="images/banner2.jpg" className="banner_img"/>
                <img src="images/banner3.jpg" className="banner_img"/>
                <img src="images/banner1.jpg" className="banner_img"/>
                <img src="images/banner2.jpg" className="banner_img"/>
                <img src="images/banner3.jpg" className="banner_img"/>
            </div>
        </section> */}

          <Alert hidden={popupHidden} msg={msg} close={this.closePopup} />
          {
            !popupHidden && <div className='mask' />
          }
          <header>
            <h2>请留下您的信息</h2>
            <div className="line"></div>
            <article>提交预约信息</article>
            <article>24小时客户经理为您服务</article>
          </header>
          <input ref={n=>this.name=n} placeholder="您的姓名"/>
          <input ref={n=>this.phone=n} placeholder="您的电话"/>
          <Selections
            bao={bao}
            kuan={kuan}
            changeBao={this.changeBao}
            changeKuan={this.changeKuan}
          />
          <button
            onClick={this.handleClick}
          >立即预约</button>
        </div>
        <footer>
            <ul className="nav-footer clearfix">
              <li><a href="../index.html">首页</a></li>
              <li><a href="../e-taocan.html">e键套餐</a></li>
              <li><a href="../quantity.html">0元量房设计</a></li>
              <li><a href="">优惠活动</a></li>
              <li><a href="../experience.html">线下体验馆</a></li>
              <li><a href="../factoryDesign.html">创客工长设计师</a></li>
              <li><a href="../about.html">关于我们</a></li>
            </ul>
            <address className="clearfix">
                <ul>
                    <li>e键美家</li>
                    <li>15205810632</li>
                    <li>版权所有：东箭完整家居e键美家</li>
                    <li>浙ICP88888888号</li>
                </ul>
                <img src={wewei} alt=""/>
            </address>
        </footer>
      </div>

    );
  }
}

export default App
