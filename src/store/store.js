import { createStore } from "redux";
import userReducer from "../reducers/userReducer.js"
const store=createStore(userReducer)


export default store