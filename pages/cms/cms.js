import { PublicCmsFinder } from '../../services/public/finder/public-cms-finder'
import { CommonService } from '../../services/common-service'

let wxParse = require('../../wxParse/wxParse.js');

const app = getApp()

const publicCmsFinder = new PublicCmsFinder()
const commonService = new CommonService()

Page({
    data: {
        showMore: true
    },
    onLoad: function(options) {
        if(options.sharerUid != null){
            this.setData({sharerUid: options.sharerUid })
        }

        if(options.cmsUid == null && options.title == null){
            app.services.utilService.toHomePage()
            return
        }

        if(options.showMore == 'N'){
            this.setData({showMore: false})
        }

        if(options.cmsUid != null){
            publicCmsFinder.getCmsObject(options.cmsUid, app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res)=>{
                    let cmsObject = res.data.value
                    if(cmsObject != null) {
                        this.setData({cmsObject: cmsObject});

                        if(cmsObject.content!=null) {
                            let that = this
                            wxParse.wxParse('article', 'html', cmsObject.content, that, 15)
                        }
                    }else{
                        wx.redirectTo({
                            url: '/pages/cms-group/cms-group'
                        })
                    }
                })
        }else{
            publicCmsFinder.getCmsObjectByTitle(options.title)
                .subscribe((res)=>{
                    let cmsObject = res.data.value
                    if(cmsObject != null) {
                        this.setData({cmsObject: cmsObject});

                        if(cmsObject.content!=null) {
                            let that = this
                            wxParse.wxParse('article', 'html', cmsObject.content, that, 15)
                        }
                    }else{
                        wx.redirectTo({
                            url: '/pages/cms-group/cms-group'
                        })
                    }
                })
        }

    },
    onAll: function(e){
        wx.switchTab({
            url: '/pages/cms-group/cms-group'
        })
    },
    onShareAppMessage: function (res) {
        return commonService.onShareCms(this.data.cmsCmsItems)
    },
    wxParseTagATap: function(e) {
        let href = e.currentTarget.dataset.src;
        app.services.utilService.wxParseTagATap(href)
    }
})