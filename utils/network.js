//小程序网络请求的二次封装,引用:var network = require("../../utils/network.js")
// var API_URL = 'https://34068512.qcloud.la/ddw.core/api/v1/'//测试环境地址
var API_URL = 'https://gank.io/api/'//测试环境地址

//GET请求
function GET(url, params, success, fail) {
  request('GET', url, params, success, fail)
}
//POST请求
function POST(url, params, success, fail) {
  request('POST', url, params, success, fail)
}
//DELETE请求
function DELETE(url, params, success, fail) {
  request('DELETE', url, params, success, fail)
}

function request(method, url, params, success, fail) {
  var params = params;
  wx.showLoading({//展示loading
    title: '加载中'
  })
  wx.request({
    url: url.indexOf("http")>=0?url :(API_URL+url),
    data: params,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: {
      // 'X-WX-Id': 'TESTER'//用户信息
    }, // 设置请求的 header
    success: function (res) {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        success(res.data)
        console.log('请求成功: ', res.data)
      }
      else {
        if (fail) {//用户覆盖默认处理方式
          fail(res);
        } else {
          console.log('请求失败(业务): ', res);//错误统一处理
        }
      }

    },
    fail: function (erroorRes) {
      if (fail) {//用户覆盖默认处理方式
        fail(erroorRes);
      } else {
        console.log('请求失败(http): ', erroorRes);//错误统一处理
      }
    },
    complete: function () {
      wx.hideLoading();//隐藏loading
      wx.stopPullDownRefresh();//结束下拉刷新
    }
  })
}
/**
 * 模拟线程延迟执行
 */
function DELAY(complete) {
  wx.showLoading({//展示loading
    title: '加载中'
  });
  setTimeout(function () {
    wx.hideLoading();//隐藏loading
    complete();
  }, 1000);
}
/**
 * 定义接口
 */
module.exports = {
  GET: GET,
  POST: POST,
  DELETE: DELETE,
  DELAY: DELAY
}