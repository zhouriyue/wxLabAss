import {PublicCourseTypeFinder} from '../../services/public/finder/public-course-type-finder';
import {CustomizedClassRoomFinder} from '../../services/customized/finder/customized-classroom-finder';
const publicCourseTypeFinder = new PublicCourseTypeFinder();
const customizedClassRoomFinder = new CustomizedClassRoomFinder();
const app = getApp();

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        courseList: null,
        classRoomList: null
    },

    ready: function () {
        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')
        this.setData({dictionaries: dictionaries})
        publicCourseTypeFinder.getAllCourse().subscribe((res) => {
            if (res.data != null && res.data.list != null) {
                this.setData({courseList: res.data.list})
            }
        });

        customizedClassRoomFinder.getAllClassRoom().subscribe((res) => {
            if (res.data != null && res.data.list != null) {
                this.setData({classRoomList: res.data.list})
            }
        });

    },
    attached: function(){},
    moved: function(){},
    detached: function(){},

    methods: {
        onSchedule:function (e) {
            wx.navigateTo({
                url: '../show-student/show-student?scheduleUid=' + e.currentTarget.dataset.scheduleuid+"&userStudentUid="+e.currentTarget.dataset.userstudentuid
            })
        }
    }

})