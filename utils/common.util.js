import objectUtil from './object.util'

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatTime = (date) => {
  var date = new Date(date);  
  let year = date.getFullYear()
  let month = format(date.getMonth() + 1)
  let day = format(date.getDate())
  let hour = format(date.getHours())
  let minute = format(date.getMinutes())
  let second = format(date.getSeconds())
  return [year, month, day].join('-') + ' ' + [hour, minute, second].join(':')
}

const format = (data) => {
  if (data < 10) data = '0' + data;
  return data;
}

const formatDate = (date) => {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].map(formatNumber).join('-')
}

const $init = (page) => {
  page.$data = objectUtil.$copy(page.data, true)
}

const $digest = (page) => {
  let data = page.data
  let $data = page.$data
  let ready2set = {}

  for (let k in data) {
    if (!objectUtil.$isEqual(data[k], $data[k])) {
      ready2set[k] = data[k]
      $data[k] = objectUtil.$copy(data[k], true)
    }
  }

  if (Object.keys(ready2set).length) {
    page.setData(ready2set)
  }
}

module.exports = {
  formatDate,
  formatTime,
  $init,
  $digest
}
