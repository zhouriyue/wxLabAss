import { CommonService } from '../../services/common-service'
import { UserWebservice } from '../../services/customized/user-web-service'
var db = require('../../db/db')
const app = getApp()

const commonService = new CommonService()
const userWebservice = new UserWebservice()

Page({
    data: {
        sysUser: '',
        userRole: '',
        roleMenu: '',
        img:[
            {url:"../../image/jiazhang.png"},
            {url:"../../image/kid.png"},
            {url:"../../image/schedule.png"},
            {url:"../../image/record.png"},
            {url:"../../image/laoshi.png"},
            {url:"../../image/schedule.png"},]
    },
    onLoad: function(options) {
        var user = db.getSysUser();
        let that = this;
        that.setData({
            sysUser: user
        })
    },
    onShow: function() {
        var user = db.getSysUser();
        var text;
        let that = this;
        that.setData({
            sysUser: user
        })
        if(that.data.sysUser!=null) {
            wx.request({
                method: "GET",
                url: app.data.baseUrl+'/userRole_rest/search/userId?userId='+that.data.sysUser.userId,
                success:function(res){
                    that.setData({
                        userRole: res.data
                    })
                    console.log(res.data)
                    wx.request({
                        method: "GET",
                        url: app.data.baseUrl+'/roleMenu_rest/search/roleId?roleId='+res.data.roleId,
                        success:function(ress){
                            console.log(ress.data._embedded.roleMenus)
                            that.setData({
                                roleMenu: ress.data._embedded.roleMenus
                            })
                        }
                    })
                }
            })
        }
    },
    onSysUser: function(e){
        wx.navigateTo({
            url: '/pages/login/login'
        })
    },
    onMenuMethod: function(e) {
       switch(e.currentTarget.dataset.menumethod) {
           case '维修申报':{
               wx.navigateTo({
                 url: '/pages/lab-ass/repair-apply/repair-apply',
               })
           };break;
           case '系统管理':{
            console.log('系统管理')
           };break;
           case '工作内容':{
            console.log('工作内容')
           };break;
       }
    }
});