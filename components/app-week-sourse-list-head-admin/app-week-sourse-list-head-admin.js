const moment = require('../../lib/moment.min.js');

const app = getApp()


Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        sortItem: null,
        weekArrFlag:null,
        viewWeekStart:'',
        offset:0
    },
    ready: function(){
        this.onGetDate();

        // 课表默认为显示当天
        this.setData({sortItem: moment().format('YYYY-MM-DD')});
        this.triggerEvent('customevent', {sortItem: this.data.sortItem});
    },
    moved: function(){},
    detached: function(){},
    methods: {
        onResetDate:function(e){
            let offset = e.currentTarget.dataset.dateoffset
            this.setData({offset: offset})
            this.onGetDate()
        },
        onSort: function(e){
            let item = e.currentTarget.dataset.item
            if(item == this.data.sortItem){

            }else{
                this.setData({sortItem: item})
            }
            this.triggerEvent('customevent', {sortItem:this.data.sortItem})
        },
        onGetDate:function () {
            let offset=this.data.offset
            if(offset==undefined||offset==null)
                offset=0
            let currentWeekStart = moment().startOf('isoWeek').toDate()
            let currentWeekEnd = moment().endOf('isoWeek').toDate()
            this.data.currentWeekStart = moment(currentWeekStart).format('YYYY-MM-DD'),
                this.data.currentWeekEnd=moment(currentWeekEnd).format('YYYY-MM-DD'),
                console.log( moment(currentWeekStart).format('YYYY-MM-DD'))
            this.setData({currentWeekStart:this.data.currentWeekStart,currentWeekEnd:this.data.currentWeekEnd})
            let viewWeekStart = moment(currentWeekStart).add(7 * offset, 'days').toDate()
            let viewWeekEnd = moment(currentWeekEnd).add(7 * offset, 'days').toDate()
            let dates = []
            dates.push(moment(viewWeekStart).format('YYYY-MM-DD'))
            dates.push(moment(viewWeekStart).add(1, 'days').format('YYYY-MM-DD'))
            dates.push(moment(viewWeekStart).add(2, 'days').format('YYYY-MM-DD'))
            dates.push(moment(viewWeekStart).add(3, 'days').format('YYYY-MM-DD'))
            dates.push(moment(viewWeekStart).add(4, 'days').format('YYYY-MM-DD'))
            dates.push(moment(viewWeekStart).add(5, 'days').format('YYYY-MM-DD'))
            dates.push(moment(viewWeekEnd).format('YYYY-MM-DD'))
            this.setData({dates: dates})
            console.log(moment(viewWeekStart).format('YYYY-MM-DD'))
            console.log(moment(viewWeekEnd).format('YYYY-MM-DD'))
            this.setData({viewWeekStart:moment(viewWeekStart).format('YYYY-MM-DD')})

            this.setData({sortItem: moment(viewWeekStart).format('YYYY-MM-DD')})
            this.triggerEvent('customevent', {sortItem:this.data.sortItem})
        }
    }

})