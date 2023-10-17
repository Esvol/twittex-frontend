import React, { useEffect, useState } from "react";

import { Post } from "../components/Post";
import { AddComment } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllComments } from "../redux/slices/postSlice";


export const FullPost = () => {
  const dispatch = useDispatch();

  const userData = useSelector(state => state.auth.data);
  console.log(userData);
  const comments = useSelector(state => state.posts.comments);

  const [data, setData] = useState();
  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const IsLoadingComments = comments.status === 'loading'

  const {id} = useParams();
  
  useEffect(() => {
    axios.get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setIsLoadingPost(false);
      })
      .catch(err => console.log('Error with get /posts/:id query\n' + err))

      dispatch(fetchAllComments())
  }, [])


  if(isLoadingPost){
    return <Post isLoading={isLoadingPost}/>
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:3001${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <p>
          <ReactMarkdown children={data.text}/>
        </p>
      </Post>
      <CommentsBlock
        items={comments.items.filter(obj => obj.postId === data._id)}
        userData={userData}
        isLoading={IsLoadingComments}
      >
        <AddComment postId={id} data={data} isOpen={userData !== null}/>
      </CommentsBlock>
    </>
  );
};
