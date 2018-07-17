import 'libs/css/mui_basic.css';
import 'libs/css/vw_fix.css';
import './css/index.less';

import {
    getCustomerList
} from './api';

new Vue({
    el: '#app',
    data: {
        pageNo: 1,
        pageSize: 10,
        customerList: [],
        imgList: []
    },
    mounted() {
        this.getCustomerList();
        this.getImgList();
    },
    methods: {
        getImgList() {
            this.imgList = [...this.imgList, ...[
                './static/imgs/tt.png',
                './static/imgs/bl.png',
                './static/imgs/bw.png',
                './static/imgs/bg2.jpg',
                './static/imgs/bg.jpg',
                './static/imgs/bg2.jpg',
                './static/imgs/bg.jpg',
                './static/imgs/bg2.jpg',
                // './static/imgs/bg.jpg',
            ]];
        },
        getCustomerList() {
            const {
                pageNo,
                pageSize
            } = this;
            getCustomerList({
                searchInfo: '',
                pageNo,
                pageSize,
                sortField: '',
                sort: ''
            }).then(({
                data: {
                    customerList
                }
            }) => {
                this.customerList = [...this.customerList, ...customerList];
                console.log(this.customerList);
            });
        },
        getMore() {
            this.getImgList();
            console.log('查看更多！');
            console.log('查看更多！');
        }
    }
});