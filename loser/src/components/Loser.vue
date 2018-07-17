<template>
  <div style="height:100%;">
      <section class="VideoBg" ref="videoBg">
        <video  ref="video"  poster="https://img.kanhua.yiwaiart.com/weidadeluoxuanzhe/luoxuan1080000.jpg"  style="object-fit:cover"  preload="auto" playsinline="true" webkit-playsinline="true" x-webkit-airplay="allow" airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portrait"  src="https://img.kanhua.yiwaiart.com/weidadeluoxuanzhe/luoxuan1080.mp4">
        </video>
        <div class="VideoBg__content" :class="{hidden:showVideo}">
          <div class="VideoBg_box">
            <div class="videoBg_welcome" v-show="showWeclome">
              <span class="logo_wrap">
                  <img src="https://img.kanhua.yiwaiart.com/EY_img_logo@2x.png" alt="">
              </span>
              <p class="logo-word">意外艺术出品</p>
              <p>{{loadText}}</p>
            </div>
            <div  v-show="isshowStar">
                <div class="star"   ref="star" v-on:click.stop="showCardList">
                </div>
                 <p class="star_word">点击星光,进入落选者沙龙</p>
            </div>
          </div>
        </div>
      </section>
      <div class="empty_fullPage" v-if="showEmptypage"></div>
      <div class="slide-bg"  ref="slideWrap">
          <div class="title-img-wrap" :class="{iphonex:isIphonex}">
          </div>
          <div class="slide-tip" ref="slide">轻点图片制作壁纸</div>
          <flickity ref="flickity" class="carousel" :options="flickityOptions">
            <div class="carousel-cell" :class="{iphonex:isIphonex}" v-for="(item,index) in slideList" :key="item.id">
                  <div class="carouselInner" v-if="index<=7">
                    <div class="card-t_wrap " :class="{iphonex:isIphonex}">
                        <img v-if="!isIphonex"  class="card-t animate" :class="{zoomIn:item.isMake}" width="505" height="559" :src="item.cardTopImg" @click.prevent="makeBg(index)"  alt="">
                        <img v-else  class="card-t animate" :class="{zoomIn:item.isMake}" width="505" height="607" :src="item.cardTopLargeImg" @click.prevent="makeBg(index)"  alt="">
                    </div>
                    <div class="card-d_wrap" :class="{iphonex:isIphonex}">
                        <img class="card-d animate" :class="{rotateOutDownRight:item.isMake}" width="505" height="300" :src="item.cardBottomImg" alt="">
                    </div>
                      <div class="card-close_wrap">
                        <img :src="item.closeUrl" :class="{rotateOutDownRight:item.isMake}" @click.prevent="play(index)" class="card-close animate" alt="">
                      </div>
                  </div>
                  <div class="" v-else>
                    <div class="name-input_bg" :class="{iphonex:isIphonex}">
                      <input type="text" class="name-input" v-model.trim="userName" maxlength="5" placeholder="输入名字">
                    </div>
                    <div class="slideLast">
                      <img @click.prevent="openEnvelop"  src="https://img.kanhua.yiwaiart.com/EY_btn_envelopeclosed@2x.png" alt="">
                      <p :class="{iphonex:isIphonex}">点击信封</p>
                      <p>落选者有话对你说</p>
                    </div>
                  </div>
            </div>
          </flickity>
      </div>
          <div class="envelop_show" v-show="showEnevlop">
              <div class="again" @click="playAgain">

              </div>
              <p class="again_word">再玩一次</p>
            <div ref="envelop" class="envelop" @click="openEnvelop">
            </div>
            <div class="envelop_wrap" :class="{iphonex:isIphonex,fullScreen:isFullScreen}" ref="envelop_wrap">
              <div class="envelop_content">
                <div class="envelopClose_wrap">
                  <img ref="envelopClose" class="envelopClose"  src="https://img.kanhua.yiwaiart.com/weidaluoxuanzheclose@2x.png" alt="" >
                </div>
                <div class="envelopOpen_wrap">
                  <img ref="evevlopOpen" class="envelopOpen" src="https://img.kanhua.yiwaiart.com/weidaluoxuanzheopen@2x.png" alt="" >
                </div>

                <div class="envelopShare" :class="{active:showIndex}" @click="openShare">
                </div>
                <span class="envelopShare_word">分享</span>
                <div class="envelopCover_wrap">
                  <img ref="envelopCover" src="https://img.kanhua.yiwaiart.com/EY_img_letter_cover@2x.png" alt="" class="envelopCover">
                </div>

                <div ref="envelopForm" class="envelp_content_form" :class="{transition:isAnimate,iphonex:isIphonex}">

                  <div class="envelp_content_form-bg">
                       <span class="envelop_content_form-hello">你好，<strong>{{userName}}</strong></span>
                       <div class="logo">
                          <img src="https://img.kanhua.yiwaiart.com/EY_icon_logo_img@2x.png" class="" alt="">
                       </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div class="gallery animate"  :class="{active:isMark,iphonex:isIphonex}">
          <div class="">
              <span class="close" @click="closeModal"></span>
              <img :src="galleryImgSrc" alt="" class="bgImg">
              <p class="download"  @click="downloadImg">{{imgText}}</p>
          </div>
        </div>

        <div class="gallery animate" :class="{active:isShare}">
          <div class="shareImg">
            <img src="https://img.kanhua.yiwaiart.com/EY_img_tips@2x.png" alt="">
          </div>
            <span class="closeBtn" @click="closeShare">我知道了</span>
        </div>

        <div class="pop" v-if="isLandspace">
                    <div class="popImg"></div>
                    <p class="tips">为了更好的体验，请将手机/平板竖起</p>
        </div>
  </div>

