import { CustomizedUserFinder } from '../../services/customized/finder/customized-user-finder'
import { CustomizedUserMutator } from '../../services/customized/mutator/customized-user-mutator'

const customizedUserFinder = new CustomizedUserFinder()
const customizedUserMutator = new CustomizedUserMutator()
const app = getApp()

Page({
    data: {
        searchVal: '',
        activeIndex: 0
    },
    searchUser: function(){
        customizedUserFinder.getUserObjectsAdmin(this.data.searchVal, app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    for(let userObject of res.data.list){
                        if(userObject.userRoleObjectList != null){
                            for(let item of userObject.userRoleObjectList){
                                if(item.roleUid == this.data.adminRoleUid){
                                    userObject.isAdmin = true
                                }
                            }
                        }
                    }
                    this.setData({userObjects: res.data.list})
                }else{
                    this.setData({userObjects: null})
                }
            })
    },
    onLoad: function(options) {

        let user = app.services.cacheService.getStorage(null, 'USER')
        this.setData({user: user})

        let allRoles = app.services.cacheService.getStorage(null, 'ALL_ROLES')
        for(let item of allRoles){
            if(item.roleName == 'ADMIN'){
                this.setData({adminRoleUid: item.roleUid})
            }
        }

        let tabNames = []
        tabNames.push('会员')
        tabNames.push('管理员')
        tabNames.push('禁止')

        this.setData({'appTab_0': {tabs: tabNames, activeIndex: this.data.activeIndex}})

        this.searchUser()
    },
    onComponentEvent: function(e){
        this.setData({[`${e.detail.key}`] : e.detail.value})

        let activeIndex = e.detail.value

        this.setData({userObjects: null})

        if(activeIndex==0){
            this.searchUser()
        }else if(activeIndex==1){
            customizedUserFinder.getUserObjectsByRoleAdmin('ADMIN', app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res)=>{
                    if(res.data != null && res.data.list != null){
                        this.setData({userObjects: res.data.list})
                    }else{
                        this.setData({userObjects: null})
                    }
                })
        }else if(activeIndex==2){
            customizedUserFinder.getUserObjectsByStatusAdmin('INACTIVE', app.services.constantService.CACHE_READ_WRITE)
                .subscribe((res)=>{
                    if(res.data != null && res.data.list != null){
                        this.setData({userObjects: res.data.list})
                    }else{
                        this.setData({userObjects: null})
                    }
                })
        }
    },
    onBan: function(e){
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]
        if(userObject.userStatusCode == 'ACTIVE'){
            wx.showModal({
                content: '确定禁止此用户登录?',
                success: (res)=> {
                    if (res.confirm) {
                        customizedUserMutator.addBanUserAdmin(userObject.userUid)
                            .subscribe((res)=>{
                                this.setData({[`userObjects[${index}].userStatusCode`]: 'INACTIVE'})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }else{
                        this.setData({[`userObjects[${index}].userStatusCode`]: 'ACTIVE'})
                    }
                }
            })
        }else{
            wx.showModal({
                content: '确定解禁此用户登录?',
                success: (res)=> {
                    if (res.confirm) {
                        customizedUserMutator.removeBanUserAdmin(userObject.userUid)
                            .subscribe((res)=>{
                                this.setData({[`userObjects[${index}].userStatusCode`]: 'ACTIVE'})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }else{
                        this.setData({[`userObjects[${index}].userStatusCode`]: 'INACTIVE'})
                    }
                }
            })
        }
    },
    onCancelBan: function(e){
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]
        wx.showModal({
            content: '确定解禁此用户登录?',
            success: (res)=> {
                if (res.confirm) {
                    customizedUserMutator.removeBanUserAdmin(userObject.userUid)
                        .subscribe((res)=>{
                            this.setData({[`userObjects[${index}].userStatusCode`]: 'ACTIVE'})
                            wx.showToast({
                                title: '操作成功',
                                icon: 'success'
                            })
                        })
                }
            }
        })
    },
    onAdmin: function(e){
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]

        if(userObject.isAdmin){
            wx.showModal({
                content: '确定取消此用户管理员角色?',
                success: (res)=> {
                    if (res.confirm) {
                        customizedUserMutator.removeAdmin(userObject.userUid)
                            .subscribe((res)=>{
                                this.setData({[`userObjects[${index}].isAdmin`]: false})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }else{
                        this.setData({[`userObjects[${index}].isAdmin`]: true})
                    }
                }
            })
        }else{
            wx.showModal({
                content: '确定设此用户为管理员?',
                success: (res)=> {
                    if (res.confirm) {
                        customizedUserMutator.setAdmin(userObject.userUid)
                            .subscribe((res)=>{
                                this.setData({[`userObjects[${index}].isAdmin`]: true})
                                wx.showToast({
                                    title: '操作成功',
                                    icon: 'success'
                                })
                            })
                    }else{
                        this.setData({[`userObjects[${index}].isAdmin`]: false})
                    }
                }
            })
        }

    },
    onCancelAdmin: function(e){
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]
        wx.showModal({
            content: '确定取消此用户管理员角色?',
            success: (res)=> {
                if (res.confirm) {
                    customizedUserMutator.removeAdmin(userObject.userUid)
                        .subscribe((res)=>{
                            this.data.userObjects.splice(index,1)
                            this.setData({userObjects: this.data.userObjects})
                            wx.showToast({
                                title: '操作成功',
                                icon: 'success'
                            })
                        })
                }
            }
        })
    },
    onDetail: function(e) {
        let index = e.currentTarget.dataset.index
        let userObject = this.data.userObjects[index]

        app.services.cacheService.setStorage('NAV','dm-user-info',{userObject: userObject} )
        wx.navigateTo({
            url: '/pages/dm-user-info/dm-user-info'
        })
    },
    onSearch: function(e){
        this.searchUser()
    },
    clearInput: function (e) {
        this.setData({
            searchVal: ''
        })
        this.searchUser()
    },
    onSearchInput: function (e) {
        this.setData({
            searchVal: e.detail.value
        })

        if(this.data.searchVal==null || this.data.searchVal ==''){
            this.searchUser()
        }
    }
})