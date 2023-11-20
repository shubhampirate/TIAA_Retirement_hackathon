import React from 'react';
import {CardBody} from 'react-bootstrap';
import CardComponent from '../CardComponent/CardComponent.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid } from '@mui/material';

const CardRowComponent = (props) => {
  // calculate aggregated data
  let selected = props.selected;
  if (selected.length === 0) {
    selected = [0,1,2,3,4,5,6];
  }
  const data = props.data;
  // aggData = {"Heart": __, "Move": ___ ...}
  const aggData = {
    Calories: 0,
    Heart: 0,
    Move: 0,
    Steps: 0
  };
  if (data.length > 0) {
    selected.forEach((idx) => {
      aggData.Calories += data[idx].Calories;
      aggData.Heart += data[idx].Heart;
      aggData.Move += data[idx].Move;
      aggData.Steps += data[idx].Steps;
    })
  }

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          
        <CardComponent element={{title: "Calories Burnt", value: aggData.Calories, id: 0}} />
        </Grid>
        <Grid item xs={3}>
          
        <CardComponent element={{title: "Heart Points", value: aggData.Heart, id:1}} />
        </Grid>
        <Grid item xs={3}>
          
        <CardComponent element={{title: "Move Minutes", value: aggData.Move, id:2}} />
        </Grid>
        <Grid item xs={3}>
          
        <CardComponent element={{title: "Steps Travelled", value: aggData.Steps, id:3}} />
        </Grid>
      </Grid>
    </div>
  );
}

export default CardRowComponent;