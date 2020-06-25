import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedScheduleMutator{

    subject = 'Schedule'

    modifyScheduleObjectByCard(scheduleObject){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleMutator/modifyScheduleObjectByCard'
        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, scheduleObject, header, 'POST', 'json')

        return httpService
    }
    modifyScheduleObjectByStudentCard(scheduleUid,userStudentUid,code, localCacheIndicator){
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleMutator/modifyScheduleObjectByStudentCard',
            {scheduleUid:scheduleUid,userStudentUid: userStudentUid,code:code})

        let key = JSON.stringify({service:'customizedScheduleMutator', method:'modifyScheduleObjectByStudentCard',scheduleUid:scheduleUid, userStudentUid:userStudentUid,code:code})

        let header = { 'Accept': 'application/json' ,'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')}

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}