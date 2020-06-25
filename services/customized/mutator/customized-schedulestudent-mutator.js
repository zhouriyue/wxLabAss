import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedScheduleStudentMutator{

    subject = 'ScheduleStudent'

    modifyScheduleStudentLeave( scheduleStudent){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleStudentMutator/modifyScheduleStudentLeave'
        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, scheduleStudent, header, 'POST', 'json')

        return httpService
    }
    modifyScheduleStudent( scheduleStudent){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedScheduleStudentMutator/modifyScheduleStudent'
        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, scheduleStudent, header, 'POST', 'json')

        return httpService
    }
}