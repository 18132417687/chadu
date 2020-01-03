// pages/car/car.js
const app = getApp()
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    carts: [],
    // selected: false, //选择按钮
    selectAllStatus: false, // 全选状态，默认全选
    total: 0, //总计金额
    number: 0, //总计数量
    num: 1,
    // show: true,
  },
  //跳转商品详情页
  goodsdetail: function(e) {
    console.log(e)
    let carts = that.data.carts; // 获取购物车列表
    // console.log(carts)
    var goods_id = e.currentTarget.dataset.goodsid
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?goods_id=' + goods_id,
    })
    // wx.request({
    //   url: app.globalData.appUrl + 'detail/index',
    //   method: 'POST',
    //   data: {
    //     goods_id: e.currentTarget.dataset.goodsid
    //   },
    //   success(res) {
    //     console.log(res);
    //     if (res.data.code == 200) {
    //       that.setData({
    //         goodsDetail: res.data.data //设置值
    //       })
    //       console.log(that.data.goodsDetail)
    //       wx.setStorageSync('goodsdetail', that.data.goodsDetail) //设置缓存，取值
    //       wx.navigateTo({
    //         url: '../goodsdetail/goodsdetail',
    //       })
    //     }
    //   }
    // })
  },
  //跳转去逛逛页面（首页）
  around: function(e) {
    wx.switchTab({
      url: '../index/index',
    })
  },

  // //选择事件
  selectList(e) {
    let that = this;
    console.log(e)
    let carts = that.data.carts; // 获取购物车列表
    var index = e.currentTarget.dataset.index; // 获取点击data- 传进来的index索引
    var goodsid = e.currentTarget.dataset.goodsid;
    console.log(index);
    console.log(goodsid);
    var selected = carts[index].selected; // 获取当前商品的选中状态    获取购物车里面的value值
    carts[index].selected = !selected; // 改变状态  状态取反
    console.log(carts[index].selected)
    let selectAllStatus = that.data.selectAllStatus; //是否已经全选
    let str = true; //用str与选择每一项的状态进行判断
    that.setData({
      carts: carts
    });

    for (var i = 0; i < carts.length; i++) {
      str = str && carts[i].selected; //用str与每一项进行状态判断
    }
    if (str === true) {
      that.setData({
        selectAllStatus: true
      })
    } else {
      that.setData({
        selectAllStatus: false
      })
    }
    that.total(); // 重新获取总价
    that.number();
    if (that.data.carts.length === 0) {
      that.setData({
        show: true
      })
    }
  },
  // //全选事件
  selectAll: function(e) {
    var that = this;
    let carts = that.data.carts; // 获取购物车列表
    let selectAllStatus = that.data.selectAllStatus; // 是否全选状态
    selectAllStatus = !selectAllStatus;
    for (let i = 0; i < carts.length; i++) {
      carts[i].selected = selectAllStatus; // 改变所有商品状态 获取购物车里面的value值
    }
    that.setData({
      selectAllStatus: selectAllStatus,
      carts: carts
    });
    console.log(that.data.selectAllStatus)
    wx.setStorageSync('goodslist', that.data.carts) //更新状态
    that.total(); // 重新获取总价
    that.number();
    if (that.data.carts.length === 0) {
      that.setData({
        show: true
      })
    }
  },
  //购物车数量加
  add: function(e) {
    console.log(e)
    var carts = that.data.carts; // 获取购物车列表
    // console.log(carts);
    var index = e.currentTarget.dataset.index; //获取点击事件的索引下标
    var num = carts[index].num; //获取购物车里面的数量值
    num++ //数量累加
    carts[index].num = num; //改变商品数量
    var addnum = num;
    wx.request({
      url: app.globalData.appUrl + 'cart/numadd',
      method: 'POST',
      data: {
        goods_id: e.currentTarget.dataset.goodsid,
        num: addnum
      },
      success(res) {}
    })
    that.setData({
      carts: carts
    })
    that.total(); // 重新获取总价
    that.number();
  },
  // //减
  reduce: function(e) {
    console.log(e);
    var carts = that.data.carts;
    var index = e.currentTarget.dataset.index;
    var num = carts[index].num;
    if (num == 1) {
      num = 1;
      wx.showToast({
        title: '不能再少啦！',
        duration: 1500,
        icon: 'none',
        mask: true,
      })
    } else {
      num--;
    }
    carts[index].num = num;
    var reduceadd = num;
    wx.request({
      url: app.globalData.appUrl + 'cart/numreduce',
      method: 'POST',
      data: {
        goods_id: e.currentTarget.dataset.goodsid,
        num: reduceadd
      },
      success(res) {}
    })
    that.setData({
      carts: carts
    })
    that.total(); // 重新获取总价
    that.number();
  },
  // //删除
  del: function(e) {
    wx.showModal({
      title: '提示',
      content: '您确认删除此商品吗？',
      success: function(ts) {
        var goods = that.data.carts;
        // goods.forEach((item, index => {
        //  }))
        if (ts.confirm) {
          //购物车删除单个商品接口
          wx.request({
            url: app.globalData.appUrl + 'cart/del',
            method: 'POST',
            data: {
              goods_id: e.currentTarget.dataset.goodsid
            },
            success(res) {
              console.log(res)
              wx.setStorageSync('goodslist', res.data.data)
              if (res.data.code == 200) {
                that.setData({
                  carts: res.data.data
                })
                if (that.data.carts.length === 0) {
                  that.setData({
                    show: true
                  })
                } else {
                  that.setData({
                    show: false
                  })
                }
              }
              that.judge();
              that.total(); // 重新获取总价
              that.number();
            }
          })
        }
      }
    })

  },
  //判断单选全选是否选中
  judge: function(e) {
    var carts = that.data.carts;
    for (let item of carts) {
      if (item.selected == 0 || item.selected == false) {
        item.selected = false
        that.setData({
          selectAllStatus: false
        })
      } else {
        item.selected = true
        that.setData({
          selectAllStatus: true
        })
      }
    }
  },
  // //总计金额
  total: function() {
    var sum = 0;
    for (var i = 0; i < that.data.carts.length; i++) {
      if (that.data.carts[i].selected) { //如果商品被选中
        sum += that.data.carts[i].num * that.data.carts[i].goods_price
      }
    }
    that.setData({
      total: sum
    })
    console.log(that.data.total)
    wx.setStorageSync('goodslist', that.data.carts) //更新状态
  },
  //总计数量
  number: function(e) {
    var num = 0;
    var carts = that.data.carts;
    for (var i = 0; i < that.data.carts.length; i++) {
      if (that.data.carts[i].selected) {
        num += parseInt(that.data.carts[i].num) //字符串传化成数值
      }
    }
    that.setData({
      number: num
    })
    console.log(that.data.number)
    wx.setStorageSync('goodslist', that.data.carts) //更新状态
  },
  // //跳转结算页面
  payment: function(e) {
    var detailInfo = e.currentTarget.dataset.info;
    console.log(detailInfo)
    let carts = that.data.carts; // 获取购物车列表
    let pay = carts.filter(item => { //筛选
      return item.selected === true;
    })
    if (pay != "") {
      console.log(pay)
      wx.setStorageSync('paymentList', pay)
      wx.navigateTo({
        url: '../payment/payment',
      })
    } else {
      wx.showToast({
        title: '请选择商品！',
      })
    }
    wx.setStorageSync('goodslist', that.data.carts) //更新状态
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    //购物车列表接口
    wx.request({
      url: app.globalData.appUrl + 'cart/index',
      method: 'POST',
      success(res) {
        console.log(res)
        wx.setStorageSync('goodslist', res.data.data)
        if (res.data.code == 200) {
          that.setData({
            carts: res.data.data
          })
          if (res.data.data.length === 0) {
            that.setData({
              show: true
            })
          } else {
            that.setData({
              show: false
            })
          }

        } else {
          that.setData({
            show: true
          })
        }
        that.judge();
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
    //页面正在加载
    wx.showLoading({
        title: '正在加载！',
        mask: true,
        duration: 1500
      }),
      that.setData({
        carts: wx.getStorageSync('goodslist')
      })
    if (that.data.carts.length === 0) {
      that.setData({
        show: true
      })
    } else {
      that.setData({
        show: false
      })
    }
    that.judge();
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