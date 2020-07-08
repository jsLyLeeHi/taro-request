import service from './service'
import { filtrationHttp, filtrationCode, changeMD5 } from './until'
const baseUrl = 'https://coding.imooc.com/learn/addquestion'

//创建请求实例
export const newService = new service({ url: baseUrl })
//过滤http请求
newService.use(filtrationHttp)


function get(path: string, data: any, fetchConfig?: baseService.fetchConfig) {
    newService.useChangeable(filtrationCode(0))
    return newService.request({ url: baseUrl + path, data: changeMD5(data), method: 'GET' }, fetchConfig)
}
function post(path: string, data: any, fetchConfig?: baseService.fetchConfig) {
    newService.useChangeable(filtrationCode(0))
    return newService.request({ url: baseUrl + path, data: changeMD5(data), method: 'POST' }, fetchConfig)
}

export default { get, post }