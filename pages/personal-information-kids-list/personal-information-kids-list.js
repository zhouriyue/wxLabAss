import { CustomizedUserStudentFinder } from '../../services/customized/finder/customized-userstudent-finder.js'

const app = getApp()

const customizedUserStudenFinder = new CustomizedUserStudentFinder()


Page({

    data: {

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
             url:'../personal-information-kids/personal-information-kids?userStudentUid='+e.currentTarget.dataset.userstudentuid
        })
    },
    onAddStudent:function(e){
        wx.navigateTo({
            url: '../personal-information-kids-add/personal-information-kids-add'
        })
    },
    onDateChange:function(e){
        this.setData({birthDay: e.detail.value})
    },
    onChineseNameInput: function(e){
        let value = e.detail.value
        this.setData({name: value})
    },
    onEnglishNameInput: function(e){
        let value = e.detail.value
        this.setData({englishName: value})
    },

    onSexInput: function(e){
        let value = e.detail.value
        this.setData({gender: value})
    },
    onAgeInput: function(e){
        let value = e.detail.value
        this.setData({age: value})
    },
    onSchollInput: function(e){
        let value = e.detail.value
        this.setData({schoolName: value})
    },
    onGradeInput: function(e){
        let value = e.detail.value
        this.setData({grade: value})
    },
    onDescriptionInput: function(e){
        let value = e.detail.value
        this.setData({description: value})
    },

})