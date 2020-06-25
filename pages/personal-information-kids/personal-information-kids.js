import { CustomizedUserStudentFinder } from '../../services/customized/finder/customized-userstudent-finder.js'
import { CustomizedClassRoomFinder } from '../../services/customized/finder/customized-classroom-finder.js'
import { CustomizedUserStudentMutator } from '../../services/customized/mutator/customized-userstudent-mutator.js'

const app = getApp()

const customizedUserStudenFinder = new CustomizedUserStudentFinder()
const customizedClassRoomFinder = new CustomizedClassRoomFinder()
const customizedUserStudentMutator = new CustomizedUserStudentMutator()


Page({
    data: {

    },
    onLoad: function(options) {
        let today = new Date()
        let todayDate = app.services.utilService.getDate(today)
        this.setData({date: todayDate})
        let genderList=["男","女"]
        this.setData({genderList: genderList})
        let genderindex=0
        customizedUserStudenFinder.getOneUserStudent(options.userStudentUid)
            .subscribe((res)=>{
                console.log(res.data)
            if(res.data != null && res.data.value != null){

                    this.setData({'userStudent': res.data.value})
            if(this.data.userStudent.gender=="男"){
                    genderindex=0
                }else{
                    genderindex=1
                }
                this.setData({genderindex: genderindex})
            }
       })

        let classAddress=[]
        let index=0
        customizedClassRoomFinder.getAllClassRoom().subscribe((res)=>{
            console.log(res.data)
            if(res.data != null && res.data.list != null){
                for(var i=0;i<res.data.list.length;i++){
                    if(res.data.list[i].classRoomUid==this.data.userStudent.classRoomUid)
                        index=i
                    classAddress[i]=res.data.list[i].provinceName+ " "+res.data.list[i].cityName+ " "+res.data.list[i].districtName+ " "+res.data.list[i].addressDetail
                }
                this.setData({classAddress:classAddress,index:index,classRoomData:res.data.list })
            }
        })
    },
    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
    },
    onDateChange:function(e){
        let value = e.detail.value
        this.data.userStudent.birthDay = value
        this.setData({userStudent:this.data.userStudent})
    },
    onChineseNameInput: function(e){
        let value = e.detail.value
        this.data.userStudent.name = value
        this.setData({userStudent: this.data.userStudent})
    },
    onEnglishNameInput: function(e){
        let value = e.detail.value
        this.data.userStudent.englishName = value
        this.setData({userStudent: this.data.userStudent})
    },
    bindPickerChangeGender:function(e){
        let value = e.detail.value
        this.data.userStudent.gender = this.data.genderList[value]
        this.setData({userStudent:this.data. userStudent})
        this.setData({
            genderindex: value
        })
    },
    onAgeInput: function(e){
        let value = e.detail.value
        this.data.userStudent.age = value
        this.setData({userStudent: this.data.userStudent})
    },
    onSchollInput: function(e){
        let value = e.detail.value
        this.data.userStudent.schoolName = value
        this.setData({userStudent:this.data. userStudent})
    },
    onGradeInput: function(e){
        let value = e.detail.value
        this.data.userStudent.grade = value
        this.setData({userStudent:this.data.userStudent})
    },
    onDescriptionInput: function(e){
        let value = e.detail.value
        this.data.userStudent.description = value
        this.setData({userStudent: this.data.userStudent})
    },

    onSubmit: function(){

        let index=this.data.index
        let classRoomUid =this.data.classRoomData[index].classRoomUid
        console.log(classRoomUid)
        let userStudent = {name: this.data.userStudent.name, englishName: this.data.userStudent.englishName, gender: this.data.userStudent.gender,
            age:this.data.userStudent.age,schoolName:this.data.userStudent.schoolName,grade:this.data.userStudent.grade,description:this.data.userStudent.description,
            birthDay: app.services.utilService.getDateTimeStr(this.data.userStudent.birthDay),
            classRoomUid:classRoomUid
        }
        console.log(userStudent)
        if(userStudent.name!=null || userStudent.englishName!=null || userStudent.age!=null || userStudent.schoolName!=null || userStudent.grade || userStudent.description!=null){
            customizedUserStudentMutator.modifyUserStudent(userStudent)
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
                content:"请将信息填写完整"
            })
        }


    },

})