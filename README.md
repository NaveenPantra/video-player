# Video Player

## This is a simple POC project for hls (HTTP Live Screaming) player

### Project setup
- This project is set up with `vite`
- Download any video
- use `ffmpeg` to get `m3u8` for `hls`
    - Make sure to place this in `public` folder
    - In the below cmd replace your video files and output file `<input.mp4>` and `<output.m3u8>`
    - using cmd `ffmpeg -i <input.mp4> -c:v h264 -c:a aac -hls_time 10 -hls_list_size 0 <output.m3u8>`
    - Please wait for some time to get all the required files.
- Run `yarn` to install `vite` & `hls.js`
- Now update the  `VIDEO_M3U8` in  `video.js` file to the path of your file
- Run `yarn dev` to start the app.
- Run `yarn build` to get production build


### ffmpeg
- If your machine don't have `ffmpeg` install it via `brew` or any other sources and `ffprobe` should come with it. If not install it.
- To generate `m3u8`
  - Single size `ffmpeg -i input.mp4 -c:v h264 -c:a aac -hls_time 10 -hls_list_size 0 output.m3u8`
  - Multiple sizes 
  - ```ffmpeg -i input.mp4 -c:v h264 -c:a aac \
    -filter_complex "[0:v]scale=1920x1080[out1];[0:v]scale=1280x720[out2];[0:v]scale=854x480[out3]" \
    -map "[out1]" -map "[out2]" -map "[out3]" \
    -var_stream_map "v:0,v:1,v:2" \
    -f hls -hls_time 10 -hls_list_size 0 output.m3u8
    ```
- For poster at the center of the video
  - Ge the middle timestamp
    - `duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 input.mp4)`
    - `middle_timestamp=$(echo "scale=2; $duration / 2" | bc)`
    - Just verify the `middle_timestamp` with `echo $middle_timestamp`
    - Get the dimensions of the video to get the poster in the same dimension
    - `width=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=noprint_wrappers=1:nokey=1 input.mp4)`
    - `height=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of default=noprint_wrappers=1:nokey=1 input.mp4)`
    - Generate and save poster at `middle_timestamp` with `width * height`
    - `ffmpeg -ss $middle_timestamp -i input.mp4 -frames:v 1 -vf "scale=${width}:${height}" poster.jpg`
  - Poster with `5%` difference from `0%` to `95%`
    - Get the duration `duration=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 input.mp4)`
    - Get posters
      - ```interval=0
        while [ $interval -lt 100 ]; do
        timestamp=$(echo "scale=2; $duration * $interval / 100" | bc)
        output_file="poster-${interval}.jpg"
        ffmpeg -ss $timestamp -i input.mp4 -frames:v 1 -vf "scale=${width}:${height}" $output_file
        interval=$((interval + 5))
        done
        ```

### Features
- This is POC done for conversation analytics for [sellular](https://sellular.com)
- This POC also show the participants on the call and their speaking timelines and topics in the video.
- The topics/chapters will be shown in the timeline UI of the video like [youtube](https:///youtube.com).
- Keyboard shortcuts
  - `k` Pause/Play
  - `j` Skip back 10s
  - `l` Skip forward 10s
  - `m` Mute/Un-mute
  - `i` Picture in Picker
  - `t` Theater mode
  - `f` Full screen
  - `s` Cycle b/w playback speeds
  - `n` Start commenting at the current time of the video _(video will pause)_
- Once user starts commenting the keyboard shortcuts won't work until user focus on some other element.
- User can seek through the timeline of the video from participants timeline and also from topics timeline.

#### Screenshots
| ![1.jpg](assets%2F1.jpg) |    ![2.jpg](assets%2F2.jpg)    | ![3.jpg](assets%2F3.jpg) |
|:------------------------:|:------------------------------:|:------------------------:|
| Hover on video timeline  | Hover on participants timeline |    Commenting started    |
| ![4.jpg](assets%2F4.jpg) |    ![6.jpg](assets%2F6.jpg)    ||
|       Theater mode       |          Full screen           ||





#### This project is not for live-streaming purpose but to show the steaming of media file.
