import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedUserMutator{

    subject = 'User'

    modifyUser( user){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserMutator/modifyUser'
        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, user, header, 'POST', 'json')

        return httpService
    }

    setAdmin( userUid){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserMutator/setAdmin',{userUid: userUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }

    removeAdmin( userUid){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserMutator/removeAdmin',{userUid: userUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }

    addBanUserAdmin( userUid){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserMutator/addBanUserAdmin',{userUid: userUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }
    removeBanUserAdmin( userUid){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserMutator/removeBanUserAdmin',{userUid: userUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }
    modifyUserObject( userObject){

        app.services.cacheService.clearSubject([this.subject])

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserMutator/modifyUserObject'
        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, userObject, header, 'POST', 'json')

        return httpService
    }
}