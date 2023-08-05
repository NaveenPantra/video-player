import Hls from "hls.js";
import './video.css'
import {getNormalizedValue, getTimeInMinAndSec} from "./utils.js";

// TODO: change here
let VIDEO_M3U8= './assets/output.m3u8'

let updateProgressAnimId = 0;

const PLAY_ICON = '<ion-icon name="play"></ion-icon>'
const PAUSE_ICON = '<ion-icon name="pause"></ion-icon>'
const FULL_VOL_ICON = '<ion-icon name="volume-high"></ion-icon>'
const MUTE_ICON = '<ion-icon name="volume-mute"></ion-icon>'
const PIC_IN_PIC = '<ion-icon name="tv"></ion-icon>'
const EXIT_PIC_IN_PIC = '<ion-icon name="tablet-landscape"></ion-icon>'
const FULL_SCREEN_ICON = '<ion-icon name="scan-outline"></ion-icon>'
const EXIT_FULL_SCREEN_ICON = '<ion-icon name="exit"></ion-icon>'

const videoWrapper = document.querySelector('.video-wrapper')
const vid = document.getElementById('video')
const videoControls = document.querySelector('.video-controls')
const playPauseButton = document.getElementById('play-pause-btn')
const seekBackwards = document.getElementById('seek-bwd-btn')
const seekForwards = document.getElementById('seek-fwd-btn')
const volCtrl = document.getElementById('vol-ctrl-btn')
const currentTime = document.getElementById('vid-cur-time')
const totalDuration = document.getElementById('vid-total-time')
const captions = document.getElementById('captions-btn')
const fullScreen = document.getElementById('vid-full-screen-btn')
const settings = document.getElementById('vid-settings-btn')
const picInPic = document.getElementById('pic-in-pic-btn')
const videoProgressNormal = document.querySelector('.video-progress-container-normal')
const videoProgressNormalTimeline = document.querySelector('.video-progress-normal-timeline-bar')

if (Hls.isSupported()) {
    // console.log('Hls is supported!')
    var hls = new Hls()
    window.hls = hls
    hls.loadSource(VIDEO_M3U8)
    hls.attachMedia(vid)
}


vid.addEventListener('loadedmetadata', () => {
    handleVideoControlsWidth()
    updateTotalDuration()
    updateCurrentTime()
})

vid.addEventListener('timeupdate', () => {
    updateCurrentTime()
    cancelAnimationFrame(updateProgressAnimId)
    updateProgressAnimId = requestAnimationFrame(updateProgressNormal)
})

function updateTotalDuration() {
    window.startViewTransition(() => {
        totalDuration.textContent = getTimeInMinAndSec(vid.duration)
    })
}

function updateCurrentTime() {
    window.startViewTransition(() => {
        currentTime.textContent = getTimeInMinAndSec(vid.currentTime)
    })
}

vid.addEventListener('play', () => {
    updatePlayPauseIcon()
    updateProgressAnimId = requestAnimationFrame(updateProgressNormal)
})
vid.addEventListener('pause', () => {
    updatePlayPauseIcon()
    cancelAnimationFrame(updateProgressAnimId)
})

playPauseButton.addEventListener('click', () => {
    updatePlayPauseIconState()
})

function updatePlayPauseIconState() {
    if (vid.paused) {
        vid.play()
    } else {
        vid.pause()
    }
}

function updatePlayPauseIcon() {
    let icon =  PAUSE_ICON
    if (vid.paused) {
        icon = PLAY_ICON
    }
    window.startViewTransition(() => {
        playPauseButton.innerHTML = icon
    })
}

fullScreen.addEventListener('click', () => {
    handleFullScreen()
})

function handleFullScreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen().then(() => {
            updateFullscreenIcon()
        })
    } else {
        videoWrapper.requestFullscreen().then(() => {
            updateFullscreenIcon()
        })
    }
}

function updateFullscreenIcon() {
    let icon = FULL_SCREEN_ICON
    if (document.fullscreenElement) {
        icon = EXIT_FULL_SCREEN_ICON
    }
    window.startViewTransition(() => {
        fullScreen.innerHTML = icon
    })
}

seekBackwards.addEventListener('click', () => {
    vid.currentTime = Math.max(0, vid.currentTime - 10)
})

seekForwards.addEventListener('click', () => {
    vid.currentTime = Math.min(vid.duration, vid.currentTime + 10)
})

vid.addEventListener('volumechange', () => {
    toggleMuteIcon()
})

volCtrl.addEventListener('click', () => {
    if (vid.volume === 0) {
        vid.volume = 1
    } else {
        vid.volume = 0
    }
})

function toggleMuteIcon() {
    let icon = FULL_VOL_ICON
    if (vid.volume === 0) {
        icon = MUTE_ICON
    }
    window.startViewTransition(() => {
        volCtrl.innerHTML = icon
    })
}

picInPic.addEventListener('click', () => {
    if (!document.pictureInPictureElement) {
        vid.requestPictureInPicture().then(() => {
            updatePicInPicIcon()
        })
    } else {
        document.exitPictureInPicture().then(() => {
            updatePicInPicIcon()
        })
    }
})

function updatePicInPicIcon() {
    let icon = PIC_IN_PIC
    if (document.pictureInPictureElement) {
        icon = EXIT_PIC_IN_PIC
    }
    window.startViewTransition(() => {
        picInPic.innerHTML = icon
    })
}

window.counter = 0
function updateProgressNormal() {
    window.counter = 0 || window.counter + 1
    const scalePercentage = getNormalizedValue({
        min: 0,
        max: vid.duration,
        val: vid.currentTime,
    })
    videoProgressNormalTimeline.style.setProperty('scale', `${scalePercentage} 1`)
    if (vid.paused) {
        cancelAnimationFrame(updateProgressAnimId)
        return
    }
    updateProgressAnimId = requestAnimationFrame(updateProgressNormal)
}

videoProgressNormal.addEventListener('click', (event) => {
    const {currentTarget, x: mouseX = 0} = event
    const {x, width = 0} = currentTarget.getClientRects()[0]
    const clickPercentage = ((mouseX - x) / width) * 100
    vid.currentTime = (clickPercentage * vid.duration) / 100
    requestAnimationFrame(updateProgressNormal)

})

window.addEventListener('resize', () => {
    handleVideoControlsWidth()
})

function handleVideoControlsWidth() {
    const vidDim = vid.getClientRects();
    videoControls.style.setProperty('width', `${vidDim[0].width}px`)
}