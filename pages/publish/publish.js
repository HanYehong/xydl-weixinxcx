import { $wuxXnumber } from '../../components/wux'
var network = require("../../utils/network.js")
var util = require('../../utils/util.js');
let enums = require('../../config/enums')
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
    extraList: [], //特别属性
    sizeList: [], //特别属性
    isAgree: true, //是否同意条款
    type: 0,
    expressList: []
  },

  onLoad() {
    let extraList = [];
    for (let index in enums.SPECIAL_ATTENTION) {
      let val = {
        name: enums.SPECIAL_ATTENTION[index].name,
        value: enums.SPECIAL_ATTENTION[index].code
      }
      extraList.push(val);
    }

    console.log(extraList);

    let sizeList = [];
    for (let index in enums.EXPRESS_SIZE) {
      let val = {
        name: enums.EXPRESS_SIZE[index].name,
        value: enums.EXPRESS_SIZE[index].code
      }
      sizeList.push(val);
    }

    console.log(sizeList);

    let expressList = [];
    for (let index in enums.EXPRESS) {
      let val = {
        name: enums.EXPRESS[index].name,
        value: enums.EXPRESS[index].code
      }
      expressList.push(val);
    }

    console.log(expressList);
    //初始化日期选择的最小值为当前日期
    this.setData({
      extraList,
      sizeList,
      expressList,
      startDate: util.getCurrentDate(),
    })
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