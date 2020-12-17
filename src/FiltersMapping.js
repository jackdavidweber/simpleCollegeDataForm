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
// import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
    align: 'center'
  },
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  root: {
    width: 250,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function emptyObjOfArrays(inp){
  // copies input object to fields object
  const fields = Object.keys(inp);

  //sets all fields equal to an empty array
  fields.map(function(key, index){
    fields[key] = [];
  });

  return fields;
}

export default function MultipleSelect({input, buttonBehavior}) {
    const classes = useStyles();
    const theme = useTheme();
    const [values, setValues] = useState(emptyObjOfArrays(input));
    
    // function updateAge(value) {
    //   setValues(value);
    // };
  
    // useEffect(() => {
    //   buttonBehavior(values);
    // }, [values]);

    const handleChange = name => (event, newValue) => {
      var updatedVal = newValue ? newValue : event.target.value
      if(Array.isArray(event.target.value)){
        updatedVal = event.target.value
      }
      setValues({...values, [name]: updatedVal}); // this if statement is clearly not handling personChange very well
      //buttonBehavior(values);
    };

    const fields = Object.keys(input);
    const vals = Object.values(input);

    // function handleClick(){
    //   buttonBehavior(values);
    // }

  return (
    <div>
    {fields.map(field=>(
      <FormControl key={field} className={classes.formControl}>
          Hello world
      {/* <Autocomplete
      className={classes.root}
        multiple
        id="tags-standard"
        options={vals[fields.indexOf(field)]}
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
      /> */}
      </FormControl>
    ))}
    {/* <Button onClick={handleClick} variant="contained" color="primary" className={classes.button} align="center">
           Apply Filters
    </Button> */}
    </div>
  );
}
