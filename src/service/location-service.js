import axios from "axios"
import { GOOGLE_CLOUD_API } from "../Config/serverConfig.js";

class LocationService{
    async getCoordinates(address){
        console.log("hitting");
        try{
           const response = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        address: address,
        key: GOOGLE_CLOUD_API,
      },
    });

    if (response.data.status === "OK") {
      const location = response.data.results[0].geometry.location;
      console.log("Latitude:", location.lat);
      console.log("Longitude:", location.lng);
      return {
        lat:location.lat,
        lng:location.lng
      };
    } else {
      console.error("Geocoding error:", response.data.status);
       throw err;
    }


        }
        catch(err){

        }
    }

    async getDistanceTime(origin,destination){
        try{
             const response = await axios.get("https://maps.googleapis.com/maps/api/distancematrix/json", {
      params: {
        origins: origin,
        destinations: destination,
        key: GOOGLE_CLOUD_API,
      },
    });

    if (response.data.status === "OK") {
      const element = response.data.rows[0].elements[0];
      console.log("Distance:", element.distance.text);
      console.log("Duration:", element.duration.text);
      return {
        distance: element.distance.text,
        duration: element.duration.text,
      };
    }

        }
        catch(err){

            throw err;

        }
    }

    async getLocationSuggestions(input){
         try {
    const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
      params: {
        input: input,
        key:GOOGLE_CLOUD_API,
        components: "country:IN", // restrict to India (optional)
      },
    });

    if (response.data.status === "OK") {
      const suggestions = response.data.predictions.map(pred => ({
        description: pred.description,
        place_id: pred.place_id,
      }));

      console.log("Suggestions:", suggestions);
      return suggestions;
    } else {
      console.error("Error:", response.data.status);
      return [];
    }
  } catch (error) {
    console.error("Request failed:", error.message);
    return [];
  }
    }
}


export default LocationService;