import Service from './service'
import { filtrationHttp, filtrationCode, changeMD5 } from './until'
import Base from './service/base'
const baseUrl = 'https://zgxcxpay.kantuzhuan.com:444/HGInterface.ashx'

//创建请求实例
export const newService = new Service({ url: baseUrl })
//过滤http请求
newService.use(filtrationHttp)
console.log(newService.hasOwnProperty('option'))
console.log(Base.prototype)


function get(data: any, fetchConfig?: baseService.fetchConfig) {
    newService.useChangeable(filtrationCode(0))
    return newService.request({ data: changeMD5(data), method: 'GET' }, fetchConfig)
}
function post(data: any, fetchConfig?: baseService.fetchConfig) {
    newService.useChangeable(filtrationCode(0))
    return newService.request({ data: changeMD5(data), method: 'POST' }, fetchConfig)
}

export default { get, post }