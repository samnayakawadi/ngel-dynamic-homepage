import thunk from "redux-thunk";
import {createBrowserHistory} from "history";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
//import rootReducer from '../modules';
import axiosMiddleware from "redux-axios-middleware";
import logger from "redux-logger";
import courseReducer from '../redux-files/Reducers/courseReducer';

import HttpService from "./HttpService";

const setup = () => {
  const enhancers = [];
  const middleware = [
    thunk,
    axiosMiddleware(HttpService.getAxiosClient())
  ];

  if (process.env.NODE_ENV === 'development') {
    enhancers.push(applyMiddleware(logger));
  }

  const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);
  // let rootReducer = combineReducers({courseReducer})
  const store = createStore(courseReducer, composedEnhancers);
  const history = createBrowserHistory();

  return { history, store };
};

const StoreService = {
  setup,
};

export default StoreService;
