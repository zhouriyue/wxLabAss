import { CustomizedUserFinder } from '../../services/customized/finder/customized-user-finder.js'
import { CustomizedUserMutator } from '../../services/customized/mutator/customized-user-mutator.js'

const app = getApp()

const customizedUserFinder = new CustomizedUserFinder()
const customizedUserMutator = new CustomizedUserMutator();

Page({
    data: {

    },
    onLoad: function(options) {

        customizedUserFinder.getUser(options.userUid)
            .subscribe((res)=>{
            if(res.data != null && res.data.value != null){
            this.setData({user:res.data.value})
        }
    })

    },

    onNameInput: function(e){
        let value = e.detail.value
        this.data.user.name=value
        this.setData({user:  this.data.user})
    },
    onPhoneInput: function(e){
        let value = e.detail.value
        this.data.user.phone=value
        this.setData({user:  this.data.user})
    },

    onEmailInput: function(e){
        let value = e.detail.value
        this.data.user.email=value
        this.setData({user:  this.data.user})
    },
    onAddressInput: function(e){
        let value = e.detail.value
        this.data.user.addressDetail=value
        this.setData({user: this.data.user})
    },
    onSubmit: function(){
        if(this.data.user.phone!=null && this.data.user.phone!=""){
            customizedUserMutator.modifyUser(this.data.user)
                .subscribe((res)=>{
                    wx.showToast({
                        title: "提交成功",
                        duration: 2000
                    })
                    setTimeout(()=>{
                        wx.navigateBack()
                    },2000)
                })
        }else{
            wx.showModal({
                title: "提示",
                content:"请务必输入正确电话"
            })
        }
    },


})