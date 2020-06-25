import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedClassRoomFinder {

    subject = 'ClassRoom'

    getAllClassRoom( localCacheIndicator) {

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedClassRoomFinder/getAllClassRoom')

        let key = JSON.stringify({service:'customizedClassRoomFinder', method:'getAllClassRoom'})

        let header = { 'Accept': 'application/json' ,'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')}

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService

    }
}