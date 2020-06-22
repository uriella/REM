let isVideoStreaming = true;

const isImageLoaded = (img) => {
    return ((!img.complete) && (img.naturalWidth === 0));
}

document.addEventListener('DOMContentLoaded', function (event) {
  let streamUrl = "http://www.purpletart.com:7000/"
  const videoContainer = document.querySelector('.stream-container__video img');
  const startStreamButton = document.querySelector('.play-video');

  const stopStream = () => {
    videoContainer.style.display = 'none';
    startStreamButton.textContent = 'Play'
    isVideoStreaming = true;
  }
  const startStream = () => {
    videoContainer.style.display = 'block';
    videoContainer.src = `${streamUrl}`
    isVideoStreaming = false;    
    startStreamButton.textContent = 'Pause';

    while (isImageLoaded) {

    }
  };

  const toggleStream = () => {
    if (isVideoStreaming) {
        startStream();
    }
    else {
        stopStream();
    }
  }
  
  startStreamButton.addEventListener('click', toggleStream);
})
