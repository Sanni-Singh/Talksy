import { createSlice } from "@reduxjs/toolkit"
import { Users } from "lucide-react"

const initialState = {
    users:[],
    message:[],
    selectedUser : "",
    isLoadingUser:false,
    isMessageLoading:false,
}
let messageSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
       updateUserAccount:(state,action)=>{
        state.users = action.payload
       },
       updateMessage:(state,action)=>{
        state.message = action.payload
       },
       isLoadingUser:(state,action)=>{
        // return { isLoadingUser: action.payload }
        state.isLoadingUser = action.payload
       },
       isMessageLoading:(state,action)=>{
        // return {isMessageLoading : action.payload}
        state.isMessageLoading = action.payload
       },
       selectedUser:(state,action)=>{
        state.selectedUser = action.payload
       },


    }
})

export const {updateMessage,isLoadingUser,isMessageLoading,selectedUser,updateUserAccount} = messageSlice.actions;
export default messageSlice.reducer