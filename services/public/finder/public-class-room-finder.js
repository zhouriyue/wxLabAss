import { HttpService } from '../../http-service'

const app = getApp()

export class PublicClassRoomFinder{
    subject = 'ClassRoom'

    getAllClassRoom(localCacheIndicator){
        let url = app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicClassRoomFinder/getAllClassRoom'

        let key = JSON.stringify({service:'publicClassRoomFinder', method:'getAllClassRoom'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

}