</template>

<script>
import { isAndroid, isIos } from '../util/index'
import router from '../router/index'
import Flickity from 'vue-flickity'
import wx from 'weixin-js-sdk'

export default {
  name: 'Loser',
  inject: ['reload'],
  data() {
    return {
      isPlay: false,
      isFullScreen: false,
      showEmptypage: true,
      index: 0,
      currentAudio: null,
      bgAudio: null,
      galleryImgSrc: '',
      isMark: false,
      isLandspace: true, //判断横屏
      downloaded: false,
      userName: '',
      isShare: false,
      isShowLoad: true,
      showWeclome: true,
      showCard: false,
      isAnimate: false,
      showEnevlop: false,
      loadText: '放松下,加载中1%',
      isshowStar: false,
      showVideo: false,
      ishowPoster: true,
      showIndex: false,
      imgText: '',
      process: 0,
      isIphonex: false,
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false
      },
      shareData: {
        title: '伟大的落选者，越面对越勇敢',
        desc:
          '最后，这群所谓的“落选者”被称作伟大的印象派，成为人类头顶上璀璨的星辰',
        link: location.href.split('#')[0],
        imgUrl: 'https://img.kanhua.yiwaiart.com/Ey_logo_flat.png'
      },

      bgMusic: 'https://img.kanhua.yiwaiart.com/weida/bgmusic.mp3',
      isPlaybgMusic: true,
      isplayListMusic: false,
      preMusicUrl: '',
      musicList: [
        'https://img.kanhua.yiwaiart.com/luoxuanzhe/caodishang.mp3',
        'https://img.kanhua.yiwaiart.com/luoxuanzhe/richuyinxiang.mp3',
        'https://img.kanhua.yiwaiart.com/luoxuanzhe/wudaoke.mp3',
        'https://img.kanhua.yiwaiart.com/luoxuanzhe/chengyangsan.mp3',
        'https://img.kanhua.yiwaiart.com/luoxuanzhe/xiaoailin.mp3',
        'https://img.kanhua.yiwaiart.com/luoxuanzhe/shengweikeduoshan.mp3',
        'https://img.kanhua.yiwaiart.com/luoxuanzhe/xingkong.mp3',
        'https://img.kanhua.yiwaiart.com/womencongnalilai.mp3'
      ],
      preloadImg: [
        'https://img.kanhua.yiwaiart.com/EY_card_t_cao@2x1.png',
        'https://img.kanhua.yiwaiart.com/EY_card_t_ri@2x1.png',
        'https://img.kanhua.yiwaiart.com/EY_card_t_wu@2x1.png',
        'https://img.kanhua.yiwaiart.com/EY_card_t_cheng@2x1.png',
        'https://img.kanhua.yiwaiart.com/EY_card_t_xiao@2x1.png',
        'https://img.kanhua.yiwaiart.com/EY_card_t_sheng@2x1.png',
        'https://img.kanhua.yiwaiart.com/EY_card_t_xing@2x1.png',
        'https://img.kanhua.yiwaiart.com/EY_card_t_wo@2x1.png',
        'https://img.kanhua.yiwaiart.com/EY_btn_sound.gif',
        'https://img.kanhua.yiwaiart.com/weidadeluoxuanzhe/Spinner-1s-119px.gif'
      ],
      slideList: [
        {
          cardTopImg: 'https://img.kanhua.yiwaiart.com/EY_card_t_cao@2x1.png',
          cardTopLargeImg:
            'https://img.kanhua.yiwaiart.com/EY_card_t_caoIphoneX@2x.png',
          cardBottomImg: 'https://img.kanhua.yiwaiart.com/EY_card_d_cao@2x.png',
          cardFullImg:
            'https://img.kanhua.yiwaiart.com/EY_card_f_cao.jpg?imageView2/0/w/1920/h/1080/interlace/1',
          closeUrl:
            'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png',
          isPlay: false,
          isMake: false,
          isLoading: true,
          size: '2.5M'
        },
        {
          cardTopImg: 'https://img.kanhua.yiwaiart.com/EY_card_t_ri@2x1.png',
          cardTopLargeImg:
            'https://img.kanhua.yiwaiart.com/EY_card_t_riIphoneX@2x.png',
          cardBottomImg: 'https://img.kanhua.yiwaiart.com/EY_card_d_ri@2x.png',
          cardFullImg:
            'https://img.kanhua.yiwaiart.com/EY_card_f_ri.jpg?imageView2/0/w/1920/h/1080/interlace/1',
          closeUrl:
            'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png',
          isPlay: false,
          isMake: false,
          isLoading: true,
          size: '2M'
        },
        {
          cardTopImg: 'https://img.kanhua.yiwaiart.com/EY_card_t_wu@2x1.png',
          cardBottomImg: 'https://img.kanhua.yiwaiart.com/EY_card_d_wu@2x.png',
          cardTopLargeImg:
            'https://img.kanhua.yiwaiart.com/EY_card_t_wuIphoneX@2x.png',
          cardFullImg:
            'https://img.kanhua.yiwaiart.com/EY_card_f_wu.jpg?imageView2/0/w/1920/h/1080/interlace/1',
          closeUrl:
            'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png',
          isPlay: false,
          isMake: false,
          isLoading: true,
          size: '1.7M'
        },
        {
          cardTopImg: 'https://img.kanhua.yiwaiart.com/EY_card_t_cheng@2x1.png',
          cardTopLargeImg:
            'https://img.kanhua.yiwaiart.com/EY_card_t_chengIphoneX@2x.png',
          cardBottomImg:
            'https://img.kanhua.yiwaiart.com/EY_card_d_cheng@2x.png',
          cardFullImg:
            'https://img.kanhua.yiwaiart.com/EY_card_f_cheng.jpg?imageView2/0/w/1920/h/1080/interlace/1',
          closeUrl:
            'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png',
          isPlay: false,
          isMake: false,
          isLoading: true,
          size: '2.4M'
        },
        {
          cardTopImg: 'https://img.kanhua.yiwaiart.com/EY_card_t_xiao@2x1.png',
          cardTopLargeImg:
            'https://img.kanhua.yiwaiart.com/EY_card_t_xiaoIphoneX@2x.png',
          cardBottomImg:
            'https://img.kanhua.yiwaiart.com/EY_card_d_xiao2@2x.png',
          cardFullImg:
            'https://img.kanhua.yiwaiart.com/EY_card_f_xiao.jpg?imageView2/0/w/1920/h/1080/interlace/1',
          closeUrl:
            'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png',
          isPlay: false,
          isMake: false,
          isLoading: true,
          size: '2.3M'
        },
        {
          cardTopImg: 'https://img.kanhua.yiwaiart.com/EY_card_t_sheng@2x1.png',
          cardTopLargeImg:
            'https://img.kanhua.yiwaiart.com/EY_card_t_shengIphoneX@2x.png',
          cardBottomImg:
            'https://img.kanhua.yiwaiart.com/EY_card_d_sheng@2x.png',
          cardFullImg:
            'https://img.kanhua.yiwaiart.com/EY_card_f_sheng.jpg?imageView2/0/w/1920/h/1080/interlace/1',
          closeUrl:
            'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png',
          isPlay: false,
          isMake: false,
          isLoading: true,
          size: '3M'
        },
        {
          cardTopImg: 'https://img.kanhua.yiwaiart.com/EY_card_t_xing@2x1.png',
          cardTopLargeImg:
            'https://img.kanhua.yiwaiart.com/EY_card_t_xingIphoneX@2x.png',
          cardBottomImg:
            'https://img.kanhua.yiwaiart.com/EY_card_d_xing@2x.png',
          cardFullImg:
            'https://img.kanhua.yiwaiart.com/EY_card_f_xing.jpg?imageView2/0/w/1920/h/1080/interlace/1',
          closeUrl:
            'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png',
          isPlay: false,
          isMake: false,
          isLoading: true,
          size: '3.1M'
        },
        {
          cardTopImg: 'https://img.kanhua.yiwaiart.com/EY_card_t_wo@2x1.png',
          cardTopLargeImg:
            'https://img.kanhua.yiwaiart.com/EY_card_t_woIphoneX@2x.png',
          cardBottomImg: 'https://img.kanhua.yiwaiart.com/EY_card_d_wo@2x.png',
          cardFullImg:
            'https://img.kanhua.yiwaiart.com/EY_card_f_wo.jpg?imageView2/0/w/1920/h/1080/interlace/1',
          closeUrl:
            'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png',
          isPlay: false,
          isMake: false,
          isLoading: true,
          size: '2.3M'
        },
        {}
      ]
    }
  },
  components: {
    Flickity
  },
  methods: {
    endMusic() {
      this.slideList[this.index].isPlay = false
      this.slideList[this.index].closeUrl =
        'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png'
    },
    canPlayMusic() {
      this.slideList[this.index].isLoading = false
      this.slideList[this.index].isPlay = true
      this.slideList[this.index].closeUrl =
        'https://img.kanhua.yiwaiart.com/EY_btn_sound.gif'
    },
    playMusic() {
      this.slideList[this.index].closeUrl =
        'https://img.kanhua.yiwaiart.com/EY_btn_sound.gif'
      this.slideList[this.index].isPlay = true
      if (this.bgAudio) {
        this.bgAudio.pause()
      }
    },
    pauseMusic() {
      this.slideList[this.index].isPlay = false
      this.slideList[this.index].closeUrl =
        'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png'
      if (this.bgAudio) {
        this.bgAudio.play()
      }
    },

    HTML5Audio(url, loop, index) {
      if (url == this.preMusicUrl) {
        if (this.currentAudio) {
          if (this.slideList[index].isPlay) {
            this.currentAudio.pause()
            this.slideList[index].isPlay = false
            if (this.bgAudio) {
              this.bgAudio.play()
            }
          } else {
            this.slideList[index].isPlay = true
            this.currentAudio.play()
            if (this.bgAudio) {
              this.bgAudio.pause()
            }
          }
        }
      } else {
        if (this.currentAudio) {
          this.currentAudio.pause()
          this.currentAudio.currentTime = 0
          this.currentAudio = null
        }
        this.preMusicUrl = url
        this.currentAudio = new Audio(url)
        this.currentAudio.loop = loop || false
        this.currentAudio.preload = 'auto'
        this.currentAudio.play()
      }
      this.currentAudio.removeEventListener('ended', this.endMusic, false)
      this.currentAudio.addEventListener('ended', this.endMusic, false)
      this.currentAudio.removeEventListener('pause', this.pauseMusic, false)
      this.currentAudio.addEventListener('pause', this.pauseMusic, false)
      this.currentAudio.removeEventListener('play', this.playMusic, false)
      this.currentAudio.addEventListener('play', this.playMusic, false)
      this.currentAudio.removeEventListener('canplay', this.canPlayMusic, false)
      this.currentAudio.addEventListener('canplay', this.canPlayMusic, false)
    },

    getPercent(num, total) {
      num = parseFloat(num)
      total = parseFloat(total)
      if (isNaN(num) || isNaN(total)) {
        return '-'
      }
      return total <= 0 ? '0%' : Math.round(num / total * 10000) / 100 + '%'
    },

    // loading
    loading() {
      setInterval(() => {
        let temp = this.getPercent(this.process, 100)
        this.loadText = '放松下,加载中' + temp
        if (this.process == 100) {
          setTimeout(() => {
            this.isshowStar = true
            this.ishowPoster = false
            this.showWeclome = false
            this.showEmptypage = false
          }, 500)
        }
      }, 100)
    },

    //下载图片
    downloadImg() {
      let that = this
      let img = new Image()
      img.src = that.galleryImgSrc.split('?')[0]
      that.imgText = '下载中...'
      img.onload = function() {
        that.galleryImgSrc = img.src
        setTimeout(() => {
          that.imgText = '长按图片保存'
        }, 1000)
      }
    },

    closeShare() {
      this.isShare = false
    },

    // 再玩一次
    playAgain() {
      this.reload()
      this.resetAudio()
    },

    closeModal() {
      this.isMark = false
      this.slideList.map(item => {
        item.isMake = false
      })
    },

    playBgMusic() {
      if (this.bgAudio) {
        this.bgAudio.play()
      } else {
        this.bgAudio = new Audio(this.bgMusic)
        this.bgAudio.loop = true
        this.bgAudio.preload = 'auto'
      }
    },

    // 进入视频播放
    showCardList() {
      this.$refs.video.play()
      setTimeout(() => {
        this.showVideo = true
        this.isshowStar = false
      }, 500)
    },

    // 播放卡片音乐
    play(index) {
      let indexTemp = index
      this.index = index
      this.slideList.map((item, index) => {
        if (indexTemp !== index) {
          if (item.closeUrl) {
            item.isPlay = false
            item.closeUrl =
              'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png'
            item.isLoading = true
          }
        }
      })
      let url = this.musicList[indexTemp]

      this.HTML5Audio(url, true, indexTemp)
      // if(this.slideList[indexTemp].isLoading){
      //   this.slideList[indexTemp].closeUrl = 'https://img.kanhua.yiwaiart.com/weidadeluoxuanzhe/Spinner-1s-119px.gif'
      // }
      if (this.slideList[indexTemp].isPlay) {
        this.slideList[indexTemp].closeUrl =
          'https://img.kanhua.yiwaiart.com/EY_btn_sound.gif'
      } else {
        this.slideList[indexTemp].closeUrl =
          'https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_btn_sound_stop.png'
      }
    },

    // 制作壁纸
    makeBg(index) {
      this.slideList.map(item => {
        item.isMake = false
      })
      this.slideList[index].isMake = true
      this.galleryImgSrc = this.slideList[index].cardFullImg
      let size = this.slideList[index].size
      setTimeout(() => {
        this.isMark = true
        this.imgText = `下载原图 (${size})`
      }, 500)

      if (this.slideList[this.index].isPlay) {
        if (this.bgAudio) {
          this.bgAudio.pause()
        }
      } else {
        if (this.bgAudio) {
          this.bgAudio.play()
        }
      }
    },

    //微信授权
    getOpenId(code) {
      let that = this
      this.$axios
        .post('https://aws.yiwaiart.com/aws/h5Auth/v1', {
          data: {
            code: code
          }
        })
        .then(data => {
          that.userName = data.result.data.nickName
        })
    },

    openShare() {
      this.isShare = true
    },

    // 信封动画
    openEnvelop() {
      let that = this
      if (that.userName) {
        this.showCard = false
        this.showEnevlop = true
        if (that.currentAudio) {
          that.currentAudio.pause()
          that.currentAudio = null
        }
        if (this.bgAudio) {
          this.bgAudio.play()
        }
        Velocity.animate(
          this.$refs.envelop,
          {
            translateZ: 0,
            translateY: '170.9871245%',
            rotateZ: '360deg',
            scale: 1.407
          },
          {
            delay: 500,
            duration: 1000
          }
        ).then(function() {
          Velocity.animate(
            that.$refs.envelop,
            {
              opacity: 0
            },
            { display: 'none' },
            1000
          )
          Velocity.animate(
            that.$refs.envelop_wrap,
            {
              opacity: 1
            },
            1000
          ).then(function() {
            Velocity.animate(
              that.$refs.envelopClose,
              {
                rotateX: '90deg'
              },
              {
                duration: 1500
              }
            )
            Velocity.animate(
              that.$refs.evevlopOpen,
              { rotateX: '-90deg' },
              1500
            ).then(function() {
              that.showIndex = true
              that.isAnimate = true

              // Velocity.animate(
              //   that.$refs.envelopForm,
              //   { height: '570px' },
              //   2000
              // )
              // Velocity.animate(that.$refs.evevlopOpen, { rotateX: '90deg' }, 2000).then(function() {
              //   // Velocity.animate(that.$refs.envelopForm, { height: '570px' }, 4000)
              //
              // })
            })
          })
        })
      } else {
        that.$toast('请输入姓名', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 3000,
          mode: 'queue',
          transition: 'fade',
          className: ['', 'my-class']
        })
      }
    },

    //判断微信
    isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },

    // 微信授权
    wexinAuth() {
      const AppId = 'wx6022690fbea6af8f'
      const local = location.href.split('#')[0]
      //const code = getURLParam('code')
      const code = '033rlon22GcnBX0y9Hk22NWrn22rlonI'
      if (code === null || code === '') {
        window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${AppId}&redirect_uri=${encodeURIComponent(
          local
        )}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
      } else {
        this.getOpenId(code)
      }
    },

    // 微信分享
    wxShareed() {
      let that = this
      let appId = 'wx6022690fbea6af8f'
      let hrefLoadcation = location.href.split('#')[0]
      let encodeHref = encodeURIComponent(hrefLoadcation)
      let url = `https://api.h5.yiwaiart.com/wx/get_token?appid=${appId}&url=${encodeHref}`

      this.$axios.get(url).then(function(res) {
        wx.config({
          debug: false,
          appId: appId,
          timestamp: res.data.data.timestamp,
          nonceStr: res.data.data.nonceStr,
          signature: res.data.data.signature,
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo'
          ]
        })
      })

      wx.ready(function() {
        wx.onMenuShareAppMessage(that.shareData)
        wx.onMenuShareTimeline(that.shareData)
      })
    },

    loadImage(url) {
      let that = this
      let img = new Image()
      img.src = url

      img.onload = function() {
        that.process += 10
      }
    },

    // 重置audio
    resetAudio() {
      if (this.bgAudio) {
        this.bgAudio.pause()
        this.bgAudio.currentTime = 0
        this.bgAudio = null
      }
      if (this.currentAudio) {
        this.currentAudio.pause()
        this.currentAudio.currentTime = 0
        this.currentAudio = null
      }
    }
  },

  updated() {},

  mounted() {
    let that = this

    let height = window.innerHeight
    let width = window.innerWidth
    if (this.$refs.video) {
      this.$refs.video.onplay = function() {
        setTimeout(function() {
          let onplay = setInterval(function() {
            if (that.$refs.video.currentTime && that.$refs.video.duration) {
              if (that.$refs.video.currentTime >= that.$refs.video.duration) {
                that.$refs.video.pause()
                if (isAndroid()) {
                  that.$refs.video.style.display = 'none'
                }
                that.showCard = true
                Velocity.animate(
                  that.$refs.videoBg,
                  {
                    opacity: 0
                  },
                  {
                    duration: 1000
                  }
                ).then(function() {
                  Velocity.animate(
                    that.$refs.slideWrap,
                    {
                      opacity: 1
                    },
                    {
                      duration: 1000
                    }
                  )
                })
                clearInterval(onplay)
              }
            }
          }, 41.6666)
        }, 2000)
      }

      // that.$refs.video.addEventListener('timeupdate', function() {
      //     if (that.$refs.video.currentTime > 0.1) {
      //       // that.showVideo = true
      //       // that.isshowStar = false
      //     }
      //   })
    }
    console.log(this.showEmptypage)

    that.loading()

    that.wxShareed()

    that.playBgMusic()

    that.preloadImg.map(item => {
      that.loadImage(item)
    })
    if (this.$refs.star) {
      Velocity(
        this.$refs.star,
        {
          opacity: 0,
          scale: 1
        },
        {
          duration: 1200,
          loop: true
        }
      )
    }

    //if (this.isWeiXin()) {
    //this.wexinAuth()
    //}
  },
  watch: {
    showCard: function(val) {
      let that = this
      if (val) {
        setTimeout(() => {
          that.$refs.flickity.on('change', function() {
            if (that.bgAudio) {
              that.bgAudio.play()
            }
            if (that.$refs.slide) {
              Velocity(
                that.$refs.slide,
                {
                  opacity: 0
                },
                {
                  duration: 1000
                }
              )
            }
          })
        }, 50)
      }
    }
  },
  created() {
    let android = window.navigator.userAgent.indexOf('Android')
    let winDPI = window.devicePixelRatio
    let uAgent = window.navigator.userAgent
    let screenHeight = window.screen.height
    let screenWidth = window.screen.width
    let winWidth = window.innerWidth
    let winHeight = window.innerHeight

    if (winHeight / winWidth > 16 / 9) {
      this.isIphonex = true
      if (isAndroid()) {
        this.isFullScreen = true
      }
    }

    // if (winDPI == 3 && screenHeight == 812 && screenWidth == 375) {
    //   this.isIphonex = true
    // }
    console.log(this.showEmptypage)
    console.log(
      'Windows DPI:' +
        winDPI +
        ';\ruAgent:' +
        uAgent +
        ';\rScreen Width:' +
        screenWidth +
        ';\rScreen Height:' +
        screenHeight +
        ';\rWindow Width:' +
        winWidth +
        ';\rWindow Height:' +
        winHeight
    )
    if (isAndroid()) {
      this.isLandspace = false
    }
  },
  destroyed() {
    this.resetAudio()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.slide-bg {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: url('https://img.kanhua.yiwaiart.com/EY_bg_shalong@2x.jpg')
    no-repeat center center;
  background-size: cover;
  overflow: hidden;
  transform: translate3d(0, 0, 0);
}
.title-img-wrap {
  width: 526px;
  height: 165px;
  margin: 60px auto 20px;
  background: url('https://img.kanhua.yiwaiart.com/EY_top_title@2x.png')
    no-repeat center center;
  background-size: cover;
}
.title-img-wrap.iphonex {
  margin: 80px auto 65px;
}

.card-t_wrap {
  position: absolute;
  width: 505px;
  height: 559px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
}
.card-t_wrap.iphonex {
  width: 505px;
  height: 607px;
}

.card-d_wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 505px;
  height: 300px;
}

