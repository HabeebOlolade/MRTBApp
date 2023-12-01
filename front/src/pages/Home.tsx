import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { Paper } from "@mui/material";
import NavBar from "../component/Nav/NavBar";
import Fab from "@mui/material/Fab";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Link } from "react-router-dom";
import HomeBody from "../component/HomeBody";

export default function Home() {
  return (
    <div>
      <div className="slides">
        <NavBar />
        <div>
          <video
            style={{ objectFit: "fill", width: "100vw", height: "90vh" }}
            autoPlay
            loop
            muted
          >
            <source
              src={require("../assets/pexels-maksim-goncharenok-5642529-1920x1080-25fps.mp4")}
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <HomeBody />
      <div className="signuplogo">
        <Link to="/usersignup">
          <Fab variant="extended" color="primary" aria-label="add">
            <NavigationIcon sx={{ mr: 1 }} />
            Register
          </Fab>
        </Link>
      </div>
    </div>
  );
}
