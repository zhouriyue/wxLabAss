import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedTeacherLessonDetailFinder {

    subject = 'UserTeacherLessonDetail'

    getTeacherLessonDetail( localCacheIndicator) {

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedTeacherLessonDetailFinder/getAllUserTeacherLessonDetail')

        let key = JSON.stringify({service: 'customizedTeacherLessonDetailFinder', method: 'getAllUserTeacherLessonDetail'})

        let header = {'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')}

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    getUserTeacherLessonDetail(scheduleUid, localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedTeacherLessonDetailFinder/getUserTeacherLessonDetail',
            {scheduleUid: scheduleUid})

        let key = JSON.stringify({service:'customizedTeacherLessonDetailFinder', method:'getUserTeacherLessonDetail', scheduleUid: scheduleUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    getAllUserTeacherLessonDetailAdmin(userUid, localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedTeacherLessonDetailFinder/getAllUserTeacherLessonDetailAdmin',
            {userUid: userUid})

        let key = JSON.stringify({service:'customizedTeacherLessonDetailFinder', method:'getAllUserTeacherLessonDetailAdmin', userUid: userUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}