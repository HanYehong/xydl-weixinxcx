//index.js
//获取应用实例
const app = getApp()
let ajax = require("../../config/ajax.js");
let service = require("../../config/service.js");
let enums = require("../../config/enums.js");
let commonUtil = require("../../utils/common.util.js");
Page({
  data: {
    expressOrderList:[],
  },
  //事件处理函数
  bindViewTap: function (e) {
    console.log(e);
    const prams = e.currentTarget.dataset
    // url: `../content/content?price=${prams.price}&views=${prams.views}&desc=${prams.desc}&title=${prams.title}`
    wx.navigateTo({
      url: '../content/content?id=${prams.goodsId}'
    })
  },
  onLoad: function () {
    // this.getGoodsData()
    let that = this;
    ajax.GET(service.EXPRESS_UNACCEPT_LIST, {}).then(data => {
      console.log("获取待接单列表成功", data);
      data.forEach(e => {
        e.expressName = enums.EXPRESS[e.expressType].name;
        e.expressSize = enums.EXPRESS_SIZE[e.size].name;
        e.createTime = commonUtil.formatTime(e.createTime);
      });
      that.setData({
        expressOrderList: data
      })
    })
  },
  // 页面滚动时
  onPageScroll: function (ev) {
  },

  navigateToPublish: function () {
    app.navTo('publish')
  },

  grapOrder(e){
    console.log(e.currentTarget.dataset.order);
    wx.showModal({
      title: '提示',
      content: '确认接取该订单吗？友情提示：随意取消订单是会影响信誉分的哟~',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          // 调用抢单接口
          ajax.POST(service.EXPRESS_CATCH, {orderNumber: e.currentTarget.dataset.order}, '接单中').then(data => {
            console.log("接单成功");
            wx.showToast({
              title: '接单成功',
              icon: 'success',
              duration: 2000,
              complete: ()=>{
                app.navTo("express");
              }
            });
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
