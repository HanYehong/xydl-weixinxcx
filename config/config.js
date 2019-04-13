module.exports = {
  BAAS_CLIENT_ID:'785cc414335fc8744bba',
  TABLE_ID:{
    MAP: 60093,
    SCHOOL: 60092
  },
  CATEGORY:'校门',
  EXPRESS: [
    {
      ID: 0,
      NAME: '中通快递',
      COLOR: '#E2C08D'
    },
    {
      ID: 1,
      NAME: '韵达快递',
      COLOR: '#007ACC'
    },
    {
      ID: 2,
      NAME: '申通快递',
      COLOR: '#1DA260'
    },
    {
      ID: 3,
      NAME: '圆通快递',
      COLOR: '#FFCE44'
    },
    {
      ID: 4,
      NAME: '京东物流',
      COLOR: '#DD4FD3'
    },
    {
      ID: 5,
      NAME: '顺丰速运',
      COLOR: '#7BCA3D'
    },
    {
      ID: 6,
      NAME: '天天快递',
      COLOR: '#DD2149'
    },
    {
      ID: 7,
      NAME: '德邦物流',
      COLOR: '#FBBA8E'
    },
    {
      ID: 8,
      NAME: '百世汇通',
      COLOR: '#FC6D26'
    },
    {
      ID: 9,
      NAME: '国通快递',
      COLOR: '#3F88BF'
    },
  ]
}

//GET请求后台服务器
// wx.request({
//   url: 'http://127.0.0.1:8080/hello',
//   method: 'GET',
//   header: { 'content-type': 'application/json' },
//   data: {},
//   success: function (res) {
//     console.log(res);
//   }
// })

//POST请求后台服务器
// wx.request({
//   url: 'http://127.0.0.1:8080/hello',
//   method: 'POST',
//   header: { 'content-type': 'application/x-www-form-urlencoded' },
//   data: {},
//   success: function (res) {
//     console.log(res);
//   }
// })

//示例：
//https://blog.csdn.net/Handsome_long/article/details/82685664