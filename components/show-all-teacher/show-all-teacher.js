const app = getApp();

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        showFilter: false,
        sortItem: null,
        sortType: 'UP'
    },

    ready: function () {
    },
    moved: function () {
    },
    detached: function () {
    },

    methods: {

        onShowTeacher: function (e) {
            wx.navigateTo({
                url: '../show-all-teacher-kid/show-all-teacher-kid?name=' + e.currentTarget.dataset.name
            })
        },

        onSort: function (e) {
            let item = e.currentTarget.dataset.item;
            if (item == this.data.sortItem) {
                if (this.data.sortType == 'UP') {
                    this.setData({sortType: 'DOWN'})
                } else {
                    this.setData({sortType: 'UP'})
                }
            } else {
                this.setData({sortItem: item, sortType: 'UP'})
            }
            this.triggerEvent('componentevent', {
                action: 'SORT',
                value: {sortItem: this.data.sortItem, sortType: this.data.sortType}
            })
        }


    }

});