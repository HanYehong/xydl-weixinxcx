// pages/lbsDetail/lbsDetail.js
const app = getApp();
let enums = require("../../config/enums");
let service = require("../../config/service.js");
let ajax = require("../../config/ajax.js");
let commonUtil = require("../../utils/common.util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    target: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    console.log(options.lostNumber);
    ajax.POST(service.LOST_FOUND_GET_ONE, {lostNumber: options.lostNumber}).then(data => {
      console.log("得到失物招领详情：")
      console.log(data);
      data.lostLocationText = enums.LOCATION[data.lostLocation];
      data.lostTypeText = enums.LOSTTYPE[data.lostType];
      data.createTime = commonUtil.formatTime(data.createTime);
      that.setData({
        target: data
      })
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

})