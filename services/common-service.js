import { CustomizedUserMutator } from './customized/mutator/customized-user-mutator'
import { WeixinMiniAppService } from './customized/weixin-mini-app-service'

const app = getApp()

export class CommonService{

    getUser(scope, callBack){
        let user = app.services.cacheService.getStorage(null,'USER')
        if(user!=null){
            scope.setData({user: user})
            if(callBack!=null){
                callBack(user)
            }
            return
        }
        let interval = setInterval(()=>{
            let user = app.services.cacheService.getStorage(null,'USER')
            if(user!=null){
                clearInterval(interval)
                scope.setData({user: user})
                if(callBack!=null){
                    callBack(user)
                }
            }
        },1000);
    }


    onShareCms(cmsCmsItems){
        let user = app.services.cacheService.getStorage(null,'USER')
        let path = 'pages/cms/cms?cmsUid=' + cmsCmsItems.cms.cmsUid + '&sharerUid='+user.userUid

        return {
            title: cmsCmsItems.cms.title,
            path: path,
            //imageUrl: app.services.constantService.FILE_URL + cmsCmsItems.cms.thumbUrlPath,
            success: (res)=> {
                wx.showToast({
                    title: "分享成功"
                })
            },
            fail: (res)=> {
                this.onShareFail(res)
            }
        }
    }

    onShareIndex(){
        let user = app.services.cacheService.getStorage(null,'USER')
        let path = 'pages/index/index?sharerUid='+user.userUid

        let ret = {
            title: '',
            path: path,
            success: (res)=> {
                wx.showToast({
                    title: "分享成功"
                })
            },
            fail: (res)=> {
                this.onShareFail(res)
            }
        }

        return ret
    }

    getUserInfoOK(res, callBack){

        let userInfo = res.userInfo
        let user = app.services.cacheService.getStorage(null,'USER')

        //只有在修改了数据情况下更新用户信息
        if(user.nickName!=userInfo.nickName || user.headImageUrl!=userInfo.avatarUrl || user.city!=userInfo.city){
            let customizedUserMutator = new CustomizedUserMutator()
            let user = {nickName: userInfo.nickName, gender: userInfo.gender.toString(), language:userInfo.language, cityName:userInfo.city, provinceName:userInfo.province, country:userInfo.country, headImageUrl: userInfo.avatarUrl}

            customizedUserMutator.modifyUser(user)
                .subscribe((res)=>{
                    app.services.cacheService.setStorage(null,'USER',res.data.value)
                    if(callBack!=null){
                        callBack(res.data.value)
                    }
                })
        }else{
            if(callBack!=null){
                callBack(user)
            }
        }
    }

    getAddressOK(callBack){
        wx.chooseAddress({
            success: (res)=> {
                let orderCustomerContact = {provinceName: res.provinceName ,cityName: res.cityName,districtName: res.countyName,addressDetail: res.detailInfo,postalCode:res.postalCode,name:res.userName,phone: res.telNumber};

                if(callBack!=null){
                    callBack(orderCustomerContact)
                }
            }
        })
    }

    getAddress(callBack){
        wx.getSetting({
            success: (res)=> {
                if (res.authSetting['scope.address']==null) {
                    wx.authorize({
                        scope: 'scope.address',
                        success:()=> {
                            this.getAddressOK(callBack)
                        }
                    })
                }else if(res.authSetting['scope.address']){
                    this.getAddressOK(callBack)
                }else{
                    wx.openSetting({
                        success: (res) => {
                            if(res.authSetting['scope.address']){
                                this.getAddressOK(callBack)
                            }
                        }
                    })
                }
            }
        })
    }

    getPhone(e, callBack){
        let phone = app.services.cacheService.getStorage(null,'PHONE')
        if(phone!=null){
            if(callBack!=null){
                callBack(phone)
            }
            return
        }

        const weixinMiniAppService = new WeixinMiniAppService()
        weixinMiniAppService.decrypt('phone', e.detail.encryptedData, e.detail.iv)
            .subscribe((res)=>{
                if(res.data != null && res.data.value != null){
                    let value = res.data.value
                    //console.log('parse result')
                    //console.log(JSON.stringify(value))
                    app.services.cacheService.setStorage(null,'PHONE',value.phone )
                    if(callBack!=null){
                        callBack(value.phone)
                    }
                }
            })

    }

    saveImageToPhotosAlbumOK(url){
        wx.downloadFile({
            url: url,
            success: (res)=>{
                if (res.statusCode === 200) {
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success:(res)=> {
                            wx.showToast({
                                title: "保存成功"
                            })
                        }
                    })
                }
            }
        })
    }
    saveImageToPhotosAlbum(url){
        wx.getSetting({
            success: (res)=> {
                if (res.authSetting['scope.writePhotosAlbum']==null) {
                    wx.authorize({
                        scope: 'scope.writePhotosAlbum',
                        success:()=> {
                            this.saveImageToPhotosAlbumOK(url)
                        }
                    })
                }else if(res.authSetting['scope.writePhotosAlbum']){
                    this.saveImageToPhotosAlbumOK(url)
                }else{
                    wx.openSetting({
                        success: (res) => {
                            if(res.authSetting['scope.writePhotosAlbum']){
                                this.saveImageToPhotosAlbumOK(url)
                            }
                        }
                    })
                }
            }
        })
    }

}