// pages/lab-ass/add-rep-app/add-rep-app.js
var comm = require('../../../db/comm')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

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

  },
  addRepApp:function(event){
    var sysUser = wx.getStorageSync('sysUser');
    var repAppId = comm.wxuuid();
    let that = this;
    if(sysUser=='') {
      sysUser = {
        userId: 'zhouriyue'
      }
    }
    let {deviceId,deviceName,modelNumber,hitchDepict} = event.detail.value
    wx.request({
      method: "POST",
      dataType:'json',  
      headers:{  
        Accept:"application/json",  
        "Content-Type":"application/json"}, 
      data: JSON.stringify({repAppId:repAppId,deviceId:deviceId,deviceName:deviceName,modelNumber:modelNumber,hitchDepict:hitchDepict}),
      url: app.data.baseUrl+'/repApply_rest',
      success:function(res){
          wx.request({
            url: app.data.baseUrl+'/repairApply/updateRepAppIdAndUserId',
            method: 'POST',
            header: { 'content-type': 'application/x-www-form-urlencoded' },
            data: {repAppId:repAppId,userId:sysUser.userId},
            success:function(ress) {
             if(ress.data=='success'){
               wx.redirectTo({
                 url: "/pages/lab-ass/repair-apply/repair-apply"
               })
             }
            }
          })
      }
  })
  }
})