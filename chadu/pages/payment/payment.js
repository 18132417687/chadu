// pages/payment/payment.js
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showPayPwdInput: false, //是否展示密码输入层
    pwdVal: '', //输入的密码
    payFocus: true, //文本框焦点
    total: 0, //总计金额
    number: 0, //总计数量
    num: 1,
    payment: [],
    // show: true
  },

  //添加收货地址
  goaddress:function(e){
    // console.log(e)
    wx.navigateTo({
      url: '../address/address',
    })
  },
  /**
   * 显示支付密码输入层
   */
  showInputLayer: function() {
    var that = this;
    if (that.data.selectedAddress.length===0){
      wx.showToast({
        icon:'none',
        title: '请选择地址！',
      })
    }else{
      that.setData({
        showPayPwdInput: true,
        payFocus: true
      });
    }
  },
  /**
   * 隐藏支付密码输入层
   */
  hidePayLayer: function() {
    var that = this;
    // var val = that.data.pwdVal;
    that.showInputLayer()
    wx.showModal({
      title: '提示',
      content: '您确定要退出支付吗？',
      success: function(back) {
        if (back.confirm) {
          that.setData({ //确定退出支付密码输入层关闭，无文本框焦点
            showPayPwdInput: false,
            payFocus: false,
            pwdVal: ''
          })
        } else if (back.cancel) {
          // console.log('用户点击取消')
          that.showInputLayer(); //显示支付密码输入层
        }
      }

    })

  },
  /**
   * 获取焦点
   */
  getFocus: function() {
    var that = this;
    that.setData({
      payFocus: true
    });
  },
  /**
   * 输入密码监听
   */
  inputPwd: function(e) {
    var that = this;
    // console.log(e)
    that.setData({
      pwdVal: e.detail.value
    });
    if (e.detail.value.length >= 6) {
      var val = that.data.pwdVal;
      that.setData({
        showPayPwdInput: false,
        payFocus: false,
        pwdVal: ''
      }, function() {
        wx.showToast({
            title: '支付成功！',
            mask: true,
            duration: 2000
          },
          // wx.setStorageSync(key, data)
          wx.navigateTo({
            url: '../paylist/paylist',
          })
         
        )
      }, );
      var paylist = e.currentTarget.dataset.info;
      // console.log(paylist)
      that.setData({
          paymentList: paylist
        })
      wx.setStorageSync('paymentList', that.data.paymentList)
    }
  },
  //选择地址
  useraddress: function(e) {
    // console.log(e)
    wx.navigateTo({
      url: '../address/address',
    })

  },

  //计算购买商品总金额
  totals: function() {
    var that = this;
    var sum = 0;
    for (var i = 0; i < that.data.paymentList.length; i++) {
      if (that.data.paymentList[i]) {
        sum += that.data.paymentList[i].num * that.data.paymentList[i].goods_price
      }
    }
    // console.log(sum)
    that.setData({
      total: sum
    })
    // console.log(that.data.total)

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    //视图滚动
    const query = wx.createSelectorQuery()
    query.select('.bottom').boundingClientRect()
    query.selectViewport().scrollOffset()
    //获取不可移动部分的高
    query.exec(function (bottom) {
      //获取设备高度
      wx.getSystemInfo({
        success: function (res) {
          // console.log(res);
          let newList = res.windowHeight - bottom[0].height;
          // console.log(newList, res.windowHeight, bottom[0].height);
          that.setData({
            listH: newList
          })
          
        },
      })
    })
    //获取收货地址缓存
    that.setData({
      selectedAddress: wx.getStorageSync('addressList')
    })
    // console.log(that.data.selectedAddress)
    //获取收货地址缓存
    that.setData({
      selectedAddress: wx.getStorageSync('selectaddress')
    })
    // console.log(that.data.selectedAddress)
    //获取结算缓存
    wx.getStorageSync('paymentList')
    that.setData({
      paymentList: wx.getStorageSync('paymentList')
    })
    // console.log(that.data.paymentList)
    that.totals();
    if (that.data.selectedAddress.length === 0) {
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
    //获取收货地址缓存
    that.setData({
      selectedAddress: wx.getStorageSync('addressList')
    })
    // console.log(that.data.selectedAddress)
    that.setData({
      selectedAddress: wx.getStorageSync('selectaddress')
    })
    //获取支付商品缓存
    wx.getStorageSync('paymentList')
    that.setData({
      paymentList: wx.getStorageSync('paymentList')
    })
    // console.log(that.data.paymentList)
    that.totals();
    if (that.data.selectedAddress.length === 0) {
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