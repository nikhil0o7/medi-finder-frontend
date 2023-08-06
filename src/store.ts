import { configureStore } from "@reduxjs/toolkit";
import dashboardValsreducer from "./reducers/dashboardVals";
import userLoginReducer from  "./reducers/getUserDetails";

const store = configureStore({
    reducer : {
        userLoginAPI: userLoginReducer,
        dashboardValsreducer:dashboardValsreducer,        
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;