strong {
  font-size: 36px;
}

.card-close_wrap {
  width: 119px;
  height: 107px;
  bottom: 20px;
  right: 8px;
  position: absolute;
}
.card-close {
  width: 100%;
  height: 100%;
}

.carousel-cell.is-selected {
  transform: scale(1);
  -webkit-transform: scale(1);
  transition: all 0.3s;
}
.flickity-viewport {
  overflow: visible;
}
.carousel {
  position: relative;
}

.carousel-cell {
  position: relative;
  height: 860px;
  width: 505px;
  display: -ms-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  margin-left: 30px;
  border-radius: 5px;
  transform: scale(1);
  -webkit-transform: scale(1);
  color: #fff;
  box-shadow: -5px -5px 27px #ccc;
}
.carousel-cell.iphonex {
  height: 908px;
}

.carousel-cell:last-child {
  box-shadow: none;
}

.slideLast {
  transform: translate(5px, -20%);
  width: 481px;
  height: 233px;
}
.slideLast p {
  padding: 10px 0;
}

img {
  width: 100%;
  height: 100%;
}

.envelop {
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -240px;
  margin-top: -116px;
  width: 481px;
  height: 233px;
  transform-origin: center center;
  background: url('https://img.kanhua.yiwaiart.com/EY_btn_envelopeclosed@2x.png')
    no-repeat center center;
  background-size: 481px 233px;
}

