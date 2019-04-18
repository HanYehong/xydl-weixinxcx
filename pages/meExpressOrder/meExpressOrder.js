// pages/meExpressOrder/meExpressOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showList: [
      {
        text: '我的认证',
        url: 'myidentity',
        img: '/resource/images/identity.png'
      },
      {
        text: '我的快递订单',
        url: 'expressorder',
        img: '/resource/images/my_dingdan.png'
      },
      {
        text: '我的失物招领',
        url: 'lostorder',
        img: '/resource/images/my_shiwu.png'
      },
      {
        text: '联系客服',
        url: 'callservice',
        img: '/resource/images/call_service.png'
      }
    ],
    navi: [
      '../../example/order/order',
      '../../example/collect/collect',
      '../../example/setion/setion',
      '../../example/fdback/fdback',
    ],
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

  }
})