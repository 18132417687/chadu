// pages/article/article.js
const app = getApp()
let that;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabIndex: 1,
    articleList: [],
    pages: 1
  },

  //导航切换
  studyTeaCategory: function(e) {
    that = this;
    // console.log(e);
    //学茶 文章、视频分类切换
    that.setData({
        tabIndex: e.currentTarget.dataset.tabid
      }),
      //文章列表接口
      wx.request({
        url: app.globalData.appUrl + 'article/index?page=1',
        method: 'POST',
        data: {
          study_id: e.currentTarget.dataset.tabid
        },
        success(res) {
          if (res.data.code == 200) {
            console.log(res);
            that.setData({
              articleList: res.data.data.data
            })
          }
        }
      })
    //视频列表接口
    wx.request({
      url: app.globalData.appUrl + 'video/index?page=1',
      method: 'POST',
      data: {
        study_id: e.currentTarget.dataset.tabid
      },
      success(res) {
        if (res.data.code == 200) {
          // console.log(res);
          that.setData({
            videoList: res.data.data.data
          })
        }
      }
    })

    // console.log(e);
  },
  //文章详情页跳转
  articledetail: function(e) {
    console.log(e);
    var articleid = e.currentTarget.dataset.articleid
    console.log(articleid)
    wx.navigateTo({
      url: '../articledetail/articledetail?articleid=' + articleid,
    })
    //文章、视频详情接口
    // wx.request({
    //   url: app.globalData.appUrl + 'articleinfo/index',
    //   method: 'POST',
    //   data: {
    //     article_id: e.currentTarget.dataset.articleid
    //   },
    //   success(res) {
    //     console.log(res);
    //     that.setData({
    //       articleDetail: res.data.data //设置值
    //     })
    //     wx.setStorageSync('articledetail', that.data.articleDetail) //拿值
    //     wx.navigateTo({
    //       url: '../articledetail/articledetail',
    //     })
    //   }
    // })

  },
  //视频详情页跳转
  videodetail: function(e) {
    console.log(e)
    var videoid = e.currentTarget.dataset.videoid
    console.log(videoid)
    wx.navigateTo({
      url: '../videodetail/videodetail?videoid=' + videoid,
    })
    // wx.request({
    //   url: app.globalData.appUrl + 'videoinfo/index',
    //   method: 'POST',
    //   data: {
    //     video_id: e.currentTarget.dataset.videoid
    //   },
    //   success(res) {
    //     console.log(res);
    //     that.setData({
    //       videoDetail: res.data.data //设置值
    //     })
    //     wx.setStorageSync('videodetail', that.data.videoDetail) //拿值
    //     wx.navigateTo({
    //       url: '../videodetail/videodetail',
    //     })
    //   }
    // })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this;
    //页面正在加载
    wx.showLoading({
        title: '正在加载！',
        mask: true,
        duration: 1500
      }),
      //学茶 文章、视频分类接口
      wx.request({
        url: app.globalData.appUrl + 'study/index',
        method: 'POST',
        success(res) {
          // console.log(res);
          if (res.data.code == 200) {
            that.setData({
              articleCategory: res.data.data
            })
          }
        }

      }),
      //文章列表接口
      wx.request({
        url: app.globalData.appUrl + 'article/index?page=1',
        method: 'POST',
        data: {
          study_id: 1
        },
        success(res) {
          if (res.data.code == 200) {
            console.log(res);
            that.setData({
              articleList: res.data.data.data
            })
            wx.hideLoading()
          }
        }
      })
    //视频列表接口
    wx.request({
      url: app.globalData.appUrl + 'video/index?page=1',
      method: 'POST',
      data: {
        study_id: 2
      },
      success(res) {
        if (res.data.code == 200) {
          // console.log(res);
          that.setData({
            videoList: res.data.data.data
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
    //页面正在加载
    wx.showLoading({
      title: '正在加载！',
      mask: true,
      duration: 1500
    })
    //文章列表接口
    wx.request({
      url: app.globalData.appUrl + 'article/index?page=1',
      method: 'POST',
      data: {
        study_id: 1
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res);
          that.setData({
            articleList: res.data.data.data
          })
          wx.hideLoading()
        }
      }
    })
    //视频列表接口
    wx.request({
      url: app.globalData.appUrl + 'video/index?page=1',
      method: 'POST',
      data: {
        study_id: 2
      },
      success(res) {
        if (res.data.code == 200) {
          // console.log(res);
          that.setData({
            videoList: res.data.data.data
          })
        }
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
    console.log(111)
    wx.showLoading({
      title: '正在加载!',
      mask: true,
      duration: 1000
    })
    // //文章列表接口
    wx.request({
      url: app.globalData.appUrl + 'article/index?page=1',
      method: 'POST',
      data: {
        study_id: 1
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res);
          that.setData({
            articleList: res.data.data.data
          })
          //停止当前页面下拉刷新
          wx.stopPullDownRefresh();
          wx.hideLoading();
        }
      }
    })
    // //文章列表接口
    wx.request({
      url: app.globalData.appUrl + 'video/index?page=1',
      method: 'POST',
      data: {
        study_id: 2
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res);
          that.setData({
            videoList: res.data.data.data
          })
          //停止当前页面下拉刷新
          wx.stopPullDownRefresh();
          wx.hideLoading();
        }
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    console.log(88888888)
    wx.showLoading({
      title: '正在加载数据',
      mask: true
    })
    that.data.pages = that.data.pages + 1;
    //文章列表接口
    wx.request({
      url: app.globalData.appUrl + 'article/index?page=' + that.data.pages,
      method: 'POST',
      data: {
        study_id: 1
      },
      success(res) {
        if (res.data.code == 200) {
          for (let item of res.data.data.data) {
            that.data.articleList.push(item)
          }
          wx.hideLoading()
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '已经到低啦！',
            icon: 'none'
          })
        }
      }
    });
    //视频列表接口
    wx.request({
      url: app.globalData.appUrl + 'video/index?page=' + that.data.pages,
      method: 'POST',
      data: {
        study_id: 2
      },
      success(res) {
        if (res.data.code == 200) {
          for (let item of res.data.data.data) {
            that.data.videoList.push(item)
          }
          wx.hideLoading()
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '已经到低啦！',
            icon: 'none'
          })
        }
      }
    });
    that.setData({
      articleList: that.data.articleList,
      videoList: that.data.videoList
    })
    console.log(that.data.articleList)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})