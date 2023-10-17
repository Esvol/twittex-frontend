import React from "react";

import { SideBlock } from "./SideBlock";
import List from "@mui/material/List";
import Comment from "./Comment";


export const CommentsBlock = ({ items, userData, children, isLoading = true}) => {
  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <Comment
            key={index}
            obj={obj}
            isLoading={isLoading}
            isEditable={userData?._id === obj?.user._id}
          />
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
