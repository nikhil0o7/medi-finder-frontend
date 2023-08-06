import { createSlice } from "@reduxjs/toolkit";
import { IUserProps } from "./IUserProps";



const initialState: IUserProps = {
    email: "",
    firstname: "",
    isAdmin: "",
};

const userSlice = createSlice({
  name: "useUserLogin",
  initialState,
  reducers: {
    modifyEmail: (state, action) => {
        state.email = action.payload;
        localStorage.setItem("email", state.email);
      },
      modifyFirstname: (state, action) => {
        state.firstname = action.payload;
      },
      modifyisAdmin: (state, action) => {
        state.isAdmin = action.payload;
        localStorage.setItem("isAdmin", state.isAdmin);
      },
  },
});
export const {
    modifyEmail,
    modifyFirstname,
    modifyisAdmin
  } = userSlice.actions;
  export default userSlice.reducer;