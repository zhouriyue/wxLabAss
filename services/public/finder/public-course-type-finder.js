import { HttpService } from '../../http-service'

const app = getApp()

export class PublicCourseTypeFinder{
    subject = 'CourseType'

    getAllCourse(localCacheIndicator){
        let url = app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCourseTypeFinder/getAllCourse'

        let key = JSON.stringify({service:'publicCourseTypeFinder', method:'getAllCourse'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }


    getAllCourseType(localCacheIndicator){
        let url = app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCourseTypeFinder/getAllCourseType'

        let key = JSON.stringify({service:'publicCourseTypeFinder', method:'getAllCourseType'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}