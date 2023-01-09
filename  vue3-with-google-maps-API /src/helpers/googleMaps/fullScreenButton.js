import { buttonsStyle, inactiveButtonStyle } from "./styles";

const full = `<svg
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
  stroke="inherit"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M18 6L6 18"
  stroke="inherit"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M18 10V6H14"
  stroke="inherit"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M6 14V18H10"
  stroke="inherit"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
</svg>`;
const small = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="inherit" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 8L8 16" stroke="inherit" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 5V8H19" stroke="inherit" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 19V16H5" stroke="inherit" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
export const initFullscreenControl = ({ controlWrapper, map }) => {
  const elementToSendFullscreen = map.getDiv().firstChild;

  const fullScreenButton = document.createElement("div");
  fullScreenButton.classList.add(...buttonsStyle, ...inactiveButtonStyle);
  fullScreenButton.innerHTML = full;

  controlWrapper.appendChild(fullScreenButton);

  fullScreenButton.onclick = () => {
    if (isFullscreen(elementToSendFullscreen)) {
      exitFullscreen();
    } else {
      requestFullscreen(elementToSendFullscreen);
    }
  };

  document.onwebkitfullscreenchange =
    document.onmsfullscreenchange =
    document.onmozfullscreenchange =
    document.onfullscreenchange =
      () => {
        if (isFullscreen(elementToSendFullscreen)) {
          fullScreenButton.innerHTML = small;
        } else {
          fullScreenButton.innerHTML = full;
        }
      };
};

const isFullscreen = (element) => {
  return (
    (document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement) == element
  );
};

const requestFullscreen = (element) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullScreen) {
    element.msRequestFullScreen();
  }
};

const exitFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};
