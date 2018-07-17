import request from 'libs/js/request';
const shareText = () => {
  const appId = 'wx6022690fbea6af8f';
  const baseUrl = 'https://artdnatest.yiwaiart.com';
  // 二次分享
  const shareData = {
    title: "探寻你的艺术基因",
    desc: '寻找你未曾发现的力量',
    link: baseUrl,
    imgUrl: 'https://img.kanhua.yiwaiart.com/h5/test1/test_log.jpg',
    trigger: function (res) {},
    success: function (res) {},
    cancel: function (res) {},
    fail: function (res) {},
    complete: function (res) {}
  };
  request.get('https://api.h5.yiwaiart.com/wx/get_token?appid=' + appId + '&url=' + encodeURIComponent(location.href.split('#')[0]), {}).then(({
    data: {
      timestamp,
      nonceStr,
      signature,
    }
  }) => {
    wx.config({
      debug: false,
      appId,
      timestamp,
      nonceStr,
      signature,
      jsApiList: [
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareWeibo'
      ]
    });
    wx.ready(function () {
      wx.onMenuShareAppMessage(shareData);
      wx.onMenuShareTimeline(shareData);
      wx.onMenuShareQQ(shareData);
      wx.onMenuShareWeibo(shareData);
    });
  });

}
export default shareText;