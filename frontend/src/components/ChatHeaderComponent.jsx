import { X } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
// import {selectedUser} from '../utils/messageSlices'
import { FaUser } from "react-icons/fa";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeaderComponent = () => {
  // const selecteduser = useSelector((store)=> store.messageStore.selectedUser);
  const dispatch = useDispatch();

  //zustang
  const {selectedUser , setSelectedUser} = useChatStore();
  const {onlineUsers} = useAuthStore();
  
  return (
    <div className="p-2.5 border-b border-black">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="size-10  border border-gray-700 rounded-full relative">
           {selectedUser.profilePic ?<img src={selectedUser.profilePic } alt={selectedUser.fullName} /> : <FaUser className="text-[40px] items-center pt-1 "/>}
          </div>
        </div>

        <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-gray-400">{onlineUsers.includes(selectedUser._id) ? "online":"offline"}
            </p>
          </div>
      </div>

      
      <button  onClick={()=> setSelectedUser(null)}>
        <X />
      </button>
    </div>
  </div>
  )
}
export default ChatHeaderComponent