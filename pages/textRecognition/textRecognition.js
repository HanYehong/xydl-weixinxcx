import { $init, $digest } from '../../utils/common.util'

Page({
  data: {
    images: [],
    filesPath: [],
    resultText: ''
  },

  onLoad(options) {
    $init(this);
  },

  chooseImage(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        const images = this.data.images.concat(res.tempFilePaths)
        this.data.images = images.length <= 1 ? images : images.slice(0, 1)
        $digest(this)
        let that = this
        res.tempFilePaths.forEach(x => {
          let MyFile = new wx.BaaS.File()
          let fileParams = {filePath: x}
          let metaData = {categoryName: '文字识别图片库'}
          MyFile.upload(fileParams, metaData).then(res => {
            // 上传成功
            let data = res.data  // res.data 为 Object 类型
            let filesPath = that.data.filesPath
            filesPath.push(data.path)
            that.setData({
              filesPath
            })
            console.log("文件上传成功，数据：")
            console.log(data);
          }, err => {
            // HError 对象
          })
        })
      }
    })
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
    this.data.filesPath.splice(idx, 1)
    $digest(this)
  },

  handleImagePreview(e) {
    const idx = e.target.dataset.idx
    const images = this.data.images

    wx.previewImage({
      current: images[idx],
      urls: images,
    })
  },

  beginRecognize() {
    console.log("识别中……")
    console.log(this.data.filesPath)
    this.setData({
      resultText: '识别结果识别结果识别结果识别结果识别结果识别结果识别结果识别结果识别结果识别结果识别结果识别结果'
    })
    console.log("识别成功")
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