export const getURLParam = name => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

export const isAndroid = () => {
  return (
    window.navigator.userAgent.indexOf('Android') > -1 ||
    window.navigator.userAgent.indexOf('Adr') > -1
  )
}
export const isIos = () => {
  return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}

export const isFullScreen = () => {
  return window.innerHeight / window.innerWidth > 16 / 9
}

export const isIphonex = () => {
  return (
    isIos() &&
    window.devicePixelRatio === 3 &&
    window.screen.height === 812 &&
    window.screen.width === 375
  )
}

export const isWeixin = () => {
  let ua = window.navigator.userAgent.toLowerCase()
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}
