import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';



function generateJSON(selection) {
  const is_in = {}
  const is_btwn = {}

  const keys = Object.keys(selection)
  for (const key of keys) {
    // Both is_in selections and is_btwn selections are contained in lists
    if (Array.isArray(selection[key])) {
      // is_btwn lists will always have number as first and second inputs
      if(typeof(selection[key][0]) == 'number'){
        is_btwn[key] = {
          min: selection[key][0],
          max: selection[key][1],
          inclusive: true,
        }
      // is_in lists will not be numeric
      } else {
        is_in[key] = selection[key]
      }
    }
  }
  const filter_dict = {
    is_in,
    is_btwn
  }

  const finalObj = {
    filter_dict
  }
  finalObj['recipient_email'] = selection['recipient_email']
  
  return finalObj
}


function makeRequest(finalObj) {
  console.log(finalObj)
  fetch('https://flask-restful-collegedata.herokuapp.com/send-data', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(finalObj),

  });
}


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const TheMenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'U.S. Service Schools',
  'New England (CT, ME, MA, NH, RI, VT)',
  'Mid East (DE, DC, MD, NJ, NY, PA)',
  'Great Lakes (IL, IN, MI, OH, WI)',
  'Plains (IA, KS, MN, MO, NE, ND, SD)',
  'Southeast (AL, AR, FL, GA, KY, LA, MS, NC, SC, TN, VA, WV)',
  'Southwest (AZ, NM, OK, TX)',
  'Rocky Mountains (CO, ID, MT, UT, WY)',
  'Far West (AK, CA, HI, NV, OR, WA)',
  'Outlying Areas (AS, FM, GU, MH, MP, PR, PW, VI)',
];


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  slider: {
      width: 300,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function FilledTextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    "latest.admissions.act_scores.midpoint.cumulative": [0,36],
    "recipient_email": '',
    "school.region_id": [],
  });

  const handleChange = name => (event, newValue) => {
    var updatedVal = newValue ? newValue : event.target.value
    if(Array.isArray(event.target.value)){
      updatedVal = event.target.value
    }
    console.log(updatedVal)
    setValues({...values, [name]: updatedVal}); // this if statement is clearly not handling personChange very well
  };

  function handleClick() {
     var apiOutput = makeRequest(generateJSON(values))
     console.log(apiOutput) // need to eventually return something when request occurs
    alert(JSON.stringify(values));
  }

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>
        <Select
          multiple
          value={values["school.region_id"]}
          onChange={handleChange("school.region_id")}
          input={<Input id="select-multiple-checkbox" />}
          renderValue={selected => selected.join(', ')}
          MenuProps={TheMenuProps}
        >
          {names.map(name => (
            <MenuItem key={name} value={name}>
              {/* {console.log(values)} */}
              <Checkbox checked={values["school.region_id"].indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Slider
        value={values["latest.admissions.act_scores.midpoint.cumulative"]}
        className={classes.slider}
        onChange={handleChange("latest.admissions.act_scores.midpoint.cumulative")}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={0}
        max={36}
        // getAriaValueText={valuetext}
      />
      <TextField
        id="outlined-email-input"
        label="Email"
        className={classes.textField}
        value = {values["recipient_email"]}
        onChange={handleChange("recipient_email")}
        type="email"
        name="email"
        autoComplete="email"
        margin="normal"
        variant="outlined"
      />
      <Button onClick={handleClick} variant="contained" className={classes.button}>
        Submit
      </Button>
    </form>
  );
}