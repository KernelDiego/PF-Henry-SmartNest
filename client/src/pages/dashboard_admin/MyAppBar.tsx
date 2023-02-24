import React from "react";
import { ToggleThemeButton, AppBar, defaultTheme } from "react-admin";
import { Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const darkTheme = {
  palette: { mode: "dark" as const },
};

export const MyAppBar = (props: any) => (
  <AppBar {...props} style={{ backgroundColor: ` rgba(20, 33, 66, 1)` }}>
    <Typography flex='1' variant='h6' id='react-admin-title'></Typography>
    <NavLink to='/' style={{ textDecoration: "none" }}>
      <Button variant='text' style={{ color: "#fafafa" }}>
        home
      </Button>
    </NavLink>
    <ToggleThemeButton lightTheme={defaultTheme} darkTheme={darkTheme} />
  </AppBar>
);
