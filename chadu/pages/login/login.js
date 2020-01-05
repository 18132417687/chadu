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
        console.log(e)
        if (e.detail.userInfo) {
          S.set('nickName', e.detail.userInfo.nickName)
          wx.request({
                url: app.globalData.appUrl + 'user/message',
                data: {
                  openId: app.globalData.openId,
                  userInfo: e.detail.userInfo,
                  encryptedData: e.detail.encryptedData,
                  iv: e.detail.iv,
                  session_key: this.data.session_key
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                success: function(res) {
                  console.log(res.data.data.code)
                  if (res.data.code == 200) {
                    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                    console.log(pages)
                    // let prevPage = pages[pages.length - 2];
                    // prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                    //   reload: true
                    // })
                    wx.switchTab({
                      url: '/pages/my/my',
                    })
                  } else {
                    wx.showToast({
                            title: '授权失败！',
                            icon:'none',
                            duration: 2000
                          })
                      }
                      // app.globalData.userInfo = e.detail.userInfo
                      // app.globalData.userId = res.data.userId
                      // wx.setStorageSync('userId', res.data.userId)
                      // // 授权成功后，跳转
                      // if (res.data.status) {
                      //   console.log(1)
                      //   let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
                      //   let prevPage = pages[pages.length - 2];
                      //   prevPage.setData({ // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
                      //     reload: true
                      //   })
                      //   wx.navigateBack({
                      //     delta: 1,
                      //   })
                      // } else {
                      //   console.log(2)
                      //   wx.showToast({
                      //     title: '授权失败！',
                      //     icon:'none',
                      //     duration: 2000
                      //   })
                      //   // R.toast(res.msg);
                      // }

                    }
                  });


              }
              else {
                //用户按了拒绝按钮
                wx.showModal({
                  title: '警告',
                  content: '您点击了拒绝授权，一些功能将无法使用，请授权之后再进入!!!',
                  showCancel: false,
                  confirmText: '返回授权',
                  success: function(res) {
                    if (res.confirm) {
                      console.log('用户点击了“返回授权”')
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
                  console.log(res)
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  wx.request({
                    url: 'http://localhost:80/chadutp/public/api/user/index',
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    data: {
                      code: res.code
                    },
                    success: function(e) {
                      console.log(e)
                      var openId = e.data.data.openid;
                      console.log(openId)
                      wx.setStorageSync('openid', openId)
                      // if(res.data.data.type){

                      // }
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