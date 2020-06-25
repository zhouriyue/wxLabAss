import {CustomizedScheduleMutator} from "../../services/customized/mutator/customized-schedule-mutator";

const app = getApp()
const customizedScheduleMutator = new  CustomizedScheduleMutator();
Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {},
    attached: function(){},
    moved: function(){},
    detached: function(){},
    ready:function(){
        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')
        this.setData({dictionaries: dictionaries})
    },
    methods: {
        onPunchCard:function(e){
            if((new Date()).getTime() < (new Date(this.data.value.fromTimestamp)).getTime()){
                wx.showModal({
                    title: "Prompt",
                    content: "There's no time to hit the card！"
                })
                return
            }
            if (e.currentTarget.dataset.code!=""){
                let scheduleStatusCode="FINISHED"
                customizedScheduleMutator.modifyScheduleObjectByStudentCard(e.currentTarget.dataset.scheduleuid,e.currentTarget.dataset.userstudentuid,scheduleStatusCode).subscribe((res)=>{
                    wx.showToast({
                        title: "提交成功",
                        duration: 2000
                    })
                    setTimeout(()=>{
                        wx.navigateBack()
                    },2000)
                })
            } else {
                wx.showModal({
                    title: "提示",
                    content: "该学生处于请假状态！"
                })
            }
        },
        onSchedule:function (e) {
            wx.navigateTo({
                url: '../teacher-manage-students-estimate/teacher-manage-students-estimate?scheduleUid=' + e.currentTarget.dataset.scheduleuid+"&userStudentUid="+e.currentTarget.dataset.userstudentuid+"&userParentUid="+e.currentTarget.dataset.userparentuid
            })

        }
    }

})