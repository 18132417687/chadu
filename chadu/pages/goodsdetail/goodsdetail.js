// pages/goodsdetail/goodsdetail.js
const app = getApp()
let that;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TipStatus: false, //默认不显示遮罩层
    showPop: false,
    animationData: {},
    num: 1,
    mask: false,
  },
  //显示遮罩层
  mask: function() {
    var that = this;
    that.setData({
      mask: true
    })
    // console.log(that.data.TipStatus);
  },
  //隐藏遮罩层
  hiddenMask: function() {
    var that = this;
    // console.log(e);
    that.setData({
      mask: false
    })
    // console.log(that.data.TipStatus);
  },
  //加
  add: function() {
    // console.log(e);
    let newNum = this.data.num;
    newNum++;
    this.setData({
      num: newNum
    })
  },

  //减
  reduce: function() {
    if (this.data.num > 1) {
      let newNum = this.data.num;
      newNum--;
      this.setData({
        num: newNum
      })
    } else {
      wx.showToast({
        title: '不能再少啦！',
        mask: true,
        icon: 'none',
        duration: 1500
      })
    }

  },
  //隐藏遮罩层
  hiddenmask: function() {
    var that = this;
    //隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(380).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
    // console.log(e);
    that.setData({
      TipStatus: false
    });

    // console.log(that.data.TipStatus);
  },
  //点击我显示底部弹出框
  addCars: function() {
    //显示对话框
    this.showModal();
    //显示遮罩层
    that.setData({
      TipStatus: true
    })

  },
  //显示对话框
  showModal: function() {
    // 显示遮罩层
    var animation = wx.createAnimation({ //创建一个动画实例animation
      duration: 200, //持续时间
      timingFunction: "linear", //动画效果动画从头到尾的速度是相同的
      delay: 0 //动画延迟时间
    })
    this.animation = animation
    animation.translateY(380).step() //在 Y 轴平移的距离
    this.setData({
      animationData: animation.export(), //输出动画
      showModalStatus: true
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function() {
    var that = this;
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(380).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
    that.setData({
      TipStatus: false
    });
  },
  //跳转购物车页面
  car: function() {
    wx.switchTab({
      url: '../car/car',
    })
  },
  //立即加入
  sure: function(e) {
    var that = this;
    // console.log(e.currentTarget.dataset.info);
    e.currentTarget.dataset.info.num = that.data.num; //数量增加、减少赋值给info.num
    // console.log(e.currentTarget.dataset.info.num);
    var detailInfo = e.currentTarget.dataset.info; //判断购物车是否存在内容
    // console.log(detailInfo.goods_id)
    wx.request({
      url: app.globalData.appUrl + 'cart/add',
      method: 'POST',
      data: {
        goods_id: detailInfo.goods_id,
        goods_title: detailInfo.goods_title,
        goods_img: detailInfo.goods_img,
        goods_price: detailInfo.goods_price,
        selected: detailInfo.selected,
        num: detailInfo.num,
      },

      success(res) {
        // console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '添加购物车成功',
            icon: 'true',
            mask: true,
            duration: 1500
          })
        } else {
          wx.showToast({
            title: '添加购物车失败！',
            icon: 'error',
            mask: true,
            duration: 1500
          })
        }
        wx.setStorageSync("goodslist", res.data.data);
      }
    })
    // var goodslist = wx.getStorageSync('goodslist') || []; //判断购物车中是否已经存在这条数据
    // // 判断购物车是否已存在这个
    // var exist = goodslist.find(function(el) {
    //   return el.goods_id == e.currentTarget.dataset.info.goods_id
    // })
    // //如果购物车里面有该商品那么他的数量每次加一
    // if (exist) {
    //   exist.num = parseInt(exist.num) + 1
    // } else {
    //   goodslist.push({
    //     goods_id: detailInfo.goods_id,
    //     goods_title: detailInfo.goods_title,
    //     goods_img: detailInfo.goods_img,
    //     goods_price: detailInfo.goods_price,
    //     selected: detailInfo.selected,
    //     num: detailInfo.num,
    //   })
    // }
    // wx.showToast({
    //   title: '添加购物车成功',
    //   icon: 'true',
    //   duration: 1500
    // })
    that.hiddenmask();
    // //更新缓存数据

  },
  //立即购买
  payment: function(e) {
    // console.log(e)
    var that = this;
    var detailInfo = e.currentTarget.dataset.info;
    e.currentTarget.dataset.info.num = that.data.num; //数量增加、减少赋值给info.num
    // var num = detailInfo[index].num;
    // console.log(detailInfo) //输出一个商品对象
    let goods = []; //创建一个数组
    goods.push(detailInfo); //将对象放到数组里
    // console.log(goods)
    wx.setStorageSync('paymentList', goods)
    wx.navigateTo({
      url: '../payment/payment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    // console.log(options)
    wx.request({
      url: app.globalData.appUrl + 'detail/index',
      method: 'POST',
      data: {
        // tea_id: options.goods_id,
        goods_id: options.goods_id
      },
      success(res) {
        // console.log(res);
        if (res.data.code == 200) {
          that.setData({
            goodsDetail: res.data.data
          })
          // wx.setStorageSync('goodsdetail', that.data.goodsDetail)
          // wx.navigateTo({
          //   url: '../goodsdetail/goodsdetail',
          // })
        }
      }
    })
    //获取商品列表缓存id
    // wx.getStorageSync('goodsdetail')
    // that.setData({
    //   goodsDetail: wx.getStorageSync('goodsdetail') //将缓存结果存入页面中
    // })


    // console.log(that.data.goodsDetail)
    //客服遮罩层，获取设备高度
    wx.getSystemInfo({
      success: function(res) {
        // console.log(res);
        that.setData({
          wh: res.windowHeight
        })
      },
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
    var that = this;
    that.setData({
      mask: false
    })
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