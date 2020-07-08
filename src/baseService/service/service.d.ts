declare namespace baseService {
    /** 
     * @loadingText 加载中展示的文字，不传则不会展示加载中效果
     * @toastType 请求失败展示的对话框类型 'toast' | 'none' | 'modal'  
     * @confirm 请求失败展示的modal对话框，用户按下了确认按钮
     */
    interface fetchConfig {
        loadingText?: string
        toastType?: 'toast' | 'none' | 'modal',
        confirm?: () => void
    }
    interface reqOptions<U extends string | Taro.General.IAnyObject | ArrayBuffer = any | any>  {
        /** 开发者服务器接口地址 */
        url?: string
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: (res: Taro.General.CallbackResult) => void
        /** 请求的参数 */
        data?: U
        /** 返回的数据格式 */
        dataType?: keyof Taro.request.dataType | string
        /** 接口调用失败的回调函数 */
        fail?: (res: Taro.General.CallbackResult) => void
        /** 设置请求的 header，header 中不能设置 Referer。
         *
         * `content-type` 默认为 `application/json` */
        header?: Taro.General.IAnyObject
        /** HTTP 请求方法 */
        method?: keyof Taro.request.method
        /** 响应的数据类型 */
        responseType?: keyof Taro.request.responseType
    }

    interface RequestTask<T> extends Promise<Taro.request.SuccessCallbackResult<T>> {
        /** 中断请求任务
         * @supported weapp
         * @see https://developers.weixin.qq.com/miniprogram/dev/api/network/request/RequestTask.abort.html
         */
        abort?: () => void

        /** 取消监听 HTTP Response Header 事件
         * @supported weapp
         * @see https://developers.weixin.qq.com/miniprogram/dev/api/network/request/RequestTask.offHeadersReceived.html
         */
        offHeadersReceived?: (callback: (res: Taro.General.CallbackResult) => void) => void
        /** 监听 HTTP Response Header 事件。会比请求完成事件更早
         * @supported weapp
         * @see https://developers.weixin.qq.com/miniprogram/dev/api/network/request/RequestTask.onHeadersReceived.html
         */
        onHeadersReceived?: (callback: (result: Taro.RequestTask.OnHeadersReceivedCallbackResult) => void) => void
    }
    type useFunceion = (res: Taro.request.SuccessCallbackResult<any>, next: (res: Taro.request.SuccessCallbackResult<any>, fn?: any) => void, error: () => void) => void
}