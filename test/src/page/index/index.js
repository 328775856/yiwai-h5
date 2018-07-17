import 'libs/css/mui_basic.css';
import 'libs/css/vw_fix.css';
import './css/index.less';
import VIDEO from './js/video';
import CTB from './js/canvas-text-break';
import shareText from 'libs/js/share';

new Vue({
    el: '#app',
    data: {
        ipx: false,
        isShowApp: true,
        progress: 0,
        isShowVideo: true,
        isShowVideoEnd: true,
        isLoading: true,
        isShowTap: true,
        isShowResImg: true,
        isShowNameWrp: true,
        isShowScanLoopWrp: true,
        isStartAni: false,
        isShowTipsWrp: false,
        tapStartLock: false,
        netWorkErr: false,
        timer: null,
        videoUrl: 'https://img.kanhua.yiwaiart.com/h5/test1/video_begin_v3.mp4',
        videoUrlStartPoster: 'https://img.kanhua.yiwaiart.com/h5/test1/poster_start_v1.png?imageView2/2/w/540/q/50',
        resBgColor: '#000',

        tapStartImg: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_bg_img@2x.png',
        nameBgImg: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_bg_img_name@2x_v1.png?imageView2/2/w/500/q/50',
        // scanBgImg: 'https://img.kanhua.yiwaiart.com/h5/test1/scan_bg.jpg',
        scanBgImg: '',
        scanPerson: 'https://img.kanhua.yiwaiart.com/h5/test1/scan_person.png',
        videoStart: null,
        videoEnd: null,
        chooseArr: [],
        lock: false,
        playListSource: [{
                // gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q1_v1.gif?imageView2/2/w/625/q/50',
                gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q1_v2.gif',
                q: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_img_Q1@2x_v1.png',
                selIcon: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_icon_selected_1@2x.png',
            },
            {
                gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q2_v3.gif',
                q: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_img_Q2@2x_v1.png',
                selIcon: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_icon_selected_2@2x.png',
            },

            {

                // gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q3_v1.gif?imageView2/2/w/625/q/50',
                gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q3_v1.gif?imageView2/2/w/375/q/50',
                q: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_img_Q3@2x_v1.png',
                selIcon: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_icon_selected_3@2x.png',

            },

            {
                // gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q4_v1.gif?imageView2/2/w/625/q/50',
                // gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q4_v1.gif?imageView2/2/w/375/q/50',
                gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q4_v2.gif?imageView2/2/w/375/q/50',
                q: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_img_Q4@2x_v1.png',
                selIcon: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_icon_selected_4@2x.png',
            },
            {

                // gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q5_v1.gif?imageView2/2/w/625/q/50',
                gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q5_v2.gif?imageView2/2/w/625/q/50',
                q: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_img_Q5@2x_v1.png',
                selIcon: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_icon_selected_5@2x.png',
            },
            {
                gif: 'https://img.kanhua.yiwaiart.com/h5/test1/q6_v1.gif?imageView2/2/w/625/q/50',
                q: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_img_Q6@2x_v1.png',
                selIcon: 'https://img.kanhua.yiwaiart.com/h5/test1/EY_icon_selected_6@2x.png',
            }
        ],
        playList: [{
                btmShow: false,
                isShowTopic: true,
                isShowTopic_gif: true,
                gif: '',
                q: '',
                selIcon: '',
                questionList: [{
                        text: '快乐',
                        isSel: false
                    },
                    {
                        text: '自由',
                        isSel: false
                    },
                    {
                        text: '完美',
                        isSel: false
                    },
                ]
            },
            {
                btmShow: false,
                isShowTopic: true,
                isShowTopic_gif: true,
                gif: '',
                q: '',
                selIcon: '',
                questionList: [{
                        text: '浪漫',
                        isSel: false
                    },
                    {
                        text: '自由',
                        isSel: false
                    },
                    {
                        text: '创造',
                        isSel: false
                    },
                ]
            },

            {
                btmShow: false,
                isShowTopic: true,
                isShowTopic_gif: true,
                gif: '',
                q: '',
                selIcon: '',
                questionList: [{
                        text: '智慧',
                        isSel: false
                    },
                    {
                        text: '浪漫',
                        isSel: false
                    },
                    {
                        text: '创造',
                        isSel: false
                    }
                ]
            },

            {
                btmShow: false,
                isShowTopic: true,
                isShowTopic_gif: true,
                gif: '',
                q: '',
                selIcon: '',
                questionList: [{
                        text: '快乐',
                        isSel: false
                    },
                    {
                        text: '智慧',
                        isSel: false
                    },
                    {
                        text: '创造',
                        isSel: false
                    },
                ]
            },
            {
                btmShow: false,
                isShowTopic: true,
                isShowTopic_gif: true,
                gif: '',
                q: '',
                selIcon: '',
                questionList: [{
                        text: '智慧',
                        isSel: false
                    },
                    {
                        text: '自由',
                        isSel: false
                    },
                    {
                        text: '完美',
                        isSel: false
                    },
                ]
            },
            {
                btmShow: false,
                isShowTopic: true,
                isShowTopic_gif: true,
                gif: '',
                q: '',
                selIcon: '',
                questionList: [{
                        text: '浪漫',
                        isSel: false
                    },
                    {
                        text: '完美',
                        isSel: false
                    },
                    {
                        text: '快乐',
                        isSel: false
                    },
                ]
            }
        ],


        name: '',
        resultImg: '',
        clipBgColor: '#FFFFFF',
        color: '#FFFFFF',
        text: '',
        isFocus: false,
        isShowPop: false,

        pageNo: 1,
        pageSize: 10,
        customerList: [],
        imgList: []
    },
    mounted() {
        this.ipx = this.isIpx();
        this.scanBgImg = this.ipx ? 'https://img.kanhua.yiwaiart.com/h5/test1/scan_bg_ipx.png' : 'https://img.kanhua.yiwaiart.com/h5/test1/scan_bg.jpg';
        window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", () => {
            if (window.orientation === 180 || window.orientation === 0) {
                this.isShowPop = false;
            }
            if (window.orientation === 90 || window.orientation === -90) {
                this.isShowPop = true;
            }

            setTimeout(() => {
                if (this.isShowScanLoopWrp) {
                    this.scanBgOnload();
                }
                if (this.chooseArr.length > 0) {
                    this.draw();
                }
            }, 100);


        }, false);

        // 因为安卓会播放视频/点击文本框会调用到onrize属性，所以要重新计算
        window.onresize = () => {
            setTimeout(() => {
                if (this.isShowScanLoopWrp) {
                    this.scanBgOnload();
                }
                if (this.chooseArr.length > 0) {
                    this.draw();
                }
            }, 100);
        }

        this.videoStart = VIDEO('video', this.videoUrl, this.videoUrlStartPoster);

        document.addEventListener("WeixinJSBridgeReady", () => {
            this.$refs['scanSuccAudio'].play();
            this.$refs['scanSuccAudio'].pause();
            this.$refs['chooseAudio'].play();
            this.$refs['chooseAudio'].pause();
        });


        this.isLoaded();
        shareText();
        // this.scanBgOnload();
        // this.draw();
    },
    watch: {
        // progress(val) {
        //     if (val >= 100) {
        //         setTimeout(() => {
        //             this.isLoading = false;
        //             this.progress = 100;
        //         }, 1000);
        //     }
        // }
    },
    methods: {
        isIpx() {
            return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375);
            // return (screen.height == 812 && screen.width == 375);
        },
        // 判断资源是否加载完毕
        isLoaded() {
            // this.progress = 100;
            let resourceImg = [
                this.videoUrlStartPoster
            ];
            let localResourceImg = [
                // 开启gif页
                './static/imgs/poster_start.jpg',
                './static/imgs/poster_end.jpg'
            ];
            let resourceArr = resourceImg;
            this.playListSource.map((item, i) => {
                resourceArr = resourceArr.concat(item.gif, item.q, item.selIcon);
            });
            resourceArr = resourceArr.concat(this.tapStartImg, this.scanBgImg, this.scanPerson);
            console.log(resourceArr);


            let loadedArr = resourceArr;
            let n = 0;

            resourceArr.map((item, i) => {
                const img = new Image();
                img.onload = () => {
                    n += 1;
                    // const num = Math.round(100 / resourceArr.length) * n;
                    const num = Math.floor(100 / resourceArr.length) * n;
                    this.progress = num >= 100 ? 100 : num;
                    console.log(`${n}我是${item},我已加载完毕`);

                    loadedArr = loadedArr.filter(itemj => itemj != item);
                    console.log(`还剩`);
                    loadedArr.map(item => {
                        console.log(item);
                    })
                    console.log(`还没有加载完毕...`);

                    if (n >= resourceArr.length) {
                        setTimeout(() => {
                            this.isLoading = false;
                            this.progress = 100;
                        }, 500);

                        // 赋值图片
                        this.playList.map((item, i) => {
                            Object.assign(item, this.playListSource[i]);
                        });

                        // 预加载扫描页面
                        this.scanBgOnload();

                        console.log('3.图片资源都加载完毕');
                        console.log('——全部资源都已加载完毕——');
                    }
                };
                img.src = item;
            });

        },
        getLoadedUrl() {
            this.tapStartImg = './static/imgs/tapStart.gif';
        },
        mp3Load() {
            const m1 = () => new Promise((resolve, reject) => {
                this.$refs['startAudio'].oncanplaythrough = function () {
                    resolve({
                        isSucc: 1,
                        tip: `我是start.mp3,我已加载完毕`
                    });
                };

            });

            const m2 = () => new Promise((resolve, reject) => {
                this.$refs['chooseAudio'].oncanplaythrough = function () {
                    resolve({
                        isSucc: 1,
                        tip: `我是bg.mp3,我已加载完毕`
                    })
                };

            });
            const m3 = () => new Promise((resolve, reject) => {

                this.$refs['rightAudio'].oncanplaythrough = function () {
                    resolve({
                        isSucc: 1,
                        tip: `我是right.wav,我已加载完毕`
                    })
                };

            });
            const m4 = () => new Promise((resolve, reject) => {

                this.$refs['tapAudio'].oncanplaythrough = function () {
                    resolve({
                        isSucc: 1,
                        tip: `我是click.wav,我已加载完毕`
                    })
                };
            });
            const m5 = () => new Promise((resolve, reject) => {
                this.$refs['scanAudio'].oncanplaythrough = function () {
                    resolve({
                        isSucc: 1,
                        tip: `我是scanAudio.wav,我已加载完毕`
                    })
                };
            });
            const m6 = () => new Promise((resolve, reject) => {

                this.$refs['scanSuccAudio'].oncanplaythrough = function () {
                    resolve({
                        isSucc: 1,
                        tip: `我是scanSucc.mp3,我已加载完毕`
                    })
                };
            });
            const m7 = () => new Promise((resolve, reject) => {
                return this.videoStart.oncanplaythrough = function () {
                    resolve({
                        isSucc: 1,
                        tip: `我是videoStart.mp4,我已加载完毕`
                    })
                };
            });
            return Promise
                .all([m1(), m2(), m3(), m4(), m5(), m6(), m7()]).then(res => res);

            // m1().then(({
            //         tip
            //     }) => {
            //         console.log(tip);
            //         return m2();
            //     }).then(({
            //         tip
            //     }) => {
            //         console.log(tip);
            //         return m3();
            //     }).then(({
            //         tip
            //     }) => {
            //         console.log(tip);
            //         return m4();
            //     })
            //     .then(({
            //         tip
            //     }) => {
            //         console.log(tip);
            //         return m5();
            //     })
            //     .then(({
            //         tip
            //     }) => {
            //         console.log(tip);
            //         return m6();
            //     }).then(({
            //         tip
            //     }) => {
            //         console.log(tip);
            //         return m7();
            //     }).then(({
            //         tip
            //     }) => {
            //         console.log(tip);
            //     })
        },

        mp4Load() {

            const m1 = () => new Promise((resolve, reject) => {
                this.videoStart.oncanplaythrough = function () {
                    resolve({
                        isSucc: 1,
                        tip: `我是videoStart.mp4,我已加载完毕`
                    })
                };
            });

            // const m2 = () => {
            //     return new Promise((resolve, reject) => {
            //         console.log(`我是videoEnd.mp4,我已加载完毕`);

            //         this.videoEnd.oncanplaythrough = () => {
            //             resolve({
            //                 isSucc: 1,
            //                 tip: `我是videoEnd.mp4,我已加载完毕`
            //             })
            //         };
            //     })
            // };
            // m1().then((res) => {
            //     console.log(res);
            // });
            return m1();
            // return Promise
            //     // .all([m1(), m2()])
            //     .all([m1()])
            //     .then((results) => {
            //         return results
            //     });
        },



        playToEnd() {
            this.videoStart.play();
            this.videoStart.onplay = () => {
                setTimeout(() => {
                    const onplay = setInterval(() => {
                        if (this.videoStart.currentTime >= this.videoStart.duration) {
                            this.isShowVideo = false;
                            // 播放做题的背景音乐
                            this.$refs['chooseAudio'].play();
                            this.play(1);
                            clearInterval(onplay);
                        }
                    }, 50);
                }, 2000);
            }
        },

        listenerOnPlay(videoObj, after, before) {
            if (before) before();
            videoObj.onplay = () => {
                setTimeout(() => {
                    const onplay = setInterval(() => {
                        if (videoObj.currentTime >= videoObj.duration) {
                            videoObj.pause();
                            clearInterval(onplay);
                            if (after) after();
                        }
                    }, 50);
                }, 1000)
            }
        },
        isWeixinBrowser() {
            const agent = navigator.userAgent.toLowerCase();
            if (agent.match(/MicroMessenger/i) == "micromessenger")
                return true;
            else
                return false;
        },
        scanBgOnload() {
            const isIpx = this.isIpx();
            const scale = 1.5;
            const $scanBgOutterWrp = this.$refs['scanBgOutterWrp'];
            const $scanBgImg = this.$refs['scanBgImg'];
            const $scanPsersonImg = this.$refs['scanPsersonImg'];
            const $scanPerson = this.$refs['scanPerson'];

            const img = new Image();
            const url = this.scanBgImg;

            // 因为resize会调用，所以要重置一些css参数
            $scanBgOutterWrp.style.marginTop = 0;
            $scanBgOutterWrp.style.marginLeft = 0;
            $scanBgImg.removeAttribute('width');
            $scanBgImg.removeAttribute('height');
            $scanPsersonImg.removeAttribute('width');
            $scanPerson.style.marginTop = 0;

            img.src = url;
            img.onload = () => {
                img.onload = null;
                const W = window.innerWidth;
                const H = window.innerHeight;
                const s1 = W / H;
                const s2 = img.width / img.height;
                let width = 0;
                let height = 0;
                if (s1 >= s2) {
                    $scanBgImg.width = W;
                    const cal = (H - W / s2) / 2;
                    $scanBgOutterWrp.style.marginTop = cal + 'px';

                    // 计算要旋转的人的宽度
                    $scanPsersonImg.width = W * ((isIpx ? 580 : 597) / 750);
                    // 计算距离顶部的距离

                    // $scanPerson.style.marginTop = (W / s2) * (180 / 1206) + cal + 'px';
                    $scanPerson.style.marginTop = (W / s2) * ((isIpx ? 445 / scale : 180) / (isIpx ? 1448 : 1206)) + cal + 'px';
                } else {
                    $scanBgImg.height = H;
                    const cal = (W - H * s2) / 2;
                    $scanBgOutterWrp.style.marginLeft = cal + 'px';

                    // 计算要旋转的人的宽度
                    $scanPsersonImg.width = H * s2 * ((isIpx ? 580 : 597) / 750);
                    // 计算距离顶部的距离
                    // $scanPerson.style.marginTop = H * (180 / 1206) + 'px';
                    $scanPerson.style.marginTop = H * ((isIpx ? 445 / scale : 180) / (isIpx ? 1448 : 1206)) + 'px';
                }
            }
        },
        // tapStartImgOnload() {
        //     const $gifOutterWrp = this.$refs['gifOutterWrp'];
        //     const $tapStartImg = this.$refs['tapStartImg'];
        //     const img = new Image();
        //     const url = this.tapStartImg;
        //     img.onload = () => {
        //         img.onload = null;
        //         const W = window.innerWidth <= 750 ? window.innerWidth : 750;
        //         const H = window.innerHeight;
        //         const s1 = W / H;
        //         const s2 = img.width / img.height;
        //         let width = 0;
        //         let height = 0;
        //         if (s1 >= s2) {
        //             $tapStartImg.width = W;
        //             const cal = (H - W / s2) / 2;
        //             $gifOutterWrp.style.marginTop = cal + 'px';
        //         } else {
        //             $tapStartImg.height = H;
        //             const cal = (W - H * s2) / 2;
        //             $gifOutterWrp.style.marginLeft = cal + 'px';

        //         }
        //         console.log(img);
        //     }
        //     img.src = url;
        // },
        tapStart() {
            if (this.tapStartLock) {
                return;
            }
            this.tapStartLock = true;
            this.$refs['tapAudio'].play();
            this.isShowTap = false;
            // 播放开场动画
            this.playToEnd();
        },
        // 再来一次
        tapAgain() {

            // 控制变量只显示6道题目 + 扫面页 + 结果页面 fuck

            this.scanBgOnload();
            // 扫面页面动画启动
            this.isStartAni = false;

            this.name = '';

            this.chooseArr = [];

            // 输入名字面板
            this.isShowNameWrp = true;

            // 扫描页面板
            this.isShowScanLoopWrp = true;

            const {
                playList
            } = this;
            playList.map((item, i) => {
                item.btmShow = false;
                item.isShowTopic = true;
                item.isShowTopic_gif = true;
                item.questionList.map((itemj, j) => {
                    itemj.isSel = false;
                });
            });
            this.play(1);

            this.$refs['scanAudio'].currentTime = 0;
            this.$refs['chooseAudio'].currentTime = 0;
            this.$refs['chooseAudio'].play();
        },
        play(i) {
            if (i > this.playList.length) {
                // this.$refs['startAudio'].play();
                // this.$refs['chooseAudio'].pause();
                return false;
            };
            const obj = this.playList[i - 1];
            obj.btmShow = true;
            this.$set(this.playList, i - 1, obj);
            this[`isShowTopic${i}`] = true;
        },

        draw(fn) {
            const prefix = './static/imgs/result/';
            const isIpx = this.isIpx();
            const ipxPrefix = isIpx ? 'ipx/' : '';
            const scale = 1.5;
            const {
                resultImg,
                clipBgColor,
                color,
                text
            } = this;
            console.log(this.chooseArr, 'chooseArr');
            console.log(resultImg, 'resultImg');
            console.log(text, 'text');

            const canvas = document.getElementById('myCanvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = `${prefix}${ipxPrefix}${resultImg}`;

            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                // 写字
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.save();
                // ctx.font = 'bold 40px arial';
                ctx.font = `bold ${isIpx ? 60/scale : 40}px arial`;
                ctx.fillStyle = color;
                // ctx.fillText(this.name, canvas.width / 2, 50);
                ctx.fillText(this.name, canvas.width / 2, isIpx ? 140 / scale : 50);
                ctx.restore();
                ctx.save();

                // ctx.font = 'bold 32px arial';
                ctx.font = `bold ${isIpx ? 48/scale : 32}px arial`;
                ctx.fillStyle = color;
                ctx.fillText('·  艺术解码报告  ·', canvas.width / 2, isIpx ? 220 / scale : 110);
                ctx.restore();
                CTB({
                    ctx,
                    text,
                    // canvas/width/2 的时候才可以用textAlign:'center'
                    // x: 55,
                    // y: 780,
                    // w: 640,
                    x: isIpx ? 80 / scale : 55,
                    y: isIpx ? 1280 / scale : 780,
                    w: isIpx ? 960 / scale : 640,
                    fontStyle: {
                        // lineHeight: 60,
                        lineHeight: isIpx ? 90 / scale : 60,
                        textAlign: 'left',
                        textBaseline: 'middle',
                        // font: '32px arial',
                        font: `${ isIpx ? 48/scale : 32}px arial`,
                        fillStyle: '#FFFFFF'
                    }
                });
                this.getBase64(canvas, (dataUrl) => {
                    if (fn) fn();
                    this.resBgColor = clipBgColor;
                    this.$refs['shareOutterWrp'].style.marginTop = 0;
                    this.$refs['shareOutterWrp'].style.marginLeft = 0;
                    // 展示base64位的图片
                    const newImg = document.createElement("img");
                    newImg.src = dataUrl;
                    const W = window.innerWidth;
                    const H = window.innerHeight;
                    const s1 = W / H;
                    const s2 = canvas.width / canvas.height;
                    let width = 0;
                    let height = 0;

                    // plan1: 有裁剪 显示图片的最短边
                    // if (s1 >= s2) {
                    //     newImg.width = W;
                    //     const cal = (H - W / s2) / 2;
                    //     this.$refs['shareOutterWrp'].style.marginTop = cal + 'px';
                    // } else {
                    //     newImg.height = H;
                    //     const cal = (W - H * s2) / 2;
                    //     this.$refs['shareOutterWrp'].style.marginLeft = cal + 'px';
                    // }
                    // plan2：无裁剪 显示图片的最长边
                    if (s1 >= s2) {
                        newImg.height = H;
                        const cal = (W - H * s2) / 2;
                        newImg.style.marginLeft = cal + 'px';
                    } else {
                        newImg.width = W;
                        const cal = (H - W / s2) / 2;

                        this.$refs['shareOutterWrp'].style.marginTop = cal + 'px';
                    }
                    newImg.onclick = (e) => e.preventDefault();
                    const $img = document.getElementById('shareOutterWrp').getElementsByTagName('img')[0];
                    if ($img) {
                        document.getElementById('shareOutterWrp').removeChild($img);
                    }
                    document.getElementById('shareOutterWrp').appendChild(newImg);
                });
            }

        },
        calResImgSizeAndPosi() {
            const W = window.innerWidth;
            const H = window.innerHeight;
            const s1 = W / H;
            const s2 = canvas.width / canvas.height;
            let width = 0;
            let height = 0;
            if (s1 >= s2) {
                newImg.width = W;
                const cal = (H - W / s2) / 2;
                this.$refs['shareOutterWrp'].style.marginTop = cal + 'px';
            } else {
                newImg.height = H;
                const cal = (W - H * s2) / 2;
                this.$refs['shareOutterWrp'].style.marginLeft = cal + 'px';
            }
        },
        getCalResult() {
            /*
                创造——超现实主义
                快乐——波普主义
                完美——新古典主义
                智慧——佛罗伦萨画派
                自由——印象派
                浪漫——浪漫主义mn

                1.（1+1+1+1+1+1）
                创造+快乐+完美+智慧+自由+浪漫=野兽派
                2.占比不同选最高
                3.占比相同随机
            */
            let faction = {
                '创造': '超现实主义',
                '快乐': '波普主义',
                '完美': '新古典主义',
                '智慧': '佛罗伦萨画派',
                '自由': '印象派',
                '浪漫': '洛可可主义',
                '野兽派': '野兽派'
            };
            const words = {
                '野兽派': [
                    '你是人群中1%的野兽派，富有创造力，浪漫聪慧又乐天，性格温和人缘好，简直完美得不像人，马蒂斯的《生活的欢乐》画的就是你超脱世俗的理想吧。'
                ],

                '超现实主义': [
                    '你拥有超现实主义艺术流派的基因，有打破常规的颠覆意识，脑海里随时都在冒出天马行空的想法，给你丢个苹果你就是牛顿！',
                    '你拥有超现实主义艺术流派的基因，创造力超凡，就像画家达利，总是可以吸引观赏者的视觉焦点，更拥有探索潜意识的超凡能力。',
                    '你拥有超现实主义艺术流派的基因，别人的脑洞是脑洞，你的脑洞应该叫黑洞，就算漂流到了无人的荒岛，你也能凭借超强的创造力打造出一个伊甸园！',
                    '你拥有超现实主义艺术流派的基因，有着创造世界的非凡灵性，世人从脚底仰视耶稣，而你站在了耶稣的头顶，你若是上帝，世界就是伊甸园！',
                    '你拥有超现实主义艺术流派的基因，你看世界的维度总与别人不同，兴许你能看到《人之子》藏在苹果背后的那张脸。',
                ],
                '新古典主义': [
                    '你拥有新古典主义艺术流派的基因， 对你来说， 一件事做得好还不够， 更要做得干净利落充满美感， 你不需要了解艺术， 因为你已经把生活过成了艺术。',
                    '你拥有新古典主义艺术流派的基因， 你对于精致的追求让所有人惊叹， 就像安格尔画出的《大宫女》 一样， 美轮美奂， 又极致精湛。',
                    '你拥有新古典主义艺术流派的基因， 你的理想就是大卫画笔下的拿破仑， 永远英姿勃发， 好像不败神话， 理想与现实往往不能如意， 保持理想， 但活在当下。',
                    '你拥有新古典主义艺术流派的基因， 你简直是全世界最能干的多面手， 能力出众又井井有条的你， 迎娶白富美， 当上CEO， 走上人生巅峰不是梦。',
                    '你拥有新古典主义艺术流派的基因， 你对完美的追求让人惊叹， 要么不做要么最好， 就像大卫笔下的拿破仑， 充满了世界之王的豪情。',
                ],

                '洛可可主义': [
                    '你拥有洛可可主义艺术流派的基因， 有一个独属于你自己的内心世界， 不受外界打扰， 也不与外界连通， 这样独特的你， 充满了遗世独立的孤冷气质。',
                    '你拥有洛可可主义艺术流派的基因， 为爱而生是你的座右铭， 爱之于你就像是水之于鱼， 爱是你生活的必需品。',
                    '你拥有洛可可主义艺术流派的基因， 充沛的情感让你的感性爆发， 让你充满创作的灵感， 就像弗拉戈纳尔在画《赢得的吻》， 快速捕捉而又精准。',
                    '你拥有洛可可主义艺术流派的基因， 热爱幻想又追求自由， 灵魂和身体总有一个在路上， 大概就是你理想中的生活状态吧。',
                    '你拥有洛可可主义艺术流派的基因， 你是富有想象力的唯美主义者， 你的多变就像云彩， 飞翔着也被风爱抚着， 书里的世界也不如你的世界精彩。',
                ],

                '波普主义': [
                    '你拥有波普主义艺术流派的基因，你就是传说中的人群最闪亮的小太阳！永远都充满了活力，把爱与温暖无私地洒向人间。',
                    '你拥有波普主义艺术流派的基因， 充满热情与活力的你绝对是时尚的宠儿， 就像是吸引人眼球的涂鸦艺术， 明艳又大气， 世界的焦点就是你。',
                    '你拥有波普主义艺术流派的基因， 快乐与热情毫不吝啬地感染着身边所有人， 只要有你在从来不会冷场， 聚会中的开心果担当就是你。',
                    '你拥有波普主义艺术流派的基因， 极致饱满的色彩和夸张明媚的线条是你的代名词， 对待感情你从来不会畏畏缩缩， 爱得大胆也爱得浓烈。',
                    '你拥有波普主义艺术流派的基因， 看待世界的眼光独特又新奇， 总是能想出别出心裁的新点子， 你的想象就是所有美丽的事物。',
                ],

                '佛罗伦萨画派': [
                    '你拥有佛罗伦萨画派的基因， 是个值得信任的人， 富有智慧又十分理性， 很容易就能在团体中成为领导者， 像拉斐尔一样年纪轻轻就成为一个时代的引领者。',
                    '你拥有佛罗伦萨画派的基因， 总是能把情绪克制得很好， 就像不动声色就搞出许多大事件的米开朗基罗， 理性是你的处事原则， 团队中的领袖人物就是你。',
                    '你拥有佛罗伦萨画派的基因， 你就像是达芬奇， 轻轻松松就成为了跨领域的强者， 不会设计机械模型的外科医生不是好画家， 智慧让你的跨界做出了1 + 1 大于2的成就。',
                    '你拥有佛罗伦萨画派的基因， 真诚是你最大的优点。 因为你的靠谱和认真， 成为了周边人心中最值得信赖的人， 是个不折不扣的实干家。',
                    '你拥有佛罗伦萨画派的基因， 科学是你信任世界的底线， 像是拉斐尔， 就算画的是不存在的天神， 也要追求真实和自我。'
                ],

                '印象派': [
                    '你拥有印象派的艺术基因， 不得不说你是我见过最有主见的人， 就像德加的《舞蹈课》， 别人看的是世界的光鲜亮丽， 而你看到的是世界的全部和本质。',
                    '你拥有印象派的艺术基因， 有着超强的全局观， 修拉和你有一样的天赋， 就像《大碗岛的星期天下午》， 用无数的星星点点构成一幅美景， 这是全局观的胜利。',
                    '你拥有印象派的艺术基因， 天真又热爱自然， 善于捕捉生活中的美感， 可是很多大人已经忘记了自己曾经是个孩子， 希望你也能永远保持儿童的那个自己。',
                    '你拥有印象派的艺术基因， 是永远乐观的乐天派， 待人温和又善良大度， 即便暂时不被认可， 也依旧乐意用你的善意去拥抱你热爱的世界。',
                    '你拥有印象派的艺术基因， 温润如玉的君子说的就是你吧！ 不被理解却从不灰心， 相信世界终有一天会因你而美丽。',
                ]
            };
            // const resultImgArr = {
            //     '野兽派': ['https://img.kanhua.yiwaiart.com/h5/test1/result/EY_bg_ye_share@2x.png', '#FEBCFF'],
            //     '超现实主义': ['https://img.kanhua.yiwaiart.com/h5/test1/result/EY_bg_chao_share@2x.png', '#DF91E1'],
            //     '新古典主义': ['https://img.kanhua.yiwaiart.com/h5/test1/result/EY_bg_xin_share@2x.png', '#0BEDF0'],
            //     '洛可可主义': ['https://img.kanhua.yiwaiart.com/h5/test1/result/EY_bg_luo_share@2x.png', '#FFB1D4'],
            //     '波普主义': ['https://img.kanhua.yiwaiart.com/h5/test1/result/EY_bg_bo_share@2x.png', '#FFC87A'],
            //     '佛罗伦萨画派': ['https://img.kanhua.yiwaiart.com/h5/test1/result/EY_bg_fu_share@2x.png', '#0BEDF0'],
            //     '印象派': ['https://img.kanhua.yiwaiart.com/h5/test1/result/EY_bg_yin_share@2x.png', '#8BF280'],
            // };
            const resultImgArr = {

                /* 裁剪后的背景颜色 */
                // #9d4f67  洛可可
                // #295766  佛罗伦萨画派 
                // #1e2d4c  超现实基因 
                // #d88853  波普主义 
                // #1d514d  印象派结
                // #19355a  新古典主义
                // #564571  野兽派

                '野兽派': ['EY_bg_ye_share@2x.png', '#FEBCFF', '#564571'],
                '超现实主义': ['EY_bg_chao_share@2x.png', '#DF91E1', '#1e2d4c'],
                '新古典主义': ['EY_bg_xin_share@2x.png', '#0BEDF0', '#19355a'],
                '洛可可主义': ['EY_bg_luo_share@2x.png', '#FFB1D4', '#9d4f67'],
                '波普主义': ['EY_bg_bo_share@2x.png', '#FFC87A', '#d88853'],
                '佛罗伦萨画派': ['EY_bg_fu_share@2x.png', '#0BEDF0', '#295766'],
                '印象派': ['EY_bg_yin_share@2x.png', '#8BF280', '#1d514d'],
            };


            const {
                chooseArr
            } = this;
            const obj = {};
            chooseArr.map(item => {
                if (obj[item])
                    obj[item] = obj[item] += 1;
                else
                    obj[item] = 1;
            });

            let tempArr = [];
            for (let o in obj) {
                tempArr.push({
                    n: obj[o],
                    t: o
                });
            }
            let max = tempArr[0].n;
            for (var i = 1; i < tempArr.length; i++) {
                if (max < tempArr[i].n) max = tempArr[i].n;
            }
            let randArr = [];

            for (let o in obj) {
                if (obj[o] === max)
                    randArr.push(o);
            }

            // 判断数组如果全部结果都有的话，为野兽派，其余随机获取最终结果
            let fac = '';
            if (randArr.length == 6) {
                //野兽派
                fac = '野兽派'
            } else {
                fac = randArr[parseInt(Math.random() * randArr.length, 10)];
            }

            const f = faction[fac];
            const wordsArr = words[f];

            this.resultImg = resultImgArr[f][0];
            this.color = resultImgArr[f][1];
            this.clipBgColor = resultImgArr[f][2];
            this.text = wordsArr[parseInt(Math.random() * wordsArr.length, 10)];


            this.draw(() => {
                setTimeout(() => {
                    if (!this.netWorkErr) {
                        this.isShowScanLoopWrp = false;
                        this.$refs['scanAudio'].pause();
                        this.$refs['scanSuccAudio'].play();
                        clearTimeout(this.timer);
                    }
                }, 2000);
            });

            // 调用draw之前开始计时，如果超过12s就弹框说网络错误
            this.timer = setTimeout(() => {
                if (this.isShowScanLoopWrp) {
                    this.netWorkErr = true;
                } else {
                    clearTimeout(this.timer);
                }
            }, 12000);
        },
        getBase64(canvas, callback) {
            var dataURL = canvas.toDataURL("image/jpeg");
            if (typeof callback !== undefined)
                callback(dataURL);

        },
        tapChoose(val, item, qIndex) {
            if (this.lock)
                return;
            this.lock = true;

            console.log(item, '选择的题目');

            // 选择对应的项

            const {
                playList
            } = this;


            // 显示打勾
            playList.map((itemi, i) => {
                if (i == val - 1) {
                    itemi.questionList.map((itemj, j) => {
                        if (j == qIndex)
                            itemj.isSel = true;

                    });
                }
            });


            this.chooseArr.push(item);
            // 播放打勾的声音
            this.$refs['rightAudio'].play();

            setTimeout(() => {
                this.showNext(val);
            }, 1500);

        },
        keyup() {
            if (this.name.length >= 0) {
                setTimeout(() => {
                    this.isShowTipsWrp = false;
                }, 1000);
            }
        },
        btnGetRes() {
            if (this.name.length == 0) {
                this.isShowTipsWrp = true;
                return;
            }
            this.isShowNameWrp = false;
            this.isStartAni = true;
            this.getCalResult();

            this.$refs['chooseAudio'].pause();
            this.$refs['scanAudio'].play();
        },
        showNext(val) {
            this.lock = false;
            // 隐藏当前题目
            this.playList.map((itemi, i) => {
                if (i == val - 1)
                    itemi.isShowTopic_gif = false;
            });
            // 显示下一道题目 
            this.play(val + 1);
        }
    }
});