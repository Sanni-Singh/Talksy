import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    fullName:"",
    email:"",
    _id:"",
    profilePic:""
}
let userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
       updateUser:(state,action)=>{
        return action.payload
       }

    }
})

export const {updateUser} = userSlice.actions;
export default userSlice.reducer