import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid } from "@material-ui/core";
import { TextField } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import styled from "styled-components";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import SearchForm from "../search";
import { textColorActions } from "../../redux/slices/textColor";
import { RootState } from "../../redux/store";
import { green, lightGreen } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import logo from "../../assets/MRTBLogo-Copy2.png";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

const appcolor = lightGreen[300];
const StyledTextField = styled(TextField)`
  // working
  & .MuiFormLabel-root {
    color: white;
  }
  & .MuiInputLabel-root {
    color: white !important;
  }

  // & .MuiInput-root:hover:not:before {
  //   color: white;
  // }

  & .MuiInput-root:before {
    border-color: white;
  }
  & .MuiInput-root:after {
    border-color: white;
  }
  & .MuiInputBase-input {
    color: white;
  }
`;

const IconButtonStyled = styled(IconButton)`
  margin-right: 16px;
  color: #00000;
  &:hover {
    color: #da0037;
    background-color: transparent;
  }
`;

const SocialIconsContainer = styled(Grid)`
  margin-top: 345px;
  margin-bottom: 16px;
`;

const StyledWhiteFavouriteBadge = styled(Badge)`
  & .MuiBadge-badge {
    position: absolute;
    right: 17.5px;
    top: 16px;
    background: transparent;
    color: white;
    margin: 0;
  }
`;

const StyledCartBadge = styled(Badge)`
  & .MuiBadge-badge {
    position: absolute;
    top: 29px;
    padding: "0 4px";
    background: black;
    color: white;
    margin: 0;
  }
`;

export default function NavBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const appcolor = lightGreen[300];
  const dispatch = useDispatch();

  const [state, setState] = useState({
    left: false,
  });

  const toggleDrawer =
    (anchor: "left", open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, left: open });
    };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        component="nav"
        position="absolute"
        sx={{ boxShadow: "none", backgroundColor: "transparent" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              "&:hover": { backgroundColor: "transparent" },
              mr: 2,
              color: "white",
              minHeight: 150,
            }}
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            <Box
              sx={{ width: 247 }}
              component="div"
              role="presentation"
              onClick={toggleDrawer("left", false)}
              onKeyDown={toggleDrawer("left", false)}
            >
              <List>
                <Box
                  sx={{
                    mb: 3,
                    backgroundColor: "transparent",
                  }}
                >
                  <ListItem
                    disablePadding
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Link
                      style={{
                        textDecoration: "none",
                        color: "green",
                      }}
                      to="/"
                    >
                      <Typography variant="h4">Professions</Typography>
                    </Link>
                  </ListItem>
                </Box>

                <Box
                  component="div"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <Stack spacing={2}>
                    <ListItem disablePadding>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/registrants"
                      >
                        <Button
                          sx={{
                            backgroundColor: "transparent",
                            textDecoration: "none",
                          }}
                          color="inherit"
                        >
                          <Typography>Physiotheray</Typography>
                        </Button>
                      </Link>
                    </ListItem>
                    <ListItem disablePadding>
                      <Link
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                        to="/registrants"
                      >
                        <Button
                          sx={{
                            "&:hover": { backgroundColor: "transparent" },
                            textDecoration: "none",
                          }}
                          color="inherit"
                        >
                          <Typography>Ocupational Therapists</Typography>
                        </Button>
                      </Link>
                    </ListItem>
                    <ListItem disablePadding>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/wishlist"
                      >
                        <Button
                          sx={{
                            "&:hover": { backgroundColor: "transparent" },
                            textDecoration: "none",
                          }}
                          color="inherit"
                        >
                          <Typography>Speech Therapist</Typography>
                        </Button>
                      </Link>
                    </ListItem>
                    <ListItem disablePadding>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/about"
                      >
                        <Button
                          sx={{
                            "&:hover": { backgroundColor: "transparent" },
                            textDecoration: "none",
                          }}
                          color="inherit"
                        >
                          <Typography>Audiologist</Typography>
                        </Button>
                      </Link>
                    </ListItem>
                    <ListItem disablePadding>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to="/cart"
                      >
                        <Button
                          sx={{
                            "&:hover": { backgroundColor: "transparent" },
                            textDecoration: "none",
                          }}
                          color="inherit"
                        >
                          <Typography>Chariopractors</Typography>
                        </Button>
                      </Link>
                    </ListItem>
                  </Stack>
                </Box>
              </List>
            </Box>
          </Drawer>
          <Link
            style={{ textDecoration: "none", color: "white", flexGrow: 1 }}
            to="/"
          >
            <img src={logo} alt="" />
          </Link>

          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to="/registrants"
          >
            <div style={{ marginRight: "50px" }}>
              <StyledTextField label="Search Registrants" variant="standard" />
            </div>
          </Link>

          <div>
            <Button id="fade-button" onClick={handleClick}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  color: "white",
                }}
              >
                Departments
              </Typography>
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                "aria-labelledby": "fade-button",
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <Link
                to="/Secretariate"
                style={{
                  textDecoration: "none",
                }}
              >
                <MenuItem>Secretariat</MenuItem>
              </Link>
              <Link
                to="/Registration"
                style={{
                  textDecoration: "none",
                }}
              >
                <MenuItem>Registration</MenuItem>
              </Link>
              <Link
                to="/Institution"
                style={{
                  textDecoration: "none",
                }}
              >
                <MenuItem>Institution</MenuItem>
              </Link>
              <Link
                to="/Inspectorate"
                style={{
                  textDecoration: "none",
                }}
              >
                <MenuItem>Inspectorate</MenuItem>
              </Link>
            </Menu>
          </div>
          <Button>
            <Link
              to="/Login"
              style={{
                flexGrow: 1,
                textDecoration: "none",
              }}
            >
              Members' Login
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
