import { PublicCmsFinder } from '../../services/public/finder/public-cms-finder'
import {CustomizedScheduleFinder} from "../../services/customized/finder/customized-schedule-finder";
import {CustomizedScheduleStudentMutator} from "../../services/customized/mutator/customized-schedulestudent-mutator";
const app = getApp()
const publicCmsFinder = new PublicCmsFinder()
const customizedScheduleFinder = new CustomizedScheduleFinder();
const customizedScheduleStudentMutator = new CustomizedScheduleStudentMutator();
Page({
  data: {
      attentionScore: '',    // 注意力
      cooperationScore: '',  // 互动程度
      disciplineScore: '',   // 行为规范
      finishWorkScore: ''    // 课堂完成情况
  },
  onLoad: function (options) {
      let roles = app.services.cacheService.getStorage(null, 'ROLES')
      if(roles!=null){
          for(let item of roles){
              if(item.roleName == 'ADMIN' || item.roleName == 'SUPER_ADMIN'){
                  this.setData({isAdmin: true})
              }
              if(item.roleName == 'CUSTOMER'){
                  this.setData({isCustomer:true})
              }
              if(item.roleName == 'TEACHER'){
                  this.setData({isTeacher:true})
              }
          }
      }
      customizedScheduleFinder.getScheduleObject(options.scheduleUid,app.services.constantService.CACHE_NONE).subscribe((res)=> {
          if (res.data && res.data.value && res.data.value.taskCmsUid) {

              publicCmsFinder.getCmsObject(res.data.value.taskCmsUid, app.services.constantService.CACHE_NONE)
                  .subscribe((res)=>{
                      if(res.data != null && res.data.value != null){
                          this.setData({cmsObject: res.data.value})
                      }
                  })
          }
      });


      customizedScheduleFinder.getOneScheduleStudent(options.scheduleUid,options.userStudentUid).subscribe((res)=> {
          if (res.data && res.data.value) {



              this.setData({
                  comment:res.data.value.comment,
                  userStudentUid:res.data.value.userStudentUid,
                  attentionScore: res.data.value.attentionScore,
                  cooperationScore: res.data.value.cooperationScore,
                  disciplineScore: res.data.value.disciplineScore,
                  finishWorkScore: res.data.value.finishWorkScore,
                  reply:res.data.value.reply,
                  scheduleUid:res.data.value.scheduleUid
              });
          }
      });
  },
  onReady: function () {

  },
    onTextarea1:function(e){
        this.setData({
            comment: e.detail.value
        })
    },
    onTextarea2:function(e){
        this.setData({
            reply: e.detail.value
        })
    },
    onCom:function(e){
        let scheduleStudent = {
            reply: this.data.reply,userStudentUid:this.data.userStudentUid,scheduleUid:this.data.scheduleUid
        }
        this.setData({disabled: true})
        customizedScheduleStudentMutator.modifyScheduleStudentLeave(scheduleStudent)
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
});