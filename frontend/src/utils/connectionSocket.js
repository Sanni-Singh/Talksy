import { create } from "zustand";
import { useSelector } from "react-redux";
const BASEURL = "http://localhost:5000"
import {io} from 'socket.io-client'
const userAuth  = useSelector((store)=> store.userAuth.userAuth);
export const connectUser = create((set, get) => ({
  socket:null,

  connectSocket: () => {
    // const { authUser } = get();
    if (!userAuth || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: userAuth._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    socket.on("onlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },

//   subscribeToMessages: () => {
//     const { selectedUser } = get();
//     if (!selectedUser) return;

//     const socket = useAuthStore.getState().socket;

//     socket.on("newMessage", (newMessage) => {
//       const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
//       if (!isMessageSentFromSelectedUser) return;

//       set({
//         messages: [...get().messages, newMessage],
//       });
//     });
//   },

//   unsubscribeFromMessages: () => {
//     const socket = useAuthStore.getState().socket;
//     socket.off("newMessage");
//   },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));