import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/auth';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';

export const AddPost = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth)

  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('')

  const isEditing = Boolean(id)

  const inputFileRef = useRef(null);

  useEffect(() => {
    if (id) {
      axios.get(`/posts/${window.location.pathname.split('/')[2]}`)
      .then(({ data }) => {
          setText(data.text);
          setTitle(data.title);
          setTags(data.tags.join(' '))
          setImageUrl(data.imageUrl)
        })
        .catch(err => {
          console.warn(err);
        })
    }
  }, [])

  const handleChangeFile = async (e) => {
    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/uploads', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
      alert('Error, upload file')
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = useCallback((text) => {
    setText(text);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: 1,
      },
    }),
    [],
  );

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        text,
        tags: tags.split(' '),
        imageUrl,
      }

      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields)

      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`)

    } catch (error) {
      console.log(error);
      alert('Error, create article')
    }
  }

  console.log({ title, text, tags });

  if (!localStorage.getItem('token') && !isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper style={{ padding: 30 }}>
      <form method='post'>
        <Button onClick={() => inputFileRef.current.click()} variant="outlined" size="large">
          Загрузить превью
        </Button>
        <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
        {imageUrl && (
          <>
            <Button variant="contained" color="error" onClick={onClickRemoveImage}>
              Удалить
            </Button>
            <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
          </>
        )}
        <br />
        <br />
        <TextField
          classes={{ root: styles.title }}
          variant="standard"
          placeholder="Заголовок статьи..."
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <TextField
          classes={{ root: styles.tags }}
          variant="standard"
          placeholder="Тэги"
          fullWidth
          onChange={(e) => setTags(e.target.value)}
          value={tags}
        />
        <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
        <div className={styles.buttons}>
          <Button onClick={onSubmit} size="large" variant="contained">
            {
              isEditing ? "Редактировать" : "Опубликовать"
            }
          </Button>
          <Link to="/">
            <Button size="large">Отмена</Button>
          </Link>
        </div>
      </form>
    </Paper>
  );
};
