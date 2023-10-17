import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import { useDispatch } from "react-redux";
import { fetchRemoveComment } from "../redux/slices/postSlice";

const Comment = ({ obj, isLoading = true, isEditable = false }) => {
    const dispatch = useDispatch();

    const onClickRemove = () => {
        if(window.confirm('Вы действительно хотите удалить статью?')){
            dispatch(fetchRemoveComment({id: obj._id, postId: obj.postId}))
          }
    }

    return (
        <React.Fragment>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    {isLoading ? (
                        <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                        <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                    )}
                </ListItemAvatar>

                {isLoading ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <Skeleton variant="text" height={25} width={120} />
                        <Skeleton variant="text" height={18} width={230} />
                    </div>

                ) : (
                    <ListItemText
                        primary={obj.user.fullName}
                        secondary={obj.text}
                    />
                )
                }
                {
                    isEditable && (
                        <IconButton onClick={onClickRemove} color="warning" style={{ marginRight: "15px", marginTop: '10px' }}>
                            <DeleteIcon />
                        </IconButton>
                    )
                }
            </ListItem>

            <Divider variant="inset" component="li" />
        </React.Fragment>
    )
}

export default Comment