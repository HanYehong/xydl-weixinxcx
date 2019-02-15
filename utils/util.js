function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**
 * 获取当前日期字符串 yyyy-mm-dd
 */
function getCurrentDate() {
  var date = new Date();
  var mon = date.getMonth() + 1;
  var day = date.getDate();
  return date.getFullYear() + "-" + (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
/**
 * 根据订单状态码获取对应状态
 */
function orderStateConvert(stateCode, type) {
  if (type == 1) {//帮带物订单  B端
    switch (stateCode) {
      case '0'://发布订单,暂无人接单  B端无该订单
        return '';
      case '1'://B申请接单,等待C同意  取消带物(脱离次订单)
        return '已发起';
      case '2'://C同意让B带物,此时正式建立带物关系  取消带物(进入3)  (取消申请被拒绝过一次后可以联系客服)
        return '已同意';
      case '3'://建立带物关系后B申请取消带物,C同意后订单回到0状态,B端看不到该订单  联系客服
        return '待取消';
      case '4'://完成订单  交易完成(流程结束)     给B打分
        return '已完成';
      case '5'://订单被C关闭(订单不会重新释放到市场)  (不可操作)
        return '已关闭';
      case '6'://C不想继续订单了,申请关闭订单(正常状态等价于2) 同意则进入状态5(关闭),拒绝则进入状态2
        return '已同意'
      default:
        return "未知"

    }
  } else {//被带订单
    switch (stateCode) {
      case '0':
        return '待抢单'
      case '1':
        return '待同意';
      case '2':
        return '待收货';
      case '3'://此时C如果拒绝B的取消申请,订单将回退到状态2,B可以联系客服介入,同意则进入状态6
        return '待收货';
      case '4'://C已经确认收货
        return '已完成';
      case '5'://因为C主动关闭的订单(整个订单状态结束)
        return '已关闭';
      case '6': ''//待收货状态C不想带物了 ,申请关闭订单,等待C同意
        return '待关闭'
      default:
        return "未知"
    }
  }
}

module.exports = {
  formatTime: formatTime,
  getCurrentDate: getCurrentDate,
  orderStateConvert: orderStateConvert
}