.carousel-cell:after {
  font-size: 42px;
  content: '';
}
button.is-blue {
  background-color: #539bb9;
  border-color: transparent;
  color: #fff;
}
button.is-blue:hover {
  background-color: #468eac;
  border-color: transparent;
  color: #fff;
}
.slide-selectors,
.slide-selectors .slide-selector {
  display: -ms-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
  justify-content: center;
}
.slide-selectors .slide-selector {
  color: #fff;
  font-size: 14px;
  height: 50px;
  width: 50px;
  margin: 5px;
  cursor: pointer;
}

.gallery {
  display: none;
  opacity: 0.5;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}
.gallery.iphonex {
  background-color: rgba(255, 255, 255, 1);
}
.gallery.active {
  display: block;
  opacity: 1;
}

.gallery .download {
  position: absolute;
  bottom: 78px;
  color: #000;
  left: 50%;
  font-size: 28px;
  width: 250px;
  border-radius: 10px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #fff;
  transform: translate(-50%);
  text-decoration: none;
  z-index: 11;
}

.gallery.iphonex .download {
  border: 1px solid #ccc;
}

.gallery .download.active {
  background-color: transparent;
}

.animate {
  -webkit-animation-duration: 0.6s;
  animation-duration: 0.6s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}
.rotateOutDownRight {
  animation-name: rotateOutDownRight;
}

