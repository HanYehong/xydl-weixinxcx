/** 
 * 我的内容页 =》 获取数据 =》 循环 =》 传参 =》 绑定数据渲染
 *                       
*/
const app = getApp()
Component({
  properties: {
    title: {
      type: 'String',
      value: 'Title'
    },
    list: {
      type: 'Array',
      value: []
    }
  },
  data: {
    collapsibleList: [{
      title: 'Title'
    }],
    activeCollapsible: false,
    initAnimation: 'hidden',
    itemsDefaultColor: ''
  },
  methods: {
    /**
     * 设置折叠面板状态
     */
    setCollapsiableStatus() {
      this.setData({
        initAnimation: 'show',
        activeCollapsible: !this.data.activeCollapsible
      })
    },

    /** 
     * 激活面板的选项
    */
    activeOption() {

    },

    /**
     * 数据初始化
     */
    dataInit() {
      const list = this.data.list
      this.setData({
        initAnimation: 'hidden',
        itemsDefaultColor: '#338ff0',
        itemList: list
      })
      console.log(this.data.itemsDefaultColor);
    }
  },
  created() {
    this.data.itemList = []
    this.data.rect = {}
  },
  attached() {
    this.dataInit()
    // this.getCollapsiableRect()
  }
})