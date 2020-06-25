const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        totalTime: ""
    },

    ready: function () {
        this.setData({index:0})
    },
    attached: function () {
    },
    moved: function () {
    },
    detached: function () {
    },

    methods: {
        onSchedule: function (e) {
            wx.navigateTo({
                url: '../personal-information-kids-detail/personal-information-kids-detail?scheduleUid=' + e.currentTarget.dataset.scheduleuid
            })
        }
    }

});