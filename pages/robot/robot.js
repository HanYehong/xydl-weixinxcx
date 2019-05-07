let app = getApp();
let ajax = require("../../config/ajax.js");
let service = require("../../config/service.js");
Page({
  data:{
    message:[],
    inputMsg:"",
    scrollTop:0,
    msgHeight: 400
  },

  onLoad:function(options){
    this.setReplyMessage('hi，我是一个宝宝~');
    this.setReplyMessage('欢迎来到宝宝的世界~');
    this.setReplyMessage('你可以问我任何问题，但接下来你说的每一个字都将成为呈堂证供！');
    //得到本地消息
    // var message = wx.getStorageSync('message');
    //scorll-view滑动的区域高度为消息的数量×100
    // var top = message.length * this.data.msgHeight;
    //若message有消息的话，则显示消息，否则显示空
    // this.setData({
    //   message:message || [],
    //   scrollTop:top
    // })
  },

  onReady:function(){
    // 页面渲染完成
  },

  onShow:function(){
    // 页面显示
  },

  onUnload:function(){
    //离开时，把消息存储到本地
    // wx.setStorageSync('message',this.data.message);
  },

  inputMsg:function(e){
   this.setData({
     inputMsg:e.detail.value
   })
  },

  sendMessage:function(){
    var that = this;
    if(this.data.inputMsg != ""){
      //消息封装
      var msg = {
        type:0,
        src: app.globalData.userInfo_WX.avatarUrl,
        content:this.data.inputMsg
      };
      //发送信息
      this.setMessage(msg);
      //消息回复
      ajax.POST(service.ROBOT_CHAT, {"msg": msg.content}).then(data => {
        console.log("机器人回复：");
        console.log(data);
        that.setReplyMessage(data);
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
  },

  setReplyMessage(msg) {
    let reply = {
      type:1,
      src:"../../resource/images/robot.png",
      content: msg
    };
    let that = this;
    this.setMessage(reply);
    this.setData({
      scrollTop: that.data.scrollTop + that.data.msgHeight
    })
  },
})