// pages/mine/mine.js
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    user:{
      avatarUrl: app.globalData.userInfo_WX.avatarUrl,
      nickName: app.globalData.userInfo_WX.nickName
    }
  },

  updateData(isLogin){
    this.setData({
      isLogin: isLogin,
      user: app.globalData.userInfo_WX
    })
  },

  viewRobot:() => {
    wx.navigateTo({
      url: '../robot/robot',
    })
  },

  /**
   * 查看简历
   */
  viewResume: function () {
    app.navTo('resume')
  },

  /**
   * 查看投递
   */
  viewDeliver: () => {
    app.navTo('deliver')
  },

  /**
   * 查看面试
   */
  viewInterview: () => {
    app.navTo('interview')
  },

  /**
   * 查看收藏
   */
  viewCollect: () => {
    app.navTo('collection')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('执行onLoad方法')
    this.getUserInfo();  //尝试得到用户信息（包括检测session_key是否过期、过期的话自动登录、没有过期的话直接获取用户信息，设置全局变量中的用户信息
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  toLogin(res){
    this.login();  //用户手动进行登录
    this.onLoad();  //登录完成重新加载页面显示用户信息
  },

  getUserInfo(){
    var that = this;
    wx.checkSession({
      success() {
        // session_key 未过期，并且在本生命周期一直有效
        console.log('用户身份未过期')
        wx.getUserInfo({
          success: function (userRes) {
            console.log('获取用户信息成功')
            console.log(userRes)
            app.globalData.userInfo_WX = userRes.userInfo;
            that.updateData(true);
          },
          fail() {
            console.log('——用户信息获取失败——')
          }
        })
      },
      fail() {
        // session_key 已经失效，需要重新执行登录流程
        console.log('用户身份过期，需要重新登录')
        app.initUserInfo();
        that.updateData(false);
      }
    })
  },

  login: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log('登录成功')
        if (res.code) {
          wx.getUserInfo({
            success(userRes){
              var codeInfo = {};
              codeInfo.code = res.code;
              codeInfo.usersWx = userRes.userInfo;
              wx.request({
                url: app.globalData.serverIp + ':' + app.globalData.serverPort + '/' + app.globalData.xydlUsers + '/openid',
                method: "POST",
                contentType: 'application/json',
                dataType: 'json',
                data:JSON.stringify(codeInfo),
                success: function (res) {
                  console.log(res);
                  console.log("获取用户openId成功")
                  wx.setStorage({  //把openID存储到本地缓存中
                    key: 'openId',
                    data: res.data.content.openId
                  })
                },
                fail: function () {
                  console.log("——openId获取失败——")
                }
              })
            }
          })
        }
      },
      fail() {
        console.log('——登录失败——')
      }
    })
  },

})
