import React from 'react'
import { View } from '@tarojs/components'
import { TypeAnimate } from './type'
import { isEqual } from '../../../static/js/until'
// import './myanimate.scss'
import './animate.min.css'

interface P {
    renderChilden?: any,
    animate: TypeAnimate[],
    animateDuration: number
}
interface S {
    animateEnd: boolean,
    animateClass: string
}
/**
 * @renderChilden 执行动画的元素
 * @animate 需要依次执行的动画样式名称，动画需要依次执行
 * @animateDuration 单个动画执行时长
 */
class Index extends React.Component<P, S> {
    constructor(props) {
        super(props)
        this.state = {
            animateEnd: true,
            animateClass: ''
        }
    }

    static defaultProps = {
        animate: [],
        animateDuration: 800
    }
    timer: any = null
    componentWillReceiveProps(nextProps: P) {
        const { animate, animateDuration } = this.props
        if (!isEqual(nextProps.animate, animate)) {
            let allDuration = animateDuration * nextProps.animate.length
            this.onCheckAnimateEnd(allDuration)
            this.setAnimate(nextProps.animate)
        }
    }
    onCheckAnimateEnd(allDuration) {
        clearTimeout(this.timer)
        this.setState({
            animateEnd: false
        }, () => {
            this.timer = setTimeout(() => {
                this.setState({
                    animateEnd: true
                })
                clearTimeout(this.timer)
                this.timer = null
            }, allDuration || 0);
        })
    }
    animateTimer: any = null
    setAnimate(animate: TypeAnimate[]) {
        const { animateDuration } = this.props
        const _this = this
        clearTimeout(this.animateTimer)
        let i = 0
        function _Animate() {
            clearTimeout(_this.animateTimer)
            if (!animate[i]) return
            _this.setState({
                animateClass: animate[i]
            })
            _this.animateTimer = setTimeout(() => {
                clearTimeout(_this.animateTimer)
                _this.animateTimer = null
                i = i + 1
                if (animate[i]) {
                    _Animate()
                }
            }, animateDuration);
        }
        _Animate()
    }
    render() {
        const { animateEnd, animateClass } = this.state
        return <View className={`animated ${animateClass}`}>{this.props.renderChilden(animateEnd)}</View>
    }
}

export default Index