import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    commentLikes: null,
  },
  reducers: {
    setComments(state, action) {
      state.comments = action.payload;
    },
    deleteComment(state, action) {
      state.comments = state.comments.filter((c) => c._id !== action.payload);
    },
    setLike(state, action) {
      if (!state.commentLikes) {
        state.commentLikes = {};
      }
      state.commentLikes.likes = action.payload.likes;
    },
  },
});

const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export { commentReducer, commentActions };
