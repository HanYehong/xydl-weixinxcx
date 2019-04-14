const app = getApp()

Component({
  properties: {
    cardLinear: {
      type: String,
      value: 'background-image: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%)'
    },
    expressName: {
      type: String,
      value: '快递名称'
    },
    expressSize:{
      type: String,
      value: '快递大小'
    },
    expressDescription: {
      type: String,
      value: '描述'
    },
    destination: {
      type: String,
      value: '送达地点'
    },
    special: {
      type: String,
      value: '特别注意'
    },
    orderPrice: {
      type: String,
      value: '订单价格'
    },
    grapOrder: {
      type: String,
      value: 'clickFun'
    }
  },
  data: {
    cardViewsIcon: '/resource/images/icon-views.png',
    linearColor: ''
  },

  clickFun(){
    console.log("1111");
  }

})