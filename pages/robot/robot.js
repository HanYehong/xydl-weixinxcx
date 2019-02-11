let app = getApp()
Page({
  data:{
    message:[],
    inputMsg:"",
    scrollTop:0,
    msgHeight: 400
  },

  onLoad:function(options){
    //得到本地消息
    var message = wx.getStorageSync('message');
    //scorll-view滑动的区域高度为消息的数量×100
    var top = message.length * this.data.msgHeight;
    //若message有消息的话，则显示消息，否则显示空
    this.setData({
      message:message || [],
      scrollTop:top
    })
  },

  onReady:function(){
    // 页面渲染完成
  },

  onShow:function(){
    // 页面显示
  },

  onUnload:function(){
    //离开时，把消息存储到本地
    wx.setStorageSync('message',this.data.message);
  },

  inputMsg:function(e){
   this.setData({
     inputMsg:e.detail.value
   })
  },

  sendMessage:function(){
    var that = this;
    if(this.data.inputMsg != ""){
      //消息封装，自己发送出去的
      var msg = {
        type:0,
        src: app.globalData.userInfo_WX.avatarUrl,
        content:this.data.inputMsg
      };
      //发送信息
      this.setMessage(msg);
      //消息回复
      wx.request({
        url:"http://192.168.43.38:7777/xydl-robot/robot/message",
        header:{"Content-type":"application/json"},
        data:{
          msg:msg.content
        },
        success:function(res){
          //封装消息，接收到的
          console.log(res)
          var reply = {
            type:1,
            src:"../../resource/images/robot.png",
            content:res.data.content
          };
          that.setMessage(reply);
          that.setData({
            scrollTop: that.data.scrollTop + that.data.msgHeight
          })
        }
      })
    }
  },

  setInputMsg:function(e){
    this.setData({
      inputMsg: e.detail.value
    })
  },

  setMessage:function(msg){
    //把msg消息存储到消息列表中
    var msgList = this.data.message;
    msgList.push(msg);
    var that = this;
    this.setData({
      message:msgList,
      inputMsg:"",
      scrollTop: that.data.scrollTop + this.data.msgHeight
    })
  }
})