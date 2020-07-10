import { Service, UploadFile } from './service'
import { filtrationHttp, filtrationCode, filtrationUploadCode, changeMD5 } from './until'
// import Base from './service/base'
const baseUrl = 'https://zgxcxpay.kantuzhuan.com:444/HGInterface.ashx'

//创建请求实例
const newService = new Service({ url: baseUrl })
//过滤http请求
newService.use(filtrationHttp)

/** get请求 */
function get(data: any, fetchConfig?: baseService.fetchConfig) {
    newService.useChangeable(filtrationCode(0))
    return newService.request({ data: changeMD5(data), method: 'GET' }, fetchConfig)
}
/** post请求 */
function post(data: any, fetchConfig?: baseService.fetchConfig) {
    newService.useChangeable(filtrationCode(0))
    return newService.request({ data: changeMD5(data), method: 'POST' }, fetchConfig)
}


//创建上传实例
const newUploadFile = new UploadFile({ url: `${baseUrl}?bNo=1907`, formData: { ShopNo: '100276' }, header: { "Content-Type": "multipart/form-data" } })
//过滤http请求
newUploadFile.use(filtrationHttp)

/** 上传文件 */
function upLoadFile(filePath: string, fetchConfig?: baseService.fetchConfig) {
    newUploadFile.useChangeable(filtrationUploadCode())
    return newUploadFile.uploadFile({ name: 'file', filePath }, fetchConfig)
}

export default { get, post, upLoadFile }