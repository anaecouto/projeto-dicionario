var geoip = require("geoip-lite");

export interface LatitudeLongitude {  
}

export class GeolocalizationUtils {

  static getLatitudeLongitudeByIp = (ip: string): number[] => {
    // var ip = "143.255.252.150";
    var geo = geoip.lookup(ip);
    return geo ? geo.ll : [];
  };
}
