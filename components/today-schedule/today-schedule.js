import {PublicScheduleFinder} from '../../services/public/finder/public-schedule-finder';
import {PublicCourseTypeFinder} from '../../services/public/finder/public-course-type-finder';
import {PublicClassRoomFinder} from '../../services/public/finder/public-class-room-finder';
import {CustomizedScheduleFinder} from '../../services/customized/finder/customized-schedule-finder'

const moment = require('../../lib/moment.min.js');

import { CommonService } from '../../services/common-service'

const app = getApp();

const publicScheduleFinder = new PublicScheduleFinder();
const publicCourseTypeFinder = new PublicCourseTypeFinder();
const publicClassRoomFinder = new PublicClassRoomFinder();
const customizedScheduleFinder = new CustomizedScheduleFinder();

const commonService = new CommonService()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        listData: null,
        courseData: null
    },

    ready: function () {

        publicCourseTypeFinder.getAllCourse().subscribe((res)=>{
            if(res.data != null && res.data.list != null){
                this.setData({courseList :res.data.list })
            }
        })

        publicClassRoomFinder.getAllClassRoom().subscribe((res)=>{
            if(res.data != null && res.data.list != null){
                this.setData({classRoomList :res.data.list })
            }
        })

        //确保登录成功
        commonService.getUser(this,(user)=>{
            let roles = app.services.cacheService.getStorage(null, 'ROLES')
            if(roles!=null){
                for(let item of roles){
                    if(item.roleName == 'ADMIN' || item.roleName == 'SUPER_ADMIN'){

                        publicScheduleFinder.getOneDaySchedule(moment().format('YYYY-MM-DD'), app.services.constantService.CACHE_NONE).subscribe((res)=>{
                            if(res.data != null && res.data.list != null){
                                this.setData({adminScheduleList :res.data.list })
                            }
                        })
                    }
                    if(item.roleName == 'TEACHER'){

                        customizedScheduleFinder.getOneDayScheduleByTeacher(user.userUid,moment().format('YYYY-MM-DD'), app.services.constantService.CACHE_NONE ).subscribe((res)=>{
                            if(res.data != null && res.data.list != null){
                                this.setData({teacherScheduleList :res.data.list })
                            }
                        })

                    }
                    if(item.roleName == 'CUSTOMER'){

                        let now = new Date()
                        let DateRangeRequest = {from:now, to: now }
                        customizedScheduleFinder.getSchedulesByParent(user.userUid,DateRangeRequest, app.services.constantService.CACHE_NONE ).subscribe((res)=>{
                            if(res.data != null && res.data.list != null){
                                this.setData({parentScheduleList :res.data.list })
                            }
                        })
                    }
                }
            }
        })


    },
    moved: function () {
    },
    detached: function () {
    },

    methods: {}

});