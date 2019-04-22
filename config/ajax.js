// Zuul网关地址
let API_URL = 'http://localhost:7777';
let LIFE_SERVICE = '/xydl-life';
let USER_SERVICE = '/xydl-users';
let ATLAS_SERVICE = '/xydl-atlas';

function POST (url, data){
  return new Promise((resolve, reject) => {
     //init
     var that = this;
     var postData = data;
     /*
     //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
     postData.signature = that.makeSign(postData);
     */
     //网络请求
     wx.request({
        url: url,
        data: postData,
        method: 'POST',
        header: { 'content-type': 'application/json;charset=UTF-8' },
        success: function (res) {//服务器返回数据
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
        }
     })
  });
}

function GET (url, data) {
  return new Promise((resolve, reject) => {
    //init
    var that = this;
    var postData = data;
    /*
    //自动添加签名字段到postData，makeSign(obj)是一个自定义的生成签名字符串的函数
    postData.signature = that.makeSign(postData);
    */
    //网络请求
    wx.request({
      url: url,
      data: postData,
      method: 'GET',
      header: { 'content-type': 'application/json;charset=UTF-8' },
      success: function (res) {//服务器返回数据
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
        reject('网络出错');
      }
    })
  });
}

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
  API_URL,
  LIFE_SERVICE,
  USER_SERVICE,
  ATLAS_SERVICE
}