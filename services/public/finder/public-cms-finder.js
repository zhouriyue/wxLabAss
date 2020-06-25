import { HttpService } from '../../http-service'

const app = getApp()

export class PublicCmsFinder{
    subject = 'Cms'
    getCmsByTitle(title, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCmsFinder/getCmsByTitle',
            {title: title})

        let key = JSON.stringify({service:'publicCmsFinder', method:'getCmsByTitle', title: title})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    getCmsObject(cmsUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCmsFinder/getCmsObject',
            {cmsUid: cmsUid})

        let key = JSON.stringify({service:'publicCmsFinder', method:'getCmsObject', cmsUid: cmsUid})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getCmsObjectByTitle(title,localCacheIndicator){
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCmsFinder/getCmsObjectByTitle',
            {title: title})

        let key = JSON.stringify({service:'publicCmsFinder', method:'getCmsObjectByTitle', title: title})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
         httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

}