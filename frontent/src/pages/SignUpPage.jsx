import { FaLock } from "react-icons/fa";
import { useEffect, useRef, useState } from "react"
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import userLogin from '../assets/img/userLogin.png'
import { FaEyeLowVision } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { updateUser } from "../utils/userSlices";
import {io} from 'socket.io-client'
import { updateSocket } from "../utils/userAuthSlices";
import { useAuthStore } from "../store/useAuthStore";
const BASEURL = "http://localhost:5000"



const SignUpPage = () => {
  const navigate = useNavigate()
  const [loginInfo,setLoginInfo] = useState(true)
  const [showPass,setShowPass] = useState(true)
  const nameRef = useRef("")
  const emailRef = useRef("")
  const passRef = useRef("")
  const dispatch = useDispatch();

  //checkiing if the user havwe already login or not if then redireact to the home page
  const userStateDetails = localStorage.getItem('userData');
  const userDataDetails = JSON.parse(userStateDetails);
  if(!userDataDetails === null) Navigate("/")
  const userAuth = useSelector((store)=> store.userAuth.userAuth)
  const sockets = useSelector((store)=> store.userAuth.socket)


  //zustang
  const {login , isLoggingIn , signup} = useAuthStore();
  

  
  // socket fn for the connection
  const socketConnection = ()=>{
    if(!userAuth || sockets?.connected) return;
    console.log("api");

      const socket = io(BASEURL)

      socket.on('connect', () => {
        dispatch(updateSocket({ isConnected: true })); // Store only serializable data
    });

    socket.on('disconnect', () => {
        dispatch(updateSocket({ isConnected: false }));
    });
      // socket.connect();
      
      // dispatch(updateSocket({socket : socket.connected}))
  }

//obj of the user with the default field
  const [userFrom , setUserForm]  =useState({
    fullName:"",
    email:"",
    passward:""
})


//submit fn where user submit thier details for the userLogin
const formSubmit = async(e)=>{
  e.preventDefault();

  //signUp userDetails default field
  const signObj = {
    fullName:nameRef.current.value,
    email:emailRef.current.value,
    passward:passRef.current.value,
  }

// login user default feild
  const loginObj = {
    email:emailRef.current.value,
    passward:passRef.current.value,
  }
  
  //setting the userDetails in the state
  setUserForm((pre)=> {
    return signObj
  })

  loginInfo ? login(loginObj , navigate) : signup(signObj,navigate)


  //calling the Api os the user to validate the authentication
  // try{
  //   //in this line i have set the both api of user sign and loign 
  //     const data = await fetch(`${loginInfo ? "http://localhost:5000/api/v1/auth/login" : "http://localhost:5000/api/v1/auth/signup"}`,{
  //       method:"POST",
  //       headers:{"Content-Type": "application/json",},
  //       body:JSON.stringify(loginInfo ? loginObj:signObj),
  //       credentials:'include'
  //     })
  //     const res = await data.text();
  //     const updatedUserValue = JSON.parse(res)
      

  //     //storing the value in the localStorage
  //     localStorage.setItem("userData",JSON.stringify(updatedUserValue.results))

  //     //here i m disptaching the userdetails to the redux store
  //     dispatch(updateUser(updatedUserValue.results));
  //     ///here i m sending the use to the home page if user currdentials is true
  //     if(updatedUserValue.success)Navigate("/")
  //       socketConnection();
      
  // }
  // catch (err){
  //   console.log(err)
  // }
  
}

  return (
    <div className="w-[100%] bg-[] h-screen flex justify-center items-center font-[Roboto]">

      <div className="md:w-[1000px] sshadow-[-1px_5px_19px_0px_rgba(0,_0,_0,_0.35)] w-[95%]  h-[600px] bg-gray-300 flex text-black">
        <div className="md:w-[50%] w-[100%]   h-[100%] flex items-center ">
          <div className=" w-[100%]   flex flex-col gap-10 justify-center items-center ">

          <h1 className="text-2xl font-bold text-center">{loginInfo?"Login Your Account Now" :"Create A Account Now"}</h1>
          {/**form for the user to login or sign here */}
          <form action="" onSubmit={formSubmit} className="p-2 sm:w-[60%] w-[95%] h-[100%] flex flex-col gap-7 m-auto">

            {/*name feild */}
            {!loginInfo && <div className="flex border-b-2 w-[100%] pl-4 items-center gap-1">
                <FaUserAlt className="text-gray-600"/>
                <input ref={nameRef} className="bg-gray-300 outline-none p-2 border-none" type="text" placeholder="Enter Full Name" />
            </div>}

             {/*email feild */}
            <div className="flex border-b-2 w-[100%] pl-4 items-center gap-1">
                <MdEmail className="text-gray-600"/>
                <input ref={emailRef} className="bg-gray-300 outline-none p-2 border-none" type="email" placeholder="Enter Email" />
            </div>

             {/*passward feild */}
            <div className="flex border-b-2 w-[100%] pl-4 items-center gap-1">
                <FaLock className="text-gray-600"/>
                <input ref={passRef} className="bg-gray-300 outline-none p-2 border-none w-[90%]" type={showPass?"password":"text"} placeholder="Enter Passward" />
                {showPass ? <FaEye onClick={()=>setShowPass(!showPass)}  className="text-gray-600 cursor-pointer"/> :<FaEyeLowVision  onClick={()=>setShowPass(!showPass)} className="text-gray-600 cursor-pointer"/> }
            </div>

             {/*submit button */}
            <button disabled={isLoggingIn} className="bg-blue-700 w-fit m-auto px-5 py-2 hover:bg-blue-500 text-white rounded-md">{loginInfo ? "Login" : "Sign Up"}</button>
          </form>

          {/**here we are modify the login for like form shold be a login or sing form*/}
            <p>{loginInfo ? "Create A Account :-":"Already Have a Account ?"} <span onClick={()=> setLoginInfo(!loginInfo)} className="text-blue-600 cursor-pointer">{loginInfo ? "Sign Up" :"Login"}</span></p>
          </div>
        </div>
        <div className="w-[50%] hidden md:flex">
          <img className="w-[100%] h-[100%]" src={userLogin} alt="" />
        </div>
      </div>
    </div>
  )
}

export default SignUpPage