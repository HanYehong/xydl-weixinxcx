module.exports = {
  EXPRESS: {
    0: {
      code: 0,
      name: '中通快递',
      color: '#E2C08D'
    },
    1: {
      code: 1,
      name: '韵达快递',
      color: '#007ACC'
    },
    2: {
      code: 2,
      name: '申通快递',
      color: '#1DA260'
    },
    3: {
      code: 3,
      name: '圆通快递',
      color: '#FFCE44'
    },
    4: {
      code: 4,
      name: '京东物流',
      color: '#DD4FD3'
    },
    5: {
      code: 5,
      name: '顺丰速运',
      color: '#7BCA3D'
    },
    6: {
      code: 6,
      name: '天天快递',
      color: '#DD2149'
    },
    7: {
      code: 7,
      name: '德邦物流',
      color: '#FBBA8E'
    },
    8: {
      code: 8,
      name: '百世汇通',
      color: '#FC6D26'
    },
    9: {
      code: 9,
      name: '国通快递',
      color: '#3F88BF'
    },
  },

  STATUS: {
    WAIT_ACCEPT: {
      code: 0,
      name: '待接单'
    },
    WAIT_SEND: {
      code: 1,
      name: '待送达'
    },
    WAIT_CONFIRM: {
      code: 2,
      name: '待确认'
    },
    COMPLETE: {
      code: 3,
      name: '已完成'
    },
    UN_COMPLETE: {
      code: 4,
      name: '未完成'
    },
    WAIT_AUTHORIZATION: {
      code: 5,
      name: '待授权'
    }
  },

  BUTTON: {
    CANCEL: {
      code: 0,
      name: '取消'
    },
    CONFIRM: {
      code: 1,
      name: '确认'
    },
    ARRIVED: {
      code: 2,
      name: '已送达'
    },
    PAY: {
      code: 3,
      name: '支付'
    },
    AUTHORIZE: {
      code: 4,
      name: '授权'
    }
  },

  SPECIAL_ATTENTION: {
    YI_SUI: {
      code: 0,
      name: '易碎'
    },
    PA_YA: {
      code: 1,
      name: '怕压'
    }
  },

  EXPRESS_SIZE: {
    LARGE: {
      code: 0,
      name: '大物',
    },
    MIDDLE: {
      code: 1,
      name: '中物'
    },
    SMALL: {
      code: 2,
      name: '大物'
    }
  },

  LOCATION: {
    0: "信息楼",
    1: "经管楼",
    2: "东馆",
    3: "西馆",
    4: "南馆",
    5: "学海湾",
    6: "天印湖边",
    7: "东一食堂",
    8: "东二食堂",
    9: "北一食堂",
    10: "北二食堂",
    11: "北大活",
    12: "东区宿舍",
    13: "北区宿舍",
    14: "艺设楼",
    15: "行政楼",
    16: "图书馆",
    17: "医务室",
    18: "东区操场",
    19: "北区操场",
    20: "新操场",
    21: "快递中心",
    22: "校门附近",
    23: "体育公园",
    24: "体育馆"
  },

  LOSTTYPE: {
    0: "U盘",
    1: "水杯",
    2: "文具",
    3: "电子物品",
    4: "小挂件",
    5: "宠物",
    6: "生活用品",
    7: "金钱"
  },

  getExpressNameBycode(code) {
    for (let index in this.EXPRESS) {
      if (this.EXPRESS[index].code == code) {
        return this.EXPRESS[index].name;
      }
    }
  },

  getExpressColorBycode(code) {
    for (let index in this.EXPRESS) {
      if (this.EXPRESS[index].code == code) {
        return this.EXPRESS[index].color;
      }
    }
  },

  getStatusNameByCode(code) {
    for (let index in this.STATUS) {
      if (this.STATUS[index].code == code) {
        return this.STATUS[index].name;
      }
    }
  },

}