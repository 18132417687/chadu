// pages/my/my.js
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loginStatus: true // 未登录
  },
  //点击登录
  login: function(e) {
    console.log(e);
    that.setData({
      userInfo: {
        avatarUrl: e.detail.userInfo.avatarUrl,
        nickName: e.detail.userInfo.nickName
      }
    })
    wx.showToast({
      title: '登录成功！',
      mask: true,
      duration: 1500
    })
    that.setData({
      loginStatus: false
    })
    wx.setStorageSync('userInfo', that.data.userInfo)
  },

  //跳转会员页面
  member: function() {
    wx.navigateTo({
      url: '../member/member',
    })
  },
  //跳转我的地址
  address: function() {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  //跳转查看全部订单页面
  paylist:function(e){
    console.log(e)
    wx.navigateTo({
      url: '../paylist/paylist',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    that.setData({
      userInfo: wx.getStorageSync('userInfo')
    })
    if (wx.getStorageSync('userInfo')) {
      that.setData({
        loginStatus: false //登录成功
      })

    }
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