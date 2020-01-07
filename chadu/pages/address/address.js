// pages/address/address.js
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected: false, //选择按钮
  },
  //选择默认地址事件
  selectList(e) {
    let that = this;
    // console.log(e);
    var addressList = that.data.addressList;   //获取地址列表
    // console.log(addressList)
    var index = e.currentTarget.dataset.index; // 获取点击data- 传进来的index索引
    // console.log(index);
    that.setData({
      defaultaddress: index
    })
    var t = addressList[index];
    // console.log(t);
    var selectaddress = addressList.find(function (el, i) {
      return i == index
    })
    // console.log(selectaddress)
    wx.setStorageSync('selectaddress', selectaddress)
    // addressList[index].selected = !selected; // 改变状态  状态取反
    // console.log(addressList[index].selected)
    // that.setData({
    //   addressList: addressList
    // });
  },
  //选择地址
  selectaddress: function(e){
    var that = this;
    // console.log(e)
    // console.log(that.data.addressList);
    var addressList = that.data.addressList;   //获取地址列表
    // console.log(addressList)
    var index = e.currentTarget.dataset.index; // 获取点击data- 传进来的index索引
    // console.log(index);
    var t = addressList[index];
    // console.log(t);
    var selectaddress = addressList.find(function(el,i){
      return i == index
    })
    // console.log(selectaddress)
    wx.setStorageSync('selectaddress', selectaddress)
    wx.navigateBack({
      // delta: 1,
    })
  },
  //跳转增加新收货地址
  addaddress: function(e) {
    wx.navigateTo({
      url: '../addaddress/addaddress',
    })
  },
  //修改地址
  editaddress: function(e) {
    // console.log(e);
    var that = this;
    var addressList = that.data.addressList;
    var index = e.currentTarget.dataset.index;
    wx.setStorageSync('addressedit', addressList[index]) //更新数据
    wx.setStorageSync('index', index)
    wx.navigateTo({
      url: '../editaddress/editaddress',
    })
  },
  //删除地址
  deladdress: function(e) {
    var that = this;
    // console.log(e);
    var addressList = that.data.addressList;
    var index = e.currentTarget.dataset.index;
    // console.log(index)
    wx.showModal({
      title: '提示',
      content: '您确实定要删除此地址吗？',
      success: function(sm) {
        if (sm.confirm) {
          // 用户点击了确定 可以调用删除方法了
          addressList.splice(index, 1); //删除点击为索引处的一项商品
          that.setData({
            addressList: addressList
          })
          wx.setStorageSync('addressList', that.data.addressList) //更新数据
          wx.setStorageSync('addressedit', {}) //更新数据
          if (that.data.addressList.length === 0) {
            that.setData({
              show: true,
            })
          } else {
            that.setData({
              show: false,
            })
          }
        } else if (sm.cancel) {
          // console.log('用户点击取消')
        }
      }
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    // that.select();
    //拿到新增页面保存地址缓存
    that.setData({
      addressList: wx.getStorageSync('addressList')
    })
    // console.log(that.data.addressList)

    // //拿修改页面地址缓存
    wx.getStorageSync('addressedit')
    var index = wx.getStorageSync('index')
    // console.log(index)
    if (that.data.addressList != ''){
      if (wx.getStorageSync('addressedit')!=''){
        that.data.addressList[index] = wx.getStorageSync('addressedit');
        that.setData({
          addressList: that.data.addressList
        })
        // console.log(that.data.addressList)
      }
    }
    //判断显示的收货地址背景是否为空
    if (that.data.addressList.length == 0) {
      that.setData({
        show: true,
      })
    } else {
      that.setData({
        show: false,
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
    var that = this;
    //拿到新增保存地址缓存
    var arr = wx.getStorageSync('addressList');
    that.setData({
      addressList: arr
    })
    // console.log(that.data.addressList)

    // //拿修改页面地址缓存
    wx.getStorageSync('addressedit')
    var index = wx.getStorageSync('index')
    // console.log(index)
    if (that.data.addressList != '') {
      if (wx.getStorageSync('addressedit') != '') {
        that.data.addressList[index] = wx.getStorageSync('addressedit');
        that.setData({
          addressList: that.data.addressList
        })
        // console.log(that.data.addressList)
      }
    }
    //判断显示的收货地址背景是否为空
    if (that.data.addressList.length == 0) {
      that.setData({
        show: true,
      })
    } else {
      that.setData({
        show: false,
      })
    }
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