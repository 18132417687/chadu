// pages/paylist/paylist.js
let that
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  nopaylist: function() {
    //判断显示的收货地址背景是否为空
    if (that.data.paymentList.length == 0) {
      that.setData({
        show: true,
      })
    } else {
      that.setData({
        show: false,
      })
    }
  },
  //去逛逛
  around:function(e){
    wx.switchTab({
      url: '../index/index',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    //获取支付页面缓存
    that.setData({
      paymentList: wx.getStorageSync('paymentList')
    })
    that.nopaylist();
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
    that.nopaylist();
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