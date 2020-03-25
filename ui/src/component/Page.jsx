import React, { useEffect } from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Map from "./Map";

import { Wrapper } from "./Page.styled";
import { fetchLocation } from "./redux/actions";

const Page = props => {
  useEffect(() => {
    props.fetchLocation({
      radius: 4000,
      latitude: 1.3521,
      longitude: 103.8198
    });
  });

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
              <TextField type="number" label="Distance in KM"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField type="number" label="Latitude"></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField type="number" label="Longitude"></TextField>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  props.fetchLocation({
                    radius: 2000,
                    latitude: 1.3521,
                    longitude: 103.8198
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
