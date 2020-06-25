import { ConstantService } from './services/constant-service'
import { CacheService } from './services/cache-service'
import { UtilService } from './services/util-service'

let constantService = new ConstantService()
let cacheService = new CacheService(constantService)
let utilService = new UtilService(constantService, cacheService)


let login = function(){
    wx.checkSession({
        success: function(){
            /*if(cacheService.getStorage(null,'JWT_TOKEN')==null){
                utilService.login()
            }else if(((new Date()).getTime() - cacheService.getStorageTime(null,'JWT_TOKEN')) > 43200000){ //超出12小时，只要有隐藏显示就强制登录
                utilService.login()
            }else {

            }*/
        },
        fail: function(){
            utilService.login()
        }
    })
}

App({
    data: {
        baseUrl: 'http://127.0.0.1:8081'
    },
    onLaunch: function (options) {
        cacheService.initStorage()
        let systemInfo = wx.getSystemInfoSync()
        if(systemInfo.SDKVersion < '1.7.0'){
            utilService.showModal('微信版本过低,请升级后使用')
        }
    },
    onShow: function () {
        //console.log('App Show')
        login()
    },
    onHide: function () {
        //console.log('App Hide')
    },
    globalData: {
    },
    services: {
        constantService: constantService,
        cacheService: cacheService,
        utilService: utilService
    }

});