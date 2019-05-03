let app = getApp();
let enums = require("../../config/enums");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTxt: ['失物地点', '物品类型'],//分类
    tab: [true, true, true],
    pinpaiList: [{ 'id': '1', 'title': 'U盘' }, { 'id': '2', 'title': '笔记本' }],
    lostLocation: [],
    lostType: [],
    dataList: [
      {
        lostNumber: 1,
        content: '失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领',
        lostImage: [],
        lostLocation: 5,
        lostType: 3,
        createTime: '2019-4-27 13:55'
      }, {
        lostNumber: 1,
        content: '失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领',
        lostImage: ['http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg'],
        lostLocation: 2,
        lostType: 1,
        createTime: '2019-4-27 13:55'
      }, {
        lostNumber: 1,
        content: '失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领',
        lostImage: ['http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg'],
        lostLocation: 1,
        lostType: 0,
        createTime: '2019-4-27 13:55'
      }, {
        lostNumber: 1,
        content: '失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领',
        lostImage: ['http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg'],
        lostLocation: 3,
        lostType: 3,
        createTime: '2019-4-27 13:55'
      }, {
        lostNumber: 1,
        content: '失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领失物招领',
        lostImage: ['http://pic15.nipic.com/20110628/1369025_192645024000_2.jpg'],
        lostLocation: 4,
        lostType: 1,
        createTime: '2019-4-27 13:55'
      }
    ],
    type: -1,
    location: -1,
    createTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let lostLocation = [];
    for (let item in enums.LOCATION) {
      lostLocation.push({
        id: item,
        name: enums.LOCATION[item]
      })
    }
    let lostType = [];
    for (let item in enums.LOSTTYPE) {
      lostType.push({
        id: item,
        name: enums.LOSTTYPE[item]
      })
    }
    this.setData({
      lostLocation,
      lostType
    })
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
      createTime: e.detail.value
    })
    this.getDataList();
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
          location: id
        });
        break;
      case '1':
        tabTxt[1] = txt;
        self.setData({
          type: id
        });
        break;
    }
    self.setData({
      tab: [true, true, true],
      tabTxt
    });
    //数据筛选
    self.getDataList();
  },

  //加载数据
  getDataList: function () {
    //调用数据接口，获取数据
    console.log("地点：" + this.data.location);
    console.log("类型：" + this.data.type);
    console.log("日期：" + this.data.createTime);
  },

  navigateToPublish() {
    app.navTo("publishLost");
  },

  navToDetail(e) {
    let id = e.currentTarget.dataset.id;
    console.log("选中的失物招领为：" + id);
    wx.navigateTo({
      url: '/pages/lostFoundDetail/lostFoundDetail?lostNumber=' + id,
    })
  }

})