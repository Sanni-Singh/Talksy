 // socket fn for the connection
 import { useSelector } from 'react-redux';
import io from 'socket.io-client'
 const auth = useSelector((store)=> store.userAuth.userAuth);
 const sockets  = useSelector((store)=> store.userAuth.socket);
export const socketConnection = ()=>{
    if(!userAuth || sockets?.connected) return;
    console.log("api");

      const socket = io(BASEURL)
      socket.connect();
  }
