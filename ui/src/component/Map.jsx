import React from "react";
import { connect } from "react-redux";
import GoogleMapReact from "google-map-react";
import { GoogleMapReactWrapper, IconWrapper, IconLabel } from "./Map.styled";
import DirectionsBikeRoundedIcon from "@material-ui/icons/DirectionsBikeRounded";
import Skeleton from "@material-ui/lab/Skeleton";

const Map = ({ location, isFetching }) => {
  // If location data is not loaded display a skeleton screeen.
  if (isFetching || location === null) {
    return (
      <GoogleMapReactWrapper>
        <Skeleton animation="wave" variant="rect" height="100%"></Skeleton>
      </GoogleMapReactWrapper>
    );
  }

  // Else render map with points based on retrieved API location data call.
  return (
    <GoogleMapReactWrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }} // YOU WILL HAVE TO PROVIDE YOUR OWN GOOGLE MAPS API KEY HERE - https://developers.google.com/maps/documentation/javascript/get-api-key
        defaultCenter={{
          lat: 1.3521,
          lng: 103.8192
        }}
        defaultZoom={12}
        distanceToMouse={() => null}
      >
        {location.data.map(x => {
          return (
            <IconWrapper lat={x.latitude} lng={x.longitude}>
              <IconLabel>{x.quantity}</IconLabel>
              <DirectionsBikeRoundedIcon color="primary" fontSize="small" />
            </IconWrapper>
          );
        })}
      </GoogleMapReact>
    </GoogleMapReactWrapper>
  );
};

const mapStateToProps = combineReducers => {
  return {
    location: combineReducers.location,
    isFetching: combineReducers.isFetching
  };
};

export default connect(mapStateToProps)(Map);
