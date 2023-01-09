import { ref } from "vue";

import {
  containerStyle,
  buttonsStyle,
  inactiveButtonStyle,
  activeButtonStyle,
} from "./styles";
import {
  addPolygonButtons,
  loadDefaultPolygons,
  createShapePolygon,
} from "./polygon";
import {
  addPolylineButtons,
  createShapePolyline,
  loadDefaultPolyline,
} from "./polyline";
import {
  addMarkerButtons,
  createShapeMarker,
  loadDefaultMarker,
} from "./marker";

import { initFullscreenControl } from "./fullScreenButton";

const createShape = {
  polygone: createShapePolygon,
  polyline: createShapePolyline,
  marker: createShapeMarker,
};

let selectedShape;
export let shapes = [];
export const shapesRef = ref([]);
export const selectedShapeRef = ref({});

export const initActions = ({
  drawingManager,
  polygon,
  polyline,
  marker,
  map,
  data,
  options,
}) => {
  const controlWrapper = document.createElement("div");
  controlWrapper.classList.add(...containerStyle, "mr-1");

  if (polygon) {
    addResetButton({ controlWrapper, drawingManager });
    addPolygonButtons({ controlWrapper, drawingManager });
    addDeleteButton({ controlWrapper, drawingManager, type: "polygone" });
    loadDefaultPolygons({
      map,
      options,
      data,
      controlWrapper,
    });
  }
  if (polyline) {
    addResetButton({ controlWrapper, drawingManager });
    addPolylineButtons({ controlWrapper, drawingManager });
    addDeleteButton({ controlWrapper, drawingManager, type: "polyline" });
    loadDefaultPolyline({ map, options, data, controlWrapper });
  }
  if (marker) {
    addResetButton({ controlWrapper, drawingManager });
    addMarkerButtons({ controlWrapper, drawingManager });
    addDeleteButton({ controlWrapper, drawingManager, type: "marker" });
    loadDefaultMarker({ map, options, data, controlWrapper });
  }
  initFullscreenControl({ controlWrapper, map });
  map.setTilt(0);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlWrapper);
};

export const clearAll = () => {
  shapes = [];
  selectedShape = null;
  shapesRef.value = [];
  selectedShapeRef.value = {};
};

export const addDriwingButton = ({
  icon,
  key,
  controlWrapper,
  drawingManager,
}) => {
  const addButton = document.createElement("div");
  addButton.id = "active";
  addButton.classList.add(...buttonsStyle, ...inactiveButtonStyle);
  addButton.innerHTML = icon;

  controlWrapper.appendChild(addButton);
  addButton.addEventListener("click", () => {
    const resetButton = controlWrapper.querySelector(`[id=reset]`);
    addActiveButton(resetButton, addButton);
    drawingManager.setDrawingMode(google.maps.drawing.OverlayType[key]);
  });
};

