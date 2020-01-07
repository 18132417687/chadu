// pages/goodslist/goodslist.js
const app = getApp()
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num: 1,
    TipStatus: false, //默认不显示遮罩层
  },
  //传递value值
  blur(e) {
    // console.log(e)
    this.data.value = e.detail.value
  },
  // //搜索按钮
  goSearch: function (e) {
    // console.log(e)
    var that = this;
    if (this.data.value) {
      wx.request({
        url: app.globalData.appUrl + 'search/index',
        method: 'POST',
        data: {
          goods_title: this.data.value
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          // console.log(res)
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
  //跳转商品详情页
  goodsdetail: function (e) {
    // console.log(e);
    var goods_id = e.currentTarget.dataset.goodsid
    // console.log(goods_id)
    wx.navigateTo({
      url: '../goodsdetail/goodsdetail?goods_id=' + goods_id,
    })
    //全部商品详情接口
    // wx.request({
    //   url: 'http://localhost:80/chadutp/public/api/detail/index',
    //   method: 'POST',
    //   data: {
    //     goods_id: e.currentTarget.dataset.goodsid
    //   },
    //   success(res) {
    //     // console.log(res);
    //     if (res.data.code == 200) {
    //       that.setData({
    //         goodsDetail: res.data.data //setData设值
    //       })
    //       // console.log(that.data.goodsdetail)
    //       wx.setStorageSync('goodsdetail', that.data.goodsDetail); //data：拿值
    //       wx.navigateTo({
    //         url: '../goodsdetail/goodsdetail',
    //       })
    //     }
    //   }
    // })

    // //匠人推荐商品详情接口
    // wx.request({
    //   url: 'http://localhost:80/chadutp/public/api/peoplerecommendinfo/index',
    //   method: 'POST',
    //   data: {
    //     goods_id:e.currentTarget.dataset.goodsid
    //   },
    //   success(res) {
    //     console.log(res)
    //     if(res.data.code == 200){
    //       that.setData({
    //         goodsDetail:res.data.data
    //       })
    //       wx.setStorageSync('goodsdetail', that.data.goodsDetail)
    //       wx.navigateTo({
    //         url: '../goodsdetail/goodsdetail',
    //       })
    //     }
    //   }
    // })

  },
  //点击我显示底部弹出框
  addCars: function (res) {
    var that = this;
    //显示对话框
    // console.log(res);
    that.setData({
      goodsid: res.currentTarget.dataset.goodsdata.goods_id,
      price: res.currentTarget.dataset.goodsdata.goods_price,
      title: res.currentTarget.dataset.goodsdata.goods_title,
      selected: res.currentTarget.dataset.goodsdata.selected,
      address: res.currentTarget.dataset.goodsdata.goods_address,
      img: res.currentTarget.dataset.goodsdata.goods_img,
    })
    this.showModal();
    //显示遮罩层
    that.setData({
      TipStatus: true,
      mask: true
    })

  },
  //点击加入购物车
  //隐藏遮罩层
  hiddenmask: function () {
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
    setTimeout(function () {
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
  //显示对话框
  showModal: function () {
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
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
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
    setTimeout(function () {
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
  //立即加入购物车
  sure: function (e) {
    var that = this;
    // console.log(e)
    var goodslist = wx.getStorageSync('goodslist') || []; //判断购物车是否存在内容
    var exist = goodslist.find(function (el) { //判断购物车中是否已经存在这条数据
      return el.goods_id == that.data.goodsid
    })
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
        wx.setStorageSync('goodslist', res.data.data)
      }
    })
    that.hiddenmask();
    that.setData({
      num: 1 ///数量为1
    })

  },
  //加
  add: function () {
    // console.log(e);
    let newNum = this.data.num;
    newNum++;
    this.setData({
      num: newNum
    })
  },

  //减
  reduce: function () {
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    // console.log(options)
    if (options.data) {
      let teagoodsList = JSON.parse(options.data);
      that.setData({
        teagoodsList: teagoodsList
      })
    } else {
      wx.request({
        url: app.globalData.appUrl + 'goods/index',
        method: 'POST',
        data: {
          tea_id: options.teaid
        },
        success(res) {
          // console.log(res)
          if (res.data.code == 200) {
            that.setData({
              teagoodsList: res.data.data
            })
          }
        }
      })
    }
    // that.setData({
    //   teagoodsList: wx.getStorageSync('goodslist')
    // })
    // console.log(that.data.teagoodsList)
    //视图滚动
    const query = wx.createSelectorQuery()
    query.select('.searchOut').boundingClientRect()
    query.selectViewport().scrollOffset()
    //获取不可移动部分的高
    query.exec(function (searh) {
      // console.log(searh);
      // searh[0].top       // #the-id节点的上边界坐标
      // searh[1].scrollTop // 显示区域的竖直滚动位置
      //获取设备高度
      wx.getSystemInfo({
        success: function (res) {
          // console.log(res);
          let newList = res.windowHeight - searh[0].height;
          // console.log(newList, res.windowHeight, searh[0].height);
          that.setData({
            listH: newList
          })
        },
      })
    })

    // wx.getStorageSync('goodslistmore') //获取茶种页面缓存id结果
    // that.setData({
    //   teagoodsList: wx.getStorageSync('goodslistmore') //将缓存结果传入到页面里
    // })
    // console.log(that.data.teagoodsList)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showLoading({
      title: '正在加载...',
      mask: true
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showLoading({
      title: '正在加载数据!',
      mask: true
    })

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})