import { pathOr } from "ramda";


class NeshanUtils {

  static getNeshanInfo = async ({ latitude, longitude }) => {
    let latitudeNumber, longitudeNumber;
    try {
      latitudeNumber = Number(latitude);
      longitudeNumber = Number(longitude);
    } catch (err) {
      return { isCover: false };
    }
    const res = await NeshanUtils.getQuery(
      NeshanUtils.POINT_TO_GEO_URL(latitudeNumber, longitudeNumber)
    );

    return {
      isCover: pathOr("-", ["data", "city"], res) === "تهران",
      region: Number(pathOr("0", ["data", "municipality_zone"], res)),
      estimatedAddress: pathOr("-", ["data", "formatted_address"], res),
      inTrafficRegion: pathOr(false, ["data", "in_traffic_zone"], res),
      inOddEvenRegion: pathOr(false, ["data", "in_odd_even_zone"], res),
    };
  };

}

export default NeshanUtils;
