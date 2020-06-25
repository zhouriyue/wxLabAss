
const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
    },

    attached: function(){},
    ready: function(){
    },
    moved: function(){},
    detached: function(){},

    methods: {
        onUserInfo: function(e){
            this.setData({'value.show': false})
            this.triggerEvent('authorizeevent', e.detail)
        }
    }

})