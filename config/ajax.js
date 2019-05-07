function POST(url, data, loadingText = '') {
  if (loadingText == '' || loadingText == null) {
    loadingText = '加载中';
  }
  return REQUEST('POST', url, data, loadingText);
}

function GET(url ,data, loadingText = '') {
  if (loadingText == '' || loadingText == null) {
    loadingText = '加载中';
  }
  return REQUEST('GET', url, data, loadingText);
}

function REQUEST (method, url, data, loadingText){
  return new Promise((resolve, reject) => {
     wx.showLoading({
      title: loadingText,
     })
     wx.request({
        url: url,
        data: data,
        method: method,
        header: { 'content-type': 'application/json;charset=UTF-8', 'token': 'yehong.han' },
        success: function (res) {
          console.log(res);
          if (res.statusCode == 200) {
            console.log("post 请求成功 ---")
            if (res.data.code == 10000) {
              console.log("后台处理数据成功 ###");
              return resolve(res.data.data);
            } else {
              showError(res.data.msg);
            }
          } else {
            showError("服务繁忙，请稍后再试");
          }
        },
        error: function (e) {
          showError('网络出错');
        },
        complete: function (e) {
          wx.hideLoading();
        }
     })
  });
}

// function GET (url, data) {
//   return new Promise((resolve, reject) => {
//     var that = this;
//     var postData = data;
//     wx.showLoading({
//       title: '加载中',
//     })
//     wx.request({
//       url: url,
//       data: postData,
//       method: 'GET',
//       header: { 'content-type': 'application/json;charset=UTF-8', 'token': 'yehong.han' },
//       success: function (res) {
//         console.log(res);
//         if (res.statusCode == 200) {
//           console.log("post 请求成功 ---")
//           if (res.data.code == 10000) {
//             console.log("后台处理数据成功 ###");
//             return resolve(res.data.data);
//           } else {
//             showError(res.data.msg);
//           }
//         } else {
//           showError("服务繁忙，请稍后再试");
//         }
//       },
//       error: function (e) {
//         reject('网络出错');
//       },
//       complete: function (e) {
//         wx.hideLoading();
//       }
//     })
//   });
// }

/**
 * 弹窗提示网络错误
 */
function showError(content){
  wx.showModal({
    title: '错误',
    content: content,
    showCancel: false,
  })
}

/**
 * 定义接口
 */
module.exports = {
  POST,
  GET, 
}