import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    collapsed:false,
    heading: "Dashboard",
    showComponent: "dashboard",
    provider_id:""
};

export const dashboardVals = createSlice({
    name: "dashboardVals",
    initialState,
    reducers: {
      componentToggle: (state, action) => {
        state.showComponent = action.payload;
      },
      sidebarToggle: (state, action) => {
        state.collapsed = action.payload;
      },
      modifyHeading: (state, action) => {
        state.heading = action.payload;
      },
      modifyproviderId:(state, action) => {
        state.provider_id = action.payload;
      },
      resetDashboardVals: () => initialState,
    },
});


export const {
  componentToggle,
    sidebarToggle,
    resetDashboardVals,
    modifyHeading,
    modifyproviderId
} = dashboardVals.actions;

export default dashboardVals.reducer;

