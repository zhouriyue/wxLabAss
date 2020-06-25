import {CustomizedScheduleFinder} from "../../services/customized/finder/customized-schedule-finder";
const app = getApp()

const customizedScheduleFinder = new CustomizedScheduleFinder();
Page({

    data: {

    },

    onLoad: function (options) {
        customizedScheduleFinder.getScheduleObject(options.scheduleUid).subscribe((res)=>{
            if(res.data != null && res.data.value != null){
                this.setData({record:res.data.value})
            }
        })
    },

    onReady: function () {

    },


    onShow: function () {

    },

    onHide: function () {

    },
    onUnload: function () {

    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },

    onShareAppMessage: function () {

    }
})