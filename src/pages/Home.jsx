import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';

import { useDispatch, useSelector } from 'react-redux';
import { fetchAllComments, fetchPosts, fetchTags } from '../redux/slices/postSlice';

export const Home = () => {
  const dispatch = useDispatch()

  const userData = useSelector(state => state.auth.data)
  const { posts, tags, comments } = useSelector((state) => state.posts)
  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'
  const isCommentsLoading = comments.status === 'loading'

  const [section, setSection] = useState({ sectionName: "New", value: 0 })

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchAllComments());
  }, [])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={section.value} aria-label="basic tabs example">
        <Tab onClick={() => setSection({ sectionName: 'New', value: 0 })} label="Новые" />
        <Tab onClick={() => setSection({ sectionName: 'Popular', value: 1 })} label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading
            ? [...Array(5)]
            : (section.sectionName === 'New' ? posts.items : [...posts.items].sort((a, b) => b.viewsCount - a.viewsCount))).map((obj, index) =>
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
                    imageUrl={obj.imageUrl ? `http://localhost:3001${obj.imageUrl}` : ''}
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
        <Grid xs={4} item>
          <TagsBlock items={tags.items.slice(0, 5)} isLoading={isTagsLoading} />
          <CommentsBlock items={comments.items.slice(-3).reverse()} isLoading={isCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
