import React from 'react'
import { View } from '@tarojs/components'
import { UIAnimate } from '@components'
import classnames from 'classnames'
import './index.scss'

interface P {
    renderModal?: any,
    isShow: boolean,
}
/**
 *遮罩层组件 
 *@renderModal renderProps子组件返回参数中带有遮罩真正关闭的状态
 *@isShow 是否展示
 */
export default function Index(props: P) {
    let inAnimate = ['fadeIn'],
        outAnimate = ['fadeOut']
    return <UIAnimate animate={props.isShow ? inAnimate : outAnimate}
        renderChilden={(animateEnd) => (
            <View className={classnames({ mask: true, hide: !props.isShow && animateEnd })} onClick={(e) => { e.stopPropagation() }}>
                {props.renderModal(props.isShow)}
            </View>)} />
}