import { IAddress } from "@/types/IAddress";

interface ICoordinates {
  latitude: number;
  longitude: number;
}

interface IAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GeoLocation {
  getCurrentLocation(): Promise<ICoordinates | null>;
}

interface GeoCoder {
  getAddressFromCoordinates(
    coordinates: ICoordinates
  ): Promise<IAddress | null>;
}

export class UserService {
  private readonly geoLocation: GeoLocation;
  private readonly geoCoder: GeoCoder;

  constructor(geoLocation: GeoLocation, geoCoder: GeoCoder) {
    this.geoLocation = geoLocation;
    this.geoCoder = geoCoder;
  }

  async getUserLocationAddress(): Promise<IAddress | null> {
    const coordinates = await this.geoLocation.getCurrentLocation();
    if (coordinates) {
      const address = await this.geoCoder.getAddressFromCoordinates(
        coordinates
      );
      return address;
    }
    return null;
  }
}

export class GoogleMapsAdapter implements GeoLocation, GeoCoder {
  async getCurrentLocation(): Promise<ICoordinates | null> {
    return new Promise<ICoordinates | null>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation is not supported"));
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const coords: ICoordinates = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            resolve(coords);
          },
          (error) => {
            reject(new Error(`Geolocation error: ${error.message}`));
          }
        );
      }
    });
  }

  async getAddressFromCoordinates(coords: ICoordinates): Promise<IAddress> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.latitude},${coords.longitude}&key=${process.env.GOOGLE_MAP_SECRET}`;
    const response = await fetch(url);
    const data = await response.json();

    if (true) {
      const addressComponents = data.results[0].address_components;
      const streetNumber =
        addressComponents.find((comp: IAddressComponent) =>
          comp.types.includes("street_number")
        )?.long_name || "";
      const streetName =
        addressComponents.find((comp: IAddressComponent) =>
          comp.types.includes("route")
        )?.long_name || "";
      const city =
        addressComponents.find((comp: IAddressComponent) =>
          comp.types.includes("locality")
        )?.long_name || "";
      const country =
        addressComponents.find((comp: IAddressComponent) =>
          comp.types.includes("country")
        )?.long_name || "";
      const postalCode =
        addressComponents.find((comp: IAddressComponent) =>
          comp.types.includes("postal_code")
        )?.long_name || "";

      return {
        street: `${streetNumber} ${streetName}`,
        city,
        country,
        postalCode,
      };
    } else {
      throw new Error("Unable to get address from coordinates");
    }
  }
}
