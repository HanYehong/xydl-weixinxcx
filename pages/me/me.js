//index.js
//获取应用实例
var app = getApp();
Page({
  data: {
    showList:[
      {
        text: '我的认证',
        url: 'myidentity',
        img: '/resource/images/identity.png'
      },
      {
        text:'我的快递订单',
        url:'expressorder',
        img:'/resource/images/my_dingdan.png'
      },
      {
        text:'我的失物招领',
        url:'lostorder',
        img: '/resource/images/my_shiwu.png'
      },
      {
        text:'联系客服',
        url:'callservice',
        img: '/resource/images/call_service.png'
      }
    ],
    navi: [
      '../../example/order/order',
      '../../example/collect/collect',
      '../../example/setion/setion',
      '../../example/fdback/fdback',
    ],
  },

  onLoad: function () {

  }
})
