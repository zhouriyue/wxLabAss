const moment = require('../../lib/moment.min.js');
import {CustomizedScheduleFinder} from "../../services/customized/finder/customized-schedule-finder";

const app = getApp()
const customizedScheduleFinder = new CustomizedScheduleFinder()

Page({
    data: {

    },
    onLoad: function(options) {

        let user = app.services.cacheService.getStorage(null, 'USER')

        let creatTimeStamp = moment(new Date()).format('YYYY-MM-DD')

        customizedScheduleFinder.getOneDayScheduleByTeacher(user.userUid, creatTimeStamp).subscribe((res) => {
            if (res.data != null && res.data.list != null) {
                this.setData({schedule: res.data.list});
            }
        })
    },


})