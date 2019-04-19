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
        status: 2,
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
      {
        orderNumber: 'DL201904131904',
        expressType: 1,
        pickupCode:'1245',
        destination:'东六楼下',
        description: '',
        orderPrice: 4.0,
        color:'',
        expressName: '',
        status: 1,
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
        status: 3,
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
        status: 3,
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
    let orderListDoingAnother = this.data.orderListDoing;
    let orderListCompleteAnother = this.data.orderListComplete;
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
      orderListDoing: orderListDoingAnother,
      orderListComplete : orderListCompleteAnother,
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
        array = this.data.orderListDoing;
        break;
      case 'complete':
        array = this.data.orderListComplete;
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