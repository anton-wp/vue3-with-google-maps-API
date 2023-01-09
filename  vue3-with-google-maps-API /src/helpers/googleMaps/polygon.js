import {
  shapes,
  shapesRef,
  setSelection,
  addDriwingButton,
} from "@/helpers/googleMaps/index";

export const initPolygon = ({ map, options }) => {
  const poligon = new google.maps.drawing.DrawingManager({
    drawingControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT,
      drawingModes: [],
    },
    polygonOptions: options,
    map: map,
  });
  return poligon;
};
export const loadDefaultPolygons = ({ map, options, data, controlWrapper }) => {
  data.forEach((item, key) => {
    const polygon = new google.maps.Polygon({
      paths: item.data.coordinates,
      ...options,
      zIndex: key,
    });
    polygon.setEditable(false);
    shapes.push(polygon);
    shapesRef.value = [
      ...shapesRef.value,
      createShapePolygon(polygon, item.data),
    ];
    google.maps.event.addListener(polygon, "click", function () {
      setSelection({ shape: polygon, controlWrapper, type: "polygone" });
    });
    polygon.setMap(map);
  });
};

export const addPolygonButtons = ({ controlWrapper, drawingManager }) => {
  const icon = `<svg
width="24"
height="24"
viewBox="0 0 24 24"
fill="none"
xmlns="http://www.w3.org/2000/svg"
>
<path
  d="M20 6.95V17.05C19.84 17.02 19.67 17 19.5 17C18.12 17 17 18.12 17 19.5C17 19.67 17.02 19.84 17.05 20H6.95C6.98 19.84 7 19.67 7 19.5C7 18.12 5.88 17 4.5 17C4.33 17 4.16 17.02 4 17.05V6.95C4.16 6.98 4.33 7 4.5 7C5.88 7 7 5.88 7 4.5C7 4.33 6.98 4.16 6.95 4H17.05C17.02 4.16 17 4.33 17 4.5C17 5.88 18.12 7 19.5 7C19.67 7 19.84 6.98 20 6.95Z"
  stroke="inherit"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M7 4.5C7 5.88 5.88 7 4.5 7C4.33 7 4.16 6.98 4 6.95C2.86 6.72 2 5.71 2 4.5C2 3.12 3.12 2 4.5 2C5.71 2 6.72 2.86 6.95 4C6.98 4.16 7 4.33 7 4.5Z"
  stroke="inherit"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M22 4.5C22 5.71 21.14 6.72 20 6.95C19.84 6.98 19.67 7 19.5 7C18.12 7 17 5.88 17 4.5C17 4.33 17.02 4.16 17.05 4C17.28 2.86 18.29 2 19.5 2C20.88 2 22 3.12 22 4.5Z"
  stroke="inherit"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M7 19.5C7 19.67 6.98 19.84 6.95 20C6.72 21.14 5.71 22 4.5 22C3.12 22 2 20.88 2 19.5C2 18.29 2.86 17.28 4 17.05C4.16 17.02 4.33 17 4.5 17C5.88 17 7 18.12 7 19.5Z"
  stroke="inherit"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
<path
  d="M22 19.5C22 20.88 20.88 22 19.5 22C18.29 22 17.28 21.14 17.05 20C17.02 19.84 17 19.67 17 19.5C17 18.12 18.12 17 19.5 17C19.67 17 19.84 17.02 20 17.05C21.14 17.28 22 18.29 22 19.5Z"
  stroke="inherit"
  stroke-width="1.5"
  stroke-linecap="round"
  stroke-linejoin="round"
/>
</svg>`;

  addDriwingButton({ icon, controlWrapper, drawingManager, key: "POLYGON" });
};

const createArea = (val) => {
  return (+val * 10.7639).toFixed(2);
};

export const createShapePolygon = (shape, data) => {
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
    label: "Square Footage",
    value:
      data && data.area
        ? data.area
        : createArea(google.maps.geometry.spherical.computeArea(shapePath)),
    path: path,
  };
};
