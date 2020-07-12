import React from 'react'
import { View } from '@tarojs/components'
import { UIMask, UIAnimate } from '@components'
import './index.scss'

interface P {
    isShow: boolean,
    onHide?: () => void
}

export default function Index(props: P) {
    // let inAnimate = ['bounceInUp', 'wobble', 'rubberBand'],
    let inAnimate = ['slideInLeft'],
        outAnimate = ['slideOutRight']
    return <UIMask isShow={props.isShow} renderModal={() => (
        <View className='modal-box' onClick={props.onHide}>
            <UIAnimate animate={props.isShow ? inAnimate : outAnimate} renderChilden={() => (
                <View className='modal'>我是个Modal组件</View>
            )} />
        </View>
    )} />
}