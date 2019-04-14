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
        getCode:'8526',
        destination:'东七C205',
        money:'2',
        color:'',
        expressName: '',
        status: 0,
        statusText: '',
        button: 0,
        buttonText: ''
      },
      {
        orderNumber: 'DL201904131903',
        expressType: 1,
        getCode:'1235',
        destination:'东八楼下',
        money:'4',
        color:'',
        expressName: '',
        status: 2,
        statusText: '',
        button: 0,
        buttonText: ''
      },
      {
        orderNumber: 'DL201904121012',
        expressType: 2,
        getCode:'364',
        destination:'北大活',
        money:'2',
        color:'',
        expressName: '',
        status: 3,
        statusText: '',
        button: 0,
        buttonText: ''
      },
      {
        orderNumber: 'DL201904011504',
        expressType: 3,
        getCode:'2365',
        destination:'南管B206',
        money:'3',
        color:'',
        expressName: '',
        status: 6,
        statusText: '',
        button: 0,
        buttonText: ''
      }
    ],
  },

  onLoad: function (options) {
    console.log(this.data.orderListDoing);
    let orderListDoingAnother = this.data.orderListDoing;
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
    this.setData({
      orderListDoing: orderListDoingAnother
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
  }
})