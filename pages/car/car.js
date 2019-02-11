// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coreLongitude: '118.879990',//中心经度
    coreLatitude: '31.922330',//中心纬度
    scale: 17,//缩放级别
    markers: [],//标记点
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var i = 0;
    var timer = setInterval(function () {
      wx.request({
        url: 'http://192.168.43.38:7777/xydl-atlas/carMarkers',
        method: 'GET',
        header: { 'content-type': 'application/json' },
        data: {},
        success: function (res) {
          console.log(res.data.data);
          that.setCarMarkers(res.data.data);
          i++;
          if (i == 20) {
            clearInterval(timer);
          }
        }
      })
    }
      , 2000)
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

  setCarMarkers(item) {
    let markers = [];
    let marker = {
      latitude: item.latitude,
      longitude: item.longitude,
      iconPath: "../../resource/images/1.png",
      width: 32,
      height: 40
    }
    markers.push(marker);
    this.setData({
      markers
    })
  },
})