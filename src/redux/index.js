import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import JobReducer from "./job/reducer";

const rootReducers = combineReducers({
  job: JobReducer
});

export default createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(thunk))
);
