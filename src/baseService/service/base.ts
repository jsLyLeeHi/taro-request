import Taro from '@tarojs/taro'
export default class Base {
    protected useFunctions: baseService.useFunceion[] = []
    protected changeableFunctions: baseService.useFunceion[] = []

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
    protected showToastOrModal(resData: any, fetchConfig?: baseService.fetchConfig) {
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
    protected errModal(err_msg) {
        return {
            data: {
                msg: err_msg,
            }
        }
    }
    /**
     * 依次使用use函数传入的函数
    */
    protected runUse(res: Taro.request.SuccessCallbackResult<any>): Promise<Taro.request.SuccessCallbackResult> {
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