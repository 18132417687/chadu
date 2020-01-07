// pages/login/login.js
const app = getApp()
const util = require('../../utils/util.js')
var S = util.S

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  bindGetUserInfo: function(e) {
    // console.log(e)
    if (e.detail.userInfo) {
      wx.request({
        url: app.globalData.appUrl + 'user/message',
        data: {
          openId: S.get('openid'),
          userInfo: e.detail.userInfo,
        },
        method: 'POST',
        success: function(res) {
          // console.log(res)
          // console.log(res.data.data)
          if (res.data.code == 200) {
            wx.setStorageSync('id', res.data.data.id)
            wx.showToast({
              title: '授权成功！',
              icon: 'success',
              duration: 2000
            })
            wx.switchTab({
              url: '/pages/my/my',
            })
          } else {
            wx.showToast({
              title: '授权失败！',
              icon: 'none',
              duration: 2000
            })
          }
        }
      });


    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，一些功能将无法使用，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            // console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //   // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'http://localhost:80/chadutp/public/api/user/index',
          method: 'POST',
          // header: {
          //   'content-type': 'application/x-www-form-urlencoded'
          // },
          data: {
            code: res.code
          },
          success: function(e) {
            var openId = e.data.data.openid;
            // console.log(openId)
            wx.setStorageSync('openid', openId)
          }
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})