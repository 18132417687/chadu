function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
// 网络请求方法
let R = {
  login() {//验证登录
    return new Promise((resolve, reject) => {
      if (wx.getStorageSync('openid') == "" || wx.getStorageSync('id') == "") {
        wx.showModal({
          title: '提示',
          content: '必须要授权登录才能进行操作，是否授权登录',
          showCancel: true,
          cancelText: '否',
          cancelColor: '#999',
          confirmText: '是',
          confirmColor: 'red',
          success: (res) => {
            console.log(res);
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else if (res.cancel) {
              this.login()
            }
          }
        })
      } else {
        resolve()
      }
    })
  }

}
// 本地缓存方法
let S = {
  get: (val) => {
    return wx.getStorageSync(val) || '';
  },
  set: (name, val) => {
    return wx.setStorageSync(name, val);
  },
  cls: (name) => {
    return wx.removeStorageSync(name);
  },
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  R: R, S: S,
  formatTime: formatTime
}

