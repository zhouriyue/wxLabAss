import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedStudentLessonDetailFinder {

    subject = 'UserStudentLessonDetail'
    getAllUserStudentLessonDetailByAdmin(localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedStudentLessonDetailFinder/getAllUserStudentLessonDetailByAdmin')

        let key = JSON.stringify({service:'customizedStudentLessonDetailFinder', method:'getAllUserStudentLessonDetailByAdmin'})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    getAllUserStudentLessonDetail(userParentUid,userStudentUid ,localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedStudentLessonDetailFinder/getAllUserStudentLessonDetail',
            {userParentUid:userParentUid,userStudentUid: userStudentUid})

        let key = JSON.stringify({service:'customizedStudentLessonDetailFinder', method:'getAllUserStudentLessonDetail',userParentUid:userParentUid, userStudentUid: userStudentUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    getUserStudentLessonDetail(userStudentUid,scheduleUid ,localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedStudentLessonDetailFinder/getUserStudentLessonDetail',
            {userStudentUid: userStudentUid,scheduleUid:scheduleUid})

        let key = JSON.stringify({service:'customizedStudentLessonDetailFinder', method:'getAllUserStudentLessonDetail', userStudentUid: userStudentUid,scheduleUid:scheduleUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}