@keyframes rotateOutDownRight {
  from {
    transform-origin: right bottom;
    opacity: 1;
  }

  to {
    transform-origin: right bottom;
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }
}

@keyframes zoomIn {
  from {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }

  to {
    opacity: 0;
    transform: scale3d(5, 5, 5);
  }
}

.zoomIn {
  animation-duration: 1s;
  animation-delay: 0.3s;
  animation-name: zoomIn;
}
.VideoBg {
  position: relative;
  background-size: cover;
  background-position: center;
  overflow: hidden;
  height: 100%;
}
.VideoBg video {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 11;
}
.show {
  display: block;
}

.VideoBg__content {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  bottom: 0;
  background: url('https://img.kanhua.yiwaiart.com/weidadeluoxuanzhe/luoxuan1080000.jpg')
    no-repeat center center;
  background-size: cover;
  color: #fff;
  visibility: visible;
  z-index: 11;
}
.VideoBg__content.hidden {
  visibility: hidden;
}

.VideoBg_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.star {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 164px;
  height: 164px;
  margin-left: -82px;
  margin-top: -155px;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  background: url('https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_img_star@2x.png')
    no-repeat center center;
  background-size: cover;
}

.starBg {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  bottom: 0;
  background: url('https://img.kanhua.yiwaiart.com/noStar.jpg') no-repeat center
    center;
  background-size: cover;
}

