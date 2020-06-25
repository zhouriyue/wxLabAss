import {CustomizedUserFinder} from '../../services/customized/finder/customized-user-finder';
import {PublicCourseTypeFinder} from '../../services/public/finder/public-course-type-finder';

const app = getApp();

const customizedUserFinder = new CustomizedUserFinder();
const publicCourseTypeFinder = new PublicCourseTypeFinder();

Page({
    data: {
        allList: {
            listData: null,
            studentListData: null
        }
    },
    onLoad: function (options) {

        publicCourseTypeFinder.getAllCourseType().subscribe((res)=>{
            if(res.data != null && res.data.list != null){
                this.setData({courseTypeList :res.data.list })
            }
        })

        customizedUserFinder.getUserStudentObjectsByAvailableMinutesAdmin(480, app.services.constantService.CACHE_NONE)
            .subscribe((res) => {
                if (res.data && res.data.list) {
                    this.setData({
                        userStudentObjectList: res.data.list
                    });
                }
            })
    },

});