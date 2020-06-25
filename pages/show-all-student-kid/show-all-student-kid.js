import {CustomizedUserStudentFinder} from '../../services/customized/finder/customized-userstudent-finder.js';

import {CustomizedUserStudentMutator} from '../../services/customized/mutator/customized-userstudent-mutator.js';
import {CustomizedClassRoomFinder} from "../../services/customized/finder/customized-classroom-finder";

const app = getApp();

const customizedUserStudenFinder = new CustomizedUserStudentFinder();
const customizedUserStudentMutator = new CustomizedUserStudentMutator();
const customizedClassRoomFinder = new CustomizedClassRoomFinder();

Page({
    data: {
        date: '',
        userStudent: null
    },

    onLoad: function (options) {
        let today = new Date();
        let todayDate = app.services.utilService.getDate(today);
        this.setData({date: todayDate});
        customizedClassRoomFinder.getAllClassRoom().subscribe((res) => {
            if (res.data != null && res.data.list != null) {
                this.setData({classRoomList: res.data.list})
            }
        });
        customizedUserStudenFinder.getOneUserStudent(options.userStudentUid)
            .subscribe((res) => {
                if (res.data != null && res.data.value != null) {
                    this.setData({'userStudent': res.data.value});
                }
            });


    },

    // 中文姓名
    onChineseNameInput: function (e) {
        this.setData({
            'userStudent.name': e.detail.value
        });
    },

    // 英文名称
    onEnglishNameInput: function (e) {
        this.setData({
            'userStudent.englishName': e.detail.value
        });
    },

    // 性别
    onSexInput: function (e) {
        this.setData({
            'userStudent.gender': e.detail.value
        });
    },

    // 年龄
    onAgeInput: function (e) {
        this.setData({
            'userStudent.age': e.detail.value
        });
    },

    // 出生日期
    onDateChange: function (e) {
        this.setData({
            'userStudent.birthDay': e.detail.value
        });
    },

    // 学生学校
    onSchollInput: function (e) {
        this.setData({
            'userStudent.schoolName': e.detail.value
        });
    },

    // 年级
    onGradeInput: function (e) {
        this.setData({
            'userStudent.grade': e.detail.value
        });
    },

    // 教室

    // 其他
    onDescriptionInput: function (e) {
        this.setData({
            'userStudent.description': e.detail.value
        });
    },

    // 查看上课记录
    lookClassRecord: function (e) {
        wx.navigateTo({
            url: '../class-record-show/class-record-show?userStudentUid=' + this.data.userStudent.userStudentUid+"&userParentUid="+this.data.userStudent.userParentUid
        });
    },

    onShowStudent: function () {
        wx.navigateTo({
            url: '../class-schedule-student/class-schedule-student?userStudentUid=' + this.data.userStudent.userStudentUid
        })
    },

    onSubmit: function () {
        let classRoomUid = 'thIpdQcyQNiNK7TKTJYo3A';
        let userStudent = {
            name: this.data.userStudent.name,
            englishName: this.data.userStudent.englishName,
            gender: this.data.userStudent.gender,
            age: this.data.userStudent.age,
            schoolName: this.data.userStudent.schoolName,
            grade: this.data.userStudent.grade,
            description: this.data.userStudent.description,
            birthDay: app.services.utilService.getDateTimeStr(this.data.userStudent.birthDay),
            classRoomUid: classRoomUid,
        };
        console.log(userStudent);

        customizedUserStudentMutator.modifyUserStudent(userStudent)
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