.bgImg {
  max-width: 100%;
  display: block;
}

.shareImg {
  width: 563px;
  height: 453px;
  position: absolute;
  left: 50%;
  transform: translate(-40%, 0);
}

.envelop_show {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: url('https://img.kanhua.yiwaiart.com/EY_bg_shalong@2x.jpg')
    no-repeat center center;
  background-size: cover;
}

.envelop_wrap {
  position: absolute;
  left: 50%;
  bottom: 66px;
  margin-left: -338px;
  width: 677px;
  height: 337px;
  opacity: 0;
}

.envelop_wrap.iphonex {
  bottom: 186px;
}
.envelop_wrap.iphonex.fullScreen {
  bottom: 106px;
}

.envelopClose_wrap {
  position: absolute;
  left: 0;
  top: 1px;
  right: 0;
  z-index: 11;
  width: 677px;
  height: 169px;
  padding: 0 4px;
}

.envelopClose {
  transform-origin: center top;
}
.envelopOpen_wrap {
  position: absolute;
  left: 0;
  top: -159px;
  right: 0;
  z-index: 9;
  width: 677px;
  height: 169px;
  padding: 0 4px;
}
.envelopOpen {
  transform-origin: center bottom;
}
.envelopCover_wrap {
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  width: 677px;
  height: 337px;
  z-index: 9;
}

