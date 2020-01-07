// pages/articledetail/articledetail.js
const app = getApp()
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    state: false
  },
  //点赞
  zan: function(e) {
    // console.log(e)
    var that = this;
    let state = !that.data.state;
    that.setData({
      state: state
    })
    wx.showToast({
      title: state ? '点赞成功！' : '取消点赞！',
      icon: true,
      duration: 1500,
      mask: true,
    })

  },
  //关闭弹出框页面
  goodsdetail: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  //跳转首页
  home: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    // console.log(options)
    wx.request({
      url: app.globalData.appUrl + 'videoinfo/index',
      method: 'POST',
      data: {
        video_id: options.videoid
      },
      success(res) {
        // console.log(res);
        that.setData({
          videoDetail: res.data.data //设置值
        })
      }
    })
    // wx.getStorageSync('articledetail')  //拿到列表页面缓存
    // that.setData({
    //   videoDetail: wx.getStorageSync('videodetail')    //将缓存放到页面里
    // })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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