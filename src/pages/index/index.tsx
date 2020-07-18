import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import baseService from '../../baseService'
import { UIModal } from '@components'
import './index.scss'

type PageProps = {

}
type PageState = {
  isModalShow: boolean
}

interface Index {
  props: PageProps;
  state: PageState
}

@inject('store')
@observer
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalShow: false
    }
  }
  componentDidMount() {
    
  }

  async request1() {
    const request = baseService.get({ bNo: '102' }, { toastType: 'modal', loadingText: '加载中...' })
    let data = await request
    console.log(data)
  }
  async request2() {
    const request = baseService.get({ bNo: '103', phone: '13212312', MD5: 'phone' }, { toastType: 'modal' })
    let data = await request
    console.log(data)
  }
  showModal(isModalShow: boolean) {
    this.setState({ isModalShow })
  }
  navPage2() {
    Taro.navigateTo({
      url: '/pages/page2/index'
    })
  }
  render() {
    const Views = <View>
      <Button className='btn-primary' onClick={this.showModal.bind(this, true)}>showModal</Button>
      <Button onClick={this.request1.bind(this)}>请求1</Button>
      <Button onClick={this.request2.bind(this)}>请求2</Button>
      <Button onClick={this.navPage2.bind(this)}>跳转到page2</Button>
    </View>
    return (
      <View>
        {Views}
        <UIModal isShow={this.state.isModalShow} onHide={this.showModal.bind(this, false)}></UIModal>
      </View>
    )
  }
}

export default Index
