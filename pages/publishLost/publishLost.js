import { promisify } from '../../utils/promise.util'
import { $init, $digest } from '../../utils/common.util'

const wxUploadFile = promisify(wx.uploadFile)

Page({

  data: {
    titleCount: 0,
    contentCount: 0,
    title: '',
    content: '',
    images: [],
    showDialog1: false,
    showDialog2: false,
    items1: [
      { name: 'U盘', value: '0' },
      { name: '水杯', value: '1' },
      { name: '本子', value: '2' },
      { name: '钥匙', value: '3' },
      { name: '小挂件', value: '4' },
      { name: '笔', value: '5' },
      { name: '首饰', value: '6' },
      { name: '钱包', value: '7' },],
    items2: [
      { name: '信息楼', value: '0' },
      { name: '经管楼', value: '1' },
      { name: '图书馆', value: '2' },
      { name: '东西管', value: '3' },
      { name: '南管', value: '4' },
      { name: '学海湾', value: '5' },
      { name: '天印湖边', value: '6' },
      { name: '食堂', value: '7' },],
      value1: '',
      value2: ''
  },

  onLoad(options) {
    $init(this);
  },

  handleTitleInput(e) {
    const value = e.detail.value
    this.data.title = value
    this.data.titleCount = value.length
    $digest(this)
  },

  handleContentInput(e) {
    const value = e.detail.value
    this.data.content = value
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
      }
    })
  },

  removeImage(e) {
    const idx = e.target.dataset.idx
    this.data.images.splice(idx, 1)
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

  submitForm(e) {
    const title = this.data.title
    const content = this.data.content

    if (title && content) {
      const arr = []

      // for (let path of this.data.images) {
      //   arr.push(wxUploadFile({
      //     url: config.urls.question + '/image/upload',
      //     filePath: path,
      //     name: 'qimg',
      //   }))
      // }

      wx.showLoading({
        title: '正在创建...',
        mask: true
      })

      // Promise.all(arr).then(res => {
      //   return res.map(item => JSON.parse(item.data).url)
      // }).catch(err => {
      //   console.log(">>>> upload images error:", err)
      // }).then(urls => {
      //   return createQuestion({
      //     title: title,
      //     content: content,
      //     images: urls
      //   })
      // }).then(res => {
      //   const pages = getCurrentPages();
      //   const currPage = pages[pages.length - 1];
      //   const prevPage = pages[pages.length - 2];

      //   prevPage.data.questions.unshift(res)
      //   $digest(prevPage)

      //   wx.navigateBack()
      // }).catch(err => {
      //   console.log(">>>> create question error:", err)
      // }).then(() => {
      //   wx.hideLoading()
      // })
    }
  },

  /*点击变色*/
  click: function (e) {
    var id = e.currentTarget.dataset.id
    var that = this
    that.setData({
      id: id
    })
  },

  radioChange1: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    var that = this
    let id = e.detail.value;
    this.data.items1.forEach(x => {
      if (x.value == id) {
        that.setData({
          value1: x.name
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
          value2: x.name
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
    if (this.data.value == 'show') {
      wx.showModal({
        title: '提示',
        content: '你没有选择任何内容',
      })
    }
    that.setData({
      showDialog1: !this.data.showDialog1
    })
  },
  freetoBack1: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '你没有选择任何内容',
    })
    that.setData({
      showDialog1: !this.data.showDialog1,
      value1: '',
      checked: false,
    })
  },

  freeBack2: function () {
    var that = this
    if (this.data.value == 'show') {
      wx.showModal({
        title: '提示',
        content: '你没有选择任何内容',
      })
    }
    that.setData({
      showDialog2: !this.data.showDialog2
    })
  },
  freetoBack2: function () {
    var that = this
    wx.showModal({
      title: '提示',
      content: '你没有选择任何内容',
    })
    that.setData({
      showDialog2: !this.data.showDialog2,
      value2: '',
      checked: false,
    })
  },

})