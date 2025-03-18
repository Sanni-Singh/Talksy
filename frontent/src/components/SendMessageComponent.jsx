import { FileInput, Image, Send, X } from "lucide-react"
import { useRef, useState} from "react"
import {useDispatch, useSelector}  from 'react-redux'
import { updateMessage } from "../utils/messageSlices"
import { useChatStore } from "../store/useChatStore"

const SendMessageComponent = () => {
  const [textVal , setTextVal] = useState("")
  const [selectPre , setSelectPre] = useState(null)
  const fileRef = useRef(null)
  const selectedUser = useSelector((store)=> store.messageStore.selectedUser)
  const dispatch = useDispatch();
  const message = useSelector((store)=> store.messageStore.message)


  //zustang
  const {sendMessage}  = useChatStore();
  



  ///getting the file and setting the reading the url
  const handleImageSelected = (e)=>{
  
    const file = e.target.files[0];
    if(!file) return;

    const reader = new FileReader();
    reader.onloadend = ()=>{
      setSelectPre(reader.result);
    }
    reader.readAsDataURL(file);

  };


  const removeImagesss = ()=>{
    setSelectPre(null);
    if(fileRef.current) fileRef.current.value = "";

  };

  const handleFormData = async(e)=>{
    e.preventDefault();
    if(!textVal.trim() && !selectPre) return;
    let mess = {
      text:textVal.trim(),
      image:selectPre
    }

    try{
      // const data = await fetch(`http://localhost:5000/api/v1/messages/send/${selectedUser._id}`,{
      //   method:"POST",
      //   headers:{"Content-Type": "application/json",},
      //   body:JSON.stringify(mess),
      //   credentials:'include'
      // })
      // const res = await data.json();
      // console.log(res);
      // dispatch(updateMessage([...message , res]))

      //zustang
      await sendMessage({
        text:textVal.trim(),
        image:selectPre
      })

      setTextVal("");
      setSelectPre(null);
      if(fileRef.current) fileRef.current.value = "";
    }
    catch (err){
      console.log("failed to send message" , err);
      
    }
    


  };


  return (
    <div className="p-4 w-full">
    { selectPre && (
      <div className="mb-3 flex items-center gap-2">
        <div className="relative">
          <img
            src={selectPre}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
          />
          <button
          onClick={removeImagesss}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
            flex items-center justify-center"
            type="button"
          >
            <X className="size-3" />
          </button>
        </div>
      </div>
    )}

    <form onSubmit={handleFormData}  className="flex items-center gap-2">
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          value={textVal}
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          onChange={(e)=> setTextVal(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileRef}
          onChange={handleImageSelected}
        />

        <button
          type="button"
          className={`hidden sm:flex btn btn-circle ${selectPre ? "text-emerald-500" : "text-zinc-400"}`}
          onClick={()=> fileRef.current?.click()}
        >
          <Image size={20} />
        </button>
      </div>
      <button
        type="submit"
        className="btn btn-sm btn-circle"
      >
        <Send size={22} />
      </button>
    </form>
  </div>
  )
}
export default SendMessageComponent