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
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';




function generateJSON(selection) {
  const is_in = {}
  const is_btwn = {}

  const keys = Object.keys(selection)
  for (const key of keys) {
    // Both is_in selections and is_btwn selections are contained in lists
    // selection[key].length>0 prevents empty lists from being added (i.e. when nothing is selected for "is_in")
    if ((Array.isArray(selection[key])) && (selection[key].length > 0)) {
      // is_btwn lists will always have number as first and second inputs
      if(typeof(selection[key][0]) == 'number'){
        is_btwn[key] = {
          min: selection[key][0],
          max: selection[key][1],
          inclusive: true,
        }
      // is_in lists will not be numeric
      } else {
        console.log(selection[key].length)
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

const regions = [
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
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
      width: 600,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function FilledTextFields() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    "recipient_email": '',
    
    // Sliders
    "latest.admissions.act_scores.midpoint.cumulative": [0,36],
    "latest.student.size": [0,50000],
    
    // Selects
    "school.region_id": [],
    "school.ownership": [],
    "school.degrees_awarded.highest": [],
    "school.institutional_characteristics.level": [],
    "school.minority_serving.historically_black": [],
    "singlesex.or.coed": [],
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

  function valuetext(value) {
    return `${value}°C`;
  }
  

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid container spacing ={3}>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Basic Preferences
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                School Facts
              </Typography>
              
              {/* Region */}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">Region</InputLabel>
                <Select
                  multiple
                  value={values["school.region_id"]}
                  onChange={handleChange("school.region_id")}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={TheMenuProps}
                >
                  {[
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
                  ].map(name => (
                    <MenuItem key={name} value={name}>
                      {/* {console.log(values)} */}
                      <Checkbox checked={values["school.region_id"].indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              
              {/* Ownership */}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">Ownership</InputLabel>
                <Select
                  multiple
                  value={values["school.ownership"]}
                  onChange={handleChange("school.ownership")}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={TheMenuProps}
                >
                  {[
                    'Public',
                    'Private nonprofit',
                    'Private for-profit',
                  ].map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={values["school.ownership"].indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Highest Degree Awarded */}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">Highest Degree</InputLabel>
                <Select
                  multiple
                  value={values["school.degrees_awarded.highest"]}
                  onChange={handleChange("school.degrees_awarded.highest")}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={TheMenuProps}
                >
                  {[
                    'Non-degree-granting',
                    'Certificate degree',
                    'Associate degree',
                    'Bachelors degree',
                    'Graduate degree',
                  ].map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={values["school.degrees_awarded.highest"].indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Years */}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">Years</InputLabel>
                <Select
                  multiple
                  value={values["school.institutional_characteristics.level"]}
                  onChange={handleChange("school.institutional_characteristics.level")}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={TheMenuProps}
                >
                  {[
                    '4-year',
                    '2-year',
                    'Less-than-2-year',
                  ].map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={values["school.institutional_characteristics.level"].indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Historically Black */}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">HBCU</InputLabel>
                <Select
                  multiple
                  value={values["school.minority_serving.historically_black"]}
                  onChange={handleChange("school.minority_serving.historically_black")}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={TheMenuProps}
                >
                  {[
                    'No',
                    'Yes',
                  ].map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={values["school.minority_serving.historically_black"].indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {/* Single-Sex or Coed */}
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-checkbox">Single-Sex</InputLabel>
                <Select
                  multiple
                  value={values["singlesex.or.coed"]}
                  onChange={handleChange("singlesex.or.coed")}
                  input={<Input id="select-multiple-checkbox" />}
                  renderValue={selected => selected.join(', ')}
                  MenuProps={TheMenuProps}
                >
                  {[
                    "Single-Sex: Men",
                    "Single-Sex: Women",
                    "Co-Educational",
                    // "Not Listed", // Maybe remove this as the others don't have an explicit options
                  ].map(name => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={values["singlesex.or.coed"].indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>


            </Grid>
            
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Detailed Preferences
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                School Size
              </Typography>
              <Slider
                value={values["latest.student.size"]}
                className={classes.slider}
                onChange={handleChange("latest.student.size")}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                step={1000}
                min={0}
                max={50000}
                marks = {[
                  {
                    value: 0,
                    label: '0',
                  },
                  {
                    value: 50000,
                    label: '50,000',
                  },
                ]}
                // getAriaValueText={valuetext}
              />
            </Grid>                        
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom>
                Midpoint ACT Score
              </Typography>
              <Slider
                value={values["latest.admissions.act_scores.midpoint.cumulative"]}
                className={classes.slider}
                onChange={handleChange("latest.admissions.act_scores.midpoint.cumulative")}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={36}
                marks = {[
                  {
                    value: 0,
                    label: '0',
                  },
                  {
                    value: 36,
                    label: '36',
                  },
                ]}
                // getAriaValueText={valuetext}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="h5" gutterBottom>
            Recipient Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="firstName"
                name="firstName"
                label="First name"
                fullWidth
                autoComplete="fname"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="lastName"
                name="lastName"
                label="Last name"
                fullWidth
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="email"
                name="email"
                label="Email Address"
                fullWidth
                autoComplete="email"
                value = {values["recipient_email"]}
                onChange={handleChange("recipient_email")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // required
                id="highschool"
                name="highschool"
                label="High School Name"
                fullWidth
                // autoComplete="billing postal-code"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                // required
                id="gradyear"
                name="gradyear"
                label="Graduation Year"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="Send me more information about this project!"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <FormControl className={classes.formControl}>
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
      /> */}
      <Button onClick={handleClick} variant="contained" className={classes.button}>
        Submit
      </Button>
    </form>
  );
}