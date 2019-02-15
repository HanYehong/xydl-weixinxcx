//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    goodsUrl: 'https://easy-mock.com/mock/5bffe30cab841f18c58ca0ec/data/goods',
    goodsData: [],
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
  }
})
