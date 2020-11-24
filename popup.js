document.getElementById('start').onclick = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      { code: `transcode("${document.getElementById('video-url').value}")` });
  });
};

document.getElementById('video-url').value = chrome.runtime.getURL('assets/video.flv');
