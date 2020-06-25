// pages/lab-ass/repair-apply/repair-apply.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    workContents:[],
    ets:[{
      name: 'zhou',
      city: 'gx',
      gender: '男',
      age: '18'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var sysUser = wx.getStorageSync('sysUser');
    let that = this;
    if(sysUser=='') {
      sysUser = {
        userId: 'zhouriyue'
      }
    }
    wx.request({
      method: "GET",
      url: app.data.baseUrl+'/workContent_rest/search/userId?userId='+sysUser.userId,
      success:function(ress){
          console.log(ress.data._embedded)
          that.setData({
            workContents: ress.data._embedded.workContents
          })
      }
  })
  },
  addWorkContent:function() {
    wx.navigateTo({
      url: '/pages/lab-ass/add-rep-app/add-rep-app',
    })
  }
  ,
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})