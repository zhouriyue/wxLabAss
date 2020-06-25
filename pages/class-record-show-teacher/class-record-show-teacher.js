import {CustomizedTeacherLessonDetailFinder} from "../../services/customized/finder/customized-teacherlessondetail-finder";

const app = getApp()
const customizedTeacherLessonDetail = new CustomizedTeacherLessonDetailFinder()

Page({
    data: {

    },
    onLoad: function(options) {
        if(options.userTeacherUid!=null){
            customizedTeacherLessonDetail.getAllUserTeacherLessonDetailAdmin(options.userTeacherUid).subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({record:res.data.list })
                }
            })
        }else{
            customizedTeacherLessonDetail.getTeacherLessonDetail().subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({record:res.data.list })
                }
            })
        }


    },


})