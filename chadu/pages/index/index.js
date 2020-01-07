//index.js
//获取应用实例
const app = getApp()
const R = require("../../utils/util.js").R
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
    value: '',
  },
  blur(e) {
    // console.log(e)
    this.data.value = e.detail.value
  },
  // //搜索按钮
  goSearch: function(e) {
    // console.log(e)
    var that = this;
    if (this.data.value) {
      // console.log(this.data.value)
      wx.request({
        url: app.globalData.appUrl + 'search/index',
        method: 'POST',
        data: {
          goods_title: that.data.value
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function(res) {
          // console.log(res)
          // console.log(that.data.value)
          if (res.data.code != 200) {
            wx.showToast({
              title: '暂无相关商品！',
              icon: 'none',
              duration: 1500
            })
          } else {
            let str = JSON.stringify(res.data.data);
            // console.log(str)
            wx.navigateTo({
              url: '../goodslist/goodslist?data=' + str
            })
          }

          // console.log(res.data.msg)
        }
      })
    } else {
      wx.showToast({
        title: '请输入商品名称！',
        icon: 'none',
        duration: 1500
      })

    }
  },
  //跳转匠人推荐商品列表
  famous: function(e) {
    // console.log(e)
    var teaid = e.currentTarget.dataset.teaid
    // console.log(teaid)
    wx.navigateTo({
      url: '../goodslist/goodslist?teaid=' + teaid,
    })
    // wx.request({
    //   url: app.globalData.appUrl + 'goods/index',
    //   method: 'POST',
    //   data: {
    //     tea_id: 81
    //   },
    //   success(res) {
    //     console.log(res)
    //     if (res.data.code == 200) {
    //       that.setData({
    //         goodsList: res.data.data
    //       })
    //       wx.setStorageSync('goodslistmore', that.data.goodsList)
    //       wx.navigateTo({
    //         url: '../goodslist/goodslist',
    //       })
    //     }
    //   }
    // })


  },
  //跳转促销活动列表
  active: function(e) {
    // console.log(e)
    var teaid = e.currentTarget.dataset.teaid
    // console.log(teaid)
    wx.navigateTo({
      url: '../goodslist/goodslist?teaid=' + teaid,
    })
    // wx.request({
    //   url: app.globalData.appUrl + 'goods/index',
    //   method: 'POST',
    //   data: {
    //     tea_id: 82
    //   },
    //   success(res) {
    //     console.log(res)
    //     if (res.data.code == 200) {
    //       that.setData({
    //         goodsList: res.data.data
    //       })
    //       wx.setStorageSync('goodslistmore', that.data.goodsList)
    //       wx.navigateTo({
    //         url: '../goodslist/goodslist',
    //       })
    //     }
    //   }
    // })
  },
  //跳转新品推荐列表
  new: function(e) {
    // console.log(e)
    var teaid = e.currentTarget.dataset.teaid
    // console.log(teaid)
    wx.navigateTo({
      url: '../goodslist/goodslist?teaid=' + teaid,
    })
    // wx.request({
    //   url: app.globalData.appUrl + 'goods/index',
    //   method: 'POST',
    //   data: {
    //     tea_id: 83
    //   },
    //   success(res) {
    //     console.log(res)
    //     if (res.data.code == 200) {
    //       that.setData({
    //         goodsList: res.data.data
    //       })
    //       wx.setStorageSync('goodslistmore', that.data.goodsList)
    //       wx.navigateTo({
    //         url: '../goodslist/goodslist',
    //       })
    //     }
    //   }
    // })
  },
  //跳转精选推荐商品详情页
  boutiquedetail: function(e) {
    // console.log(e);
    var goods_id = e.currentTarget.dataset.goodsid
    // console.log(goods_id)
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?goods_id=' + goods_id,
    })
    // wx.request({
    //   url: app.globalData.appUrl + 'detail/index',
    //   method: 'POST',
    //   data: {
    //     tea_id: 84,
    //     goods_id: e.currentTarget.dataset.goodsid
    //   },
    //   success(res) {
    //     console.log(res);
    //     if (res.data.code == 200) {
    //       that.setData({
    //         goodsDetail: res.data.data
    //       })
    //       wx.setStorageSync('goodsdetail', that.data.goodsDetail)
    //       wx.navigateTo({
    //         url: '../goodsdetail/goodsdetail',
    //       })
    //     }
    //   }
    // })

  },

  //跳转为您优选商品详情页
  goodsdetail: function(e) {
    // console.log(e);
    var goods_id = e.currentTarget.dataset.goodsid
    // console.log(goods_id)
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?goods_id=' + goods_id,
    })
    // wx.request({
    //   url: app.globalData.appUrl + 'detail/index',
    //   method: 'POST',
    //   data: {
    //     tea_id: 85,
    //     goods_id: e.currentTarget.dataset.goodsid
    //   },
    //   success(res) {
    //     if (res.data.code == 200) {
    //       that.setData({
    //         goodsDetail: res.data.data //设置值
    //       })
    //       wx.setStorageSync('goodsdetail', that.data.goodsDetail) //设置缓存，取值
    //       wx.navigateTo({
    //         url: '../goodsdetail/goodsdetail',
    //       })
    //     }
    //   }
    // })

  },

  //点击加入购物车
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
  },

  //点击我显示底部弹出框
  addCars: function (res) {
    //显示对话框
    // console.log(res);
    this.setData({
      goodsid: res.currentTarget.dataset.goodsdata.goods_id,
      price: res.currentTarget.dataset.goodsdata.goods_price,
      title: res.currentTarget.dataset.goodsdata.goods_title,
      selected: res.currentTarget.dataset.goodsdata.selected,
      address: res.currentTarget.dataset.goodsdata.goods_address,
      img: res.currentTarget.dataset.goodsdata.goods_img,
    })
    this.showModal();
    //显示遮罩层
    this.setData({
      TipStatus: true,
      mask: true
    })

  },
  //立即加入购物车
  sure: function(e) {
    var that = this;
    // console.log(e)
    var goodslist = wx.getStorageSync('goodslist') || []; //判断购物车是否存在内容 
    var exist = goodslist.find(function(el) { //判断购物车中是否已经存在这条数据
      return el.goods_id == that.data.goodsid
    })
    // console.log(that.data.title)
    wx.request({
      url: app.globalData.appUrl + 'cart/add',
      method: 'POST',
      data: {
        goods_id: that.data.goodsid,
        goods_title: that.data.title,
        goods_img: that.data.img,
        goods_price: that.data.price,
        selected: that.data.selected,
        num: that.data.num,
      },
      success(res) {
        // console.log(res)
        if (res.data.code == 200) {
          wx.showToast({
            title: '添加购物车成功!',
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
        wx.setStorageSync('goodslist', res.data.data)
      }
    })
    that.hiddenmask();
    that.setData({
      num: 1 ///数量为1
    })

  },
  //显示对话框
  showModal: function() {
    var that = this;
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
    that.setData({
      num: 1 ///数量为1
    })
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
      TipStatus: false,
    });
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
  getCode:function(){
    // wx.showLoading({ title: '正在鉴权...', mask: true })

  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
   let that = this;
    that.getCode();
    wx.login({
      success:function(res){
        // console.log(res)
        // that.setData({
        //   code:res.code
        // })
      }
    })
    //轮播图接口
    wx.request({
        url: app.globalData.appUrl + 'banner/index',
        method: 'POST',
        success(res) {
          // console.log(res)
          if (res.data.code == 200) {
            that.setData({
              bannerList: res.data.data
            })
          }
        }
      }),
      //精选推荐接口
      wx.request({
        url: app.globalData.appUrl + 'goods/index',
        method: 'POST',
        data: {
          tea_id: 84
        },
        success(res) {
          // console.log(res);
          if (res.data.code == 200) {
            that.setData({
              boutiqueList: res.data.data
            })
          }
        }
      })
    //为您优选接口
    wx.request({
      url: app.globalData.appUrl + 'goods/index',
      method: 'POST',
      data: {
        tea_id: 85
      },
      success(res) {
        // console.log(res);
        if (res.data.code == 200) {
          that.setData({
            fristList: res.data.data
          })
        }
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
    var that = this;
    R.login();

    wx.request({
      url: app.globalData.appUrl + 'user/info',
      method: 'POST',
      data: {
        openid: wx.getStorageSync('openid')
      },
      success(res) {
        // if (res.data.code == 401) {
        //   // wx.navigateTo({
        //   //   url: '/pages/login/login',
        //   // })
        // }
      }
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