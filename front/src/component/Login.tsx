import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import {
  Box,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function LogIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [userImput, setUserImput] = useState({
    email: "",
    password: "",
  });
  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserImput({ ...userImput, email: e.target.value });
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserImput({ ...userImput, password: e.target.value });
  };
  const dispatch = useDispatch();
  const nav = useNavigate();
  const LoginUser = async () => {};

  return (
    <div>
      <div className="App_navbar">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs maxItems={2} aria-label="breadcrumb">
            <Link to="/">
              <li>Home</li>
            </Link>

            <Link to="/favourite">
              <Badge color="secondary">
                <li>Registrants</li>
              </Badge>
            </Link>
          </Breadcrumbs>
        </div>
      </div>
      <div className="login">
        <h3>Please login with your Reg. Number and password</h3>
        <div>
          <input
            onChange={emailHandler}
            type="text"
            className="email-control"
            placeholder="Reg. No."
          />
        </div>
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            onChange={passwordHandler}
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button onClick={LoginUser} variant="outlined">
          Sign In
        </Button>
      </div>
    </div>
  );
}
