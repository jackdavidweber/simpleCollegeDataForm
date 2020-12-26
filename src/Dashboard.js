import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import FiltersMapping from './FiltersMapping'
import AlumniBySeniority from './AlumniBySeniority';
import AlumniTotalCount from './AlumnniTotalCount';
import AlumniBubbleMap from './AlumniBubbleMap';
import Cloud from './WordCloudByIndustry';
import Copyright from './Copyright'
import words from './words';

import { ScrollTo } from "react-scroll-to";
import Button from '@material-ui/core/Button';
import BarChart from './BarChart';



// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {'Copyright © '}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const drawerWidth = 240;
const mapData = {
    city: [
      // [Longitude, Latitude]
        { "name": "San Francisco", "coordinates": [-122.419418, 37.774929], "population": 50000 },
        { "name": "Los Angeles", "coordinates": [-118.243683, 34.052235], "population": 500 },
        { "name": "Austin", "coordinates": [-97.743057, 30.267153], "population": 200 },
        { "name": "Seattle", "coordinates": [-122.332069, 47.606209], "population": 2000 },
        { "name": "New York City", "coordinates": [-74.005974, 40.712776], "population": 7000 },
        { "name": "Palo Alto", "coordinates": [-122.16067, 37.444786], "population": 250 },
        { "name": "San Jose", "coordinates": [-121.887082, 37.337207], "population": 580 },
        { "name": "Washingto D.C.", "coordinates": [-77.0312812, 38.8954381], "population": 3000 },

    ],
}

const actualMapData ={
  "AlumniByCities": [
    {
        "name": "Brushy Creek",
        "population": 2,
        "coordinates": [
            -97.738197326660156,
            30.51300048828125
        ]
    },
    {
        "name": "Crossett",
        "population": 2,
        "coordinates": [
            -91.963096618652344,
            33.127998352050781
        ]
    },
    {
        "name": "Davis",
        "population": 2,
        "coordinates": [
            -121.73699951171875,
            38.555198669433594
        ]
    },
    {
        "name": "East Falmouth",
        "population": 2,
        "coordinates": [
            -70.55560302734375,
            41.570701599121094
        ]
    },
    {
        "name": "Huntertown",
        "population": 1,
        "coordinates": [
            -85.171501159667969,
            41.2156982421875
        ]
    },
    {
        "name": "Indiana",
        "population": 1,
        "coordinates": [
            -79.155197143554688,
            40.622001647949219
        ]
    },
    {
        "name": "McCordsville",
        "population": 1,
        "coordinates": [
            -85.9207992553711,
            39.896701812744141
        ]
    },
    {
        "name": "Murray",
        "population": 2,
        "coordinates": [
            -88.320602416992188,
            36.614498138427734
        ]
    },
    {
        "name": "Murray",
        "population": 2,
        "coordinates": [
            -111.88700103759766,
            40.649799346923828
        ]
    },
    {
        "name": "Navasota",
        "population": 1,
        "coordinates": [
            -96.0895004272461,
            30.387399673461914
        ]
    },
    {
        "name": "Nevada",
        "population": 2,
        "coordinates": [
            -94.349197387695313,
            37.844501495361328
        ]
    },
    {
        "name": "Nevada",
        "population": 2,
        "coordinates": [
            -93.4635009765625,
            42.018600463867188
        ]
    },
    {
        "name": "New Berlin",
        "population": 2,
        "coordinates": [
            -88.129096984863281,
            42.972599029541016
        ]
    },
    {
        "name": "Providence",
        "population": 2,
        "coordinates": [
            -111.81199645996094,
            41.703300476074219
        ]
    },
    {
        "name": "Providence",
        "population": 2,
        "coordinates": [
            -71.418701171875,
            41.823001861572266
        ]
    },
    {
        "name": "Raleigh",
        "population": 1,
        "coordinates": [
            -78.643798828125,
            35.832401275634766
        ]
    },
    {
        "name": "Sligo",
        "population": 1,
        "coordinates": [
            -8.48330020904541,
            54.2671012878418
        ]
    },
    {
        "name": "Staunton",
        "population": 1,
        "coordinates": [
            -79.06109619140625,
            38.1593017578125
        ]
    },
    {
        "name": "Staunton",
        "population": 1,
        "coordinates": [
            -89.790496826171875,
            39.011699676513672
        ]
    },
    {
        "name": "Sun Prairie",
        "population": 1,
        "coordinates": [
            -89.235702514648438,
            43.182701110839844
        ]
    },
    {
        "name": "Ulm",
        "population": 1,
        "coordinates": [
            10.0,
            48.400398254394531
        ]
    }
]

}

