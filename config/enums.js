module.exports = {
  EXPRESS: {
    ZHONG_TONG: {
      code: 0,
      name: '中通快递',
      color: '#E2C08D'
    },
    YUN_DA: {
      code: 1,
      name: '韵达快递',
      color: '#007ACC'
    },
    SHEN_TONG: {
      code: 2,
      name: '申通快递',
      color: '#1DA260'
    },
    YUAN_TONG: {
      code: 3,
      name: '圆通快递',
      color: '#FFCE44'
    },
    JING_DONG: {
      code: 4,
      name: '京东物流',
      color: '#DD4FD3'
    },
    SHUN_FENG: {
      code: 5,
      name: '顺丰速运',
      color: '#7BCA3D'
    },
    TIAN_TIAN: {
      code: 6,
      name: '天天快递',
      color: '#DD2149'
    },
    DE_BANG: {
      code: 7,
      name: '德邦物流',
      color: '#FBBA8E'
    },
    BAI_SHI: {
      code: 8,
      name: '百世汇通',
      color: '#FC6D26'
    },
    GUO_TONG: {
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
    WAIT_ACCEPTOR_PAY: {
      code: 3,
      name: '待接单者付款'
    },
    COMPLETE: {
      code: 4,
      name: '已完成'
    },
    UN_COMPLETE: {
      code: 5,
      name: '未完成'
    },
    WAIT_AUTHORIZATION: {
      code: 6,
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