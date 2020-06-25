import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedUserStudentMutator{

    subject = 'UserStudent'

    modifyUserStudent( userStudent){
        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserStudentMutator/modifyUserStudent'

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, userStudent, header, 'POST', 'json')

        return httpService
    }
    addUserStudent( userStudent){
        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserStudentMutator/addUserStudent'

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, userStudent, header, 'POST', 'json')

        return httpService
    }
}