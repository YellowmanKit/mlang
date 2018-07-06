import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/root";
import reduxLogger from "redux-logger";
import thunk from "redux-thunk"
//import axios from "axios";

const error = (store) => (next) => (action) => {
  try{
    next(action);
  } catch(err){
    console.log("error! ", err);
  }
}

const middleware = applyMiddleware(error, reduxLogger, thunk);

const store = createStore(rootReducer,{},middleware);

store.subscribe(()=>{
  //console.log("store changed", store.getState());
});

export default store;

/*store.dispatch({type: "SET_STATUS",payload: "init"})
store.dispatch({type: "SET_NAME", payload: "Kit Wong"})
store.dispatch({type: "SET_TYPE", payload: "Student"})
store.dispatch((dispatch)=>{
  dispatch({type: "SET_STATUS", payload: "FETCHING"});
  axios.get("http://rest.learncode.academy/api/wstern/users")
    .then(res=>{
      dispatch({type: "SET_PROFILE", payload: res.data});
      dispatch({type: "SET_STATUS", payload: "DONE_FETCHING"});
    })
    .catch(err=>{
      dispatch({type: "SET_STATUS",payload: "FETCH_USER_ERROR"})
    });
});*/
