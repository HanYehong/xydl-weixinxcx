let app = getApp();
let ajax = require("../config/ajax.js");
let service = require("../config/service.js");

const cancel = (orderNumber) => {
    console.log("取消代领单：" + orderNumber);
    ajax.POST(service.EXPRESS_CANCEL, {orderNumber: orderNumber}, '正在取消').then(data => {
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        duration: 200,
        complete: ()=>{
          app.redTo("myExpressOrder");
        }
      });
    })
  }

const authorize = (orderNumber) => {
    console.log("授权代领单：" + orderNumber);
    ajax.POST(service.EXPRESS_AUTHORRIZATION, {orderNumber: orderNumber}, '授权中').then(data => {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 200,
        complete: ()=>{
          app.redTo("myExpressOrder");
        }
      });
    })
  }

const confirm = (orderNumber) => {
    console.log("确认收货：" + orderNumber);
    ajax.POST(service.EXPRESS_RECEIVED, {orderNumber: orderNumber}, '正在收货').then(data => {
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 200,
        complete: ()=>{
          app.redTo("myExpressOrder");
        }
      });
    })
  }

const refuse = (orderNumber) => {
    console.log("拒绝其接单：" + orderNumber);
    ajax.POST(service.EXPRESS_REFUSE_ACCEPT, {orderNumber: orderNumber}, '拒绝中').then(data => {
      wx.showToast({
        title: '已拒绝',
        icon: 'success',
        duration: 200,
        complete: ()=>{
          app.redTo("myExpressOrder");
        }
      });
    })
  }

const rePublish = (orderNumber) => {
    console.log("重新发布：" + orderNumber);
    ajax.POST(service.EXPRESS_RE_PUBLISH, {orderNumber: orderNumber}, '发布中').then(data => {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 200,
        complete: ()=>{
          app.redTo("myExpressOrder");
        }
      });
    })
  }

  const sended = (orderNumber) => {
    console.log("已送达：" + orderNumber);
    ajax.POST(service.EXPRESS_SENDED, {orderNumber: orderNumber}, '正在提交').then(data => {
      wx.showToast({
        title: '送达成功',
        icon: 'success',
        duration: 200,
        complete: ()=>{
          app.redTo("myExpressOrder");
        }
      });
    })
  }

  module.exports = {
    cancel,
    authorize,
    confirm,
    refuse,
    rePublish,
    sended
  }
  