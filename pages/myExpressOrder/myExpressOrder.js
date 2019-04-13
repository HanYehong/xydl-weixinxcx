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
        expressType: 0,
        getCode:'8526',
        destination:'东七C205',
        money:'2',
        color:'',
        expressName: '',
        status: 0,
        statusText: ''
      },
      {
        expressType: 1,
        getCode:'1235',
        destination:'东八楼下',
        money:'4',
        color:'',
        expressName: '',
        status: 2,
        statusText: ''
      },
      {
        expressType: 2,
        getCode:'364',
        destination:'北大活',
        money:'2',
        color:'',
        expressName: '',
        status: 3,
        statusText: ''
      },
      {
        expressType: 3,
        getCode:'2365',
        destination:'南管B206',
        money:'3',
        color:'',
        expressName: '',
        status: 7,
        statusText: ''
      }
    ],
  },

  onLoad: function (options) {
    console.log(this.data.orderListDoing);
    let orderListDoingAnother = this.data.orderListDoing;
    for (let i = 0; i < orderListDoingAnother.length; i++) {
      orderListDoingAnother[i].color = enums.getExpressColorBycode(orderListDoingAnother[i].expressType);
    }
    for (let i = 0; i < orderListDoingAnother.length; i++) {
      orderListDoingAnother[i].expressName = enums.getExpressNameBycode(orderListDoingAnother[i].expressType).substring(0, 2);
    }
    for (let i = 0; i < orderListDoingAnother.length; i++) {
      orderListDoingAnother[i].statusText = enums.getStatusNameByCode(orderListDoingAnother[i].status);
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

  getColorById(id) {
    for (let i = 0; i < config.EXPRESS.length; i++) {
      if (config.EXPRESS[i].ID == id) {
        return config.EXPRESS[i].COLOR;
      }
    }
  },
  getNameById(id) {
    for (let i = 0; i < config.EXPRESS.length; i++) {
      if (config.EXPRESS[i].ID == id) {
        return config.EXPRESS[i].NAME;
      }
    }
  },

  //swiper切换时会调用
  pagechange: function (e) {
    if ("touch" === e.detail.source) {
      this.setData({
        currentIndex: e.detail.current
      })
    }
  },
  //用户点击tab时调用
  titleClick: function (e) {
    let currentPageIndex =
      this.setData({
        //拿到当前索引并动态改变
        currentIndex: e.currentTarget.dataset.idx
      })
  }
})