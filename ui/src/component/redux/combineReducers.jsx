import {
  FETCHING_LOCATION,
  FETCHED_LOCATION,
  FETCH_ERROR_LOCATION
} from "./constants";
import { combineReducers } from "redux";

export const isFetching = (state = false, action) => {
  console.log(action);
  switch (action.type) {
    case FETCHING_LOCATION:
      return true;
    case FETCHED_LOCATION:
    case FETCH_ERROR_LOCATION:
      return false;
    default:
      return state;
  }
};

export const location = (state = null, action) => {
  switch (action.type) {
    case FETCHED_LOCATION:
      return action.data;
    case FETCH_ERROR_LOCATION:
    default:
      return state;
  }
};

export default combineReducers({
  isFetching,
  location
});
