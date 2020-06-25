const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        height:464,
        initHeight: false,
        showVideo: false
    },

    attached: function(){},
    ready: function(){
        if(this.data.value!=null && this.data.value.width!=null){
            let sysInfo = wx.getSystemInfoSync()
            this.setData({width: Math.floor(750 * this.data.value.width / sysInfo.windowWidth)})
        }else{
            this.setData({width: 750})
        }
    },
    moved: function(){},
    detached: function(){},

    methods: {
        onSwiperItemTap: function(e){
            if(e.currentTarget.dataset.url != null){
                if(e.currentTarget.dataset.url.startsWith('/pages')){
                    wx.navigateTo({
                        url: e.currentTarget.dataset.url
                    })
                }else{
                    wx.navigateTo({
                        url: app.services.utilService.joinUrl('/pages/cms/cms',{'cmsUid': e.currentTarget.dataset.url})
                    })
                }
            }
        },
        onImageLoad: function(e) {
            if(!this.data.initHeight){
                let width = e.detail.width
                let height = e.detail.height

                this.data.initHeight = true

                this.setData({height: Math.floor(this.data.width / width * height)})
            }
        },
        onPlay: function(e) {
        },
        onEnded: function(e) {
            this.setData({showVideo: false})
        },
        onPause: function(e) {
        },
        onVideoItemTap: function(e) {
            let item = this.data.value.imgUrls[e.currentTarget.dataset.index]
            this.setData({video: item, showVideo: true})
        },
        onTouchMove: function(e) {
            this.setData({showVideo: false})
        }
    }

})