import React from 'react'
import { View } from '@tarojs/components'
import { TypeAnimate } from './type'
import { isEqual } from '../../../static/js/until'
import './animate.min.css'

interface P {
    renderChilden?: any,
    animate: TypeAnimate[],
}
interface S {
    animateEnd: boolean,
    animateClass: string
}
/**
 * @renderChilden 执行动画的元素
 * @animate 需要依次执行的动画，动画需要依次执行
 *      @className 动画的样式名
 *      @duration 动画时长
 * @duration 执行所有动画的时间
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
    }
    timer: any = null
    componentWillReceiveProps(nextProps: P) {
        const { animate } = this.props
        if (!isEqual(nextProps.animate, animate)) {
            let allDuration = 0
            nextProps.animate.map(val => {
                allDuration = allDuration + val.duration
            })
            this.setAnimate(nextProps.animate)
            clearTimeout(this.timer)
            this.setState({
                animateEnd: false
            }, () => {
                if (!allDuration) return
                this.timer = setTimeout(() => {
                    this.setState({
                        animateEnd: true
                    })
                    clearTimeout(this.timer)
                    this.timer = null
                }, allDuration || 0);
            })
        }
    }
    animateTimer: any = null
    setAnimate(animate: TypeAnimate[]) {
        const _this = this
        clearTimeout(this.animateTimer)
        let i = 0
        function _Animate() {
            clearTimeout(_this.animateTimer)
            if (!animate[i]) return
            _this.setState({
                animateClass: animate[i].className
            })
            _this.animateTimer = setTimeout(() => {
                clearTimeout(_this.animateTimer)
                _this.animateTimer = null
                i = i + 1
                if (animate[i]) {
                    _Animate()
                }
            }, animate[i].duration);
        }
        _Animate()
    }
    render() {
        const { animateEnd, animateClass } = this.state
        return <View className={`animated ${animateClass}`}>{this.props.renderChilden(animateEnd)}</View>
    }
}

export default Index