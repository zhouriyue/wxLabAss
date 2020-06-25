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
        },
        onSchedule:function (e) {
            wx.navigateTo({
                url: '../class-record-show-detail/class-record-show-detail?scheduleUid=' + e.currentTarget.dataset.scheduleuid+"&userStudentUid="+e.currentTarget.dataset.userstudentuid
            })

        }
    }

})