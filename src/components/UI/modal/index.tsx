import React from 'react'
import { View } from '@tarojs/components'
import { UIMask, UIAnimate } from '@components'
import './index.scss'

interface P {
    isShow: boolean,
    onHide?: () => void
}

export default function Index(props: P) {
    // let inAnimate = [{ className: 'bounceInUp', duration: 800 }, { className: 'wobble', duration: 800 }],
    let inAnimate = [{ className: 'bounceInUp', duration: 800 }],
        outAnimate = [{ className: 'bounceOutDown', duration: 0 }]
    return <UIMask outDuration={1600} isShow={props.isShow} renderModal={() => (
        <View className='modal-box' onClick={props.onHide}>
            <UIAnimate animate={props.isShow ? inAnimate : outAnimate} renderChilden={() => (
                <View className='modal'>我是个Modal组件</View>
            )} />
        </View>
    )} />
}