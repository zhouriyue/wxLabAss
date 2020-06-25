
var app = getApp();
var db=require('../../db/db')

Page({
  data:{
  },
  onLoad:function(options){
   
  },
  onReady:function(){
    
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },

  loginBtnClick:function (event){
    let {userId,userPwd} = event.detail.value
    console.log(app.data.baseUrl)
    wx.request({
      url: app.data.baseUrl+'/sysUser/wxCheckSysUser',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {userId:userId,userPwd:userPwd},
      success:function(res) {
       if(res.data!='') {
         wx.setStorageSync('sysUser', res.data);
         wx.showToast({
           icon: 'success',
           title: '登录成功！',
           duration: 1500
         })
         wx.switchTab({
           url: '/pages/my/my',
         })
       } else {
        wx.showToast({
          icon: 'none',
          title: '用户名或密码错误！',
          duration: 1000
        })
       }
      }
    })
  },
})