const CSS_CENTERED = 'position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);';
let spinner = null;
let player = null;
const { createFFmpeg, fetchFile } = FFmpeg;
const ffmpeg = createFFmpeg({
  log: true,
  corePath: chrome.runtime.getURL('vendor/ffmpeg-core.js'),
});

const showPlayer = (data) => {
  player = document.createElement('video');
  player.style = CSS_CENTERED;
  player.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  player.controls = true;
  document.body.append(player);
}

const hidePlayer = () => {
  if (player !== null) {
    palyer.remove();
  }
}

const showSpinner = () => {
  spinner = document.createElement('img');
  spinner.src = chrome.runtime.getURL('assets/spinner.gif');
  spinner.style = CSS_CENTERED;
  document.body.append(spinner);
}

const hideSpinner = () => {
  if (spinner !== null) {
    spinner.remove();
  }
}

const transcode = async (file) => {
  hidePlayer();
  showSpinner();
  const name = 'video';
  if (! ffmpeg.isLoaded()){
    await ffmpeg.load();
  }
  
  ffmpeg.FS('writeFile', name, await fetchFile(file));
  await ffmpeg.run('-i', name,  'output.mp4');
  const data = ffmpeg.FS('readFile', 'output.mp4');

  hideSpinner();
  showPlayer(data);
}
