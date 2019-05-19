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
    dataList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDataList();
  },

  //加载数据
  getDataList: function () {
    //调用数据接口，获取数据
    console.log("地点：" + this.data.location);
    console.log("类型：" + this.data.type);
    console.log("日期：" + this.data.createTime);
    let that = this;
    ajax.GET(service.LOST_FOUND_LIST_MINE, {}, '加载列表').then(data => {
      console.log("筛选失物招领，数据：")
      console.log(data);
      data.forEach(x => {
        x.lostTypeText = enums.LOSTTYPE[x.lostType];
        x.lostLocationText = enums.LOCATION[x.lostLocation];
        x.createTime = commonUtil.formatTime(x.createTime)
      })
      that.setData({
        dataList: data
      })
    })
  },

  navToDetail(e) {
    let id = e.currentTarget.dataset.id;
    console.log("选中的失物招领为：" + id);
    wx.navigateTo({
      url: '/pages/lostFoundDetail/lostFoundDetail?lostNumber=' + id + '&delete=1',
    })
  },

  longTap(e) {
    wx.showModal({
      title: '提示',
      content: '确认删除吗？',
      showCancel: true,
      cancelText: '取消',
      cancelColor: '#000000',
      confirmText: '确定',
      confirmColor: '#3CC51F',
      success: (result) => {
        if(result.confirm){
          ajax.POST(service.LOST_FOUND_DELETE, {lostNumber: e.currentTarget.dataset.id}).then(data => {
            wx.showToast({
              title: '已删除',
              icon: 'success',
              duration: 2000,
              complete: ()=>{
                app.redTo("myLostFound");
              }
            });
          })
        }
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },

})