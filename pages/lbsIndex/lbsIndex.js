// pages/lbsIndex/lbsIndex.js
var config = require('../../config/config')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeCategory:'',//当前激活的分类
    categoryData: ['校门', '食堂', '宿舍楼', '图书馆','教学楼','学院','快递点','运动场','小吃店','超市水果店','医务室','银行','活动场所','生活服务'],
    coreLongitude: '118.879990',//中心经度
    coreLatitude: '31.922330',//中心纬度
    polyline: [],
    scale: 16,//缩放级别
    markers: [],//标记点
    carMarkers: [],//小公交标记点
    isSpread: true, //底部可滚动视图区域是否显示，true表示展开，false表示收缩
    merchantsData: [],//某一分类下的所有标记点数据
    activeMerchantIndex:0,//当前激活的标记点对应的index索引，默认为0
    scrollIntoView:'',
    actionSheetHidden: true,
    actionSheetItems: [
      { bindtap: 'OpenOuterNavigator', txt: '外部导航' },
      { bindtap: 'OpenInnerNavigator', txt: '内部导航' },
    ],
    menu: '',
    title: '',
    latitude: '',
    longitude: ''
  },

  onLoad: function (options) {
    this.setData({
      polyline:[]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;

    this.setData({
      activeCategory: config.CATEGORY
    })

    let categoryID = this.data.categoryData.indexOf(config.CATEGORY);
    console.log(categoryID)

    app.globalData.categoryID = categoryID;

    this.getCategory(config.CATEGORY,function(res){
      console.log(res);
      let merchantsData = res.data.objects;
      that.setData({
        merchantsData: merchantsData
      })
      console.log(merchantsData);
      that.setMarkers(merchantsData);
    })

  },

  setMarkers(merchants){
    let markers = [];
    let categoryID = app.globalData.categoryID;
    merchants.forEach((item) => {
      let marker = {
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        iconPath: "../../resource/images/"+categoryID+".png",
        callout:{
          content:item.title,
          fontSize:16,
          borderRadius:5,
          bgColor:'#fff',
          padding:10,
          textAlign:'center',
          display:'BYCLICK'
        },
        width: 32,
        height: 40
      }
      markers.push(marker);
    })
    this.setData({
      markers
    })
  },

  getCategory(name,cb){
    let tableID = '60093'
    let Map = new wx.BaaS.TableObject(tableID)

    let query = new wx.BaaS.Query()

    query.in('category', [name]);

    Map.setQuery(query).find().then(res => cb(res),err => {
      // err
    })
  },

  categoryChange:function(e){
    var that = this;
    console.log(e);
    var category = e.currentTarget.dataset.category;

    let categoryID = this.data.categoryData.indexOf(category);
    console.log(categoryID)
    app.globalData.categoryID = categoryID;

    this.getCategory(category, function (res) {
      console.log(res);
      let merchantsData = res.data.objects;
      that.setData({
        activeCategory: category,
        merchantsData,
        polyline: [],
      })
      if(res.data.objects.length > 0){
        that.setData({
          scrollIntoView: 'id' + res.data.objects[0].id,
          activeMerchantIndex: 0
        })
      }

      that.setMarkers(merchantsData);
    })
  },

  switchMerchantsItems(e) {
    this.setData({
      isSpread: !this.data.isSpread,
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  markerTap:function(e){
    console.log(e)
    this.setData({
      polyline:[]
    })
    let markerId = e.markerId;
    let markers =  this.data.markers;
    let categoryId = app.globalData.categoryID;
    let merchantsData = this.data.merchantsData;
    var des_latitude;
    var des_longitude;
    //更新选中标记的图标
    markers.forEach(item=>{
      if(item.id == markerId){
        item.iconPath = "../../resource/images/"+categoryId+"choosed.png"
      }else{
        item.iconPath = "../../resource/images/" + categoryId + ".png"
      }
    })
    this.setData({
      markers
    })

    merchantsData.forEach((item,index)=>{
      if(item.id == markerId){
        this.setData({
          scrollIntoView:'id'+item.id,
          activeMerchantIndex:index
        })
      }
    })

  },//markerTap

  //规划路线
  polylineAPI(me_latitude,me_longitude,des_latitude,des_longitude){
    var howLong = app.getDistance(me_latitude, me_longitude, des_latitude, des_longitude);
    console.log('目的地距离当前位置大概有'+howLong+'km');
    if(howLong > 10){
      console.log('距离过远，无法规划路线')
      wx.showToast({
        title: '目标距离过远',
        image:'/resource/images/error.png',
        duration: 3000
      })
      return;
    }

    var that = this;

    //请求腾讯地图API
    var coors = [];

    wx.request({

      url: 'https://apis.map.qq.com/ws/direction/v1/driving/?from=' + me_latitude + ',' + me_longitude + '&to=' + des_latitude + ',' + des_longitude + '&output=json&callback=cb&key=22VBZ-REEK5-WVSI7-QKCOP-QPM6E-W7BPO',

      success: function (res) {
        console.log('调用腾讯API成功……')
        wx.hideLoading();
        console.log(res);
        coors = res.data.result.routes[0].polyline
        for (var i = 2; i < coors.length; i++) {
          coors[i] = coors[i - 2] + coors[i] / 1000000
        }
        //绘制路线
        console.log('开始绘制路线……')
        var b = []
        for (var i = 0; i < coors.length; i = i + 2) {
          b[i / 2] = {
            latitude: coors[i],
            longitude: coors[i + 1]
          }
        }
        console.log('b.length='+b.length);
        that.setData({
          polyline: [{
            points: b,
            color: "#e59ea5",
            width: 5,
            dottedLine: false
          }],
        })
      },  //success
      fail:function(){
        wx.showToast({
          title: '网络请求失败',
          image:'/resource/images/error.png',
          duration:3000
        })
      }
    })//request
  }, //polylineAPI function

  actionSheetTap: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  actionSheetbindchange: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
  },

  OpenOuterNavigator: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    wx.openLocation({
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.title
    })
  },

  OpenInnerNavigator: function () {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    console.log('正在计算当前坐标……');

    wx.showLoading({
      title: '规划中…',
    })

    //得到目前自己的坐标
    var me_latitude;
    var me_longitude;
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success(res) {
        //       console.log(res)
        me_latitude = res.latitude
        me_longitude = res.longitude
        console.log('我的坐标：' + me_latitude + ',' + me_longitude)

        console.log('开始规划路线……');
        //调用API
        that.polylineAPI(me_latitude, me_longitude, that.data.latitude, that.data.longitude)

      },//success
      fail(){
        wx.showToast({
          title: '当前定位失败',
          image:'/resource/images/error.png',
          duration:3000
        })
      }
    })//getLocation

  },

  gotoMap:function(item){
    let obj = item.target.dataset.item
    this.setData({
      latitude:obj.latitude,
      longitude:obj.longitude,
      title:obj.title,
      actionSheetHidden: !this.data.actionSheetHidden
    })
  }

})