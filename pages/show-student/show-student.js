import {CustomizedScheduleStudentMutator} from "../../services/customized/mutator/customized-schedulestudent-mutator";

const app = getApp()
const customizedScheduleStudentMutator = new CustomizedScheduleStudentMutator();

Page({
    data: {
    },
    onLoad: function(options) {
        this.setData({userStudentUid:options.userStudentUid})
        this.setData({scheduleUid:options.scheduleUid})
    },
    onCommentInput:function (e) {
        this.setData({leaveApplicationComment:e.detail.value})
    },
    onSubmit:function (e) {
        let scheduleStudentStatusCode = "LEAVE_APPLY"
        let scheduleStudent = {
            userStudentUid:this.data.userStudentUid,
            scheduleUid:this.data.scheduleUid,
            leaveApplicationComment:this.data.leaveApplicationComment,
            scheduleStudentStatusCode:scheduleStudentStatusCode}
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
})