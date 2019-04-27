let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTxt: ['物品类型', '失物地点'],//分类
    date:'',
    tab: [true, true, true],
    pinpaiList: [{ 'id': '1', 'title': 'U盘' }, { 'id': '2', 'title': '笔记本' }],
    dataList: [
      {
        goods_id: 1,
        goods_title: '失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领',
        goods_img: 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg',
        location: '信息楼',
        type: '笔记本',
        createTime: '2019-4-27 13:55'
      }, {
        goods_id: 1,
        goods_title: '失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领',
        goods_img: 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg',
        location: '信息楼',
        type: '笔记本',
        createTime: '2019-4-27 13:55'
      }, {
        goods_id: 1,
        goods_title: '失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领',
        goods_img: 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg',
        location: '信息楼',
        type: '笔记本',
        createTime: '2019-4-27 13:55'
      }, {
        goods_id: 1,
        goods_title: '失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领',
        goods_img: 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg',
        location: '信息楼',
        type: '笔记本',
        createTime: '2019-4-27 13:55'
      }, {
        goods_id: 1,
        goods_title: '失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领',
        goods_img: 'http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg',
        location: '信息楼',
        type: '笔记本',
        createTime: '2019-4-27 13:55'
      }
    ],
    type: 0,
    location: 0,
    createTime: 0
  },

  // 选项卡
  filterTab: function (e) {
    var data = [true, true, true], index = e.currentTarget.dataset.index;
    data[index] = !this.data.tab[index];
    this.setData({
      tab: data
    })
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  //筛选项点击操作
  filter: function (e) {
    let index = e.currentTarget.dataset.index;
    let id = e.currentTarget.dataset.id;
    let txt = e.currentTarget.dataset.txt;
    let tabTxt = this.data.tabTxt;
    let self = this;
    switch (index) {
      case '0':
        tabTxt[0] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          type: id
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          location: id
        });
        break;
      case '2':
        tabTxt[2] = txt;
        self.setData({
          tab: [true, true, true],
          tabTxt: tabTxt,
          createTime: date
        });
        break;
    }
    //数据筛选
    self.getDataList();
  },

  //加载数据
  getDataList: function () {
    //调用数据接口，获取数据

  },

  navigateToPublish() {
    app.navTo("publishLost");
  }

})