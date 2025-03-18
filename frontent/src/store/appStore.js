import {configureStore} from'@reduxjs/toolkit'
import userSlice from '../utils/userSlices'
import userAuthSlices from '../utils/userAuthSlices'
import messageSlices from '../utils/messageSlices';
let appStore = configureStore({
    reducer:{
        user:userSlice,
        messageStore:messageSlices,
        userAuth:userAuthSlices,
    }
})

export default appStore;