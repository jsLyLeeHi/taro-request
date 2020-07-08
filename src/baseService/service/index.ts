import Taro from '@tarojs/taro'


export default class Index {
    constructor(option: Taro.request.Option) {
        this.option = option
    }
    private option: Taro.request.Option
    private useFunctions: baseService.useFunceion[] = []
    private changeableFunctions: baseService.useFunceion[] = []
    /**
     * 发起请求 
     * @reqOptions 允许重写请求的options
     * @fetchConfig 加载中展示的文字 和请求失败的弹窗配置
    */
    public request(reqOptions: baseService.reqOptions, fetchConfig?: baseService.fetchConfig): baseService.RequestTask<any> {
        const newOption = { ...this.option, ...reqOptions }
        const myfetch: Taro.RequestTask<any> = Taro.request(newOption)
        let fetch: baseService.RequestTask<any> = new Promise((resolve, reject) => {
            fetchConfig?.loadingText && Taro.showLoading({ title: fetchConfig?.loadingText || '', mask: true })
            myfetch.then((res) => {
                fetchConfig?.loadingText && Taro.hideLoading()
                //使用use传入的方法对不需要的数据拦截
                this.runUse(res).then((res) => {
                    this.changeableFunctions = []
                    resolve(res)
                }, (err) => {
                    reject(err)
                })
            }, (err) => {
                fetchConfig?.loadingText && Taro.hideLoading()
                if (Number(err.error) === 9) {
                    reject(this.errModal('请求已取消...'))
                    return
                }
                const errMsg = err.errMsg || err.errorMessage
                if (errMsg) {
                    reject(this.errModal(err.errMsg))
                } else {
                    reject(this.errModal('网络请求失败,请检查网络状态是否正常!!!'))
                }
            })
        })
        if (typeof myfetch.abort === 'function') { fetch['abort'] = myfetch.abort }
        if (typeof myfetch.offHeadersReceived === 'function') { fetch['offHeadersReceived'] = myfetch.offHeadersReceived }
        if (typeof myfetch.onHeadersReceived === 'function') { fetch['onHeadersReceived'] = myfetch.onHeadersReceived }
        fetch.catch((err) => { this.showToastOrModal(err?.data, fetchConfig); this.changeableFunctions = [] })
        return fetch
    }
    /**
     * 传入对返回数据做预处理的函数--这些预处理函数是固定的,使用之后将不会删除，下次请求将继续使用
     * @param //baseService.useFunceion
    */
    public use(fn: baseService.useFunceion) {
        if (typeof fn === 'function' && Array.isArray(this.useFunctions)) {
            this.useFunctions.push(fn)
        }
    }
    /**
     * 传入对返回数据做预处理的函数--这些预处理函数是可变的,使用之后将删除
     * @param //baseService.useFunceion
    */
    public useChangeable(fn: baseService.useFunceion) {
        if (typeof fn === 'function' && Array.isArray(this.changeableFunctions)) {
            this.changeableFunctions.push(fn)
        }
    }
    /** 
     * 请求失败时弹出对话框 
    */
    private showToastOrModal(resData: any, fetchConfig?: baseService.fetchConfig) {
        let resMessage = resData.message || resData.msg || resData.err_msg || ('未知错误:' + JSON.stringify(resData))
        //确保在loading消失后再弹出对话框
        setTimeout(() => {
            if (fetchConfig?.toastType === 'toast' || fetchConfig?.toastType === undefined) {
                Taro.showToast({ title: resMessage, icon: 'none' })
            } else if (fetchConfig?.toastType === 'modal') {
                Taro.showModal({
                    title: '提示',
                    content: resMessage,
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm && typeof fetchConfig?.confirm === 'function') {
                            fetchConfig.confirm()
                        }
                    }
                })
            }
        }, 20);
    }
    /** 
     * 格式化错误数据 
    */
    private errModal(err_msg) {
        return {
            data: {
                msg: err_msg,
            }
        }
    }
    /**
     * 依次使用use函数传入的函数
    */
    private runUse(res: Taro.request.SuccessCallbackResult<any>): Promise<Taro.request.SuccessCallbackResult> {
        let i = 0
        let useFns = [...this.useFunctions, ...this.changeableFunctions]
        return new Promise((resolve, reject) => {
            let resData = res
            function next() {
                let nextFn = useFns[i];
                i++
                if (!nextFn || typeof nextFn !== 'function') {
                    resolve(resData)
                    return
                }
                nextFn(resData, next.bind(this), reject);
            }
            next.call(this);
        })
    }
}