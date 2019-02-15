/**
 *
 *
 * @param {string} [method='get']  请求方法
 * @param {string} url  请求地址
 * @param {object} [params={}]  请求参数
 * @returns
 */
function Request(method = 'get', url, params = {}) {
  wx.showLoading({
    title: '加载中，请稍后..'
  })
  let timeStart = Date.now()
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: params,
      method,
      header: {
        'content-type': 'application/json'
      },
      complete: function (res) {
        wx.hideLoading()
        console.log(`耗时${Date.now() - timeStart}ms`);

        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data)
        } else {
          reject(res)
        }
      }
    })
  })
}

export default Request