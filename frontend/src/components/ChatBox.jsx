import { useDispatch, useSelector } from 'react-redux'
import ChatHEaderComponent from './ChatHeaderComponent'
import SendMessageComponent from './SendMessageComponent'
import { isMessageLoading, updateMessage } from '../utils/messageSlices';
import { useEffect, useRef, useState } from 'react';
import MessageShimmerUi from './MessageShimmerUi';
import { modifyingTheTime } from '../lib/modifyingTheTime';
const BASEURL = "http://localhost:5000"
import {io} from 'socket.io-client'
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import NoMessageShimmerUi from './NoMessageShimmerUi';


const ChatBox = () => {
const dispatch = useDispatch();
// const LoadingMessage = useSelector((store)=> store.messageStore.isMessageLoading);
// const selectedUser = useSelector((store)=> store.messageStore.selectedUser);
// const message = useSelector((store)=> store.messageStore.message);
// const userDataVerify = localStorage.getItem('userData');
// const userData  = JSON.parse(userDataVerify);
// const [messageContainer ,setMessageContainer] = useState([]);
// const authUser = useSelector((store)=> store.userAuth.userAuth)
// const socket = useSelector((store)=> store.userAuth.socket);
// let socket;
  //calling the socket chat
  // const gettingAllRealTimeMessage = ()=>{
  //   // if(!selectedUser) return;
  //   console.log("called");
    
  //   const socket =io(BASEURL,{
  //     query :{
  //       userId:authUser?._id
  //     }
  //   })
  //   socket.on("newMessage",(newMessage)=>{
  //     const isMessageSent = newMessage.senderId === selectedUser._id;
      
  //     console.log(socket);
      
  //     dispatch(updateMessage([...message,newMessage]))
  //   })

  // }

  // useEffect(() => {
  //   if (!selectedUser || !authUser) return;

  //   console.log("Socket connection initialized");

  //   socket = io(BASEURL, {
  //     query: {
  //       userId: authUser._id,
  //     },
  //   });

  //   socket.on("newMessage", (newMessage) => {
  //     if (newMessage.senderId === selectedUser._id) {
  //       setMessageContainer((pre)=> [...pre,newMessage])
  //       dispatch(updateMessage((prevMessages) => [...prevMessages, newMessage]));
 
  //     }
  //   });

  //   return () => {
  //     console.log("Socket disconnected");
  //     socket.off("newMessage"); // Remove event listener
  //     socket.disconnect(); // Disconnect socket
  //   };
  // }, [selectedUser, authUser, dispatch,message]);
  
  
  //messagse Api to do
    // const getAllTheMessage = async(userId)=>{
    //     dispatch(isMessageLoading(true))
    //     try{
    //         const data = await fetch(`http://localhost:5000/api/v1/messages/${userId}`,{
    //         credentials:'include'
    //         })
    //         const res = await data.json();
    //         setMessageContainer(res)
    //         console.log(res);
            
    //         dispatch(updateMessage(res))
    //     }
    //     catch (err){
    //         console.log(err)
    //     }
    //     finally{
    //         dispatch(isMessageLoading(false))
    //     }
    // }

    // useEffect(()=>{
    //   getAllTheMessage(selectedUser._id)
    //   // gettingAllRealTimeMessage()
    // },[selectedUser._id])





    //zustang
    const {messages , getMessages , isMessagesLoading , selectedUser , subscribeToMessages , unsubscribeFromMessages}=useChatStore();
    const {authUser} = useAuthStore();
    const messageEndRef = useRef(null);

    useEffect(()=>{
      getMessages(selectedUser._id)
      subscribeToMessages();

      return ()=> unsubscribeFromMessages();
    },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages])

    useEffect(()=>{
      if(messageEndRef.current && messages){
        messageEndRef.current.scrollIntoView({behavior :"smooth"});
      }
    },[messages])





    if(isMessagesLoading ) return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHEaderComponent/>
        <MessageShimmerUi/>
        <SendMessageComponent/>
      </div>
    )
    if(messages.length === 0 ) return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHEaderComponent/>
        <NoMessageShimmerUi/>
        <SendMessageComponent/>
      </div>
    )

  return (
    <div className="flex-1 flex flex-col overflow-auto">
    <ChatHEaderComponent />

    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message._id}
          className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          ref={messageEndRef}
        >
          <div className=" chat-image avatar">
            <div className="size-10 rounded-full border">
              <img
                src={
                  message.senderId === authUser?._id
                    ? authUser?.profilePic || "/avatar.png"
                    : selectedUser.profilePic || "/avatar.png"
                }
                alt="profile pic"
              />
            </div>
          </div>
          <div className="chat-header mb-1">
            <time className="text-xs opacity-50 ml-1">
              {modifyingTheTime(message.createdAt)}
            </time>
          </div>
          <div className="chat-bubble flex flex-col">
            {message.image && (
              <img
                src={message.image}
                alt="Attachment"
                className="sm:max-w-[200px] rounded-md mb-2"
              />
            )}
            {message.text && <p>{message.text}</p>}
          </div>
        </div>
      ))}
    </div>

    <SendMessageComponent />
  </div>
  )
}
export default ChatBox;