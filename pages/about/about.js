// pages/about/about.js
var WxParse = require("../../utils/wxParse/wxParse.js")
var config = require('../../config/config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [],
    indicatorDots:true,
    autoplay:true,
    interval:3000,
    schoolName:'',
    englishName:'',
    description:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    wx.getStorage({
      key: 'schoolData',
      success: function(res) {
        console.log(res.data);
        that.setData({
          schoolName: res.data.schoolName,
          englishName: res.data.englishName,
          imgUrls: res.data.image
        })
        console.log('从本地缓存中读取数据……')
      },
      fail:function(res){
        //数据表
        let tableID = config.TABLE_ID.SCHOOL
        let recordID = '5c13506ae125633aeca3ff25'

        let Product = new wx.BaaS.TableObject(tableID)

        Product.get(recordID).then(res => {
          // success
          console.log(res.data);
          that.setData({
            schoolName: res.data.schoolName,
            englishName: res.data.englishName,
            imgUrls: res.data.image
          })
          wx.setStorage({
            key: 'schoolData',
            data: res.data,
          })
        }, err => {
          // err
        })
        console.log('从服务器端读取数据……')
      }
    })

    //内容库
    let contentGroupID = 1544768347106404
    let richTextID = 1544768742235278

    let MyContentGroup = new wx.BaaS.ContentGroup(contentGroupID)
    MyContentGroup.getContent(richTextID).then(res => {
      // success
      var content = res.data.content;
      WxParse.wxParse('content','html',content,this);
    }, err => {
      // err
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
  
  }
})