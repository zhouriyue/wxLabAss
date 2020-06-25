import {CustomizedScheduleFinder} from "../../services/customized/finder/customized-schedule-finder";
import {CustomizedClassRoomFinder} from '../../services/customized/finder/customized-classroom-finder.js'
const moment = require('../../lib/moment.min.js');

const app = getApp();

const customizedScheduleFinder = new CustomizedScheduleFinder();
const customizedClassRoomFinder = new CustomizedClassRoomFinder();

Page({

    data: {
        classAddressData: null,
        Schedule: null
    },

    onLoad: function (options) {
        let classAddress = [];
        customizedClassRoomFinder.getAllClassRoom().subscribe((res) => {
            if (res.data && res.data.list) {
                for (var i = 0; i < res.data.list.length; i++) {
                    classAddress[i] = res.data.list[i].provinceName + " " + res.data.list[i].cityName + " " + res.data.list[i].districtName + " " + res.data.list[i].addressDetail
                }
                this.setData({classAddressData: classAddress, index: 0, classRoomData: res.data.list})
            }
        })
    },

    // 获取课表数据
    getScheduleData: function (e) {

        this.setData({Schedule: null});

        var creatTimeStamp;

        if (e == undefined) creatTimeStamp = this.data.creatTimeStamp;
        else {
            creatTimeStamp = e.detail.sortItem;
            this.setData({
                creatTimeStamp: creatTimeStamp
            })
        }
        let index = this.data.index;
        if (index == null) index = 0;

        customizedClassRoomFinder.getAllClassRoom().subscribe((res) => {
            if (res.data && res.data.list) {
                customizedScheduleFinder.getOneDayScheduleByAdmin(this.data.classRoomData[index].classRoomUid, creatTimeStamp).subscribe((res1) => {
                    console.log(res1.data);
                    if (res1.data && res1.data.list) {
                        this.setData({Schedule: res1.data.list})
                    }
                })
            }
        })
    },

    bindPickerChange: function (e) {
        this.setData({
            index: e.detail.value
        });
        this.getScheduleData()
    }

});