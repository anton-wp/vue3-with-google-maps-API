const getAddressValue = (addresses, type) => {
  const address = addresses.find((addressUnit) =>
    addressUnit.types.includes(type)
  );

  if (!address) {
    return null;
  }

  return address.long_name;
};

// here is location of Seattle city
export const DEFAULT_LOCATION = {
  lat: 29.75738621434229,
  lng: -95.3695502101452
};

export const getFullAddressByMarker = async (point) => {
  const geocoder = new google.maps.Geocoder();
  const latLng = new google.maps.LatLng(point.lat(), point.lng());

  const addressObject = await new Promise((resolve) => {
    geocoder.geocode({ location: latLng }, (geoResult, requestStatus) => {
      if (requestStatus !== google.maps.GeocoderStatus.OK) {
        resolve({
          address: null,
          city: null,
          country: null,
          region: null,
          postalCode: null,
        });

        throw GeocoderRequestException.requestFailed(requestStatus);
      }
      if (!geoResult.length) {
        resolve({
          address: null,
          city: null,
          country: null,
          region: null,
          postalCode: null,
        });

        throw GeocoderRequestException.emptyResult();
      }

      const addresses = geoResult[0].address_components;

      resolve({
        address: geoResult[0].formatted_address,
        city: getAddressValue(addresses, "locality"),
        country: getAddressValue(addresses, "country"),
        postalCode: getAddressValue(addresses, "postal_code"),
        region: getAddressValue(addresses, "administrative_area_level_1"),
      });
    });
  });

  return addressObject.address || "";
};
export const checkAddress = async (address) => {
  const geocoder = new google.maps.Geocoder();
  let formattedAddress = "";

  await geocoder.geocode({ address }, (geoResult, requestStatus) => {
    if (requestStatus !== google.maps.GeocoderStatus.OK || !geoResult.length) {
      return;
    }

    formattedAddress = geoResult[0].formatted_address;
  });

  return formattedAddress;
};
