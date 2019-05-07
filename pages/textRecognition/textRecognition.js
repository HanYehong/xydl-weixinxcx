import { $init, $digest } from '../../utils/common.util'
let ajax = require("../../config/ajax.js");
let service = require("../../config/service.js");
Page({
  data: {
    images: [],
    filesPath: [],
    resultText: '',
    isDisable: true
  },

  onLoad(options) {
    $init(this);
  },

  chooseImage(e) {
    this.setData({
      resultText: '',
      isDisable: true
    })
    let that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        let images = res.tempFilePaths;
        let MyFile = new wx.BaaS.File()
        let fileParams = {filePath: images[0]}
        let metaData = {categoryName: '文字识别图片库'}
        that.setData({
          images
        })
        wx.showLoading({
          title: '加载文件',
        })
        MyFile.upload(fileParams, metaData).then(res => {
          // 上传成功
          wx.hideLoading();
          let filesPath = [];
          filesPath.push(res.data.path);
          that.setData({
            filesPath,
            isDisable: false
          })
          console.log("文件上传成功，数据：")
          console.log(that.data.images);
        }, err => {
          // HError 对象
          wx.showToast({
            title: '加载失败',
            icon: 'error',
            duration: 2000
          })
        })
      }
    })
  },

  removeImage(e) {
    this.setData({
      images: [],
      filesPath: [],
      resultText: '',
      isDisable: true
    })
    console.log(this.data.images);
  },

  handleImagePreview(e) {
    const images = this.data.images
    wx.previewImage({
      current: images[0],
      urls: images,
    })
  },

  beginRecognize() {
    console.log("识别中……")
    console.log(this.data.filesPath)
    let that = this;
    ajax.POST(service.ROBOT_RECOFNIZE, {"imageUrl": that.data.filesPath[0]}).then(data => {
      console.log("识别成功，结果：")
      console.log(data);
      that.setData({
        resultText: data
      })
    })
  },

  longTap() {
    wx.setClipboardData({
      //准备复制的数据
      data: this.data.resultText,
      success: function (res) {
        console.log("长按复制成功")
        wx.showToast({
          title: '复制成功',
        });
      }
    });
  },

})