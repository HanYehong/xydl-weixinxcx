import { $init, $digest } from '../../utils/common.util'
const enums = require("../../config/enums.js");
let ajax = require("../../config/ajax.js");
let service = require("../../config/service.js");
let app = getApp();
Page({
  data: {
    contactCount: 0,
    contentCount: 0,
    images: [],
    showDialog1: false,
    showDialog2: false,
    items1: [],
    items2: [],
    value1: '',
    value2: '',
    lostType: -1,
    lostLocation: -1,
    filesPath: []
  },

  onLoad(options) {
    $init(this);
    let items1 = [];
    for (let item in enums.LOCATION) {
      items1.push({
        value: item,
        name: enums.LOCATION[item]
      })
    }
    let items2 = [];
    for (let item in enums.LOSTTYPE) {
      items2.push({
        value: item,
        name: enums.LOSTTYPE[item]
      })
    }
    this.setData({
      items1,
      items2
    })
  },

  handleContactInput(e) {
    const value = e.detail.value
    this.data.contactCount = value.length
    $digest(this)
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.data.contentCount = value.length
    $digest(this)
  },

  chooseImage(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        this.data.images = images.length <= 3 ? images : images.slice(0, 3)
        $digest(this)
        let that = this
        wx.showLoading({
          title: '加载图片'
        });
        res.tempFilePaths.forEach(x => {
          let MyFile = new wx.BaaS.File()
          let fileParams = {filePath: x}
          let metaData = {categoryName: '失物招领图片库'}
          MyFile.upload(fileParams, metaData).then(res => {
            // 上传成功
            let data = res.data  // res.data 为 Object 类型
            let filesPath = that.data.filesPath
            filesPath.push({imageUrl: data.path})
            that.setData({
              filesPath
            })
            console.log("文件上传成功，数据：")
            console.log(data);
          }, err => {
            // HError 对象
          })
        })
        wx.hideLoading();
      }
    })
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    this.data.filesPath.splice(idx, 1)
    $digest(this)
    console.log("删除文件")
    console.log(this.data.filesPath)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images

    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },

  /*点击变色*/
  click1: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this
    that.setData({
      id1: id
    })
  },

  click2: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this
    that.setData({
      id2: id
    })
  },

  radioChange1: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this
    let id = e.detail.value;
    this.data.items1.forEach(x => {
      if (x.value == id) {
        that.setData({
          value1: x.name,
          lostLocation: id
        })
      }
    })
    console.log(this.data.value1)
  },

  radioChange2: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this
    let id = e.detail.value;
    this.data.items2.forEach(x => {
      if (x.value == id) {
        that.setData({
          value2: x.name,
          lostType: id
        })
      }
    })
    console.log(this.data.value2)
  },

  toggleDialog1() {
    this.setData({
      showDialog1: !this.data.showDialog1
    });
  },

  toggleDialog2() {
    this.setData({
      showDialog2: !this.data.showDialog2
    });
  },

  freeBack1: function () {
    var that = this
    that.setData({
      showDialog1: !this.data.showDialog1
    })
  },

  freetoBack1: function () {
    var that = this
    that.setData({
      showDialog1: !this.data.showDialog1,
      checked: false,
    })
  },

  freeBack2: function () {
    var that = this
    that.setData({
      showDialog2: !this.data.showDialog2
    })
  },

  freetoBack2: function () {
    var that = this
    that.setData({
      showDialog2: !this.data.showDialog2,
      checked: false,
    })
  },

  commit(e) {
    let form = {
      contactWay: e.detail.value.contactWay,
      content: e.detail.value.content,
      lostLocation: this.data.lostLocation,
      lostType: this.data.lostType,
      imageList: this.data.filesPath
    };
    console.log("即将提交表单，表单数据为：");
    console.log(form);
    ajax.POST(service.LOST_FOUND_PUBLISH, form, '正在发布').then(data => {
      wx.showToast({
        title: '发布成功',
        icon: 'success',
        duration: 2000,
        complete: () => {
          app.redTo("lostFound")
        }
      });
    })
  },

})