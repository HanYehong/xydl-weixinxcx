// pages/orderDetail/orderDetail.js
let app = getApp();
let enums = require("../../config/enums");
let service = require("../../config/service.js");
let ajax = require("../../config/ajax.js");
let businessUtil = require("../../utils/business.util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {},
    showInfo: true,
    targetTime: 0,
    myFormat: ['天', '时', '分', '秒'],
    clearTimer: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let obj = JSON.parse(options.order);
    console.log(obj.orderNumber);
    let that = this;
    ajax.POST(service.EXPRESS_GET_ORDER, {orderNumber: obj.orderNumber}).then(data => {
      console.log("得到订单详情", data);
      data.expressSize = enums.EXPRESS_SIZE[data.size].name;
      data.expressName = enums.EXPRESS[data.expressType].name;
      data.statusText = enums.getStatusNameByCode(data.status);
      that.setData({
        orderInfo: data,
        targetTime: new Date(obj.endDate).getTime()
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
    this.setData({
      clearTimer: true
    });
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

  changeSwitch(event){
    const detail = event.detail;
    this.setData({
        showInfo : detail.value
    })
  },

  cancel(e) {
    businessUtil.cancel(e.currentTarget.dataset.order);
  },

  authorize(e) {
    businessUtil.authorize(e.currentTarget.dataset.order);
  },

  confirm(e) {
    businessUtil.confirm(e.currentTarget.dataset.order);
  },

  refuse(e) {
    businessUtil.refuse(e.currentTarget.dataset.order);
  },

  rePublish(e) {
    businessUtil.rePublish(e.currentTarget.dataset.order);
  }

})