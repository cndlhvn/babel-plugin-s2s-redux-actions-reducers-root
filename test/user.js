import { handleActions } from "redux-actions";
import * as actions from "../actions";

const initialState = {};

export default handleActions(
  {
    [actions.getUserRequest]: (state, action) => ({
      ...state
    })
  },
  initialState
);
