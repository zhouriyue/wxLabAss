const moment = require('../../lib/moment.min.js');

const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
    },

    attached: function () {
    },
    moved: function () {
    },
    detached: function () {
    },
    ready: function () {

        // var that = this;
        // setTimeout(function () {
        //     console.log("this.properties.value------------------");
        //     console.log(JSON.stringify(that.data.value, null, 4));
        // }, 2000);

    },

    methods: {
        onSchedule: function (e) {
            wx.navigateTo({
                url: '../class-record-show-detail/class-record-show-detail?scheduleUid=' + e.currentTarget.dataset.scheduleuid+"&userStudentUid="+e.currentTarget.dataset.userstudentuid
            })
        }

    }


});