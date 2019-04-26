// example/fdback/fdback.js
let ajax = require('../../config/ajax');
let service = require('../../config/service');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    contact: '',
    formData: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  commit(e) {
    console.log(e);
    let that = this;
    ajax.POST(service.API_URL + service.LIFE_SERVICE + '/feedback/commit', {content: e.detail.value.content, contactWay: e.detail.value.contact}).then(data => {
      wx.showToast({
        title: '我们已得到反馈',
        success: res => {
        //用onLoad周期方法重新加载，实现当前页面的刷新
        that.setData({
          formData: ''
        })
      }})
    })
  }
})