import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedCmsMutator{

    subject = 'Cms'

    addHomeWork(cmsObject){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedCmsMutator/addHomeWork'
        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, cmsObject, header, 'POST', 'json')

        return httpService
    }

}