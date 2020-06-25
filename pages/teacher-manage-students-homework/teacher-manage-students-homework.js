import { CustomizedCmsMutator } from '../../services/customized/mutator/customized-cms-mutator'

const app = getApp()

const customizedCmsMutator = new CustomizedCmsMutator();

// pages/teacher-manage-students-homework/teacher-manage-students-homework.js
Page({
  data: {
      tempFilePaths:[]

  },
  onLoad: function (options) {

      let scheduleObject = app.services.cacheService.getStorage('NAV','teacher-manage-students-homework').scheduleObject
      this.setData({scheduleObject: scheduleObject, cmsObject: {title: scheduleObject.scheduleUid, cmsImageObjectList: []}})

  },
  onReady: function () {
  
  },
  //上传图片
  bindUploadImg(){
      var _this=this;
      wx.chooseImage({
          count: _this.data.imgNum,
          sizeType: ['compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
              var tempFilePaths=res.tempFilePaths
              if(_this.data.tempFilePaths.length>0) {
                  var tempFilePaths1 = _this.data.tempFilePaths
                  tempFilePaths = tempFilePaths1.concat(res.tempFilePaths)
              }
              _this.setData({
                  tempFilePaths:tempFilePaths
              })

              var imgNum=5-_this.data.tempFilePaths.length
              _this.setData({
                  imgNum:imgNum
              })
              console.log(_this.data.imgNum)

          }
      })
  },
  //删除图片
  bindDelImg(e){
      var index = parseInt(e.target.dataset.index)
      var tempFilePaths=this.data.tempFilePaths
      tempFilePaths.splice(index,1)
      this.setData({
          tempFilePaths:tempFilePaths
      })
      var imgNum=this.data.imgNum+1
      this.setData({
          imgNum:imgNum
      })
  },
    onCommentInput: function(e){
        this.data.cmsObject.content = e.detail.value
    },
    onUpload: function(e) {

        this.setData({disabled: true})

        if(this.data.tempFilePaths==null || this.data.tempFilePaths.length==0){

            if(this.data.cmsObject.content == null || this.data.cmsObject.content==''){
                app.services.utilService.showModal('请输入作业描述')
                return
            }

            customizedCmsMutator.addHomeWork(this.data.cmsObject)
                .subscribe((res)=>{
                    wx.showToast({
                        title: "提交成功",
                        duration: 2000
                    })
                })

            return
        }

        let url = app.services.utilService.joinUrl(app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'uploadImage/uploadMaterial', {name: 'homework'})

        wx.showLoading({
            title: '上传中',
        })
        let counter = this.data.tempFilePaths.length
        for (let item of this.data.tempFilePaths) {
            wx.uploadFile({
                url: url,
                filePath: item,
                name: app.services.utilService.getFileName(item),
                header: {
                    'Accept': 'application/json',
                    'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
                },
                success: (res) => {
                    res.data = JSON.parse(res.data)
                    if (app.services.utilService.checkResponse(res)) {
                        counter --
                        this.data.cmsObject.cmsImageObjectList.push({sequenceNr: this.data.cmsObject.cmsImageObjectList.length * 100,  cmsImagePath: res.data.value.urlPath})
                        if(counter == 0){
                            wx.hideLoading()
                            customizedCmsMutator.addHomeWork(this.data.cmsObject)
                                .subscribe((res)=>{
                                    wx.showToast({
                                        title: "Success",
                                        duration: 2000
                                    })
                                })
                        }
                    }
                },
                fail: (res) => {
                    wx.hideLoading()
                }
            })

        }
    }
})