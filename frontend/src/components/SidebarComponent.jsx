import { Users } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateUser } from "../utils/userSlices";
import { isLoadingUser, isMessageLoading, selectedUser, updateMessage, updateUserAccount } from "../utils/messageSlices";
import UserShimmerUi from "./UserShimmerUi";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const SidebarComponent = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector((store)=> store.messageStore.isLoadingUser);
    // const user = useSelector((store)=> store.messageStore?.users);
    // const selectedUSer = useSelector((store)=> store.messageStore.selectedUser)
    const userDataVerify = localStorage.getItem('userData');
    const userData  = JSON.parse(userDataVerify);
    // const [user , setUser] = useState([])

    // const onlineUser = []
    

    //here we are getting all the user from the database 
    // const getAllTheUser = async()=>{
    //     dispatch(isLoadingUser(true))
    //     try{
    //         const data = await fetch('http://localhost:5000/api/v1/messages/user',{
    //           credentials:'include'
    //         })
    //         const res = await data.json();
            
    //         dispatch(updateUserAccount(res.results))
    //         // setUser(res.results)
    //     }
    //     catch (err){
    //         console.log(err)
    //     }
    //     finally{
    //         dispatch(isLoadingUser(false))
    //     }
    // }
    // useEffect(()=>{
    //     getAllTheUser();
    // },[])



    //zustang
    const {getUsers , users , selectedUser , setSelectedUser , isUsersLoading} = useChatStore()
    const {onlineUsers} = useAuthStore();
    const [showOnlineOnly , setShowOnlineOnly] = useState(null)

    useEffect(()=>{
      getUsers()
    },[getUsers])
    

    const filteredUsers = showOnlineOnly ? users.results.filter((user)=> onlineUsers.includes(user._id)):users.results
    // const filteredUsers = []
    
    //checking if user has present or not
    if(isUsersLoading) return <UserShimmerUi/>

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
        <div className="mt-3 hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            <span className="text-sm">Show online only</span>
          </label>
          <span className="text-xs text-zinc-500">({onlineUsers.length - 1} online)</span>
        </div>
        {/** to Do */}
        
      </div>
        
        <div>

            {filteredUsers && filteredUsers.map((user)=>(
                <button
                key={user._id}
                onClick={()=> setSelectedUser(user)}
                className={`w-full p-3 flex items-center gap-3 hover:bg-gray-600 transition-colors ${selectedUser?._id === user._id ? "bg-gray-500 ring-1 gray-blue-500" : ""}`}
                >
                    <div className="relative mx-auto lg:mx-0" >
                        <img src={user.profilePic || "https://images.ctfassets.net/ub3bwfd53mwy/5WFv6lEUb1e6kWeP06CLXr/acd328417f24786af98b1750d90813de/4_Image.jpg?w=750"} alt={user.fullName}
                        className="size-12 object-cover rounded-full"
                        />

                        {onlineUsers.includes(user._id) && (
                            <span className="absolute buttom-0 top-10 right-2 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900">

                            </span>
                        )}
                    </div>

                    <div className="hidden lg:block text-left min-w-0">
                    <div className="font-medium truncate">{user.fullName}</div>
                    <div className="text-sm text-zinc-400">
                        {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                    </div>
                    </div>

                </button>
            ))}

        </div>
      
    </aside>
  )
}
export default SidebarComponent