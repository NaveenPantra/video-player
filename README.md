# Video Player

### This is a simple POC project for hls (HTTP Live Screaming) player

### Project setup

- This project is set up with `vite`
- Download any video
- user `ffmpeg` to get `m3u8` for `hls`
    - Make sure to place this in `public` folder
    - In the below cmd replace your video files and output file `<input.mp4>` and `<output.m3u8>`
    - using cmd `ffmpeg -i <input.mp4> -c:v h264 -c:a aac -hls_time 10 -hls_list_size 0 <output.m3u8>`
    - Please wait for some time to get all the required files.
- Run `yarn` to install `vite` & `hls.js`
- Now update the  `VIDEO_M3U8` in  `video.js` file to the path of your file
- Run `yarn dev` to start the app.