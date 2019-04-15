var app = getApp();
let enums = require("../../config/enums");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    orderListDoing: [
      {
        orderNumber: 'DL201904131345',
        expressType: 0,
        pickupCode:'8526',
        destination:'东七C205',
        description: '',
        orderPrice: 2.0,
        color:'',
        expressName: '',
        status: 0,
        statusText: '',
        button: 0,
        buttonText: '',
        expressSize:'大物',
        name: '张三',
        phone: '15189809881',
        specialAttention: '易碎',
        beginDate: '2019-04-11 10:30',
        endDate: '2019-04-15 18:00'
      },
      {
        orderNumber: 'DL201904131903',
        expressType: 1,
        pickupCode:'1235',
        destination:'东八楼下',
        description: '',
        orderPrice: 4.0,
        color:'',
        expressName: '',
        status: 2,
        statusText: '',
        button: 0,
        buttonText: '',
        expressSize: '小物',
        name: '张三',
        phone: '15189809881',
        specialAttention: '易碎、怕压',
        beginDate: '2019-04-11 10:30',
        endDate: '2019-04-14 18:00'
      },
      {
        orderNumber: 'DL201904121012',
        expressType: 2,
        pickupCode:'364',
        destination:'北大活',
        description: '',
        orderPrice: 2.0,
        color:'',
        expressName: '',
        status: 3,
        statusText: '',
        button: 0,
        buttonText: '',
        expressSize: '中物',
        name: '张三',
        phone: '15189809881',
        specialAttention: '易碎',
        beginDate: '2019-04-11 10:30',
        endDate: '2019-04-14 18:00'
      },
      {
        orderNumber: 'DL201904011504',
        expressType: 3,
        pickupCode:'2365',
        destination:'南管B206',
        description: '',
        orderPrice: 3.0,
        color:'',
        expressName: '',
        status: 6,
        statusText: '',
        button: 0,
        buttonText: '',
        expressSize: '小物',
        name: '张三',
        phone: '15189809881',
        specialAttention: '怕压',
        beginDate: '2019-04-11 10:30',
        endDate: '2019-04-14 18:00'
      }
    ],
    orderListComplete: [
      {
        orderNumber: 'DL201904131345',
        expressType: 5,
        pickupCode:'8526',
        destination:'东七C205',
        description: '',
        orderPrice: 2.0,
        color:'',
        expressName: '',
        status: 4,
        statusText: '',
        button: 0,
        buttonText: '',
        expressSize:'大物',
        name: '张三',
        phone: '15189809881',
        specialAttention: '易碎',
        beginDate: '2019-04-11 10:30',
        endDate: '2019-04-15 18:00'
      },
      {
        orderNumber: 'DL201904131903',
        expressType: 7,
        pickupCode:'1235',
        destination:'东八楼下',
        description: '',
        orderPrice: 4.0,
        color:'',
        expressName: '',
        status: 4,
        statusText: '',
        button: 0,
        buttonText: '',
        expressSize: '小物',
        name: '张三',
        phone: '15189809881',
        specialAttention: '易碎、怕压',
        beginDate: '2019-04-11 10:30',
        endDate: '2019-04-14 18:00'
      },
    ],
    orderListUncomplete: [
      {
        orderNumber: 'DL201904131345',
        expressType: 5,
        pickupCode:'8526',
        destination:'东七C205',
        description: '',
        orderPrice: 2.0,
        color:'',
        expressName: '',
        status: 5,
        statusText: '',
        button: 0,
        buttonText: '',
        expressSize:'大物',
        name: '张三',
        phone: '15189809881',
        specialAttention: '易碎',
        beginDate: '2019-04-11 10:30',
        endDate: '2019-04-15 18:00'
      },
      {
        orderNumber: 'DL201904131903',
        expressType: 7,
        pickupCode:'1235',
        destination:'东八楼下',
        description: '',
        orderPrice: 4.0,
        color:'',
        expressName: '',
        status: 5,
        statusText: '',
        button: 0,
        buttonText: '',
        expressSize: '小物',
        name: '张三',
        phone: '15189809881',
        specialAttention: '易碎、怕压',
        beginDate: '2019-04-11 10:30',
        endDate: '2019-04-14 18:00'
      },
    ],
  },

  onLoad: function (options) {
    console.log(this.data.orderListDoing);
    let orderListDoingAnother = this.data.orderListDoing;
    let orderListCompleteAnother = this.data.orderListComplete;
    let orderListUncompleteAnother = this.data.orderListUncomplete;
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
      // 获取操作按钮
      switch (orderListCompleteAnother[i].status) {
        case enums.STATUS.WAIT_ACCEPT.code:
          ListCompleteAnother[i].button = enums.BUTTON.CANCEL.code;
          orderListCompleteAnother[i].buttonText = enums.BUTTON.CANCEL.name;
          break;
        case enums.STATUS.WAIT_AUTHORIZATION.code:
          orderListCompleteAnother[i].button = enums.BUTTON.AUTHORIZE.code;
          orderListCompleteAnother[i].buttonText = enums.BUTTON.AUTHORIZE.name;
          break;
        case enums.STATUS.WAIT_CONFIRM.code:
          orderListCompleteAnother[i].button = enums.BUTTON.CONFIRM.code;
          orderListCompleteAnother[i].buttonText = enums.BUTTON.CONFIRM.name;
          break;
        case enums.STATUS.WAIT_SEND.code:
          orderListCompleteAnother[i].button = enums.BUTTON.CANCEL.code;
          orderListCompleteAnother[i].buttonText = enums.BUTTON.CONFIRM.name;
          break;
      }
    }
    for (let i = 0; i < orderListUncompleteAnother.length; i++) {
      // 获取快递颜色
      orderListUncompleteAnother[i].color = enums.getExpressColorBycode(orderListUncompleteAnother[i].expressType);
      // 获取快递名称
      orderListUncompleteAnother[i].expressName = enums.getExpressNameBycode(orderListUncompleteAnother[i].expressType).substring(0, 2);
      // 获取状态名称
      orderListUncompleteAnother[i].statusText = enums.getStatusNameByCode(orderListUncompleteAnother[i].status);
      // 获取操作按钮
      switch (orderListUncompleteAnother[i].status) {
        case enums.STATUS.WAIT_ACCEPT.code:
          orderListUncompleteAnother[i].button = enums.BUTTON.CANCEL.code;
          orderListUncompleteAnother[i].buttonText = enums.BUTTON.CANCEL.name;
          break;
        case enums.STATUS.WAIT_AUTHORIZATION.code:
          orderListUncompleteAnother[i].button = enums.BUTTON.AUTHORIZE.code;
          orderListUncompleteAnother[i].buttonText = enums.BUTTON.AUTHORIZE.name;
          break;
        case enums.STATUS.WAIT_CONFIRM.code:
          orderListUncompleteAnother[i].button = enums.BUTTON.CONFIRM.code;
          orderListUncompleteAnother[i].buttonText = enums.BUTTON.CONFIRM.name;
          break;
        case enums.STATUS.WAIT_SEND.code:
          orderListUncompleteAnother[i].button = enums.BUTTON.CANCEL.code;
          orderListUncompleteAnother[i].buttonText = enums.BUTTON.CONFIRM.name;
          break;
      }
    }
    this.setData({
      orderListDoing: orderListDoingAnother,
      orderListComplete : orderListCompleteAnother,
      orderListUncomplete: orderListUncompleteAnother
    })
    console.log(this.data.orderListDoing);
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
    for (let i = 0; i < this.data.orderListDoing.length; i++) {
      if (this.data.orderListDoing[i].orderNumber === orderNumber) {
        wx.navigateTo({
          url: '../orderDetail/orderDetail?order=' + JSON.stringify(this.data.orderListDoing[i]),
        })
        break;
      }
    }
  }
})