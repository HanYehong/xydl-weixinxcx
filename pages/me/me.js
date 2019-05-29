//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    showList:[
      {
        text: '我的认证',
        url: '/pages/identity/identity',
        img: '/resource/images/identity.png'
      },
      {
        text:'我的快递订单',
        url:'/pages/meExpressOrder/meExpressOrder',
        img:'/resource/images/my_dingdan.png'
      },
      {
        text:'我的失物招领',
        url:'/pages/myLostFound/myLostFound',
        img: '/resource/images/my_shiwu.png'
      },
      {
        text:'意见反馈',
        url:'/pages/feedback/feedback',
        img: '/resource/images/fankui.png'
      }
    ],
    navi: [
      '../../example/order/order',
      '../../meExpressOrder/meExpressOrder',
      '../../example/setion/setion',
      '../../example/fdback/fdback',
    ],
  },

  onLoad: function () {

  }
})
