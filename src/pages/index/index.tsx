import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import baseService from '../../baseService'
import { deepClone } from '../../static/js/until'

import './index.scss'

type PageProps = {

}
type PageState = {

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

    }
  }
  componentDidMount() {
    const obj = {
      name: '小嘿嘿',
      age: 12,
      address: {
        city: 'beijing'
      },
      arr: ['a', 'b', 'c']
    }
    const obj2 = deepClone(obj)
    obj2.age = 2
    console.log(obj2)
  }
  request1() {
    baseService.get({ bNo: '102' }, { toastType: 'modal', loadingText: '加载中...' }).then((res: { data }) => {
      console.log(res.data, 'res')
    })
  }
  request2() {
    baseService.get({ bNo: '103', phone: '13212312', MD5: 'phone' }, { toastType: 'modal' }).then((res: { data }) => {
      console.log(res.data, 'res')
    })
  }

  render() {
    return (
      <View className='index'>
        <Button onClick={this.request1.bind(this)}>请求1</Button>
        <Button onClick={this.request2.bind(this)}>请求2</Button>
      </View>
    )
  }
}

export default Index
