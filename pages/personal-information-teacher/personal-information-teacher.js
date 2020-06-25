import { CustomizedUserFinder } from '../../services/customized/finder/customized-user-finder.js'
import { CustomizedUserMutator } from '../../services/customized/mutator/customized-user-mutator.js'

const app = getApp()
const customizedUserFinder = new CustomizedUserFinder()
const customizedUserMutator = new CustomizedUserMutator()

Page({
    data: {

    },
    onLoad: function(options) {
        let today = new Date()
        let todayDate = app.services.utilService.getDate(today)
        this.setData({date: todayDate})
        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')
        this.setData({dictionaries: dictionaries})
        let genderList=["男","女"]
        this.setData({genderList: genderList})
        let genderindex=0
        customizedUserFinder.getUserObject(options.userTeacherUid)
            .subscribe((res)=>{
            if(res.data != null) {
                this.setData({userObject: res.data.value})
                if(this.data.userObject.gender=="男"){
                    genderindex=0
                }else{
                    genderindex=1
                }
                this.setData({genderindex: genderindex})
            }

        })
    },

    onDateChange:function(e){
        let value = e.detail.value
        this.data.userObject.userTeacherObject.visaTimestamp=value
        this.setData({userTeacherObject: this.data.userObject})
    },
    onNameInput:function(e){
        let value = e.detail.value
        this.data.userObject.name=value
        this.setData({userObject: this.data.userObject})
    },
    bindPickerChangeGender:function(e){
        let value = e.detail.value
        this.data.userObject.gender = this.data.genderList[value]
        this.setData({userObject:this.data. userObject})
        this.setData({
            genderindex: value
        })
    },
    onNativePlaceInput:function(e){
        let value = e.detail.value
        this.data.userObject.userTeacherObject.nativePlace=value
        this.setData({userObject: this.data.userObject})
    },
    onCurrentResidenceInput:function(e){
        let value = e.detail.value
        this.data.userObject.addressDetail=value
        this.setData({userObject: this.data.userObject})
    },
    onPhoneInput:function(e){
        let value = e.detail.value
        this.data.userObject.phone=value
        this.setData({userObject: this.data.userObject})
    },
    onEmailInput:function(e){
        let value = e.detail.value
        this.data.userObject.email=value
        this.setData({userObject: this.data.userObject})
    },
    onWorkExperienceInput:function(e){
        let value = e.detail.value
        this.data.userObject.userTeacherObject.workExperience=value
        this.setData({userObject: this.data.userObject})
    },
    onGraduateSchoolNameInput:function(e){
        let value = e.detail.value
        this.data.userObject.userTeacherObject.graduateSchoolName=value
        this.setData({userObject: this.data.userObject})
    },
    onSubmit: function(){
        if(this.data.userObject.phone!=null && this.data.userObject.phone!=""){
            let totalMinutes='0';
            let userTeacherObject = {
                nativePlace:this.data.userObject.userTeacherObject.nativePlace,
                visaTimestamp:app.services.utilService.getDateTimeStr(this.data.userObject.userTeacherObject.visaTimestamp),
                degreeCode:this.data.userObject.userTeacherObject.degreeCode,
                totalMinutes:totalMinutes,
                graduateSchoolName:this.data.userObject.userTeacherObject.graduateSchoolName,
                workExperience:this.data.userObject.userTeacherObject.workExperience}
            let userObject = {
                name:this.data.userObject.name,
                gender:this.data.userObject.gender,
                userTeacherObject:userTeacherObject,
                addressDetail:this.data.userObject.addressDetail,
                phone:this.data.userObject.phone,
                email:this.data.userObject.email
            }

            customizedUserMutator.modifyUserObject(userObject)
                .subscribe((res)=>{
                    wx.showToast({
                        title: "提交成功",
                        duration: 2000
                    })
                    setTimeout(()=>{
                        wx.navigateBack()
                    },2000)
                })
        }else{
        wx.showModal({
        title: "提示",
        content:"请务必输入正确电话"
        })
}

    }
})