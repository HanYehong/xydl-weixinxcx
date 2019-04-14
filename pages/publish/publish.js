import { $wuxXnumber } from '../../components/wux'
var network = require("../../utils/network.js")
var util = require('../../utils/util.js');
var app = getApp();
Page({
  data: {

    files: [],//选择的图片本地路径
    description: '',//描述
    weight: 0.5,
    fromCityName: '',
    toCityName: '',
    //日期选择
    startDate: '',
    startDate:'',
    date: "",
    time:"",
    // 分类
    groupList: [{ name: '手机数码', icon: '', check: 0 },
    { name: '家用电器', icon: '', check: 0 },
    { name: '个性护装', icon: '', check: 0 },
    { name: '食品药品', icon: '', check: 0 },
    { name: '衣物配饰', icon: '', check: 0 },
    { name: '电脑配件', icon: '', check: 0 },
    { name: '书籍文件', icon: '', check: 0 },
    { name: '箱包', icon: '', check: 0 },
    { name: '其他', icon: '', check: 0 },
    ],
    extraList: [//特别属性
      { name: '易碎', value: '0' },
      { name: '怕压', value: '2' }
    ],
    sizeList: [//特别属性
      { name: '小物', value: '0' },
      { name: '中物', value: '1' },
      { name: '大物', value: '2' }
    ],
    serveList: [//服务
      { name: '我要整箱(23 kg)', value: '0' },
      { name: '可能加急', value: '1' },
      { name: '上门取货', value: '2' }
    ],
    isAgree: true,//是否同意条款
    type: 0,
    expressList: [
      '圆通快递',
      '中通快递',
      '申通快递',
      '韵达快递',
      '顺丰快递',
      '京东快递',
      '百世汇通'
    ]
  },
  /**
   * C端确认发布带物需求订单
   */
  cReleaseOrder: function () {

    network.DELAY(function () {
      wx.showModal({
        title: '成功',
        content: '带物需求订单发布成功,请等待接单',
        showCancel: false,
        success: function (res) {
          //订单发布成功
         app.navTo('express')
        }
      });
    });
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  onLoad() {
    $wuxXnumber.init('config', {
      longpress: !0,
      step: .5,
      min: 0.5,
      max: 50,
      value: 1,
      callback: function (value) {
        console.log("当前的重量为: ", value)
      },
    });
    //初始化日期选择的最小值为当前日期
    this.setData({
      startDate: util.getCurrentDate(),
    })
  },
  //失去焦点时获取订单描述信息
  getInfoText: function (e) {
    console.log("订单描述", e.detail.value);
    this.data.description = e.detail.value;
  },
  //选择照片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
  },
  //预览图片
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.files // 需要预览的图片http链接列表
    })
  },
  //重量选择
  weightchange: function (e) {
    this.setData({
      weight: e.detail.value
    });
  },
  //分类点击切换选中状态
  clickGroup: function (e) {
    console.log(e.currentTarget.id)
    var array = this.data.groupList;
    array[e.currentTarget.id].check = !(array[e.currentTarget.id].check);//反转
    this.setData({
      groupList: array
    })
  },
  //特别属性和附加服务的的处理事件
  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value);

    var checkboxItems = e.currentTarget.id == 'serve' ? this.data.serveList : this.data.extraList, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].value == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    if (e.currentTarget.id == 'serve') {
      this.setData({
        serveList: checkboxItems
      });
    } else {
      this.setData({
        extraList: checkboxItems
      });
    }
  },
  //服务条款
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  navToManage: function() {
    navTo("myExpressOrder");
  },

  bindPickerChange: function() {
    console.log("hi");
  }
});