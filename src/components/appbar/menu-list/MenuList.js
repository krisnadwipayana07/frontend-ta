import { Divider, List } from "@mui/material";
import React from "react";
import MenuComponent from "./MenuComponent";
import { sidebarList } from "./SidebarList";

export default function MenuList() {
  return (
    <div>
      <Divider />
      <List disablePadding sx={{ width: "100%", maxWidth: "250px" }}>
        {sidebarList.map((item, key) => (
          <MenuComponent key={key} item={item} />
        ))}
      </List>
    </div>
  );
}
