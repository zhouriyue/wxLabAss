const app = getApp();

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        showFilter:false,
        sortItem: null,
        sortType: 'UP'
    },


    ready: function(){},
    moved: function(){},
    detached: function(){},

    methods: {

        onShowStudent:function(e){
            wx.navigateTo({
                url:'../show-all-student-kid/show-all-student-kid?userStudentUid='+e.currentTarget.dataset.userstudentuid
            })
        },

        onSort: function(e){
            let item = e.currentTarget.dataset.item;
            if(item == this.data.sortItem){
                if(this.data.sortType == 'UP'){
                    this.setData({sortType: 'DOWN'})
                }else{
                    this.setData({sortType: 'UP'})
                }
            }else{
                this.setData({sortItem: item, sortType: 'UP'})
            }
            this.triggerEvent('componentevent', {action: 'SORT', value:{sortItem:this.data.sortItem, sortType:this.data.sortType}})
        }
    }

});