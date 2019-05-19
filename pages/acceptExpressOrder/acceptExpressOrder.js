var app = getApp();
let enums = require("../../config/enums");
let service = require("../../config/service.js");
let ajax = require("../../config/ajax.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    processing: [],
    complete: [],
  },

  onLoad: function (options) {
    let that = this;
    ajax.GET(service.EXPRESS_ACCEPTOR_LIST, {}).then(data => {
      console.log("获得已发布订单列表成功", data);
      this.setData({
        processing: data.processing,
        complete: data.complete,
      })
    
      let orderListDoingAnother = this.data.processing;
      let orderListCompleteAnother = this.data.complete;
      for (let i = 0; i < orderListDoingAnother.length; i++) {
        // 获取快递颜色
        orderListDoingAnother[i].color = enums.getExpressColorBycode(orderListDoingAnother[i].expressType);
        // 获取快递名称
        orderListDoingAnother[i].expressName = enums.getExpressNameBycode(orderListDoingAnother[i].expressType).substring(0, 2);
        // 获取状态名称
        orderListDoingAnother[i].statusText = enums.getStatusNameByCode(orderListDoingAnother[i].status);
        // 获取操作按钮
        switch (orderListDoingAnother[i].status) {
          case enums.STATUS.WAIT_SEND.code:
            orderListDoingAnother[i].button = enums.BUTTON.ARRIVED.code;
            orderListDoingAnother[i].buttonText = enums.BUTTON.ARRIVED.name;
            break;
        }
      }
      for (let i = 0; i < orderListCompleteAnother.length; i++) {
        // 获取快递颜色
        orderListCompleteAnother[i].color = enums.getExpressColorBycode(orderListCompleteAnother[i].expressType);
        // 获取快递名称
        orderListCompleteAnother[i].expressName = enums.getExpressNameBycode(orderListCompleteAnother[i].expressType).substring(0, 2);
        // 获取状态名称
        orderListCompleteAnother[i].statusText = enums.getStatusNameByCode(orderListCompleteAnother[i].status);
      }
      this.setData({
        processing: orderListDoingAnother,
        complete : orderListCompleteAnother,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * swiper切换时会调用
   * @param {*} e 
   */
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      this.setData({
        currentIndex: e.detail.current
      })
    }
  },

  /**
   * 用户点击tab时调用
   * @param {*} e 
   */
  titleClick: function (e) {
    this.setData({
      //拿到当前索引并动态改变
      currentIndex: e.currentTarget.dataset.idx
    })
  },

  buttonClick(e) {
    console.log(e.currentTarget.dataset.code);
    console.log(e.currentTarget.dataset.order);
  },

  navToDetail(e) {
    let orderNumber = e.currentTarget.dataset.order;
    let type = e.currentTarget.dataset.type;
    let array = [];
    switch (type) {
      case 'processing':
        array = this.data.processing;
        break;
      case 'complete':
        array = this.data.complete;
        break;
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i].orderNumber === orderNumber) {
        wx.navigateTo({
          url: '../acceptOrderDetail/acceptOrderDetail?order=' + JSON.stringify(array[i]),
        })
        break;
      }
    }
  }
})