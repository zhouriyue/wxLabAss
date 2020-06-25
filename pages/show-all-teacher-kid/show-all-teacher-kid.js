import {CustomizedUserStudentFinder} from '../../services/customized/finder/customized-userstudent-finder.js';
import {CustomizedUserStudentMutator} from '../../services/customized/mutator/customized-userstudent-mutator.js';
import {CustomizedUserFinder} from '../../services/customized/finder/customized-user-finder.js';

const app = getApp();

const customizedUserStudenFinder = new CustomizedUserStudentFinder();
const customizedUserStudentMutator = new CustomizedUserStudentMutator();
const customizedUserFinder = new CustomizedUserFinder();

Page({
    data: {
        date: '',
        userTeacher: null
    },

    onLoad: function (options) {
        let today = new Date();
        let todayDate = app.services.utilService.getDate(today);
        this.setData({date: todayDate});
        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')
        this.setData({dictionaries: dictionaries})
        customizedUserFinder.getUserObjectsByTeacherNameAdmin(options.name)
            .subscribe((res) => {

                if (res && res.data && res.data.list && res.data.list[0]) {
                    this.setData({'userTeacher': res.data.list[0]})
                }

                console.log("res------------------");//todo
                console.log(JSON.stringify(this.data.userTeacher, null, 4));

            });
    },

    // 查看上课记录
    lookClassRecord: function (e) {
        wx.navigateTo({
            url: '../class-record-show-teacher/class-record-show-teacher?userTeacherUid=' + this.data.userTeacher.userUid
        });
    },

    // 查看老师课表
    onShowTeacherSchedule: function () {
        wx.navigateTo({
            url: '../class-schedule-teacher/class-schedule-teacher?userTeacherUid=' + this.data.userTeacher.userUid
        });
    },

    onSubmit: function () {
        let classRoomUid = 'thIpdQcyQNiNK7TKTJYo3A';
        let userTeacher = {
            name: this.data.userTeacher.name,
            englishName: this.data.userTeacher.englishName,
            gender: this.data.userTeacher.gender,
            age: this.data.userTeacher.age,
            schoolName: this.data.userTeacher.schoolName,
            grade: this.data.userTeacher.grade,
            description: this.data.userTeacher.description,
            birthDay: app.services.utilService.getDateTimeStr(this.data.userTeacher.birthDay),
            classRoomUid: classRoomUid,
        };
        console.log(userTeacher);

        customizedUserStudentMutator.modifyUserStudent(userTeacher)
            .subscribe((res) => {
                wx.showToast({
                    title: "提交成功",
                    duration: 2000
                });
                setTimeout(() => {
                    wx.navigateBack()
                }, 2000);
            })
    }
});