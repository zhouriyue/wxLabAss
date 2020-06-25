import {CustomizedUserStudentFinder} from '../../services/customized/finder/customized-userstudent-finder';

const app = getApp();

const customizedUserstudentFinder = new CustomizedUserStudentFinder();

Page({
    data: {
        searchVal: '',
        listData: []
    },
    onLoad: function (options) {

        customizedUserstudentFinder.getUserStudentByName('')
            .subscribe((res) => {
                if (res.data && res.data.list) {
                    // console.log("res");//todata
                    // console.log(JSON.stringify(res, null, 4));
                    this.setData({listData: res.data.list});
                } else {
                    console.log("error");
                    console.log("res");
                    console.log(res);
                }
            })

        // if(options.query!= null ){
        //     let searchVal = decodeURI(options.query);
        //     this.setData({searchVal: searchVal});
        //     customizedUserstudentFinder.getUserStudentByName(searchVal,app.services.constantService.CACHE_READ_WRITE)
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
        //     customizedUserstudentFinder.getUserStudentByName(null,app.services.constantService.CACHE_READ_WRITE)
        //         .subscribe((res)=>{
        //             if(res.data != null && res.data.list != null){
        //                 app.services.utilService.sortProductsSku(res.data.list);
        //                 this.setData({'appProductCards1_0':{ productObjects:res.data.list}})
        //             }else{
        //                 this.setData({'appProductCards1_0':null})
        //             }
        //         })
        // }

    },
    onSearch: function (e) {
        customizedUserstudentFinder.getUserStudentByName(this.data.searchVal)
            .subscribe((res) => {
                if (res.data && res.data.list) {
                    this.setData({listData: res.data.list});
                } else {
                    console.log('error');
                    console.log("res");
                    console.log(res);
                }
            });
    },
    clearInput: function (e) {
        this.setData({
            searchVal: ""
        });
        customizedUserstudentFinder.getUserStudentByName(this.data.searchVal)
            .subscribe((res) => {
                if (res.data && res.data.list) {
                    this.setData({listData: res.data.list});
                } else {
                    console.log('error');
                    console.log("res");
                    console.log(res);
                }
            });
    },
    onSearchInput: function (e) {
        this.setData({
            searchVal: e.detail.value
        });
        customizedUserstudentFinder.getUserStudentByName(this.data.searchVal)
            .subscribe((res) => {
                if (res.data && res.data.list) {
                    this.setData({listData: res.data.list});
                } else {
                    console.log('error');
                    console.log("res");
                    console.log(res);
                }
            });
    }
});