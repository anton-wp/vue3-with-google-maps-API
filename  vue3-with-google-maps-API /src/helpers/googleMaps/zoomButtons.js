import { buttonsStyle, containerStyle, inactiveButtonStyle } from "./styles";

export const addCustomZoomButtons = (map) => {
  // Set CSS for the control wrapper
  const controlWrapper = document.createElement("div");
  controlWrapper.classList.add(...containerStyle, "ml-1");

  // Set CSS for the zoomIn
  const zoomInButton = document.createElement("div");
  zoomInButton.classList.add(...buttonsStyle, ...inactiveButtonStyle);
  zoomInButton.innerHTML = `<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7.66663 9.75H11.8333"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M9.75 11.8334V7.66669"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58335C17.5 5.2111 13.9555 1.66669 9.58329 1.66669C5.21104 1.66669 1.66663 5.2111 1.66663 9.58335C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M18.3333 18.3334L16.6666 16.6667"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

  controlWrapper.appendChild(zoomInButton);

  // Set CSS for the zoomOut
  const zoomOutButton = document.createElement("div");
  zoomOutButton.classList.add(...buttonsStyle, ...inactiveButtonStyle);
  zoomOutButton.innerHTML = `<svg
  width="20"
  height="20"
  viewBox="0 0 20 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7.5 9.75H11.6667"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M9.58329 17.5C13.9555 17.5 17.5 13.9556 17.5 9.58335C17.5 5.2111 13.9555 1.66669 9.58329 1.66669C5.21104 1.66669 1.66663 5.2111 1.66663 9.58335C1.66663 13.9556 5.21104 17.5 9.58329 17.5Z"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M18.3333 18.3334L16.6666 16.6667"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

  controlWrapper.appendChild(zoomOutButton);

  zoomInButton.addEventListener("click", function () {
    map.setZoom(map.getZoom() + 1);
  });
  zoomOutButton.addEventListener("click", function () {
    map.setZoom(map.getZoom() - 1);
  });

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlWrapper);
};
