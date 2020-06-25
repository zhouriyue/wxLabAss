import { CustomizedUserFinder } from '../../services/customized/finder/customized-user-finder.js'
import { CustomizedClassRoomFinder } from '../../services/customized/finder/customized-classroom-finder.js'
import { CustomizedUserStudentMutator } from '../../services/customized/mutator/customized-userstudent-mutator.js'

const app = getApp()

const customizedUserFinder = new CustomizedUserFinder()
const customizedClassRoomFinder = new CustomizedClassRoomFinder()
const customizedUserStudentMutator = new CustomizedUserStudentMutator()


Page({
    data: {

    },
    onLoad: function(options) {
        let today = new Date()
        let todayDate = app.services.utilService.getDate(today)
        let genderList=["男","女"]
        this.setData({genderList: genderList})
        let genderindex=0
        this.setData({genderindex: genderindex})
        this.setData({date: todayDate})
        this.setData({gender: "男"})
        let classAddress=[]
        customizedClassRoomFinder.getAllClassRoom().subscribe((res)=>{
            console.log(res.data)
            if(res.data != null && res.data.list != null){
                for(var i=0;i<res.data.list.length;i++){
                    classAddress[i]=res.data.list[i].provinceName+ " "+res.data.list[i].cityName+ " "+res.data.list[i].districtName+ " "+res.data.list[i].addressDetail
                }
                this.setData({classAddress:classAddress,index:0,classRoomData:res.data.list })
            }
        })

    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
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
    bindPickerChangeGender:function(e){
        let value = e.detail.value
        this.setData({gender: this.data.genderList[value]})
        this.setData({
            genderindex: value
        })
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

    onSubmit: function(){
        let index=this.data.index
        let classRoomUid =this.data.classRoomData[index].classRoomUid
        let userStudent = {name: this.data.name, englishName: this.data.englishName, gender: this.data.gender,
            age:this.data.age,schoolName:this.data.schoolName,grade:this.data.grade,description:this.data.description,
            birthDay: app.services.utilService.getDateTimeStr(this.data.birthDay),
            classRoomUid:classRoomUid
        }
        console.log(userStudent)
        this.setData({disabled: true})
        if(userStudent.name!=null || userStudent.englishName!=null || userStudent.age!=null || userStudent.schoolName!=null || userStudent.grade || userStudent.description!=null){
            customizedUserStudentMutator.addUserStudent(userStudent).subscribe((res)=>{
                wx.showToast({
                    title: "提交成功",
                    duration: 2000
                })
                setTimeout(()=>{
                    wx.navigateBack()
                },2000)
            },()=>{
            this.setData({disabled: false})
        })
    }else{
        wx.showModal({
        title: "提示",
        content:"请将信息填写完整"
    })
}
    },


})