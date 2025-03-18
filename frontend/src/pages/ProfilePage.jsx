import { useEffect, useState } from "react";
import {useSelector} from 'react-redux'
import { FaCamera, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
const ProfilePage = () => {
//geting the user details from the localhost
  const userDataValid = localStorage.getItem('userData')
  const userData = JSON.parse(userDataValid);
  const userDataFromStore = useSelector((store)=> store.user);
  // console.log(userVerifyData);
const navigate = useNavigate()
  //zustang
  const {authUser , isUpdatingProfile , updateProfile,checkAuth} = useAuthStore();
  // console.log(authUser);
  
  // if(!authUser) navigate("/signup")
  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  
  
  const [imageUrl , setImageUrl] = useState(null)
  const uploadImage = async(e)=>{
    const file = e.target.files[0];
    if(!file) return;
    
    const reader = new FileReader();
    reader.readAsDataURL(file)


    reader.onload = async()=>{
      const baseUrl = reader.result
      setImageUrl(baseUrl) 
      

      await updateProfile({profilePic : baseUrl})
      
      // try{
      //     const data = await fetch('http://localhost:5000/api/v1/auth/update-profile',{
      //       method:"PUT",
      //       credentials:"include",
      //       headers: { "Content-Type": "application/json" },
      //       body: JSON.stringify({ 
      //         ...userData,  
      //         token: userData.token, 
      //         baseUrl,
      //     }),
      //     })
      //     const res = await data.json();
          
      // }
      // catch (err){
      //   console.log(err)
      // }
    }

    }
    // console.log(userData);
    

  return (
    <div className="w-[100%] h-screen pt-[100px] flex justify-center items-center">
        <div className="sm:w-[500px] w-[95%]  bg-gray-950 rounded-md py-4 flex flex-col gap-8 ">
          <div className="flex flex-col items-center gap-2">
            <p className="font-bold text-3xl">Profile</p>
            <p className="text-gray-400">Your Profile Information</p>
          </div>

          <div className=" flex flex-col gap-2 ">
              <div className="w-[100px] relative h-[100px] border rounded-[50%] bg-gray-600 mx-auto ">
                {imageUrl || authUser?.profilePic ? <img className="border-3 border-black w-[100%] h-[100%] rounded-[50%] p-1" src={imageUrl ? imageUrl : authUser?.profilePic} alt={authUser?.fullName} /> : <FaUser className=" border-3 border-black w-[100%] h-[100%] rounded-[50%] p-1"/>}
                {/* <FaCamera className="absolute right-3  bottom-3 text-black"/>
                <input type="file" className="w-[15px] h-[15px] bg-white absolute right-3 bottom-3 " /> */}
                  <label className="absolute right-3 bottom-3 cursor-pointer">
                    <FaCamera className="text-black" />
                    <input type="file"
                    id="avatar-upload"
                    className="hidden" 
                    accept="image/*"
                    onChange={uploadImage}
                    /> 
                  </label>
              </div>
              <p className="text-center text-gray-500 text-[13px]">{isUpdatingProfile ? "Updating..." :"Click the camera to upload Your image"}</p>
          </div>

          <form action="" className="w-[80%] mx-auto flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <FaUser/>
                  <p>Your Name</p>
                </div>
                <input disabled value={authUser?.fullName} type="text" className="py-1 px-4 bg-white border-none  rounded-md outline-none text-black" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <MdEmail/>
                  <p>Your Email</p>
                </div>
                <input disabled value={authUser?.email} type="text"  className="py-1 px-4 bg-white border-none  rounded-md outline-none text-black"/>
              </div>
          </form>
          <div className="w-[80%] mx-auto flex flex-col gap-1">
            <p className="font-bold pb-4">Account Information</p>
            <div className="flex justify-between border-b py-2">
              <p className="text-gray-400">Member Since</p>
              <span>{authUser?.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <p className="text-gray-400">Account Status</p>
              <p className="text-green-600">Active</p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default ProfilePage