// function mapDataConverter(input){
//   var output = [];
//   for (var o in input)
//   {
//     var obj = {}
//     obj.name = o.name
//     obj.population = o.population
//     obj.coordinates = [o.coordinates.m_Item1, o.coordinates.m_Item2]
//     output.push(obj)
//   }
// }


const graphHeight = '200px';
const graphWidth = '500px'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems:"center",
    justifyContent:"center",
  },
  fixedHeight: {
    height: 240,
  },
  graphTitle: {
    variant: 'h5',
  },
  fixedWidth: {
    width: 240,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-center',
  }
}));

function emptyObjOfArrays(inp){
  // copies input object to fields object
  const fields = Object.keys(inp);

  //sets all fields equal to an empty array
  fields.map(function(key, index){
    fields[key] = [];
  });

  return fields;
}


function removeUnnecessaryPropertiesFromPostBody(o){
  // backend does not handle properties with empty arrays associated with them.
  // This function makes sure that all properties being passed to the backend have values that are non empty arrays

  var newObj = {};

  for (var k in o){
    var v = o[k];

    // if value is an array of length greater than 0
    if (Array.isArray(v) && v.length > 0){
      newObj[k]=v
    }

  }

  return newObj;
}

const useForceUpdate = () => useState()[1];


export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const [filters, setFilters] = useState({})
  const [graphData, setGraphData] = useState({})
  const forceUpdate = useForceUpdate()

  // GET REQUEST
  async function getRequest() {
  const res = await fetch(`http://127.0.0.1:8080/api/Alumni`)
  //const res = await fetch('https://localhost:44355/api/Alumni')

    const data = await res.json()
    setFilters(data)
}

  useEffect(() => {
    // When the page loads, GET request and POST request are called to populate the page initially
    getRequest()

    // POST request is called with no body which asks the backend for all data
    postRequest({})
  }, [])

  // POST REQUEST
  async function postRequest(postBody){
    // used https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples "POST request using fetch with async/await"

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postBody)
    };
    const response = await fetch('http://127.0.0.1:8080/api/Alumni', requestOptions);
    //  const response = await fetch('https://localhost:44355/api/Alumni', requestOptions);

    const data = await response.json();
    setGraphData(data);
  }



  const handleDrawerOpen = () => {
    console.log(graphData);
    setOpen(true);
  };
  const handleDrawerClose = () => {
    console.log(graphData);
        setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const applyFilters = vals => {

    var apiOutput = postRequest(removeUnnecessaryPropertiesFromPostBody(vals))
    //alert('filters have been applied \n' + JSON.stringify(removeUnnecessaryPropertiesFromPostBody(vals)));
    forceUpdate();
  };

  return (
    <React.Fragment>
    <CssBaseline />
    <AppBar position="relative">
      <Toolbar>
        {/* <CameraIcon className={classes.icon} /> */}
        <Typography variant="h6" color="inherit" noWrap>
          GradTracks
        </Typography>
      </Toolbar>
    </AppBar>
    <main>
    {/* Hero unit */}
    <div className={classes.heroContent}>
              <Container maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                  GradTracks
                </Typography>
                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                  Built by and for students, GradTracks helps students to visualize alumni origins and outcomes. Happy Exploring!
                </Typography>
                {/* <div className={classes.heroButtons}>
                  <Grid container spacing={2} justify="center">
                    <Grid item>
                    <ScrollTo>
                      {({ scrollTo }) => (
                        <Button variant="contained" color="primary" onClick={() => scrollTo({ y: 600, smooth: true })}>
                          Get Started
                        </Button>
                      )}
                    </ScrollTo>
                      {/* <Button variant="contained" color="primary">
                        Get Started
                      </Button> */}
                    {/*</Grid>
                    <Grid item>
                      <Button href= "https://github.com/jack1536/gradtracksFront" variant="outlined" color="primary">
                        Source Code
                      </Button>
                    </Grid>
                  </Grid>
                </div> */}

              </Container>
              <Grid container spacing={2} justify="center">
                <Grid item>
              {Object.keys(filters).length > 0 && <FiltersMapping input={filters} buttonBehavior= {applyFilters} />}
                </Grid>

              </Grid>
            </div>
    <div className={classes.root}>
          <Grid container spacing={3}>
            <Grid item xs={12}>


            {!graphData["AlumniTotalCount"] && graphData["AlumniTotalCount"]!=0 ? (<Paper className={classes.paper}>
                <h2> Alumni Total Count: Loading from database ... </h2>
              </Paper>) : (
              <Paper className={classes.paper}>
                <AlumniTotalCount count={graphData['AlumniTotalCount']} />
              </Paper>
              )}
              {/* {!graphData['AlumniTotalCount'] ? (
              <Paper className={classes.paper}>
                <h1> Alumni count is not currently available </h1>
              </Paper>):
              (
                <Paper className={classes.paper}>
                  <AlumniTotalCount count={graphData['AlumniTotalCount']} />
                </Paper>
                )
              } */}

            </Grid>

            {/* Alumni by major */}
            <Grid item sm={12} md = {6}>

              {!graphData["AlumiByMajors"] ? (<Paper className={classes.paper}>
                <h2> Alumni By Majors: Loading from database ... </h2>
              </Paper>) : (
              <Paper className={classes.paper}>
                <Typography className={classes.graphTitle}> Alumni By Majors  </Typography>
                {graphData["AlumiByMajors"] &&
                <Box width={1} >
                  <BarChart graphData = {graphData["AlumiByMajors"]}/>
                </Box>
                }
              </Paper>
              )}
            </Grid>
            {/* Alumni by grad School */}
            <Grid item sm={12} md = {6}>
              {!graphData["AlumiByGradSchools"] ? (<Paper className={classes.paper}>
                <h2> Alumni By Grad School: Loading from database ... </h2>
              </Paper>) : (
              <Paper className={classes.paper}>
                <Typography className={classes.graphTitle}> Alumni By Graduate School  </Typography>
                {graphData["AlumiByGradSchools"] &&
                <Box width={1} >
                  <BarChart graphData = {graphData["AlumiByGradSchools"]}/>
                </Box>
                }
                {/* <AlumniByGradSchool graphData = {gradSchoolData} /> */}
              </Paper>)}
            </Grid>
            {/* Alumni by grad Degree */}
            <Grid item sm={12} md = {6}>
              {!graphData["AlumniByGradDegrees"] ? (<Paper className={classes.paper}>
                <h2> Alumni By Grad Degrees: Loading from database ... </h2>
              </Paper>) : (
              <Paper className={classes.paper}>
                <Typography className={classes.graphTitle}> Alumni By Graduate Degrees  </Typography>
                {graphData["AlumniByGradDegrees"] &&
                <Box width={1}>
                  <BarChart graphData = {graphData["AlumniByGradDegrees"]} />
                </Box>
                }
                {/* <AlumniByGradDegree graphData = {degreeData} /> */}
              </Paper>)}
            </Grid>

            {/* Alumni by Alumni Seniority */}
            <Grid item sm={12} md = {6}>
              {!graphData["AlumiBySeniorities"] ? (<Paper className={classes.paper}>
                <h2> Alumni By Seniorities: Loading from database ... </h2>
              </Paper>) : (
              <Paper className={classes.paper}>
                {/* TODO: Fix naming differences of AlumiBySeniorities vs AlumniBySeniority */}
                <Typography className={classes.graphTitle}> Alumni By Seniority  </Typography>
                {graphData["AlumiBySeniorities"] && <AlumniBySeniority height= {graphHeight} width = {graphWidth} graphData = {graphData["AlumiBySeniorities"]}/>}
              </Paper>)}
            </Grid>




            {/* Alumni by Industry */}
            <Grid item xs={12}>
              {!graphData["AlumiByIndustries"] ? (<Paper className={classes.paper}>
                <h2> Alumni By Industry: Loading from database ... </h2>
              </Paper>) : (
              <Paper className={classes.paper}>
                {/* TODO: Fix naming inconsistency with AlumniByIndustries vs AlumniByIndustry */}
                <Typography className={classes.graphTitle}> Alumni By Industry </Typography>
                {graphData["AlumiByIndustries"] &&
                <Box width={1}>
                  <Cloud graphData = {graphData["AlumiByIndustries"]}/>
                </Box>
                }
                {/* <AlumniByIndustry graphData = {industryData} /> */}
              </Paper>)}
            </Grid>
            <Grid item xs={12}>
              {!graphData["AlumniByCities"] ? (<Paper className={classes.paper}>
                <h2> Alumni map: Loading from database ... </h2>
              </Paper>) : (
              <Paper className={classes.paper}>
                <Typography className={classes.graphTitle}> Alumni Map </Typography>
                {graphData["AlumniByCities"] &&
                <Box width={1}>

                  <AlumniBubbleMap graphData = {graphData["AlumniByCities"]}/>
                </Box>
                }

              </Paper>)}
            </Grid>
            {/* <Grid item sm={12} md = {6}>
              <Paper className={classes.paper}>
                {<AlumniBubbleMap graphData = {mapData} /> }
              </Paper>
            </Grid> */}
            </Grid>

            </div>
          {/* <Box pt={4}>
          </Box> */}
        {/* </Container> */}


    </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          College Spreadsheet Generator
        </Typography>
        {/* <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Click here to see the source code
        </Typography> */}
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}