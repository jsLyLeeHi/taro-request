import React from 'react'
import { View } from '@tarojs/components'
import { UIAnimate } from '@components'
import classnames from 'classnames'
import './index.scss'

interface P {
    renderModal?: any,
    isShow: boolean,
    outDuration: number,
}
/**
 *遮罩层组件 
 *@renderModal renderProps子组件返回参数中带有遮罩真正关闭的状态
 *@outDuration 组件完全消失的时间,预留给传入的组件完成动画显示
 *@isShow 是否展示
 */
export default function Index(props: P) {
    let inAnimate = [{ className: 'fadeIn', duration: 0 }],
        outAnimate = [{ className: 'fadeOut', duration: props.outDuration == null ? 200 : props.outDuration }]
    return <UIAnimate animate={props.isShow ? inAnimate : outAnimate}
        renderChilden={(animateEnd) => (
            <View className={classnames({ mask: true, hide: !props.isShow && animateEnd })}>
                {props.renderModal(props.isShow)}
            </View>)} />
}