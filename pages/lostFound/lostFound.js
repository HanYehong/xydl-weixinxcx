let app = getApp();
let enums = require("../../config/enums");
let service = require("../../config/service.js");
let ajax = require("../../config/ajax.js");
let commonUtil = require("../../utils/common.util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabTxt: ['失物地点', '物品类型'],//分类
    tab: [true, true, true],
    lostLocation: [],
    lostType: [],
    dataList: [],
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
    this.getDataList();
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
    let that = this;
    ajax.POST(service.LOST_FOUND_SELECT, {
      lostType: that.data.type,
      lostLocation: that.data.location,
      createTime: that.data.createTime
    }, '加载列表').then(data => {
      console.log("筛选失物招领，数据：")
      console.log(data);
      data.forEach(x => {
        x.lostTypeText = enums.LOSTTYPE[x.lostType];
        x.lostLocationText = enums.LOCATION[x.lostLocation];
        x.createTime = that.formatTime(x.createTime)
      })
      that.setData({
        dataList: data
      })
    })
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
  },

  /**************************************时间格式化处理************************************/
  formatTime(date) {
    var date = new Date(date);  
    let year = date.getFullYear()
    let month = this.format(date.getMonth() + 1)
    let day = this.format(date.getDate())
    let hour = this.format(date.getHours())
    let minute = this.format(date.getMinutes())
    let second = this.format(date.getSeconds())
    return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
  },

  format(data) {
    if (data < 10) data = '0' + data;
    return data;
  }

})