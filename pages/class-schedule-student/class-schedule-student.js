import {CustomizedScheduleFinder} from "../../services/customized/finder/customized-schedule-finder";
const moment = require('../../lib/moment.min.js');

const app = getApp()

const customizedScheduleFinder = new CustomizedScheduleFinder()

Page({
    data: {

    },
    onLoad: function(options) {
        this.setData({userStudentUid :options.userStudentUid})
    },
    onGetCode:function(e){
        let creatTimeStamp = e.detail.sortItem
        let userStudentUid = this.data.userStudentUid
        customizedScheduleFinder.getOneDayScheduleByStudent(userStudentUid,creatTimeStamp).subscribe((res)=>{
            if(res.data != null && res.data.list != null){
                this.setData({StudentSchedule:res.data.list })
            }
        })
    }
})