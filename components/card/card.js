const app = getApp()

Component({
  properties: {
    cardLinear: {
      type: String,
      value: 'background-image: linear-gradient( 135deg, #3C8CE7 10%, #00EAFF 100%)'
    },
    cardTitle: {
      type: String,
      value: '这里是标题'
    },
    cardDesc: {
      type: String,
      value: '这里是描述'
    },
    cardPrice: {
      type: Number,
      value: 1
    },
    cardImage: {
      type: String,
      value: ''
    },
    cardViews: {
      type: Number,
      value: 0
    },
  },
  data: {
    cardViewsIcon: '/resource/images/icon-views.png',
    linearColor: ''
  },
})