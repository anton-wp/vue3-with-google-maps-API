import { ref, watch } from "vue";
import {
  shapes,
  shapesRef,
  updateSize,
  setSelection,
  addDriwingButton,
} from "@/helpers/googleMaps/index";

export const typeMarker = ref("medium");

const isMarkers = ref(null);

export const typesMarkers = {
  1: {
    icon: "/assets/marker-field.svg",
  },
  2: {
    icon: "/assets/marker-endlap.svg",
  },
  3: {
    icon: "/assets/marker-sidelap.svg",
  },
  4: {
    icon: "/assets/marker-walls.svg",
  },
  5: {
    icon: "/assets/marker-flashing.svg",
  },
  6: {
    icon: "/assets/marker-ridge.svg",
  },
  7: {
    icon: "/assets/marker-penetration.svg",
  },
  8: {
    icon: "/assets/marker-ACUnit.svg",
  },
  9: {
    icon: "/assets/marker-closure.svg",
  },
  10: {
    icon: "/assets/marker-fasteners.svg",
  },
  11: {
    icon: "/assets/marker-drain.svg",
  },
  12: {
    icon: "/assets/marker-silicone-walkpad.svg",
  },
  13: {
    icon: "/assets/marker-skylights.svg",
  },
  14: {
    icon: "/assets/marker-repairs-needed.svg",
  },
};

export const initMarker = ({ map, options, markers }) => {
  const marker = new google.maps.drawing.DrawingManager({
    drawingControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT,
      drawingModes: [],
    },
    markerOptions: {
      ...options,
    },
    map: map,
  });
  isMarkers.value = !!markers;
  if (markers) {
    marker.set("markerOptions", icon());
    watch(
      () => typeMarker.value,
      () => {
        marker.set("markerOptions", icon());
      }
    );
  }
  return marker;
};
const icon = (type, id) => {
  if (!isMarkers.value) return typesMarkers[id];
  if (type) return { icon: `/assets/marker-${type}.svg` };
  // return { icon: `/src/assets/image/marker-${type}.svg` };
  else if (typeMarker.value)
    return { icon: `/assets/marker-${typeMarker.value}.svg` };
  // return { icon: `/src/assets/image/marker-${typeMarker.value}.svg` };
  else return typesMarkers[id];
};
export const loadDefaultMarker = ({ map, options, data, controlWrapper }) => {
  data.forEach((item, key) => {
    const marker = new google.maps.Marker({
      position: item.data.coordinates,
      ...options,
      ...icon(item.data.type, item.roof_detail.id),
      zIndex: key,
    });
    shapes.push(marker);

    shapesRef.value = [
      ...shapesRef.value,
      createShapeMarker(marker, item.data),
    ];
    google.maps.event.addListener(marker, "dragend", () => {
      updateSize(marker, "marker");
      setSelection({ shape: marker, controlWrapper, type: "marker" });
    });
    google.maps.event.addListener(marker, "click", () => {
      setSelection({ shape: marker, controlWrapper, type: "marker" });
    });
    marker.setMap(map);
    return;
  });
};

export const addMarkerButtons = ({ controlWrapper, drawingManager }) => {
  const icon = ` <svg
  width="18"
  height="21"
  viewBox="0 0 18 21"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M1.23914 9.39129C1.25354 5.15071 4.7029 1.72471 8.94348 1.73912C13.1841 1.75353 16.6101 5.20288 16.5957 9.44347V9.53042C16.5435 12.2869 15.0044 14.8348 13.1174 16.8261C12.0382 17.9467 10.8331 18.9388 9.52609 19.7826C9.1766 20.0849 8.6582 20.0849 8.3087 19.7826C6.3602 18.5143 4.65007 16.9131 3.25653 15.0522C2.01449 13.4294 1.3093 11.4597 1.23914 9.41738L1.23914 9.39129Z"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <circle
    cx="8.91741"
    cy="9.53912"
    r="2.46087"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;
  addDriwingButton({ icon, controlWrapper, drawingManager, key: "MARKER" });
};

export const createShapeMarker = (shape) => {
  const path = shape.position
    ? {
        lat: shape.position.lat(),
        lng: shape.position.lng(),
      }
    : shape.path;
  const type = isMarkers.value ? { type: shape.icon.slice(15, -4) } : {};
  return {
    zIndex: shape.zIndex,
    label: "Marker",
    path: path,
    ...type,
  };
};
