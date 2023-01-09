import {
  shapes,
  shapesRef,
  setSelection,
  addDriwingButton,
} from "@/helpers/googleMaps/index";

export const initPolyline = ({ map, options }) => {
  const polyline = new google.maps.drawing.DrawingManager({
    drawingControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT,
      drawingModes: [],
    },
    polylineOptions: options,
    map: map,
  });
  return polyline;
};

export const loadDefaultPolyline = ({ map, options, data, controlWrapper }) => {
  data.forEach((item, key) => {
    const polyline = new google.maps.Polyline({
      path: item.data.coordinates,
      ...options,
      zIndex: key,
    });
    polyline.setEditable(false);
    shapes.push(polyline);
    shapesRef.value = [
      ...shapesRef.value,
      createShapePolyline(polyline, item.data),
    ];
    google.maps.event.addListener(polyline, "click", function () {
      setSelection({ shape: polyline, controlWrapper, type: "polyline" });
    });
    polyline.setMap(map);
  });
};

export const addPolylineButtons = ({ controlWrapper, drawingManager }) => {
  const icon = `<svg
  width="15"
  height="15"
  viewBox="0 0 15 15"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M14.05 14.05H1V1"
    stroke="inherit"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>`;

  addDriwingButton({ icon, controlWrapper, drawingManager, key: "POLYLINE" });
};

const createLinearFeet = (val) => {
  return (+val * 3.28084).toFixed(2);
};

export const createShapePolyline = (shape, data) => {
  const shapePath = shape.getPath();
  let path = [];
  for (var i = 0; i < shapePath.length; i++) {
    var point = {
      lat: shapePath.getAt(i).lat(),
      lng: shapePath.getAt(i).lng(),
    };
    path.push(point);
  }
  return {
    zIndex: shape.zIndex,
    label: "Linear Feet",
    height: data && data.height ? data.height : 0,
    value:
      data && data.linear_feet
        ? data.linear_feet
        : createLinearFeet(
            google.maps.geometry.spherical.computeLength(shapePath)
          ),
    path: path,
  };
};
