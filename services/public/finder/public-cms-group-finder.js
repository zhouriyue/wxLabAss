import { HttpService } from '../../http-service'

const app = getApp()

export class PublicCmsGroupFinder{
    subject = 'CmsGroup'

    getAllCmsGroup( localCacheIndicator){

        let url = app.services.constantService.WS_CUSTOMIZED_PUBLIC_BASE_URL + 'publicCmsGroupFinder/getAllCmsGroup'

        let key = JSON.stringify({service:'publicCmsGroupFinder', method:'getAllCmsGroup'})

        let header = { 'Accept': 'application/json' }

        let httpService = new HttpService(url, null, header, 'GET', 'json')
        httpService.setCache(localCacheIndicator, this.subject, key)

        return httpService
    }
}