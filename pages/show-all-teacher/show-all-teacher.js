import {CustomizedUserFinder} from '../../services/customized/finder/customized-user-finder'

const app = getApp();

const customizedUserFinder = new CustomizedUserFinder();

Page({
    data: {
        searchVal: '',
        listData: null
    },
    onLoad: function (options) {

        customizedUserFinder.getUserObjectsByTeacherNameAdmin('')
            .subscribe((res) => {
                if (res.data && res.data.list) {
                    this.setData({listData: res.data.list});
                } else {
                    console.log("error");
                    console.log("res");
                    console.log(res);
                }
            })

        // if(options.query!= null ){
        //     let searchVal = decodeURI(options.query)
        //     this.setData({searchVal: searchVal})
        //     customizedUserFinder.getUser(searchVal,app.services.constantService.CACHE_READ_WRITE)
        //         .subscribe((res)=>{
        //             if(res.data != null && res.data.list != null){
        //                 app.services.utilService.sortProductsSku(res.data.list)
        //                 this.setData({'appProductCards1_0':{ productObjects:res.data.list}})
        //             }else{
        //                 this.setData({'appProductCards1_0':null})
        //             }
        //         })
        //
        // }else{
        //     customizedUserFinder.getUser(null,app.services.constantService.CACHE_READ_WRITE)
        //         .subscribe((res)=>{
        //             if(res.data != null && res.data.list != null){
        //                 app.services.utilService.sortProductsSku(res.data.list)
        //                 this.setData({'appProductCards1_0':{ productObjects:res.data.list}})
        //             }else{
        //                 this.setData({'appProductCards1_0':null})
        //             }
        //         })
        // }
    },
    onSearch: function (e) {
        customizedUserFinder.getUserObjectsByTeacherNameAdmin(this.data.searchVal)
            .subscribe((res) => {
                if (res.data && res.data.list) {
                    this.setData({listData: res.data.list});
                } else {
                    console.log("error");
                    console.log("res");
                    console.log(res);
                }
            });
    },
    clearInput: function (e) {
        this.setData({
            searchVal: ""
        });
        customizedUserFinder.getUserObjectsByTeacherNameAdmin(this.data.searchVal)
            .subscribe((res) => {
                if (res.data && res.data.list) {
                    this.setData({listData: res.data.list});
                } else {
                    console.log("error");
                    console.log("res");
                    console.log(res);
                }
            });
    },
    onSearchInput: function (e) {
        this.setData({
            searchVal: e.detail.value
        });
        customizedUserFinder.getUserObjectsByTeacherNameAdmin(this.data.searchVal)
            .subscribe((res) => {
                if (res.data && res.data.list) {
                    this.setData({listData: res.data.list});
                } else {
                    console.log("error");
                    console.log("res");
                    console.log(res);
                }
            });
    }
});