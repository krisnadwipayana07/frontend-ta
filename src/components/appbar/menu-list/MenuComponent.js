import React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { color } from "@mui/system";
import { Link, Navigate } from "react-router-dom";

export default function MenuComponent({ item, key }) {
  const [open, setOpen] = React.useState(false);
  const currentPath = window.location.pathname;

  const handleClick = () => {
    setOpen(!open);
    if (item.link !== undefined) {
      window.location.replace(item?.link);
    }
  };
  return (
    <>
      <ListItem key={key} disablePadding>
        <ListItemButton
          disablePadding
          onClick={handleClick}
          sx={{
            mr: "3px",
            borderTopRightRadius: "20px",
            borderBottomRightRadius: "20px",
            backgroundColor: currentPath === item.link ? "gray" : "",
            "&:hover": {
              backgroundColor: currentPath === item.link ? "gray" : "",
            },
          }}
        >
          <ListItemIcon>
            <item.icon />
          </ListItemIcon>
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{
              style: {
                color: currentPath === item.link ? "white" : "black",
              },
            }}
          />
          {item.children && (open ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children?.map((item) => (
            <Link to={item.link} style={{ textDecoration: "none" }}>
              <ListItemButton
                disablePadding
                sx={{
                  mr: "3px",
                  borderTopRightRadius: "20px",
                  borderBottomRightRadius: "20px",
                  backgroundColor: currentPath === item.link ? "green" : "",
                  "&:hover": {
                    backgroundColor: currentPath === item.link ? "green" : "",
                  },
                }}
              >
                <ListItemIcon>
                  <item.icon fontSize="small" />
                </ListItemIcon>
                <ListItemText
                  secondary={item.name}
                  secondaryTypographyProps={{
                    style: {
                      color: currentPath === item.link ? "white" : "black",
                    },
                  }}
                />
              </ListItemButton>
            </Link>
          ))}
        </List>
      </Collapse>
    </>
  );
}
