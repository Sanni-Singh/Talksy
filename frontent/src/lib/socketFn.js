const BASEURL = "http://localhost:5000"
import { useSelector } from 'react-redux'
import {io} from 'socket.io-client'
const userAuth = useSelector((store)=> store.userAuth.userAuth)
  const sockets = useSelector((store)=> store.userAuth.socket)

  
 export const socketConnection = ()=>{
    if(!userAuth || sockets?.connected) return;
    console.log("api");

      const socket = io(BASEURL)
      socket.connect();
  }