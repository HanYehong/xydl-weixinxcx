let enums = require('../../config/enums')
var app = getApp();
let service  = require("../../config/service.js");
let ajax = require("../../config/ajax.js");
const date = new Date();
const years = [];
const months = [];
const days = [];
const hours = [];
const minutes = [];
const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//获取年
for (let i = date.getFullYear(); i <= date.getFullYear(); i++) {
  years.push("" + i);
}
//获取月份
for (let i = date.getMonth() + 1; i <= date.getMonth() + 1; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  months.push("" + i);
}
//获取日期
let mark = 0;
for (let i = date.getDate(); i <= date.getDate() + 2; i++) {
  if (i > monthDays[months[0] - 1]) {
    i = i % (monthDays[months[0] - 1]);
    mark = 1;
  }
  if (i < 10) {
    i = "0" + i;
  }
  days.push("" + i);
}
if (mark == 1) {
  months.push((date.getMonth() + 2) % 12);
}
//获取小时
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  hours.push("" + i);
}
//获取分钟
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    i = "0" + i;
  }
  minutes.push("" + i);
}
Page({
  data: {
    form: {
      //日期选择
      date: "",
      size: -1,
      expressType: -1,
      specialAttention: ""
    },
    weight: 0.5,
    isAgree: true, //是否同意条款    
    type: 0,
    extraList: [], //特别属性
    sizeList: [],
    expressList: [],
    expressIndex: -1,
    expressName: [],
    time: '',
    multiArray: [years, months, days, hours, minutes],
    multiIndex: [0, 0, 0, date.getHours(), date.getMinutes()],
    choose_year: '',
    showModal: false
  },

  onLoad() {
    //设置默认的年份
    this.setData({
      choose_year: this.data.multiArray[0][0]
    })
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
    let expressName = [];
    for (let index in enums.EXPRESS) {
      let val = {
        name: enums.EXPRESS[index].name,
        value: enums.EXPRESS[index].code
      }
      expressList.push(val);
      expressName.push(enums.EXPRESS[index].name);
    }

    console.log(expressList);
    console.log(expressName);
    //初始化日期选择的最小值为当前日期
    this.setData({
      extraList,
      sizeList,
      expressList,
      expressName,
    })

  },

   //获取时间日期
   bindMultiPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    const index = this.data.multiIndex;
    const year = this.data.multiArray[0][index[0]];
    const month = this.data.multiArray[1][index[1]];
    const day = this.data.multiArray[2][index[2]];
    const hour = this.data.multiArray[3][index[3]];
    const minute = this.data.multiArray[4][index[4]];
    // console.log(`${year}-${month}-${day}-${hour}-${minute}`);
    if (day > monthDays[month - 1]) {
      wx.showToast({
        title: '日期无效',
        icon: 'error'
      })
      return;
    }
    let form = this.data.form;
    form.date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
    if (new Date(form.date).getTime() < new Date().getTime()) {
      wx.showToast({
        title: '日期不能小于当前',
        icon: 'error'
      })
      return;
    }
    this.setData({
      form
    })
    // console.log(this.data.time);
  },
  //监听picker的滚动事件
  bindMultiPickerColumnChange: function(e) {
    //获取年份
    if (e.detail.column == 0) {
      let choose_year = this.data.multiArray[e.detail.column][e.detail.value];
      console.log(choose_year);
      this.setData({
        choose_year
      })
    }
    //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    if (e.detail.column == 1) {
      let num = parseInt(this.data.multiArray[e.detail.column][e.detail.value]);
      let temp = [];
      if (num == 1 || num == 3 || num == 5 || num == 7 || num == 8 || num == 10 || num == 12) { //判断31天的月份
        for (let i = 1; i <= 31; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 4 || num == 6 || num == 9 || num == 11) { //判断30天的月份
        for (let i = 1; i <= 30; i++) {
          if (i < 10) {
            i = "0" + i;
          }
          temp.push("" + i);
        }
        this.setData({
          ['multiArray[2]']: temp
        });
      } else if (num == 2) { //判断2月份天数
        let year = parseInt(this.data.choose_year);
        console.log(year);
        if (((year % 400 == 0) || (year % 100 != 0)) && (year % 4 == 0)) {
          for (let i = 1; i <= 29; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        } else {
          for (let i = 1; i <= 28; i++) {
            if (i < 10) {
              i = "0" + i;
            }
            temp.push("" + i);
          }
          this.setData({
            ['multiArray[2]']: temp
          });
        }
      }
      console.log(this.data.multiArray[2]);
    }
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },

  bindDateChange: function (e) {
    let form = this.data.form;
    form.date = e.detail.value;
    this.setData({
      form
    })
  },

  bindTimeChange: function (e) {
    let form = this.data.form;
    form.time = e.detail.value;
    this.setData({
      form
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

    let specialAttention = "";
    let that = this;
    e.detail.value.forEach(e => {
      that.data.extraList.forEach(x => {
        if (parseInt(x.value) === parseInt(e)) {
          specialAttention += x.name + " ";
        }
      })
    });

    console.log("special" + specialAttention);
    let form = this.data.form;
    form.specialAttention =specialAttention;
    this.setData({
      form
    })

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

  expressPickerChange(e) {
    console.log(e.detail.value);
    let form = this.data.form;
    form.expressType = e.detail.value
    this.setData({
      expressIndex: e.detail.value,
      form
    })
    console.log(this.data.expressName[e.detail.value])
  },

  changeRadio(e) {
    console.log("物品大小：")
    console.log(e);
    let form = this.data.form;
    form.size = e.detail.value;
    this.setData({
      form
    })
    console.log(this.data.form);
  },

  publish(e) {
    console.log("即将提交表单");
    let form = this.data.form;
    form.description = e.detail.value.description;
    form.destination = e.detail.value.destination;
    form.name = e.detail.value.name;
    form.phone = e.detail.value.phone;
    form.pickupCode = e.detail.value.pickupCode;
    form.price = e.detail.value.price;
    form.orderDeadlineDate = form.date;
    console.log(form);
    ajax.POST(service.EXPRESS_PUBLISH, form, '正在发布').then(data => {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000,
        complete: () => {
          app.redTo("express")
        }
      });
    })
  }
});