// pages/identity/identity.js
let ajax = require('../../config/ajax')
let service = require('../../config/service')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '',
    password: '',
    isIdentity: false,
    identityData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    ajax.GET(service.API_URL + service.USER_SERVICE + '/user/isAuthorize').then(data => {
      if (data == 0) {
        console.log("未实名认证");
        this.setData({
          isIdentity: false
        })
      } else {
        console.log("已认证");
        console.log(data);
        this.setData({
          isIdentity: true,
          identityData: data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  identity() {
    console.log(this.data.username);
    console.log(this.data.password);
    ajax.POST(service.API_URL + service.USER_SERVICE + '/user/authorize', {username: 'zhangsan2', password: '123456'}).then(data => {
      console.log(data);
      wx.showToast({
        content: '认证成功',
        type: 'success'
      })
      this.setData({
        isIdentity: true,
        identityData: data
      })
    })
  },

})