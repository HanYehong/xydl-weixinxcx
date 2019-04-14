import api from './api/api'

App({
  onLaunch() {
    require('./utils/sdk-v1.12.0.js')
   
    let clientID = '785cc414335fc8744bba'
    wx.BaaS.init(clientID)
  },

  globalData:{
    categoryID:0,
    EARTH_RADIUS : 6378.137, //地球半径
    serverIp:'http://192.168.43.38',
    serverPort: 7777,
    xydlUsers: 'xydl-users',
    /**
     * 微信号的用户信息
     */
    userInfo_WX:{
      nickName: '未登录',   //昵称
      avatarUrl: '../../resource/images/touxiang.png'   //头像URL
    },
    /**
     * 学校账号的用户信息
     */
    userInfo_SC:{
      userId: '',  //学号
      name: 'unknown',   //姓名
      sex: 'unknown',    //性别
      academic: 'unknown',   //学院
      major: 'unknown',    //专业
      theClass: 'unknown'   //班级
    }
  },

  initUserInfo(){
    this.globalData.userInfo_WX = {
      nickName: '未登录',   //昵称
      avatarUrl: '../../resource/images/touxiang.png'   //头像URL
    }
    this.globalData.userInfo_SC = {
      userId: '',  //学号
      name: 'unknown',   //姓名
      sex: 'unknown',    //性别
      academic: 'unknown',   //学院
      major: 'unknown',    //专业
      theClass: 'unknown'   //班级
    }
  },

  getDistance(lat1, lng1, lat2, lng2){
    var radLat1 = this.rad(lat1);
    var radLat2 = this.rad(lat2);
    var a = radLat1 - radLat2;
    var b = this.rad(lng1) - this.rad(lng2);

    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * this.globalData.EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000;
    return s;
  },

  rad(d) {
    return d * Math.PI / 180.0;
  },

  navTo(url){
    wx.navigateTo({
      url: '../'+url+'/'+url,
    })
  },

  getPageData: function () {
    api('get', 'https://easy-mock.com/mock/5bffe30cab841f18c58ca0ec/data/pageData').then(res => {
      this.globalData.linearColors = res.pageData.linearGradient
    }).catch(err => console.log(err))
  },

  fetch: api

})

