const video = (id, src, poster = '') => {
    if (document.getElementById(id) === null) return;
    document.getElementById(id).innerHTML = `<video class="myVideo" id="my_${id}" style="object-fit:cover" poster="${poster}"  preload="auto" playsinline="true" webkit-playsinline="true" x-webkit-airplay="allow" airplay="allow" x5-video-player-type="h5" x5-video-player-fullscreen="true" x5-video-orientation="portrait" ></video>`;
    const $this = document.getElementById(`my_${id}`);
    $this.src = src;
    return $this;
};
export default video;