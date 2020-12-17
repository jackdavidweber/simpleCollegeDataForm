
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
  

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const [filters, setFilters] = useState({})
  const [graphData, setGraphData] = useState({})
//   const forceUpdate = useForceUpdate()  FIXME: This might be necessary later

  const applyFilters = vals => {
    console.log("applying filters needs to be filled in")
    // var apiOutput = postRequest(removeUnnecessaryPropertiesFromPostBody(vals))
    //alert('filters have been applied \n' + JSON.stringify(removeUnnecessaryPropertiesFromPostBody(vals)));
    // forceUpdate();
  };

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
                Fill in here
                {Object.keys(filters).length > 0 && <FiltersMapping input={filters} buttonBehavior= {applyFilters} />}
              </Grid>

            </Grid>
          </div>

        </React.Fragment>
    )
}