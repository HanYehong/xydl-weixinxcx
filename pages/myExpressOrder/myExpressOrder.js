var app = getApp();
let enums = require("../../config/enums");
let service = require("../../config/service.js");
let ajax = require("../../config/ajax.js");
let businessUtil = require("../../utils/business.util.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    processing: [],
    complete: [],
    uncomplete: [],
  },

  onLoad: function (options) {
    let that = this;
    ajax.GET(service.EXPRESS_PUBLISHOR_LIST, {}).then(data => {
      console.log("获得已发布订单列表成功", data);
      this.setData({
        processing: data.processing,
        complete: data.complete,
        uncomplete: data.uncomplete
      })
      let orderListDoingAnother = this.data.processing;
      let orderListCompleteAnother = this.data.complete;
      let orderListUncompleteAnother = this.data.uncomplete;
      for (let i = 0; i < orderListDoingAnother.length; i++) {
        // 获取快递颜色
        orderListDoingAnother[i].color = enums.getExpressColorBycode(orderListDoingAnother[i].expressType);
        // 获取快递名称
        orderListDoingAnother[i].expressName = enums.getExpressNameBycode(orderListDoingAnother[i].expressType).substring(0, 2);
        // 获取状态名称
        orderListDoingAnother[i].statusText = enums.getStatusNameByCode(orderListDoingAnother[i].status);
        // 获取操作按钮
        switch (orderListDoingAnother[i].status) {
          case enums.STATUS.WAIT_ACCEPT.code:
            orderListDoingAnother[i].button = enums.BUTTON.CANCEL.code;
            orderListDoingAnother[i].buttonText = enums.BUTTON.CANCEL.name;
            break;
          case enums.STATUS.WAIT_AUTHORIZATION.code:
            orderListDoingAnother[i].button = enums.BUTTON.AUTHORIZE.code;
            orderListDoingAnother[i].buttonText = enums.BUTTON.AUTHORIZE.name;
            break;
          case enums.STATUS.WAIT_CONFIRM.code:
            orderListDoingAnother[i].button = enums.BUTTON.CONFIRM.code;
            orderListDoingAnother[i].buttonText = enums.BUTTON.CONFIRM.name;
            break;
          case enums.STATUS.WAIT_SEND.code:
            orderListDoingAnother[i].button = enums.BUTTON.CANCEL.code;
            orderListDoingAnother[i].buttonText = enums.BUTTON.CONFIRM.name;
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
      for (let i = 0; i < orderListUncompleteAnother.length; i++) {
        // 获取快递颜色
        orderListUncompleteAnother[i].color = enums.getExpressColorBycode(orderListUncompleteAnother[i].expressType);
        // 获取快递名称
        orderListUncompleteAnother[i].expressName = enums.getExpressNameBycode(orderListUncompleteAnother[i].expressType).substring(0, 2);
        // 获取状态名称
        orderListUncompleteAnother[i].statusText = enums.getStatusNameByCode(orderListUncompleteAnother[i].status);
      }
      this.setData({
        processing: orderListDoingAnother,
        complete : orderListCompleteAnother,
        uncomplete: orderListUncompleteAnother
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
    switch(e.currentTarget.dataset.code) {
      case 0:  // 取消
        businessUtil.cancel(e.currentTarget.dataset.order);
        break;
      case 1:  // 确认
        businessUtil.confirm(e.currentTarget.dataset.order);
        break;
      case 3:  // 授权
        businessUtil.authorize(e.currentTarget.dataset.order);
        break;
    }
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
      case 'uncomplete':
        array = this.data.uncomplete;
        break;
    }
    for (let i = 0; i < array.length; i++) {
      if (array[i].orderNumber === orderNumber) {
        wx.navigateTo({
          url: '../orderDetail/orderDetail?order=' + JSON.stringify(array[i]),
        })
        break;
      }
    }
  }
})