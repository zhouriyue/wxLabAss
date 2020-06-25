const moment = require('../../lib/moment.min.js');
import {CustomizedScheduleFinder} from "../../services/customized/finder/customized-schedule-finder";

const app = getApp();

const customizedScheduleFinder = new CustomizedScheduleFinder();

Page({
    data: {},

    onLoad: function (e) {
        let creatTimeStamp = moment(new Date()).format('YYYY-MM-DD')
        customizedScheduleFinder.getScheduleLeaveAdmin(creatTimeStamp).subscribe((res) => {
            if (res.data && res.data.list && res.data.list.length > 0) {
                this.setData({leave: res.data.list});
            }
        })
    }

});
