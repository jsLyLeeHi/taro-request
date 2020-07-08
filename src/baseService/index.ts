import service from './service'
import { filtrationHttp, filtrationCode, changeMD5 } from './until'

//创建请求实例
export const newService = new service({ url: 'https://zgxcxpay.kantuzhuan.com:444/WebInterface.ashx' })
//过滤http请求
newService.use(filtrationHttp)


function get(data: any, fetchConfig?: baseService.fetchConfig) {
    newService.useChangeable(filtrationCode(0))
    return newService.request({ data: changeMD5(data), method: 'GET' }, fetchConfig)
}
function post(data: any, fetchConfig?: baseService.fetchConfig) {
    newService.useChangeable(filtrationCode(0))
    return newService.request({ data: changeMD5(data), method: 'POST' }, fetchConfig)
}

export default { get, post }