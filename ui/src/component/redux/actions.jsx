import {
  FETCHING_LOCATION,
  FETCHED_LOCATION,
  FETCH_ERROR_LOCATION
} from "./constants";
import axios from "axios";

export const fetchLocation = payload => {
  return dispatch => {
    dispatch({ type: FETCHING_LOCATION });
    axios
      .get("http://localhost:4000/location", {
        params: payload
      })
      .then(data => {
        dispatch({ type: FETCHED_LOCATION, data });
      })
      .catch(e => {
        dispatch({ type: FETCH_ERROR_LOCATION });
        console.log(e);
      });
  };
};
