import { HttpService } from '../../http-service'

const app = getApp()

export class PublicScheduleFinder {

    subject = 'schedule'

    getOneDaySchedule(creatTimeStamp, localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicScheduleFinder/getOneDaySchedule',
            {creatTimeStamp: creatTimeStamp})

        let key = JSON.stringify({service:'publicScheduleFinder', method:'getOneDaySchedule', creatTimeStamp:creatTimeStamp})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService

    }
}