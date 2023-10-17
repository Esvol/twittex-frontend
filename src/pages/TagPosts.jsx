import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComments, fetchPosts, fetchTags } from '../redux/slices/postSlice';
import { useParams } from 'react-router-dom';

const TagPosts = () => {
  const dispatch = useDispatch()
  const { id } = useParams();

  const userData = useSelector(state => state.auth.data)
  const { posts } = useSelector((state) => state.posts)
  const isPostsLoading = posts.status === 'loading'

  const [section, setSection] = useState({ sectionName: "New", value: 0 })

  const tagPosts = [...posts.items].filter(post => post?.tags.includes(`${id}`))

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchAllComments());
  }, [])

  return (
    <>
      <p style={{ margin: "0px 0px 15px 10px", fontSize: 35, opacity: 0.6 }}># {id.charAt(0).toUpperCase() + id.slice(1)}</p>
      <Tabs style={{ marginBottom: 15, marginTop: -15 }} value={section.value} aria-label="basic tabs example">
        <Tab onClick={() => setSection({ sectionName: 'New', value: 0 })} label="Новые" />
        <Tab onClick={() => setSection({ sectionName: 'Popular', value: 1 })} label="Популярные" />
      </Tabs>
      <Grid spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading
            ? [...Array(5)]
            : (section.sectionName === 'New' ? tagPosts : tagPosts.sort((a, b) => b.viewsCount - a.viewsCount))).map((obj, index) =>
              isPostsLoading ?
                (
                  <Post
                    key={index}
                    isLoading={true}
                  />
                ) :
                (
                  <Post
                    key={obj._id}
                    id={obj._id}
                    title={obj.title}
                    imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ''}
                    user={obj.user}
                    createdAt={obj.createdAt}
                    viewsCount={obj.viewsCount}
                    commentsCount={obj.comments.length}
                    tags={obj.tags}
                    isEditable={obj.user._id === userData?._id}
                  />
                )

            )}
        </Grid>
      </Grid>
    </>
  );
}

export default TagPosts