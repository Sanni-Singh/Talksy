import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userAuth:null,
    socket:null,
    onlineUser:[]
}
let userAuthSlices = createSlice({
    name:"user",
    initialState,
    reducers:{
       updateAuth:(state,action)=>{
        state.userAuth = action.payload
       },
       updateSocket:(state,action)=>{
        state.socket = action.payload
       },
       updateOnlineUser:(state,action)=>{
        // state.onlineUser = [...state.onlineUser , action.payload]
        state.onlineUser = action.payload
       }

    }
})

export const {updateAuth,updateSocket,updateOnlineUser} = userAuthSlices.actions;
export default userAuthSlices.reducer