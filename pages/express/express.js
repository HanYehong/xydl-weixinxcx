//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    goodsUrl: 'https://easy-mock.com/mock/5bffe30cab841f18c58ca0ec/data/goods',
    goodsData: [],
    expressOrderList:[
      {
        'orderNumber':'DL2019040312345',
        'expressName':'韵达快递',
        'expressSize':'小物',
        'description':'送到楼下就行，谢谢',
        'destination':'信息楼',
        'special':'易碎',
        'orderPrice':'5'
      },
      {
        'orderNumber': 'DL2019040312346',
        'expressName': '中通快递',
        'expressSize': '小物',
        'description': '是一个很小的东西，很好拿的',
        'destination': '东7宿舍楼下',
        'special': '易碎',
        'orderPrice': '5'
      },
      {
        'orderNumber': 'DL2019040312347',
        'expressName': '京东物流',
        'expressSize': '大物',
        'description': '比较大，希望男同学能帮忙拿一下~',
        'destination': '东5宿舍楼下',
        'special': '易碎',
        'orderPrice': '5'
      },
    ],
    linearColors: [],
    requestDone: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
    this.getGoodsData()
  },
  // 页面滚动时
  onPageScroll: function (ev) {
  },

  // 获取商品数据
  getGoodsData: function () {
    app.fetch('get', this.data.goodsUrl).then(res => {
      this.setData({
        goodsData: res.data,
        requestDone: true
      })
    }).catch(err => console.log(err))
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