.envelopCover {
  transform-origin: center bottom;
}

.envelopShare {
  position: absolute;
  bottom: 180px;
  right: 0;
  left: 50%;
  margin-left: -59px;
  width: 117px;
  height: 114px;
  z-index: 10;
  background: url('https://img.kanhua.yiwaiart.com/weidaluoxuanzheEY_btn_share@2x.png')
    no-repeat center center;
  background-size: cover;
}
.envelopShare.active {
  z-index: 12;
}

.envelopShare_word {
  position: absolute;
  right: 0;
  left: 50%;
  width: 117px;
  bottom: 140px;
  z-index: 10;
  margin-left: -59px;
}

.envelp_content_form {
  position: absolute;
  left: 50%;
  margin-left: -338px;
  width: 677px;
  height: 297px;
  bottom: 30px;
  overflow: hidden;
}

@keyframes evenlopAnimation {
  0% {
    height: 297px;
  }
  100% {
    height: 1009px;
  }
}

@keyframes envelopAnimationIphonex {
  0% {
    height: 297px;
  }
  100% {
    height: 1123px;
  }
}
.envelp_content_form.transition {
  /* height: 1009px; */
  animation: evenlopAnimation 4s linear forwards;
}

.envelp_content_form.iphonex.transition {
  /* height: 1123px; */
  animation: envelopAnimationIphonex 4s linear forwards;
}

