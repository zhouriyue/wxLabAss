import {CustomizedStudentLessonDetailFinder} from "../../services/customized/finder/customized-studentlessondetail-finder";
import {PublicCourseTypeFinder} from "../../services/public/finder/public-course-type-finder";
import {CustomizedUserFinder} from "../../services/customized/finder/customized-user-finder";

const app = getApp()
const customizedStudentLessonDetailFinder = new CustomizedStudentLessonDetailFinder()
const customizedUserFinder = new CustomizedUserFinder();
const publicCourseTypeFinder = new PublicCourseTypeFinder();

Page({
    data: {
        record:null
    },
    onLoad: function(options) {
        customizedStudentLessonDetailFinder.getAllUserStudentLessonDetail(options.userParentUid,options.userStudentUid).subscribe((res)=>{
        if(res.data != null && res.data.list != null){
            this.setData({record:res.data.list })
        }
    })
        publicCourseTypeFinder.getAllCourseType().subscribe((res)=>{
            if(res.data != null && res.data.list != null){
                this.setData({courseTypeList :res.data.list })
            }
        })

        customizedUserFinder.getUserStudentCourseTypeByStudent(options.userParentUid,options.userStudentUid)
            .subscribe((res) => {
                if (res.data && res.data.list) {
                    this.setData({
                        userStudentCourseType: res.data.list
                    });
                }
            })
    },


})