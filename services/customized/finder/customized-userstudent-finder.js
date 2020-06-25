import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedUserStudentFinder {

    subject = 'UserStudent'

    getAllUserStudent(userUid, localCacheIndicator) {

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserStudentFinder/getAllUserStudent',
            {userUid: userUid})

        let key = JSON.stringify({service: 'customizedUserStudentFinder', method: 'getAllUserStudent', userUid: userUid})

        let header = {
            'Accept': 'application/json',
            'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
        }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    getUserStudentObject(userStudentUid, localCacheIndicator) {

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserStudentFinder/getUserStudentObject',
            {userStudentUid: userStudentUid})

        let key = JSON.stringify({service: 'customizedUserStudentFinder', method: 'getUserStudentObject', userStudentUid: userStudentUid})

        let header = {
            'Accept': 'application/json',
            'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
        }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    getOneUserStudent(userStudentUid, localCacheIndicator) {

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserStudentFinder/getOneUserStudent',
            {userStudentUid: userStudentUid})

        let key = JSON.stringify({service: 'customizedUserStudentFinder', method: 'getOneUserStudent', userStudentUid: userStudentUid})

        let header = {
            'Accept': 'application/json',
            'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
        }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    getUserStudentByName(name, localCacheIndicator) {

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserStudentFinder/getUserStudentByName',
            {name: name})

        let key = JSON.stringify({service: 'customizedUserStudentFinder', method: 'getUserStudentByName', name: name})

        let header = {
            'Accept': 'application/json',
            'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
        }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}