import { configureStore } from "@reduxjs/toolkit";


import AuthReducer from './features/AuthSlice' ;


const store = configureStore({
    reducer : {
        auth : AuthReducer 
    }
})

export default store