export class ConstantService{

    CACHE_NONE = 'NONE'
    CACHE_WRITE = 'WRITE'
    CACHE_READ_WRITE = 'READ_WRITE'

    LONG_CACHE_TTL = 1440//1day
    DEFAULT_CACHE_TTL = 60//1hour
    SHORT_CACHE_TTL = 1//

    //HOST = 'localhost:8080'
    HOST = 'liutao.vmaisui.com'
    //HOST = 'saas1.zhaowu.cc'

    WSS_URL = 'wss://'+this.HOST+'/course-service/'
    //WSS_URL = 'ws://'+this.HOST+'/course-service/'

    WSS_FUN_URL = '/course-service/services/rs/websocketService/'
    WSS_SUB_URL =  this.WSS_FUN_URL + 'subscribe'
    WSS_CALL_URL = this.WSS_FUN_URL + 'call'

    WS_URL = 'https://'+this.HOST+'/course-service/'
    //WS_URL = 'http://'+this.HOST+'/course-service/'

    FILE_URL = 'http://'+this.HOST+'/files/'

    WS_BASE_URL = this.WS_URL+'services/rs/'
    WS_CUSTOMIZED_BASE_URL = this.WS_URL+'services/customized/rs/'
    WS_CUSTOMIZED_PUBLIC_BASE_URL = this.WS_URL+'services/customized/public/rs/'

    VERSION = 'v1.0.0'

}