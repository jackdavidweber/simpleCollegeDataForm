/*!

=========================================================
* Material Kit React - v1.7.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Camera from "@material-ui/icons/Cast";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "src/components/Header/Header.jsx";
import Footer from "src/components/Footer/Footer.jsx";
// src/components/CustomButtons
import Button from "src/components/CustomButtons/Button.jsx";
import GridContainer from "src/components/Grid/GridContainer.jsx";
import GridItem from "src/components/Grid/GridItem.jsx";
import HeaderLinks from "src/components/Header/HeaderLinks.jsx";
import NavPills from "src/components/NavPills/NavPills.jsx";
import Parallax from "src/components/Parallax/Parallax.jsx";

import profile from "src/assets/img/faces/christian.jpg";

import studio1 from "src/assets/img/examples/studio-1.jpg";
import studio2 from "src/assets/img/examples/studio-2.jpg";
import studio3 from "src/assets/img/examples/studio-3.jpg";
import studio4 from "src/assets/img/examples/studio-4.jpg";
import studio5 from "src/assets/img/examples/studio-5.jpg";
import work1 from "src/assets/img/examples/olu-eletu.jpg";
import work2 from "src/assets/img/examples/clem-onojeghuo.jpg";
import work3 from "src/assets/img/examples/cynthia-del-rio.jpg";
import work4 from "src/assets/img/examples/mariya-georgieva.jpg";
import work5 from "src/assets/img/examples/clem-onojegaw.jpg";
// ../src/assets/img/examples/clem-onojegaw.jpg
import profilePageStyle from "src/assets/jss/material-kit-react/views/profilePage.jsx";


// form stuff
import Slider from '@material-ui/core/Slider';






class ProfilePage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
      <div>
        <Header
          color="transparent"
          // brand="Material Kit React"
          color="transparent"
          // routes={dashboardRoutes}
          brand="College List Generator"
          rightLinks={<HeaderLinks />}
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
          fixed
          // changeColorOnScroll={{
          //   height: 200,
          //   color: "white"
          // }}
          {...rest}
        />
        <Parallax filter image={require("src/assets/img/landing-bg.jpg")}>
          <div className={classes.headContainer}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                {/* <h1 className={classes.title}>Generate Your College List Here</h1> */}
                <h1 className={classes.headTitle}>Your First Step in the College Process</h1>
                <h4>
                  There are over 10,000 colleges in the United States. 
                  Yet high schoolers are expected to come up with a list of 10-14 colleges while also doing their school work. 
                  Use this easy two step form to filter down your school list and have it emailed to you in a simple excel sheet.
                </h4>
                <br />
                <Button
                  color="danger"
                  size="lg"
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fas fa-play" />
                  Get Started
                </Button>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>        
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>

              <div className={classes.description}>
                <p>
                  An artist of considerable range, Chet Faker — the name taken
                  by Melbourne-raised, Brooklyn-based Nick Murphy — writes,
                  performs and records all of his own music, giving it a warm,
                  intimate feel with a solid groove structure.{" "}
                </p>
              </div>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Studio",
                        tabIcon: Camera,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={studio1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio2}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={studio5}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio4}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Work",
                        tabIcon: Palette,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work2}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work3}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work4}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work5}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Favorite",
                        tabIcon: Favorite,
                        tabContent: (
                          <GridContainer justify="center">
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work4}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio3}
                                className={navImageClasses}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <img
                                alt="..."
                                src={work2}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={work1}
                                className={navImageClasses}
                              />
                              <img
                                alt="..."
                                src={studio1}
                                className={navImageClasses}
                              />
                            </GridItem>
                          </GridContainer>
                        )
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

ProfilePage.propTypes = {
  classes: PropTypes.object
};

export default withStyles(profilePageStyle)(ProfilePage);
