import { PublicSlideShowFinder } from '../../services/public/finder/public-slide-show-finder'
import { CommonService } from '../../services/common-service'
import {PublicScheduleFinder} from "../../services/public/finder/public-schedule-finder";
import {PublicCmsGroupFinder} from "../../services/public/finder/public-cms-group-finder";
const moment = require('../../lib/moment.min.js');

const app = getApp();

const publicCmsGroupFinder = new PublicCmsGroupFinder()
const publicSlideShowFinder = new PublicSlideShowFinder();
const commonService = new CommonService();
const publicScheduleFinder = new PublicScheduleFinder();

Page({
    data: {

    },
    onLoad: function(options) {
        let sysInfo = wx.getSystemInfoSync()
        this.setData({height: sysInfo.windowHeight})

        publicCmsGroupFinder.getAllCmsGroup(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data.list!=null){
                    for(let i=0;i<res.data.list.length;i++){
                        res.data.list[i].id = i
                    }
                }
                this.setData({list: res.data.list});
                this.setData({maxId: 'maxId'});
            })

        if(options.sharerUid != null){
        }else if(options.scene != null){
            let scene = decodeURIComponent(options.scene)
        }

        publicSlideShowFinder.getSlideShowObjectCopyByName('首页', app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.value != null){
                    this.setData({'appSwiper_0':
                        { indicatorDots:true, autoplay:true, interval:5000, duration:500,
                            imgUrls:app.services.utilService.mapSlideShowPicture(res.data.value),
                            thumbnailSuffix:'_750_0' }})
                }
            })
    },
    onShareAppMessage: function (res) {
        return commonService.onShareIndex()
    },
    onGetCode:function(e){
        let creatTimeStamp = e.detail.sortItem;
        publicScheduleFinder.getOneDaySchedule(creatTimeStamp).subscribe((res)=>{
            if(res.data != null && res.data.list != null){
                this.setData({schedule:res.data.list })
            }
        })
    },
    onImageLoad: function(e){
        this.setData({maxId: 'maxId'});
    },
    onItemTap: function(e) {
        if(e.currentTarget.dataset.cmsuid != null){
            wx.navigateTo({
                url: app.services.utilService.joinUrl('/pages/cms/cms',{'cmsUid': e.currentTarget.dataset.cmsuid})
            })
        }
    },
    clickToRedirect: function () {
        wx.navigateTo({
            url: '/pages/cms/cms?title='+"咨询&showMore=N"
        })
    },
    clickIntroduction:function () {
        wx.navigateTo({
            url: '/pages/cms/cms?title='+"简介&showMore=N"
        })
    },
    clickAppointment:function () {
        wx.navigateTo({
            url: '/pages/cms/cms?title='+"预约&showMore=N"
        })
    },
    clickCommodity:function () {
        wx.navigateTo({
            url: '/pages/cms/cms?title='+"商品&showMore=N"
        })
    },
});