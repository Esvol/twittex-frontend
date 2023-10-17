import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchAddComment } from "../../redux/slices/postSlice";

export const AddComment = ({ postId, data, isOpen = false }) => {
  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      text: ''
    },
    mode: 'onChange'
  })

  const onSubmitText = async (values) => {
    const commentInfo = {
      postId: postId,
      text: values,
    }

    reset();
    const data = await dispatch(fetchAddComment(commentInfo));
    console.log(data);
  }

  return (
    <>
      {
        isOpen ?
          <form method="post" onSubmit={handleSubmit(onSubmitText)}>
            <div className={styles.root}>
              <Avatar
                classes={{ root: styles.avatar }}
                src={data.user.imageUrl ? `http://localhost:3001${data.imageUrl}` : ''}
              />
              <div className={styles.form}>
                <TextField
                  type="text"
                  name="text"
                  label="Написать комментарий"
                  variant="outlined"
                  maxRows={10}
                  multiline
                  fullWidth
                  helperText={errors.text && <span>This field is required!</span>}
                  error={errors?.text === '' && true}
                  {...register("text", { minLength: { value: 1, message: 'You need to write something in this field.' } })}
                />
                <Button type='submit' variant="contained">Отправить</Button>
              </div>
            </div>
          </form>
          :
          <div style={{opacity: 0.7, margin: "0px 0px 0px 15px", paddingBottom: 15}}>Вам нужно зарегистироваться, чтобы написать комментарий!</div>
      }
    </>
  );
};
