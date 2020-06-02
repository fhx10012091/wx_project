import { config } from '../config.js'
const tips = {
  1: '抱歉出现一个错误',
  1005: '秘钥无效',
  3000: '期刊不存在'
}
class Http {
  request({url, data={}, methods="GET"}){
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, methods)
    })
  }
  _request(url, resolve, reject, data, methods) {
    wx.request({
      url: config.api_base_url + url,
      method: methods,
      data: data,
      header: {
        'content-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        let code = res.statusCode.toString()
        if (code.startsWith('2')) {
          resolve(res.data)
        } else {
          reject()
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (err) => {
        reject()
        wx.showToast({
          title: '错误啊',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }
  _show_error(error_code) {
    if (!error_code) {
      error_code = 1
    }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}
export { Http }