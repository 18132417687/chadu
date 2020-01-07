// pages/editaddress/editaddress.js
let that;
var addressList = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  //保存修改后的地址
  save: function(e) {
    // console.log(e)
    var people = e.detail.value.people;
    var phone = e.detail.value.phone;
    var address = e.detail.value.address;
    var detailaddress = e.detail.value.detailaddress;
    var index = e.currentTarget.dataset.index;
    // var edit = wx.getStorageSync('addressList');
    addressList = {
      people: people,
      phone: phone,
      address: address,
      detailaddress: detailaddress,
      index:index
    }

    // console.log(addressList)
    // wx.setStorageSync('index',index)
    wx.setStorageSync('addressedit', addressList );

    wx.showToast({
      title: '修改成功！',
      icon: true,
      duration: 1500,
      mask: true
    })
    wx.navigateBack({})

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //获取地址页面用户的详细地址
    var arr = wx.getStorageSync('addressedit') || [];
    that.setData({
      addressList: arr
    })
    // console.log(that.data.addressList)
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