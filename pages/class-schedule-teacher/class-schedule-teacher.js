import {CustomizedScheduleFinder} from "../../services/customized/finder/customized-schedule-finder";
const moment = require('../../lib/moment.min.js');

const app = getApp();

const customizedScheduleFinder = new CustomizedScheduleFinder();

Page({
    data: {
        schedule: null
    },
    onLoad: function (options) {
        this.setData({userTeacherUid: options.userTeacherUid})
    },
    onGetCode: function (e) {

        // 保证传入组件的数据变化时，可以重新加载组件，触发其ready生命周期
        this.setData({
            schedule: null
        });
        let creatTimeStamp = e.detail.sortItem;
        customizedScheduleFinder.getOneDayScheduleByTeacher(this.data.userTeacherUid, creatTimeStamp).subscribe((res) => {
            if (res.data != null && res.data.list != null) {
                this.setData({schedule: res.data.list});
            }
        })
    }
});