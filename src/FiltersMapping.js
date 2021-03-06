import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles(theme => ({
  field_spacing: {
    flexGrow: 1,
  },
  select: {
    width: 250,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  slider: {
    width: 500,
  }
}));

// TODO: Rename
function generateValues(inp){
  const fields = {}

  for (const [key, value] of Object.entries(inp)){
    if (typeof value[0] == 'string') {
      fields[key] = []
    } else {
      fields[key] = value
    }
  }
  return fields
}

export default function MultipleSelect({input, buttonBehavior}) {
    const classes = useStyles();
    const theme = useTheme();
    const [values, setValues] = useState(generateValues(input));
    const [visual, setVisual] = useState(generateValues(input));
  
    useEffect(() => {
      buttonBehavior(values);
    }, [values]);


    const handleVisualChange = name => (event, newValue) => {
      var updatedVal = newValue ? newValue : event.target.value
      if(Array.isArray(event.target.value)){
        updatedVal = event.target.value
      }
      setVisual({...visual, [name]: updatedVal}); // this if statement is clearly not handling personChange very well
      //buttonBehavior(values);
    };

    const handleChange = name => (event, newValue) => {
      console.log("handleChange")
      var updatedVal = newValue ? newValue : event.target.value
      if(Array.isArray(event.target.value)){
        updatedVal = event.target.value
      }
      setValues({...values, [name]: updatedVal}); // this if statement is clearly not handling personChange very well
      //buttonBehavior(values);
    };

  return (
    <div className={classes.field_spacing}>
    <Grid 
    container 
    spacing={3} 
    justify="center"
    alignItems="center">
      {Object.keys(input).map(field=>(
            typeof input[field][0] == 'string' ? // If first element is a string, use select fields
              <Grid align="center" item xs={4}>
                <FormControl key={field}>
                  <Autocomplete
                      className={classes.select}
                      multiple
                      id="tags-standard"
                      options={input[field]}
                      getOptionLabel={(option) => option}
                      onChange={handleChange(field)}
                      renderInput={(params) => (
                      <TextField
                          {...params}
                          variant="standard"
                          label= {field}
                          placeholder= {field}
                      />
                      )}
                  />
                </FormControl>
              </Grid>
            : // If first element is not a string, use sliders
              <Grid align="center" item xs={6}>
                <FormControl key={field} >  
                  <Typography align="left" variant="body1" gutterBottom>
                    {field}
                  </Typography> 
                  <Slider
                    value={visual[field]}
                    className={classes.slider}
                    onChange={handleVisualChange(field)}
                    onChangeCommitted={handleChange(field)}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    step={1}
                    min={input[field][0]}
                    max={input[field][1]}
                    marks = {[
                      {
                        value: input[field][0],
                        label: input[field][0].toString(),
                      },
                      {
                        value: input[field][1],
                        label: input[field][1].toString(),
                      },
                    ]}
                  />
                </FormControl>
              </Grid>
            
      ))}
    </Grid>
    </div>
  );
}
