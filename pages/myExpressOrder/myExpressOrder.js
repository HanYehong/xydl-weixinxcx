var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    orderListDoing: [
      {
        expressType:'',
        getCode:'',
        destination:'',
        money:''
      },
      {
        expressType:'',
        getCode:'',
        destination:'',
        money:''
      },
      {
        expressType:'',
        getCode:'',
        destination:'',
        money:''
      },
      {
        expressType:'',
        getCode:'',
        destination:'',
        money:''
      }
    ],
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