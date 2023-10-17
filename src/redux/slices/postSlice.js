import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("/posts/fetchPostsStatus", async () => {
  const { data } = await axios.get('/posts')
  return data;
});

export const fetchGetOnePost = createAsyncThunk("/onePost/fetchGetOnePostStatus", async (params) => {
  const { data } = await axios.get(`/posts/${params.id}`);
  return data;
});

export const fetchTags = createAsyncThunk("/posts/fetchTagsStatus", async () => {
  const { data } = await axios.get('/tags')
  return data;
}); 

export const fetchAllComments = createAsyncThunk("/allComments/fetchAllCommentsStatus", async () => {
  const { data } = await axios.get('/comments')
  return data;
})

export const fetchAddComment = createAsyncThunk("/comment/fetchAddCommentStatus", async (params) => {
  const { data } = await axios.post(`/posts/${params.postId}`, params.text)
  return data;
})

export const fetchRemoveComment = createAsyncThunk("/removeComment/fetchRemoveCommentStatus", async (params) => {
  const {data} = await axios.delete('/comments', {data: params});
  return data;
})

export const fetchRemovePost = createAsyncThunk("/posts/fetchRemoveStatus", async (params) => {
  const { data } = await axios.delete(`/posts/${params}`)
  return data;
}); 


const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: [],
    status: 'loading',
  }
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state) => {
        state.posts.items = [];
        state.posts.status = 'loading'
    },
    [fetchPosts.fulfilled]: (state, action) => {
        state.posts.items = action.payload;
        state.posts.status = 'success';
    },
    [fetchPosts.rejected]: (state) => {
        state.posts.items = [];
        state.posts.status = 'failed';
    },

    [fetchTags.pending]: (state) => {
        state.tags.items = [];
        state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
        state.tags.items = action.payload;
        state.tags.status = 'success';
    },
    [fetchTags.rejected]: (state) => {
        state.tags.items = [];
        state.tags.status = 'failed';
    },

    [fetchRemovePost.pending]: (state, action) => {
      console.log(action.payload);
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
    },

    [fetchAllComments.pending]: (state) => {
      state.comments.items = [];
      state.comments.status = 'loading';
    },
    [fetchAllComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "success";
    },
    [fetchAllComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'failed';
    },

    [fetchAddComment.fulfilled]: (state, action) => {
      state.comments.items.push(action.payload);
      state.comments.status = "success";
    },

    [fetchRemoveComment.fulfilled]: (state, action) => {
      state.comments.items = state.comments.items.filter(obj => obj._id !== action.payload._id);
      state.comments.status = 'success';
    },

  },
});

export const { increment } = postSlice.actions;

export default postSlice.reducer;
