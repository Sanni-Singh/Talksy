import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../utils/userSlices";
import axiousInstance from "../lib/axios";
import NoChat from "../components/NoChat";
import ChatBox from "../components/ChatBox";
import SidebarComponent from "../components/SidebarComponent";
import { updateAuth, updateOnlineUser, updateSocket } from "../utils/userAuthSlices";
const BASEURL = "http://localhost:5000"
import {io} from 'socket.io-client'
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const data = useSelector((store)=> store.user);
  const userAuth = useSelector((store)=> store.userAuth.userAuth);
  const sockets = useSelector((store)=> store.userAuth.socket);
  const dispatch = useDispatch();
  const selectedUserUpdate = useSelector((store)=> store.messageStore.selectedUser);
  const onlineUsers = useSelector((store)=> store.userAuth.onlineUser);
const navigate = useNavigate();
const userCredentails = localStorage.getItem("userData");
const userData = JSON.parse(userCredentails)


  //zustang
  const {selectedUser} = useChatStore();
  const {checkAuth}  = useAuthStore();
  const {authUser} = useAuthStore();
  

  useEffect(()=>{
    checkAuth()
    console.log(userData);
    
if(!userData) navigate('/signup');

  },[checkAuth])
  

    
  
  
  // socket fn for the connection
  // const socketConnection = ()=>{
  //   if(userAuth || sockets) return;
    
  //   const socket =io(BASEURL,{
  //     query :{
  //       userId:userAuth?._id
  //     }
  //   })
  //   socket.connect();
    
  //   // dispatch(updateSocket({socket:socket}));
  //   socket.on('connect', () => {
  //     // console.log(socket);
  //     // const data = JSON.stringify(socket)
  //     dispatch(updateSocket({isConnected : socket.connected}));
  // });
  // socket.on("onlineUsers",(userIds)=>{
  //   dispatch(updateOnlineUser({onlineUsers:userIds}))
  // })
  // }
  
  
  
  // const checkingUser = async()=>{
  //   try{
  //     const data = await fetch('http://localhost:5000/api/v1/auth/check',{
  //       method:"GET",
  //       credentials:'include'
  //     });
  //     const res = await data.json();
  //     dispatch(updateAuth(res));
  //     socketConnection()
  //   }
  //   catch (err){
  //     console.log("eerror occur in checking the user", err);
      
  //   }
    
  // }

  //fetching the user data and storeing in the redux store
  // useEffect(()=>{
  //   const userInfo = localStorage.getItem('userData')
  //   const userData = JSON.parse(userInfo)
  //   dispatch(updateUser(userData))
  //   checkingUser()
  // },[])
  
  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <SidebarComponent />

            {!selectedUser ? <NoChat /> : <ChatBox />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage