
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
import { ScrollTo } from "react-scroll-to";
import Button from '@material-ui/core/Button';
import FiltersMapping from './FiltersMapping'
import ReactVirtualizedTable from './CollegeTable'
import { Table } from 'react-virtualized';


const hardCodedFilters = {
  "school.region_id": [
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
  ],
  "school.ownership": [
    'Public',
    'Private nonprofit',
    'Private for-profit',
  ],
  "school.degrees_awarded.highest": [
    'Non-degree-granting',
    'Certificate degree',
    'Associate degree',
    'Bachelors degree',
    'Graduate degree',
  ],
  "school.institutional_characteristics.level": [
    '4-year',
    '2-year',
    'Less-than-2-year',
  ],
  "school.minority_serving.historically_black": [
    'No',
    'Yes',
  ],
  "singlesex.or.coed": [
    "Single-Sex: Men",
    "Single-Sex: Women",
    "Co-Educational",
  ]
}

const drawerWidth = 240;

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
  

function cleanObject(o){
  // for some reason, filters come through strangely. This function fixes this
  var newObj = {}

  for (let k in o){
    let v = o[k]

    if (Array.isArray(v) && v.length > 0){
      newObj[k]=v
    }
  }
  return newObj
}

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const [filters, setFilters] = useState({})
  const [table, setTable] = useState({})
//   const forceUpdate = useForceUpdate()  FIXME: This might be necessary later

  const applyFilters = vals => {
    let postBody = {"filter_dict":{"is_in":cleanObject(vals),"is_btwn":{"latest.admissions.act_scores.midpoint.cumulative":{"min":0,"max":36,"inclusive":true},"latest.student.size":{"min":0,"max":50000,"inclusive":true}}},"recipient_email":"jack.weber@pomona.edu"}
    postRequest(postBody)
    // var apiOutput = postRequest(removeUnnecessaryPropertiesFromPostBody(vals))
    //alert('filters have been applied \n' + JSON.stringify(removeUnnecessaryPropertiesFromPostBody(vals)));
    // forceUpdate();
  };
  
  // POST REQUEST
  async function postRequest(postBody){
    // used https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples "POST request using fetch with async/await"

    const requestOptions = {
      method: 'POST',
      headers: { 
        Accept: 'application/json',
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(postBody)
    };
    const response = await fetch('https://flask-restful-collegedata.herokuapp.com/', requestOptions);
    //  const response = await fetch('https://localhost:44355/api/Alumni', requestOptions);

    const data = await response.json();
    setTable(data);
  }

  useEffect(() => {
    setFilters(hardCodedFilters)

    // When the page loads, GET request and POST request are called to populate the page initially
    // getRequest()

    // POST request is called with no body which asks the backend for all data
    // postRequest({})
  }, [])

    return (
        <React.Fragment>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              {/* <CameraIcon className={classes.icon} /> */}
              <Typography variant="h6" color="inherit" noWrap>
                College Spreadsheet Generator
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                College Spreadsheet Generator
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
              This tool is designed to be the first step in your college process! Simply insert your preferences below, and we will send you a personalized spreadsheet with colleges and all of the information about each one!
              </Typography>
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
                {
                  Object.keys(table).length > 0 &&
                  table['table'] && table['table']['column_names'] && table['table']['rows'] && 
                  <ReactVirtualizedTable 
                    column_names={table['table']['column_names']}
                    rows = {table['table']['rows']}  
                  />}
              </Grid>
            </Grid> {/* container spacing={3} */}
            
          </div> {/* classes.root */}


        </React.Fragment>
    )
}