const addResetButton = ({ controlWrapper, drawingManager }) => {
  const resetButton = document.createElement("div");
  resetButton.id = "reset";
  resetButton.classList.add(...buttonsStyle, ...inactiveButtonStyle);
  resetButton.innerHTML = `<svg
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M7.40018 6.32015L15.8902 3.49015C19.7002 2.22015 21.7702 4.30015 20.5102 8.11015L17.6802 16.6002C15.7802 22.3102 12.6602 22.3102 10.7602 16.6002L9.92018 14.0802L7.40018 13.2402C1.69018 11.3402 1.69018 8.23015 7.40018 6.32015Z"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M10.1099 13.6501L13.6899 10.0601"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

  controlWrapper.appendChild(resetButton);

  resetButton.addEventListener("click", () => {
    const activeButton = controlWrapper.querySelector(`[id=active]`);
    addActiveResetButton(resetButton, activeButton);

    drawingManager.setDrawingMode("");
  });
};

export const addActiveButton = (resetButton, addButton) => {
  addButton.className = "";
  resetButton.className = "";
  addButton.classList.add(...buttonsStyle, ...activeButtonStyle);
  resetButton.classList.add(...buttonsStyle, ...inactiveButtonStyle);
};
export const addActiveResetButton = (resetButton, addButton) => {
  addButton.className = "";
  resetButton.className = "";
  addButton.classList.add(...buttonsStyle, ...inactiveButtonStyle);
  resetButton.classList.add(...buttonsStyle, ...activeButtonStyle);
};

const addDeleteButton = ({ drawingManager, controlWrapper, type }) => {
  google.maps.event.addListener(drawingManager, "overlaycomplete", (e) => {
    let newShape = e.overlay;
    newShape.type = e.type;

    if (type === "marker") newShape.zIndex = Date.now();
    else
      newShape.zIndex =
        newShape.zIndex <= shapes.length ? shapes.length : newShape.zIndex;

    google.maps.event.addListener(newShape, "click", () => {
      setSelection({ shape: newShape, controlWrapper, type });
    });
    // drawingManager.setDrawingMode(null);
    setSelection({ shape: newShape, type });
  });

  const deleteButton = document.createElement("div");
  deleteButton.classList.add(...buttonsStyle, ...inactiveButtonStyle);
  deleteButton.innerHTML = `  <svg
  width="19"
  height="20"
  viewBox="0 0 19 20"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M16.3248 7.46777C16.3248 7.46777 15.7818 14.2028 15.4668 17.0398C15.3168 18.3948 14.4798 19.1888 13.1088 19.2138C10.4998 19.2608 7.88779 19.2638 5.27979 19.2088C3.96079 19.1818 3.13779 18.3778 2.99079 17.0468C2.67379 14.1848 2.13379 7.46777 2.13379 7.46777"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M17.708 4.23926H0.75"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M14.4406 4.23949C13.6556 4.23949 12.9796 3.68449 12.8256 2.91549L12.5826 1.69949C12.4326 1.13849 11.9246 0.750488 11.3456 0.750488H7.11258C6.53358 0.750488 6.02558 1.13849 5.87558 1.69949L5.63258 2.91549C5.47858 3.68449 4.80258 4.23949 4.01758 4.23949"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

  deleteButton.addEventListener("click", deleteSelectedShape);
  controlWrapper.appendChild(deleteButton);
};
export const updateSize = (shape, type) => {
  shapesRef.value = shapesRef.value.map((item) => {
    if (item.zIndex === shape.zIndex) {
      return createShape[type](shape);
    } else return item;
  });
};

export const setSelection = ({ shape, controlWrapper, type }) => {
  if (controlWrapper) {
    const addButton = controlWrapper.querySelector(`[id=active]`);
    const resetButton = controlWrapper.querySelector(`[id=reset]`);
    addActiveResetButton(resetButton, addButton);
  }
  clearSelection(shape, type);
  if (type === "marker") {
    google.maps.event.addListener(shape, "dragend", () =>
      updateSize(shape, type)
    );
  } else {
    const path = shape.getPath();
    shape.setEditable(true);
    google.maps.event.addListener(path, "set_at", () =>
      updateSize(shape, type)
    );
    google.maps.event.addListener(path, "insert_at", () =>
      updateSize(shape, type)
    );
  }
  if (!shapesRef.value.find((item) => shape.zIndex === item.zIndex))
    shapesRef.value = [...shapesRef.value, createShape[type](shape)];
  shapes.push(shape);
  shape.setOptions({ strokeColor: "#3990E4" });
};

const clearSelection = (shape, type) => {
  if (selectedShape) {
    selectedShape.setOptions({ strokeColor: "#50F4FF" });
    if (type !== "marker") selectedShape.setEditable(false);
    selectedShape = null;
    selectedShapeRef.value = {};
  }
  selectedShape = shape;
  selectedShapeRef.value = shape;
};
const deleteSelectedShape = () => {
  if (selectedShape) {
    shapesRef.value = shapesRef.value.filter(
      (item) => item.zIndex !== selectedShape.zIndex
    );
    shapes = shapes.filter((item) => item.zIndex !== selectedShape.zIndex);
    selectedShape.setMap(null);
    selectedShapeRef.value = {};
  }
};
