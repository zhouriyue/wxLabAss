import { CustomizedScheduleStudentMutator } from '../../services/customized/mutator/customized-schedulestudent-mutator'
const app = getApp()
const customizedScheduleStudentMutator = new CustomizedScheduleStudentMutator();
Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data:{
        isStudentLeaveData:[]
    },
    ready:function(){
        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')
        this.setData({dictionaries: dictionaries})
    },
    attached: function(){},
    moved: function(){},
    detached: function(){},

    methods: {
        onTure:function (e) {
            var teacherIndex=e.currentTarget.dataset.teacherindex
            var index=e.currentTarget.dataset.index
            let userStudentUid = e.currentTarget.dataset.userstudentuid
            let leaveApplicationReply = "同意"
            let scheduleStudentStatusCode = "LEAVE_APPROVE"
            let scheduleStudent = {userStudentUid:userStudentUid,scheduleUid:this.data.value[teacherIndex].scheduleUid,leaveApplicationReply: leaveApplicationReply, scheduleStudentStatusCode:scheduleStudentStatusCode}
            customizedScheduleStudentMutator.modifyScheduleStudentLeave(scheduleStudent)
                .subscribe((res)=>{
                    wx.showToast({
                        title: "提交成功",
                        duration: 2000
                    })
                    setTimeout(()=>{
                        wx.navigateBack()
                    },2000)
                })
            },
        onFalse:function (e) {
            var teacherIndex=e.currentTarget.dataset.teacherindex
            var index=e.currentTarget.dataset.index
            let userStudentUid = e.currentTarget.dataset.userstudentuid
            let leaveApplicationReply = "不同意"
            let scheduleStudentStatusCode = "LEAVE_REJECT"
            let scheduleStudent = {userStudentUid:userStudentUid,scheduleUid:this.data.value[teacherIndex].scheduleUid,leaveApplicationReply: leaveApplicationReply, scheduleStudentStatusCode:scheduleStudentStatusCode}
            customizedScheduleStudentMutator.modifyScheduleStudentLeave(scheduleStudent)
                .subscribe((res)=>{
                    wx.showToast({
                        title: "提交成功",
                        duration: 2000
                    })
                    setTimeout(()=>{
                        wx.navigateBack()
                    },2000)
                })
        }
    }

})