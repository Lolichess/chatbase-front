import { SigninContext } from "@/context";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const navItems = [
  {
    name: "Inicio",
    url: "/",
  },
  {
    name: "Planes",
    url: "/pricing",
  },
];

const navItemsLogin = [
  {
    name: "Inicio",
    url: "/",
  },
  {
    name: "Planes",
    url: "/pricing",
  },
  {
    name: "Mis chatbots",
    url: "/my-chatbots",
  },
];

const Navbar = () => {
  const { user } = useContext(SigninContext);
  const navigate = useNavigate();

  const pushToLogin = () => {
    navigate("/login");
  };

  const pushToSettingsUser = () => {
    navigate("/settings");
  };

  const pushTopage = (url: any) => {
    navigate(url);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Box component="div" sx={{ display: "flex" }}>
            <List sx={{ display: "flex" }}>
              {user
                ? navItemsLogin.map((item) => (
                    <ListItem
                      key={item.name}
                      disablePadding
                      sx={{ width: "auto" }}
                      onClick={() => pushTopage(item.url)}
                    >
                      <ListItemButton
                        sx={{ textAlign: "center", width: "auto" }}
                      >
                        <ListItemText
                          sx={{ fontSize: { xs: "14px" } }}
                          primary={item.name}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))
                : navItems.map((item) => (
                    <ListItem
                      key={item.name}
                      disablePadding
                      sx={{ width: "auto" }}
                      onClick={() => pushTopage(item.url)}
                    >
                      <ListItemButton sx={{ textAlign: "center" }}>
                        <ListItemText
                          sx={{ fontSize: { xs: "14px" } }}
                          primary={item.name}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
            </List>
          </Box>
          {user ? (
            <Button
              color="inherit"
              onClick={pushToSettingsUser}
              sx={{ marginLeft: "auto" }}
            >
              Cuenta
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={pushToLogin}
              sx={{ marginLeft: "auto" }}
            >
              Entrar
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
