import { CustomizedUserStudentFinder } from '../../services/customized/finder/customized-userstudent-finder.js'

const app = getApp();

const customizedUserStudenFinder = new CustomizedUserStudentFinder();

Page({

    data: {
        userStudent: []
    },
    onLoad:function(options){
        this.setData({userUid:options.userUid})
    },
    onShow:function(options){
        customizedUserStudenFinder.getAllUserStudent(this.data.userUid)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({ userStudent:res.data.list})
                }
            })
    },
    onShowStudent:function(e){
        wx.navigateTo({
            //url: app.services.utilService.joinUrl('/pages/personal-information-kids/personal-information-kids',{'userStudentUid':e.currentTarget.dataset.userStudentUid})
            url:'../class-record-show/class-record-show?userStudentUid='+e.currentTarget.dataset.userstudentuid+"&userParentUid="+e.currentTarget.dataset.userparentuid
        })
    }

});