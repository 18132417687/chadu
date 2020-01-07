// pages/addaddress/addaddress.js
let that;
var addressList = null;
var show = false;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: show,
    userName: '',
    mobile: '',
    detailaddress:'',
    region: ['北京市', '北京市', '东城区'],
    customItem: '全部',
  },
  //选择用户所在地址
  bindRegionChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  //用户名验证
  peoplename: function(e) {
    let that = this;
    // console.log(e)
    that.setData({
      userName: e.detail.value
    })
  },
  // 手机号验证
  blurPhone: function(e) {
    let that = this;
    // console.log(e)
    that.setData({
      mobile: e.detail.value
    })
  },
  //详细地址验证
  detailaddress:function(e){
    let that = this;
    that.setData({
      detailaddress:e.detail.value
    })
    // console.log(e)
  },
  //点击保存地址按钮
  save: function(e) {
    let that = this;
    var userName = that.data.userName;
    var mobile = that.data.mobile;
    var detailaddress = that.data.detailaddress;
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    //判断用户名、手机号、地址 是否正确
    if (userName == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 1000,
        mask: true
      })

      return false
    } else if (mobile == '') {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })

      return false
    } else if (detailaddress == '') {
      wx.showToast({
        title: '地址不能为空',
        icon: 'none',
        duration: 1000,
        mask: true
      })

      return false
    } else if (mobile.length != 11) {
      wx.showToast({
        title: '手机号长度有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else if (!myreg.test(mobile)) {
      wx.showToast({
        title: '手机号有误！',
        icon: 'none',
        duration: 1500
      })
      return false;
    } else {
      // console.log(e)
      var people = e.detail.value.people;
      var phone = e.detail.value.phone;
      var address = e.detail.value.address;
      var detailaddress = e.detail.value.detailaddress;
      var arr = wx.getStorageSync('addressList') || [];
      // console.log(arr)
      addressList = {
        people: people,
        phone: phone,
        address: address,
        detailaddress: detailaddress,
      }
      arr.push(addressList);
      wx.setStorageSync('addressList', arr);
      wx.navigateBack({})
      wx.showToast({
        title: '添加成功！',
        icon: true,
        duration: 1500,
        mask: true
      })

    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },
})
  