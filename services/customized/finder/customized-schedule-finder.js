import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedScheduleFinder {

    subject = 'schedule'

    getOneDayScheduleByTeacher(userTeacherUid,creatTimeStamp, localCacheIndicator) {

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleFinder/getOneDayScheduleByTeacher',
            {userTeacherUid:userTeacherUid,creatTimeStamp: creatTimeStamp})

        let key = JSON.stringify({service:'customizedScheduleFinder', method:'getOneDayScheduleByTeacher',userTeacherUid:userTeacherUid, creatTimeStamp:creatTimeStamp})

        let header = { 'Accept': 'application/json' ,'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')}

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService

    }
    getOneDayScheduleByAdmin(classRoomUid,creatTimeStamp, localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleFinder/getOneDayScheduleByAdmin',
            {classRoomUid:classRoomUid,creatTimeStamp: creatTimeStamp})

        let key = JSON.stringify({service:'customizedScheduleFinder', method:'getOneDayScheduleByAdmin', classRoomUid:classRoomUid,creatTimeStamp:creatTimeStamp})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService

    }
    getOneDayScheduleByStudent(userStudentUid,creatTimeStamp, localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleFinder/getOneDayScheduleByStudent',
            {userStudentUid:userStudentUid,creatTimeStamp: creatTimeStamp})

        let key = JSON.stringify({service:'customizedScheduleFinder', method:'getOneDayScheduleByStudent', userStudentUid:userStudentUid,creatTimeStamp:creatTimeStamp})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService

    }
    getOneScheduleStudent(scheduleUid,userStudentUid, localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleFinder/getOneScheduleStudent',
            {scheduleUid: scheduleUid,userStudentUid:userStudentUid})

        let key = JSON.stringify({service:'customizedScheduleFinder', method:'getOneScheduleStudent', scheduleUid:scheduleUid,userStudentUid:userStudentUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService

    }
    getScheduleLeaveAdmin(creatTimeStamp, localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleFinder/getAllScheduleObjectByLeave',
            {creatTimeStamp: creatTimeStamp})

        let key = JSON.stringify({service:'customizedScheduleFinder', method:'getAllScheduleObjectByLeave'})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN'), creatTimeStamp:creatTimeStamp}

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService

    }
    getScheduleObject(scheduleUid, localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleFinder/getScheduleObject',
            {scheduleUid: scheduleUid})

        let key = JSON.stringify({service:'customizedScheduleFinder', method:'getScheduleObject', scheduleUid:scheduleUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService

    }

    getSchedulesByParent(userUid, dateRangeRequest, localCacheIndicator) {
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleFinder/getSchedulesByParent',
            {userUid: userUid})

        let key = JSON.stringify({service:'customizedScheduleFinder', method:'getSchedulesByParent', userUid:userUid, dateRangeRequest: dateRangeRequest})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, dateRangeRequest, header, 'POST', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService

    }
}