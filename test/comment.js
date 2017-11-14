import { handleActions } from "redux-actions";
import * as actions from "../actions";

const initialState = {};

export default handleActions(
  {
    [actions.getCommentRequest]: (state, action) => ({
      ...state
    })
  },
  initialState
);
