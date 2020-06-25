import {CustomizedScheduleStudentMutator} from "../../services/customized/mutator/customized-schedulestudent-mutator";
import {CustomizedScheduleFinder} from "../../services/customized/finder/customized-schedule-finder";
var app = getApp()
const customizedScheduleFinder = new CustomizedScheduleFinder()
const customizedScheduleStudentMutator = new CustomizedScheduleStudentMutator();
var count = 0;
Page({
    data: {
        tempFilePaths:[],
        normalSrc: '../../image/star.png',
        selectedSrc: '../../image/star_on.png',
        stars: [0, 1, 2, 3, 4],
        starsInfo:[{name:'cooperation',key:0}, {name:'attention',key:0}, {name:'classroom discipline',key:0}, {name:'finish work',key:0}]
    },
    onLoad: function (options) {
        this.setData({userStudentUid:options.userStudentUid})
        this.setData({scheduleUid:options.scheduleUid})
        this.setData({userParentUid:options.userParentUid})
    },
    //星星打分
    selectStar: function (e) {
        var starsInfo=this.data.starsInfo;
        var key = e.currentTarget.dataset.key
        var index = e.currentTarget.dataset.index
        starsInfo[index].key=key
        this.setData({
            starsInfo: starsInfo
        })
    },
    onTextarea:function(e){
        this.setData({
            comment: e.detail.value
        })
    },
    onStatic:function(e){
        let scheduleStudent = {cooperationScore: this.data.starsInfo[0].key, attentionScore: this.data.starsInfo[1].key,
            disciplineScore: this.data.starsInfo[2].key, finishWorkScore: this.data.starsInfo[3].key,
            comment: this.data.comment,userStudentUid:this.data.userStudentUid,scheduleUid:this.data.scheduleUid,
            userParentUid:this.data.userParentUid
        }
        console.log(scheduleStudent)
        this.setData({disabled: true})
        customizedScheduleStudentMutator.modifyScheduleStudent(scheduleStudent)
            .subscribe((res)=>{
                wx.showToast({
                    title: "提交成功",
                    duration: 2000
                })
                setTimeout(()=>{
                    wx.navigateBack()
                },2000)
            },()=>{
                this.setData({disabled: false})
            })

    },

})