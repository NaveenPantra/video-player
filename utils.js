function getTimeInMinAndSec(sec = 0) {
    let min = Math.floor(sec / 60);
    if (min > 0) {
        sec -= min * 60;
    }
    if (min === 0) {
        min = "00";
    } else if (min < 10) {
        min = `0${min}`;
    }
    sec = Math.floor(sec);
    if (sec === 0) {
        sec = "00";
    } else if (sec < 10) {
        sec = `0${sec}`;
    }
    return `${min}:${sec}`;
}

function getNormalizedValue({val = 0, min = 0, max = 0 } = {}) {
    return (val - min) / (max - min);
}

export {
    getTimeInMinAndSec,
    getNormalizedValue
}