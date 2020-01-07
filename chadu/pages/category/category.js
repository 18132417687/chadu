// pages/category/category.js
const app = getApp()

let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1, //分类导航默认选择为第一个
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
  //分类导航切换
  tabNav: function(e) {
    that = this;
    // console.log(e);
    //分类切换
    that.setData({
      tabIndex: e.currentTarget.dataset.tabid
    })
    //茶种分类接口
    wx.request({
      url: app.globalData.appUrl + 'tea/index',
      method: 'POST',
      data: {
        category_id: e.currentTarget.dataset.tabid
      },
      success(res) {
        // console.log(res);
        if (res.data.code == 200) {
          that.setData({
            teaName: res.data.data
          })
        }

      }
    })
  },
  //跳转商品列表页
  goodslist: function(e) {
    // console.log(e);
    var teaid = e.currentTarget.dataset.teaid
    wx.navigateTo({
      url: '../goodslist/goodslist?teaid=' + teaid,
    })
    //商品列表接口
    // wx.request({
    //   url: app.globalData.appUrl + 'goods/index',
    //   method: 'POST',
    //   data: {
    //     tea_id: e.currentTarget.dataset.teaid
    //   },
    //   success(res) {
    //     console.log(res);
    //     if (res.data.code == 200) {
    //       //截取商品标题字符串
    //       // for (let item of res.data.data) {
    //       //   console.log(res.data.data);
    //       //   if (item.goods_title.length > 10) {
    //       //     let newTitle = item.goods_title.substr(0, 10);   //从0开始截取18个字符
    //       //     item.goods_title = newTitle + '...'
    //       //     console.log(item.goods_title);
    //       //   }
    //       // }
    //       that.setData({
    //         goodsList: res.data.data //setData设值
    //       })
    //       wx.setStorageSync('goodslistmore', that.data.goodsList); //data：拿值
    //       wx.navigateTo({
    //         url: '../goodslist/goodslist',
    //       })
    //     }
    //   }
    // })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    //分类列表接口
    wx.request({
      url: app.globalData.appUrl + 'category/index',
      method: 'POST',
      success(res) {
        // console.log(res)
        if (res.data.code == 200) {
          that.setData({
            categoryList: res.data.data
          })
        }
      }
    });
    //茶种接口列表
    wx.request({
      url: app.globalData.appUrl + 'tea/index',
      method: 'POST',
      data: {
        category_id: 1 //默认选择分类为1的
      },
      success(res) {
        // console.log(res);
        if (res.data.code == 200) {
          that.setData({
            teaName: res.data.data
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