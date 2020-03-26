import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Map from "./Map";

import { Wrapper } from "./Page.styled";
import { fetchLocation } from "./redux/actions";

const Page = props => {
  // Defaults to 1 KM radius around Choa Chu Kang MRT Station.
  const [radius, setRadius] = useState(1000);
  const [latitude, setLatitude] = useState(1.3852);
  const [longitude, setLongitude] = useState(103.7443);

  // useEffect should only run on component did mount.
  useEffect(() => {
    props.fetchLocation({
      radius,
      latitude,
      longitude
    });
  }, []);

  // Callback handler for when an input field is updated.
  const handleInputChange = e => {
    switch (e.target.name) {
      case "radius":
        setRadius(e.target.value);
        break;
      case "latitude":
        setLatitude(e.target.value);
        break;
      case "longitude":
        setLongitude(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper>
      <Grid
        container
        spacing={4}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                helperText="Defaults to 500 meters"
                name="radius"
                onChange={handleInputChange}
                type="number"
                label="Distance in Meters"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                helperText="Defaults to 1.3852"
                name="latitude"
                onChange={handleInputChange}
                type="number"
                label="Latitude"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                helperText="Defaults to 103.7443"
                name="longitude"
                onChange={handleInputChange}
                type="number"
                label="Longitude"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  props.fetchLocation({
                    radius,
                    latitude,
                    longitude
                  })
                }
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Paper elevation={3}>
            <Map />
          </Paper>
        </Grid>
      </Grid>
    </Wrapper>
  );
};

export default connect(null, { fetchLocation })(Page);
