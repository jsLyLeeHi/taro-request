import React, { Component } from 'react'
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
  request1() {
    const requestTask = baseService.get({ bNo: '102' }, { toastType: 'modal', loadingText: '加载中...' })
    requestTask.then((res: { data }) => {
      console.log(res.data, 'res')
    })
  }
  request2() {
    baseService.get({ bNo: '103', phone: '13212312', MD5: 'phone' }, { toastType: 'modal' }).then((res: { data }) => {
      console.log(res.data, 'res')
    })
  }
  showModal() {
    this.setState({
      isModalShow: !this.state.isModalShow
    })
  }
  render() {

    return (
      <View className='index'>
        <Button onClick={this.showModal.bind(this)}>showModal</Button>
        <Button onClick={this.request1.bind(this)}>请求1</Button>
        <Button onClick={this.request2.bind(this)}>请求2</Button>
        <UIModal isShow={this.state.isModalShow} onHide={this.showModal.bind(this)}></UIModal>
      </View>
    )
  }
}

export default Index