.envelp_content_form-bg {
  position: absolute;
  left: 50%;
  width: 622px;
  height: 1009px;
  z-index: 3;
  margin-left: -311px;
  background: url('https://img.kanhua.yiwaiart.com/paper@2x.png') no-repeat
    center center;
  background-size: cover;
}

.envelop_content_form-hello {
  position: absolute;
  top: 80px;
  left: 50%;
  width: 677px;
  color: #42596d;
  margin-left: -338px;
}
.logo {
  position: absolute;
  top: 33px;
  right: 33px;
  width: 81px;
  height: 89px;
}

.again {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 50px;
  height: 50px;
  z-index: 12;
  background: url('https://img.kanhua.yiwaiart.com/EY_btn_agin@2x.png')
    no-repeat center center;
  background-size: cover;
}

.again_word {
  position: absolute;
  top: 72px;
  right: 16px;
  width: 50px;
  margin: 0;
  height: 160px;
  color: #fff;
}
.close {
  position: absolute;
  right: 21px;
  top: 21px;
  display: inline-block;
  width: 50px;
  padding: 8px;
  height: 50px;
  background: url('../assets/EY_btn_close@2x.png') no-repeat center center;
  background-size: cover;
}

.carouselInner {
  position: relative;
  width: 100%;
  height: 100%;
}
.closeBtn {
  display: inline-block;
  width: 250px;
  height: 60px;
  background-color: #fff;
  line-height: 60px;
  color: #000;
  font-size: 28px;
  border-radius: 10px;
  margin-top: 498px;
  box-shadow: 12px 0px 35px rgba(0, 0, 0, 0.5);
}

.slide-tip {
  position: absolute;
  left: 72px;
  width: 23px;
  height: 195px;
  bottom: 0;
  top: 50%;
  color: #fff;
  font-size: 24px;
  margin-top: -98px;
}

.logo_wrap {
  display: inline-block;
  height: 131px;
  width: 119px;
}

.logo-word {
  margin: 20px 0 30px;
  font-size: 26px;
  color: #fff;
}

video::-internal-media-controls-download-button {
  display: none;
}

video::-webkit-media-controls-enclosure {
  overflow: hidden;
}

video::-webkit-media-controls-panel {
  width: calc(100% + 30px);
}

.pop {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #666;
  z-index: 9999;
  display: none;
}

.pop .tips {
  width: 100%;
  height: 40px;
  font-size: 16px;
  color: #ffffff;
  text-align: center;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: 120px;
}

.pop .popImg {
  width: 300px;
  height: 198px;
  background: url('https://img.kanhua.yiwaiart.com/scape.png') no-repeat;
  background-size: cover;
  position: absolute;
  left: 50%;
  margin-left: -150px;
  top: 50%;
  margin-top: -130px;
  animation: rotateA 1.5s ease infinite alternate;
}

@keyframes rotateA {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(-90deg);
  }
  100% {
    transform: rotate(-90deg);
  }
}

@media screen and (orientation: landscape) {
  .pop {
    display: block;
  }
}

.name-input_bg {
  position: relative;
  width: 488px;
  height: 117px;
  background: url('https://img.kanhua.yiwaiart.com/weidaluoxuanzhe/EY_img_username@2x.png')
    no-repeat center center;
  background-size: cover;
  border: none;
  text-align: center;
  margin-bottom: 100px;
}
.name-input_bg.iphonex {
  margin-bottom: 200px;
}
p.iphonex {
  margin-top: 20px;
}
.name-input {
  width: 442px;
  height: 79px;
  line-height: 79px;
  position: absolute;
  top: 19px;
  left: 23px;
  bottom: 0;
  right: 0;
  color: #fff;
  font-size: 36px;
  text-align: center;
  border-radius: 11px;
  border: none;
  background-color: transparent;
}
.name-input:focus {
  outline: none;
}

.star_word {
  font-size: 28px;
  transform: translateY(65px);
}
::-webkit-input-placeholder {
  color: #fff;
}

.toast-warning {
  top: 10px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
  opacity: 0;
}

.empty_fullPage {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 10;
}
</style>
