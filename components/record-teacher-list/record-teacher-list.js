import {PublicCourseTypeFinder} from "../../services/public/finder/public-course-type-finder";
import {CustomizedScheduleMutator} from "../../services/customized/mutator/customized-schedule-mutator";
const moment = require('../../lib/moment.min.js');


const app = getApp();
const customizedScheduleMutator = new CustomizedScheduleMutator();
const publicCourseTypeFinder = new PublicCourseTypeFinder();
Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        listData: []
    },

    attached: function () {
    },
    moved: function () {
    },
    detached: function () {
    },
    ready: function () {
        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')
        this.setData({dictionaries: dictionaries})
        publicCourseTypeFinder.getAllCourse().subscribe((res) => {
            if (res.data != null && res.data.list != null) {
                this.setData({courseList: res.data.list})
            }
        })
        this.setData({
            listData: this.data.value
        });

        // 转换时间格式，格林尼标准时间（GMT）转换为标准时间格式
        for (var i = 0; i < this.data.listData.length; i++) {
            var haveAClassDateStr = 'listData[' + i + '].haveAClassDate';
            var fromTimestampStr = 'listData[' + i + '].fromTimestamp';
            var toTimestampStr = 'listData[' + i + '].toTimestamp';
            this.setData({
                [haveAClassDateStr]: moment(this.data.listData[i].fromTimestamp).format('YYYY-MM-DD HH:mm').split(" ")[0],
                [fromTimestampStr]: moment(this.data.listData[i].fromTimestamp).format('YYYY-MM-DD HH:mm').split(" ")[1],
                [toTimestampStr]: moment(this.data.listData[i].toTimestamp).format('YYYY-MM-DD HH:mm').split(" ")[1]
            });
        }

    },

    methods: {

        CompareDate: function (t1, t2) {
            var date = new Date();
            var a = t1.split(":");
            var b = t2.split(":");
            return date.setHours(a[0], a[1]) <= date.setHours(b[0], b[1]);
        },

        onPunchCard: function (e) {

            if (this.CompareDate(e.currentTarget.dataset.time,moment(new Date()).format('HH:mm'))) {
                let less = {
                    scheduleUid: e.currentTarget.dataset.scheduleuid,
                    scheduleStatusCode: "FINISHED"
                }
                customizedScheduleMutator.modifyScheduleObjectByCard(less).subscribe((res) => {
                    wx.showToast({
                        title: "提交成功",
                        duration: 2000
                    })
                    setTimeout(() => {
                        wx.navigateBack()
                    }, 2000)
                })
            } else {
                wx.showModal({
                    title: "Prompt",
                    content: "There's no time to hit the card！"
                })
            }
        },
        onManageDetail: function (e) {
            wx.navigateTo({
                url: '../teacher-manage-students-detail/teacher-manage-students-detail?scheduleUid=' + e.currentTarget.dataset.scheduleuid + "&time=" + e.currentTarget.dataset.time
            })
        }
    }

});