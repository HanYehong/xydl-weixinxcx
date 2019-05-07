// pages/car/car.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coreLongitude: '118.879990',//中心经度
    coreLatitude: '31.922330',//中心纬度
    scale: 17,//缩放级别
    markers: [],//标记点
    car: [0, 8,20,37, 66, 79, 88, 90, 92, 101],
    polyline: [{
      points: [
        {latitude: 31.922931, longitude: 118.888233},   // 教育超市
        {latitude: 31.923095, longitude: 118.888228},
        {latitude: 31.923209, longitude: 118.888158},
        {latitude: 31.923378, longitude: 118.887976},
        {latitude: 31.923551, longitude: 118.887718},
        {latitude: 31.923592, longitude: 118.887482},
        {latitude: 31.923563, longitude: 118.887211},   // 润园公寓
        {latitude: 31.923513, longitude: 118.887045},
        {latitude: 31.923449, longitude: 118.886906},
        {latitude: 31.923331, longitude: 118.886745},
        {latitude: 31.922931, longitude: 118.886544},
        {latitude: 31.922872, longitude: 118.886463},
        {latitude: 31.922859, longitude: 118.886361},
        {latitude: 31.922900, longitude: 118.885272},
        {latitude: 31.922995, longitude: 118.885186},
        {latitude: 31.923045, longitude: 118.885084},
        {latitude: 31.923555, longitude: 118.885224},
        {latitude: 31.923979, longitude: 118.885224},   // 东区站
        {latitude: 31.924211, longitude: 118.885224},
        {latitude: 31.924284, longitude: 118.885240},
        {latitude: 31.924434, longitude: 118.885224},
        {latitude: 31.924967, longitude: 118.885235},   // 体育中心站
        {latitude: 31.925486, longitude: 118.884923},
        {latitude: 31.925772, longitude: 118.884720},
        {latitude: 31.926014, longitude: 118.884146},
        {latitude: 31.926178, longitude: 118.883625},
        {latitude: 31.926196, longitude: 118.882402},   // 快递服务中心
        {latitude: 31.926205, longitude: 118.881410},
        {latitude: 31.926205, longitude: 118.881329},  //北区站
        {latitude: 31.926159, longitude: 118.880069},
        {latitude: 31.926178, longitude: 118.879865},
        {latitude: 31.926169, longitude: 118.879779},  // 翠园二食堂
        {latitude: 31.926132, longitude: 118.879076},
        {latitude: 31.926128, longitude: 118.878931},
        {latitude: 31.925968, longitude: 118.878309},
        {latitude: 31.925909, longitude: 118.878207},  // 北区运动场
        {latitude: 31.925850, longitude: 118.878111},
        {latitude: 31.925490, longitude: 118.877639},
        {latitude: 31.925035, longitude: 118.877252}, 
        {latitude: 31.924256, longitude: 118.876780},  // 西区站
        {latitude: 31.923865, longitude: 118.876614},
        {latitude: 31.923186, longitude: 118.876394},  // 工程中心8号楼
        {latitude: 31.922836, longitude: 118.876271},
        {latitude: 31.922708, longitude: 118.876255},  // 工程中心6号楼
        {latitude: 31.922403, longitude: 118.876222},
        {latitude: 31.921966, longitude: 118.876228},
        {latitude: 31.921625, longitude: 118.876287},
        {latitude: 31.921338, longitude: 118.876405},
        {latitude: 31.920910, longitude: 118.876673},
        {latitude: 31.920468, longitude: 118.877048},
        {latitude: 31.920140, longitude: 118.877510},  // 行政楼站
        {latitude: 31.920063, longitude: 118.877612},
        {latitude: 31.919972, longitude: 118.877585},
        {latitude: 31.919863, longitude: 118.877590},
        {latitude: 31.919781, longitude: 118.877639},
        {latitude: 31.919740, longitude: 118.877708},
        {latitude: 31.919708, longitude: 118.877832},
        {latitude: 31.919749, longitude: 118.877987},
        {latitude: 31.919812, longitude: 118.878084},
        {latitude: 31.919899, longitude: 118.878116},
        {latitude: 31.920036, longitude: 118.878100},
        {latitude: 31.921547, longitude: 118.879312},
        {latitude: 31.921552, longitude: 118.879366},  // 图书中心
        {latitude: 31.921575, longitude: 118.879441},
        {latitude: 31.921515, longitude: 118.879741},
        {latitude: 31.921497, longitude: 118.880267},
        {latitude: 31.921502, longitude: 118.880492},
        {latitude: 31.921584, longitude: 118.880771},
        {latitude: 31.921693, longitude: 118.880814},
        {latitude: 31.922034, longitude: 118.881190},
        {latitude: 31.922207, longitude: 118.881420},
        {latitude: 31.922508, longitude: 118.881517},
        {latitude: 31.922740, longitude: 118.881528},
        {latitude: 31.922886, longitude: 118.881506},
        {latitude: 31.923341, longitude: 118.881329},
        {latitude: 31.923519, longitude: 118.881308},
        {latitude: 31.923687, longitude: 118.881544},  // 公共教学楼
        {latitude: 31.923751, longitude: 118.881742},
        {latitude: 31.923760, longitude: 118.881871},
        {latitude: 31.923742, longitude: 118.882070},
        {latitude: 31.923715, longitude: 118.882177},
        {latitude: 31.923669, longitude: 118.882247},
        {latitude: 31.923432, longitude: 118.882408},
        {latitude: 31.922840, longitude: 118.882268},
        {latitude: 31.922235, longitude: 118.882402},
        {latitude: 31.922157, longitude: 118.882633},
        {latitude: 31.922126, longitude: 118.882815},
        {latitude: 31.922135, longitude: 118.883078},
        {latitude: 31.922130, longitude: 118.883073},
        {latitude: 31.922203, longitude: 118.883346},
        {latitude: 31.922485, longitude: 118.884044},
        {latitude: 31.922567, longitude: 118.884215},
        {latitude: 31.922599, longitude: 118.884323},
        {latitude: 31.922572, longitude: 118.884805},
        {latitude: 31.922585, longitude: 118.884875},
        {latitude: 31.922572, longitude: 118.884961},  // 润园食堂
        {latitude: 31.922563, longitude: 118.885084},
        {latitude: 31.922663, longitude: 118.885224},
        {latitude: 31.922736, longitude: 118.885283},
        {latitude: 31.922640, longitude: 118.886383},
        {latitude: 31.922654, longitude: 118.886780},
        {latitude: 31.922681, longitude: 118.887187},
        {latitude: 31.922681, longitude: 118.887450},
        {latitude: 31.922649, longitude: 118.887632},
        {latitude: 31.922553, longitude: 118.887874},
        {latitude: 31.922485, longitude: 118.887981},
        {latitude: 31.922667, longitude: 118.888158},
        {latitude: 31.922886, longitude: 118.888228},
        {latitude: 31.922931, longitude: 118.888233}
      ],
      color: "#e59ea5",
      width: 3,
      dottedLine: true
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let markers = [];
    let zuobiao = [
      {latitude: 31.922931, longitude: 118.888233, name: '教育超市', id: 1},   // 教育超市
      {latitude: 31.923563, longitude: 118.887211, name: '润园公寓', id: 2},   // 润园公寓
      {latitude: 31.923979, longitude: 118.885224, name: '东区站', id: 3},   // 东区站
      {latitude: 31.924967, longitude: 118.885235, name: '体育中心站', id: 4},   // 体育中心站
      {latitude: 31.926196, longitude: 118.882402, name: '快递服务中心', id: 5},   // 快递服务中心
      {latitude: 31.926205, longitude: 118.881329, name: '北区站', id: 6},  //北区站
      {latitude: 31.926169, longitude: 118.879779, name: '翠园二食堂', id: 7},  // 翠园二食堂
      {latitude: 31.925909, longitude: 118.878207, name: '北区运动场', id: 8},  // 北区运动场
      {latitude: 31.924256, longitude: 118.876780, name: '西区站', id: 9},  // 西区站
      {latitude: 31.923186, longitude: 118.876394, name: '工程中心8号楼', id: 10},  // 工程中心8号楼
      {latitude: 31.922708, longitude: 118.876255, name: '工程中心6号楼', id: 11},  // 工程中心6号楼
      {latitude: 31.920140, longitude: 118.877510, name: '行政楼站', id: 12},  // 行政楼站
      {latitude: 31.921552, longitude: 118.879366, name: '图书中心', id: 13},  // 图书中心
      {latitude: 31.923687, longitude: 118.881544, name: '公共教学楼', id: 14},  // 公共教学楼
      {latitude: 31.922572, longitude: 118.884961, name: '润园食堂', id: 15},  // 润园食堂
    ]
    zuobiao.forEach(x => {
      markers.push({
        id: x.id,
        latitude: x.latitude,
        longitude: x.longitude,
        iconPath: "../../resource/images/gongjiaozhan.png",
        callout: {
          content: x.name,
          fontSize: 15,
          borderRadius: 5,
          bgColor: '#fff',
          padding: 8,
          textAlign:'center',
          borderWidth: 2,
          borderColor: '#c8141f',
          display: 'BYCLICK'
        },
        width: 32,
        height: 40
      });
    })
    this.setData({
      markers
    })
    var timer = setInterval(this.changeCarPoints, 3000)
  },

  changeCarPoints: function () {
    let markers = this.data.markers;
    if (markers.length >= 25 ) {
      for(let item = 0; item < 10; item++) {
        markers.pop();
      }
    }
    let car = this.data.car;
    let that = this;
    car.forEach(x => {
      markers.push({
        id: 'car'+x,
        latitude: that.data.polyline[0].points[x].latitude,
        longitude: that.data.polyline[0].points[x].longitude,
        iconPath: "../../resource/images/gongjiao.png",
        width: 32,
        height: 40
      })
    })
    for (let i = 0; i < car.length; i++) {
      car[i] = (car[i] + 1) % 109;
    }
    this.setData({
      markers,
      car
    })
    // wx.request({
    //   url: 'http://192.168.43.38:7777/xydl-atlas/carMarkers',
    //   method: 'GET',
    //   header: { 'content-type': 'application/json' },
    //   data: {},
    //   success: function (res) {
    //     console.log(res.data.data);
    //     that.setCarMarkers(res.data.data);
    //     i++;
    //     if (i == 20) {
    //       clearInterval(timer);
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  setCarMarkers(item) {
    let markers = [];
    let marker = {
      latitude: item.latitude,
      longitude: item.longitude,
      iconPath: "../../resource/images/1.png",
      width: 32,
      height: 40
    }
    markers.push(marker);
    this.setData({
      markers
    })
  },
})