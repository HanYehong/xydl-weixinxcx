var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    lastX: 0,
    lastY: 0,
    "firstList": ["LXT", "LXT", "LXT", "LXT", "LXT", "LXT"],
    "secondList": ["GFF", "GFF", "GFF", "GFF", "GFF", "GFF", "GFF", "GFF"]
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