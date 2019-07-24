import { SAVE_JOBS_SUCCESS, SAVE_JOBS_FALURE } from "./type";

export const initialState = {
  total: 0,
  current_page: 0,
  data: [],
  error: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SAVE_JOBS_SUCCESS:
      return {
        ...state,
        total: action.total,
        current_page: action.current_page,
        data: action.data
      };
    case SAVE_JOBS_FALURE:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};
