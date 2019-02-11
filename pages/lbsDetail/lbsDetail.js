// pages/lbsDetail/lbsDetail.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000 ,
    title:'',
    description:'',
    latitude:'',
    longitude:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let id = options.id;
    console.log(id);
    let tableID = 60093
    let map = new wx.BaaS.TableObject(tableID)
    map.get(id).then(res=>{
      console.log(res);
      that.setData({
        title:res.data.title,
        description:res.data.description,
        imgUrls:res.data.image,
        latitude:res.data.latitude,
        longitude:res.data.longitude,
      })
    },err=>{

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

  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },
  OpenOuterNavigator: function () {
    // this.setData({
    //   menu: 1,
    //   actionSheetHidden: !this.data.actionSheetHidden
    // })
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.title
    })
  },
  OpenInnerNavigator: function () {
    // this.setData({
    //   menu: 2,
    //   actionSheetHidden: !this.data.actionSheetHidden
    // })
    // wx.redirectTo({
    //   url: '../lbsPolyline/lbsPolyline?des_latitude=' + this.data.latitude + '&des_longitude=' + this.data.longitude + '&title=' + this.data.title,
    // })
  },

})