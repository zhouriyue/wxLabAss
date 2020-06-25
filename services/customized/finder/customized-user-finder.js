import { HttpService } from '../../http-service'

const app = getApp()

export class CustomizedUserFinder{

    subject = 'User'

    getUser(){

        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUser'

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')

        return httpService
    }

    getUserObjectsByRoleAdmin(roleName, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserObjectsByRoleAdmin',
            {roleName: roleName})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserObjectsByRoleAdmin', roleName: roleName})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getUserObjectsAdmin(query, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserObjectsAdmin',
            {query: query})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserObjectsAdmin', query: query})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getUserObjectsByStatusAdmin(userStatusCode, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserObjectsByStatusAdmin',
            {userStatusCode: userStatusCode})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserObjectsByStatusAdmin', userStatusCode: userStatusCode})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getUserObject(userTeacherUid, localCacheIndicator){

        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserObject',{userTeacherUid: userTeacherUid})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserObject', userTeacherUid: userTeacherUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getUserObjectsByTeacherNameAdmin(name, localCacheIndicator){
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserObjectsByTeacherNameAdmin',
            {name: name})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserObjectsByTeacherNameAdmin', name: name})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    getUserByTeacher(userUid, localCacheIndicator){
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserByTeacher',
            {userUid: userUid})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserByTeacher', userUid: userUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }

    getUserStudentObjectsByAvailableMinutesAdmin(minAvailableMinutes, localCacheIndicator){
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserStudentObjectsByAvailableMinutesAdmin',
            {minAvailableMinutes: minAvailableMinutes})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserStudentObjectsByAvailableMinutesAdmin', minAvailableMinutes: minAvailableMinutes})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
    getUserStudentCourseTypeByStudent(userParentUid,userStudentUid, localCacheIndicator){
        let url = app.services.utilService.joinUrl(
            app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'customizedUserFinder/getUserStudentCourseTypeByStudent',
            {userParentUid:userParentUid,userStudentUid: userStudentUid})

        let key = JSON.stringify({service:'customizedUserFinder', method:'getUserStudentCourseTypeByStudent',userParentUid:userParentUid, userStudentUid: userStudentUid})

        let header = { 'Accept': 'application/json','Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN') }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}