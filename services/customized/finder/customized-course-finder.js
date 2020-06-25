import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedCourseFinder {

    subject = 'Course'

    getAllCourse( localCacheIndicator) {

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedCourseFinder/getAllCourse')

        let key = JSON.stringify({service:'customizedCourseFinder', method:'getAllCourse'})

        let header = { 'Accept': 'application/json' ,'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')}

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService

    }
}