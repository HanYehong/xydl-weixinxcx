// pages/mine/mine.js
let app = getApp()
let service = require('../../config/service')
let ajax = require('../../config/ajax')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    user:{
      avatarUrl: app.globalData.userInfo_WX.avatarUrl,
      nickName: app.globalData.userInfo_WX.nickName
    }
  },

  updateData(isLogin){
    this.setData({
      isLogin: isLogin,
      user: app.globalData.userInfo_WX
    })
  },

  /**
   * 失物招领
   */
  viewLostFound:() => {
    app.navTo('lostFound')
  },

  /**
   * 帮拿快递
   */
  viewExpress:() => {
    app.navTo('express')
  },

  /**
   * 个人页面
   */
  viewMe: function () {
    app.navTo('me')
  },

  /**
   * 意见反馈
   */
  viewFeedback:function(){
    app.navTo('feedback')    
  },

  /**
   * 机器人聊天
   */
  viewRobot: function () {
    app.navTo('robot')
  },

  /**
   * 文字识别
   */
  viewRecognize: function () {
    app.navTo('textRecognition')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('执行onLoad方法')
    this.getUserInfo();  //尝试得到用户信息（包括检测session_key是否过期、过期的话自动登录、没有过期的话直接获取用户信息，设置全局变量中的用户信息
  },

  toLogin(res){
    this.login();  //用户手动进行登录
    this.onLoad();  //登录完成重新加载页面显示用户信息
  },

  getUserInfo(){
    var that = this;
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        wx.getStorage({
          key: 'location_token',
          success: (result)=>{
            console.log('用户身份未过期')
            wx.getUserInfo({
              success: function (userRes) {
                console.log('获取用户信息成功')
                console.log(userRes)
                app.globalData.userInfo_WX = userRes.userInfo;
                that.updateData(true);
              },
              fail() {
                console.log('——用户信息获取失败——')
              }
            })
          },
          fail: ()=>{
            console.log('用户身份过期，需要重新登录')
            app.initUserInfo();
            that.updateData(false);
          },
          complete: ()=>{}
        });
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        console.log('用户身份过期，需要重新登录')
        app.initUserInfo();
        that.updateData(false);
      }
    })
  },

  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success(userRes){
              // 后端字段是nickname  而前端字段为nickName
              userRes.userInfo.nickname = userRes.userInfo.nickName
              let codeInfo = {
                code: res.code,
                wechatUser: userRes.userInfo
              }
              wx.request({
                url: service.LOGIN_GET_TOKEN,
                data: codeInfo,
                method: 'post',
                header: { 'content-type': 'application/json;charset=UTF-8' },
                success: function (res) {
                  console.log(res);
                  if (res.statusCode == 200) {
                    console.log("post 请求成功 ---")
                    if (res.data.code == 10000) {
                      console.log("后台处理数据成功 ###");
                      wx.setStorage({
                        key: 'location_token',
                        data: res.data.data
                      })
                      that.getUserInfo()
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
            }
          })
        }
      },
      fail() {
        console.log('——登录失败——')
      }
    })
  },

})
