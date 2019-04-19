// /**
//  * Get请求
//  * @param {*} url 
//  * @param {*} params 
//  * @param {*} success 
//  * @param {*} fail 
//  */
// function GET(url, params, success, fail) {
//   request('GET', url, params, success, fail)
// }

// /**
//  * POST请求
//  * @param {*} url 
//  * @param {*} params 
//  * @param {*} success 
//  * @param {*} fail 
//  */
// function POST(url, params, success, fail) {
//   request('POST', url, params, success, fail)
// }

// /**
//  * 请求方法
//  * @param {*} method 
//  * @param {*} url 
//  * @param {*} params 
//  * @param {*} success 
//  * @param {*} fail 
//  */
// function request(method, url, params, success, fail) {
//   var params = params;
//   wx.showLoading({
//     title: '加载中'
//   })
//   wx.request({
//     url: url.indexOf("http") >= 0 ? url :(API_URL + url),
//     data: params,
//     method: method,
//     header: {
//       "token": ""
//     },
//     success: function (res) {
//       if (res.statusCode >= 200 && res.statusCode < 300) {
//         success(res.data)
//         console.log(url + '<<< 请求成功: ', res.data)
//       }
//       else {
//         if (fail) {//用户覆盖默认处理方式
//           fail(res);
//         } else {
//           console.log(url + '<<< 请求失败: ', res);//错误统一处理
//         }
//       } 

//     },
//     fail: function (erroorRes) {
//       if (fail) {//用户覆盖默认处理方式
//         fail(erroorRes);
//       } else {
//         console.log('请求失败(http): ', erroorRes);//错误统一处理
//       }
//     },
//     complete: function () {
//       wx.hideLoading();//隐藏loading
//       wx.stopPullDownRefresh();//结束下拉刷新
//     }
//   })
// }

// /**
//  * 模拟线程延迟执行
//  * @param {*} complete 
//  */
// function DELAY(complete) {
//   wx.showLoading({
//     title: '加载中'
//   });
//   setTimeout(function () {
//     wx.hideLoading();
//     complete();
//   }, 1000);
// }

// module.exports = {
//   GET: GET,
//   POST: POST,
//   DELAY: DELAY
// }
function createGetService(url) {
  return async function (conf = {}) {
    let res, data
    try {
      res = await axios.request({
        url: url,
        params: conf,
        method: 'get'
      })
      return Promise.resolve(res)
    } catch (err) {
      return Promise.resolve({})
    }
  }
}

function createPostService(url) {
  return async function (conf = {}) {
    let res, data
    try {
      res = await axios.request({
        url: url,
        data: conf,
        method: 'post'
      })
      return Promise.resolve(res)
    } catch (err) {
      return Promise.resolve({})
    }
  }
}

export default {
  createGetService: createGetService,
  createPostService: createPostService
}
